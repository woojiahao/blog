---
title: "Unified Data Modelling with Elixir"
date: 2026-06-12
draft: false
pinned: false
---

The [LTA public bus schedule API](https://datamall.lta.gov.sg/content/datamall/en/dynamic-data.html) is an amazing public resource for anyone looking to integrate Singapore's public transport data into their applications. However, a core limitation with the API is its relatively aggressive pagination (500 rows per response). It is understandable why it has to exist given that the API is free to use and has virtually no rate limits, but it was not feasible for the project I am working on (I'll publish a short about it soon!) as I wanted to fetch all of the data at once.

To fetch all of the data at once while avoiding spamming the API, I built an intermediate API that would bulk-load the data from the endpoints I was interested in (bus routes, bus stops, and bus arrivals) and cache the results for a day to avoid repeated API requests.

Of course, being an Elixir fanboy, I wanted to write this intermediate API in Phoenix. While writing this API, I encountered a fun application of metaprogramming: unified data modelling.

## Traditional API response data modelling

Traditionally, if you were building a service that ingests an API, you would introduce a [data transfer object (DTO)](https://en.wikipedia.org/wiki/Data_transfer_object) to parse the API response, along with a DTO for your own API responses:

![Traditional API Modelling](/post/unified-data-modelling-with-elixir/traditional-api-modelling.png)

The intermediate API service will receive the LTA API response, transform it into an **API DTO** to match the fields, and then convert that DTO to a different format that can be returned to the user (called the **internal DTO**). 

Common conversion steps include:

1. Removing fields
2. Renaming fields (like changing the case from PascalCase to snake_case)
3. Parsing data

Suppose that the API responds with the following format:

```json
// GET /api/people?$skip=0
[
  {
    "name": "John",
    "occupation": "Student",
    "homeAddress": "18 Baker Street"
  },
  {
    "name": "Mary",
    "occupation": "Teacher",
    "homeAddress": null
  }
]
```

A DTO could look like:

```elixir
defmodule API.Person do
  defstruct [:name, :occupation, :homeAddress]
end
```

And have the serialization library convert the API responses to the DTO.

Then, the output DTO could look like:

```elixir
defmodule Model.Person do
  defstruct [:name, :occupation, :home_address]
  
  @derive {Jason.Encoder, []}
  
  @spec from_api(API.Person) :: %__MODULE__{}
  def from_api(api) do
    %__MODULE__{
      name: api.name,
      occupation: api.occupation,
      home_address: api.homeAddress
    }
  end
end
```

This is discounting providing type safety to both models by declaring `@type t`, providing custom parsing for fields, and the cost to add new fields or modify fields as both DTOs would have to change, and many more features.

# Introducing… unified data modelling

Rather than creating two separate data models, Elixir allows us to create a single model that handles both parsing and output using some clever metaprogramming constructs.

We would also like to ideally address the following:

1. Automatically generating consistent `@type t` definitions
2. Support custom parsing for fields like date times and special formats
3. Make it easy to add/delete/modify/hide fields
4. Generate OpenAPI specifications
5. Generate `defstruct` for all fields

However, for the sake of simplicity, let's keep it extremely simple and design a unified data model that only takes in string fields. 

:::callout{.info}
The full unified data model for BusWhere can be found in [this GitHub repository](https://github.com/woojiahao/bus-where-api/blob/main/lib/bus_where_api/models/model_base.ex), where it covers more complex features like custom parsing and enum handling.
:::

Working backwards, let's come up with what a unified data model might look like:

```elixir
defmodule Model.Person do
  use Model.ModelBase
  
  field :name, :string, "name"
  field :occupation, :string, "occupation"
  field :home_address, :string, "homeAddress"
end
```

We want to declare fields with the `field` macro, passing in the internal DTO's field name, the field type, and the API DTO's field name. These should then generate

1. `defstruct [:name, :occupation, :home_address]`
2. `@type t`
3. `def from_body()`

So the final `Model.Person` looks like:

```elixir
defmodule Model.Person do
  defstruct [:name, :occupation, :home_address]
  
  @derive {Jason.Encoder, []}
  
  @type t :: %__MODULE__{
    name: String.t(),
    occupation: String.t(),
    home_address: String.t()
  }
  
  def from_body(body) do
    %__MODULE__{
      name: body["name"],
      occupation: body["occupation"],
      home_address: body["homeAddress"]
    }
  end
end
```

And handle any other work that is necessary to then allow the intermediate API to return the model directly as a JSON response (i.e. serialization). 

## Macros recap

:::callout{.info}
If you wish to have a deep dive into metaprogramming in Elixir, we have a series on it you [can read here](https://blog.woojiahao.com/post/an-introduction-to-metaprogramming-in-elixir).
:::

We will cover most concepts in this article again, but one core idea to learn before diving in is how macros are treated in Elixir, particularly how the compiler handles them.

Elixir is a compiled language, so the compiler first parses files, converts the syntax into an [Abstract Syntax Tree (AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree) and then compiles the AST into BEAM VM bytecode which is then converted to machine code.

While parsing files, the compiler will encounter macros, which is then executed, expanding the macro in place of the macro call, using the body of a `quote`:

```elixir
defmacro foo do
  quote do
    IO.puts("Hi")
  end
end

defmodule Bar do
  foo
end
# ===> results in
defmodule Bar do
  IO.puts("Hi")
end
```

`quote` converts its body into an AST representation so all values are preserved as-is till compilation. To evaluate values before they are converted to an AST, use `unquote` within a `quote` :

```elixir
defmacro foo(number) do
  quote do
    x + number # this translates to `x + number` which is not valid
    x + unquote(number) # this translates to `x + 11` for e.g.
  end
end
```

:::callout{.info}
More precisely, `unquote` inserts the AST directly, so numbers are valid ASTs, but when dealing with more complex data structures, make sure that they are an AST first, before using `unquote` on them.
:::

After the compiler expands all the macros and evaluates any behavior, the final AST is then compiled into the module.

## Step 0: Creating the model base

We first need to declare a `ModelBase` that all unified data models will `use` :

```elixir
defmodule Model.ModelBase do
  @callback from_body(map()) :: struct()
  
  defmacro __using__(_opts) do
    quote do
      @derive {Jason.Encoder, []}
      
      import Model.ModelBase
      
      Module.register_attribute(__MODULE__, :fields, accumulate: true)
      
      @before_compile Model.ModelBase
    end
  end
end
```

To use this `ModelBase`:

```elixir
defmodule Model.Person do
  use Model.ModelBase
end
```

The `use` macro in Elixir triggers the `__using__` macro, resulting in the following module upon compilation:

```elixir
# after macro expansion
defmodule Model.Person do
  @derive {Jason.Encoder, []}
  
  import Model.ModelBase
  
  Module.register_attribute(__MODULE__, :fields, accumulate: true)
  
  @before_compile Model.ModelBase
end
```

It behaves *very* similarly (but not exactly) to inheritance in OOP, allowing you to embed common behavior across modules.

- `@derive {Jason.Encoder, []}` — support serialization
- `import Model.ModelBase` — use functions and macros in `Model.ModelBase` without using `Model.ModelBase.xxx`
- `Module.register_attribute` — registers the `@field` module attribute that can accumulate values every time you call it
- `@before_compile Model.ModelBase` — calls the `before_compile` macro before the `Model.Person` module is actually compiled from AST into BEAM VM code

This sets up the core of how the unified data model will work, we will now need to add macros to `Model.ModelBase` to make it a reality.

## Step 1: Declaring fields

We want to declare fields using a single macro — providing both the internal and API DTO field names, along with the data type. We use the `@fields` accumulating module attribute that we declared using `__using__` :

```elixir
# Model.ModelBase
@spec field(atom(), atom(), String.t()) :: Macro.t()
defmacro field(internal_name, field_type, api_name) do
  quote do
    @fields {
      unquote(internal_name),
      unquote(field_type),
      unquote(api_name)
    }
  end
end
```

When we use the `field` macro inside `Model.Person`, the macros will get expanded to:

```elixir
# Model.ModelPerson
# field :name, :string, "name"
@fields {
  :name,
  :string,
  "name"
}

# field :occupation, :string, "occupation"
@fields {
  :occupation,
  :string,
  "occupation"
}

# field :home_address, :string, "homeAddress"
@fields {
  :home_address,
  :string,
  "homeAddress"
}
```

And because we set the field to `accumulate: true`, the `@fields` module attribute actually looks like this once all of the `field` macros are expanded:

```elixir
@fields [
  {
    :name,
    :string,
    "name"
  },
  {
    :occupation,
    :string,
    "occupation"
  },
  {
    :home_address,
    :string,
    "homeAddress"
  }
]
```

## Step 2: Declaring the struct

We want to now use the values of `@fields` to provide a `defstruct` call in `Model.Person` , like this:

```elixir
defmodule Model.Person do
  # values from __using__
  defstruct [:name, :occupation, :home_address]
end
```

However, as we are expanding the macro calls, we do not have access to the full value of `@fields` because we don't know when `field` calls end.

To combat this, we use the `__before_compile__` macro, which slots itself after the macro expansion but right before the compilation of the module, so it has access to the latest AST of the module after all other macros are expanded, allowing you to make one final update to the AST of the module with the knowledge of things like the final value of module attributes like `@fields` .

So the compiler steps look like this:

1. Parse raw module code — AST 1
2. Identify and expand all macro calls — AST 2
3. Call `__before_compile__` to modify AST 2 — AST 3
4. Compile AST 3 into final module

This is what we need `__before_compile__` to do:

1. Load the value of `@fields`
2. Extract the `name` component of each field
3. Use these values in `defstruct` 

```elixir
# Model.ModelBase
defmacro __before_compile__(env) do
  fields = Module.get_attribute(env.module, :fields) || []
  field_names = Enum.map(
    fields, 
    fn {field, _type, _key, _opts) ->
      {field, nil}
    end
  )
  
  quote do
    defstruct unquote(field_names)
  end
end
```

- `Module.get_attribute` — retrieves the `@fields` value
- [`Enum.map`](http://Enum.map) — converts the `@fields` list of tuples to an array of atoms
- `defstruct unquote(field_names)` — unquotes the array of atoms from the previous step into the macro

This produces the intended compiled `Model.Person` module as seen above.

## Step 3: Converting API to internal fields

With the `@fields` loaded, we can then parse each of the values from the API response into the internal fields. We can centralize this behavior in the function `from_body` (previously `from_api`):

```elixir
# Model.Person
@spec from_body(map()) :: %__MODULE__{}
def from_body(api) do
  %__MODULE__{
    name: api.name,
    occupation: api.occupation,
    home_address: api.homeAddress
  }
end
```

Given that we may want to parse the API fields like converting strings to integers or booleans, handling enums, parsing special formats, we can build a general parsing layer by declaring `parse` functions that are responsible for taking the type of each field and applying the appropriate parsing rules to each:

```elixir
# Model.ModelBase
def parse(:string, nil, _), do: nil
def parse(:string, api_value, _), do: api_value

def parse(:integer, nil, _), do: nil
def parse(:integer, api_value, _) 
  when is_integer(api_value) or is_float(api_value), do: api_value
def parse(:integer, api_value, _)
  when is_binary(api_value), do: String.to_integer(api_value)
```

To setup the `from_body` definition in every model, we add to the `__before_compile__` macro:

```elixir
# Model.ModelBase
defmacro __before_compile__(env) do
  # @fields preprocessing...
  
  escaped_fields = Macro.escape(fields)
  
  quote do
    # defstruct...
    
    def from_body(body) when is_map(body) do
      Enum.reduce(
        unquote(escaped_fields), 
        fn {field, type, key, opts}, acc ->
          raw_value = Map.get(body, key)
          value = parse(type, raw_value, opts)
          Map.put(acc, field, value)
        end
      )
    end
    
    def from_body(_), do: %__MODULE__{}
  end
  
  # parse functions
end
```

:::callout{.info}
Note that we need to escape `fields` and then `unquote` it because `unquote` inserts the AST in-place, so we need to insert the AST of the `fields` array, not the `fields` array directly (which is invalid).

More in the [Elixir documentation](https://elixir.hexdocs.pm/Kernel.SpecialForms.html#unquote/1)
:::

For every `field`, we:

1. Extract the raw value from the `body`
2. Parse the raw value using the `parse` functions
3. Accumulate them into a `%__MODULE__{}`, which is `Model.Person` in this case

Now, we have the `from_body` function. At this stage, if we call `Model.Person.from_body(api_response_body)`, we will get a struct of `Model.Person`, parsing the API response body into the internal model.

## Step 4: Declaring `@type t`

The final piece we want is to automatically generate the `@type t` definition so that we can guarantee type safety and type usage through `Model.Person.t()`. Normally, you would need to declare `@type t` manually:

```elixir
# Model.Person
@type t :: %__MODULE__{
  name: String.t(),
  occupation: String.t(),
  home_address: String.t()
}
```

But with macros, we can dynamically generate them based on the `field` values:

```elixir
# Model.ModelBase
defmacro __before_compile__(env) do
  # @fields preprocessing...
  
  field_types = Enum.map(
    fields,
    fn {field, type, _, _} ->
      {field, type_spec(type)}
    end
  )
  
  struct_type = 
    {:%, [],
      [
        {:__MODULE__, [], nil},
        {:%{}, [], field_types}
      ]}
  
  quote do
    # defstruct...
    
    # from_body
    
    @type t :: unquote(struct_type)
  end
  
  # parse functions
end

def type_spec(:string), do: quote(do: String.t())
def type_spec(:integer), do: quote(do: integer())
```

Similar to `parse`, we declare helper functions `type_spec` to convert the declared type values to the appropriate type signatures, like `String.t()` and `integer()`.

We also need to explicitly build the `@type t` struct's AST and `unquote` it. The AST results in the exact `@type t` definition you see above. This needs to all be done before `quote` since we want to evaluate these values before the macro is expanded.

## And…

![Peter griffin Tada](https://i.makeagif.com/media/1-18-2021/QtYj4G.gif)

We now have a fully unified data model `Model.Person` that works as both the API and internal DTO, with all of the type generation and parsing handled automatically. It scales with any number of fields and adding new support for field types or parsing is as simple as supporting new `parse` and `type_spec` helper functions. You can also use the `Model.ModelBase` in any number of data models, plugging in just `use Model.ModelBase`  and using all the `field` macros.

If you want to see how enum values from the API is handled, or how union types can be generated, or how custom parsing for fields is implemented, you can refer to the `ModelBase` [written for BusWhere](https://github.com/woojiahao/bus-where-api/blob/main/lib/bus_where_api/models/model_base.ex). 

This is the final `Model.ModelBase`:

```elixir
defmodule Model.ModelBase do
  @callback from_body(map()) :: struct()
  
  defmacro __using__(_opts) do
    quote do
      @derive {Jason.Encoder, []}
      
      import Model.ModelBase
      
      Module.register_attribute(__MODULE__, :fields, accumulate: true)
      
      @before_compile Model.ModelBase
    end
  end
  
  @spec field(atom(), atom(), String.t()) :: Macro.t()
  defmacro field(internal_name, field_type, api_name) do
    quote do
      @fields {
        unquote(internal_name),
        unquote(field_type),
        unquote(api_name)
      }
    end
  end
  
  defmacro __before_compile__(env) do
    fields = Module.get_attribute(env.module, :fields) || []
    field_names = Enum.map(
      fields, 
      fn {field, _type, _key, _opts) ->
        field
      end
    )
    escaped_fields = Macro.escape(fields)
    
    field_types = Enum.map(
      fields,
      fn {field, type, _, _} ->
        {field, type_spec(type)}
      end
    )
    
    struct_type = 
      {:%, [],
        [
          {:__MODULE__, [], nil},
          {:%{}, [], field_types}
        ]}
      
    quote do
      defstruct unquote(field_names)
      
      def from_body(body) when is_map(body) do
        Enum.reduce(
          unquote(escaped_fields), 
          fn {field, type, key, opts}, acc ->
            raw_value = Map.get(body, key)
            value = parse(type, raw_value, opts)
            Map.put(acc, field, value)
          end
        )
      end
      
      def from_body(_), do: %__MODULE__{}
      
      @type t :: unquote(struct_type)
    end
  end
  
  def parse(:string, nil, _), do: nil
  def parse(:string, api_value, _), do: api_value
  
  def parse(:integer, nil, _), do: nil
  def parse(:integer, api_value, _) 
    when is_integer(api_value) or is_float(api_value), do: api_value
  def parse(:integer, api_value, _)
    when is_binary(api_value), do: String.to_integer(api_value)
    
  def type_spec(:string), do: quote(do: String.t())
  def type_spec(:integer), do: quote(do: integer())
end
```
