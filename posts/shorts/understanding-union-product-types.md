---
title: "Finally Understanding Union and Product Types"
date: 2026-09-20
draft: false
pinned: false
---

I was reading [this viralinstruction blog post](https://viralinstruction.com/posts/uniontypes/) about Union vs Sum types and these types finally clicked in my head.

The key focus here is the _available and possible_ values when dealing with these types. For instance, a type of `bool` has two possible values: `true` and `false`.

For now, we will indicate the available values of a type as $\lvert\text{type}\rvert$

## Product types

```
struct Foo {
  is_bar: bool
  baz: int16
}
```

Structs are an example of a product type because the possible values are the product of all possible values of each field.  So values `Foo{is_bar: true, baz: 1}` and `Foo{is_bar: true, baz: 2}` and `Foo{is_bar: false, baz: 1}` are all in the space of possible values for this struct.

Notationally, this product type's available value space would be: $\lvert\text{bool}\rvert \times \lvert\text{int16}\rvert$

## Union types

```
type Foo = bool | int16
```

The available values are the values of `bool` OR the values of `int16`, not both.

Notationally: $\lvert\text{bool}\rvert \cup \lvert\text{int16}\rvert$

The benefit of this is that we effectively de-duplicate the available values. For instance, `type Foo = bool | bool` would have the available values of a single `bool`.

## Sum types

```
type Foo = bool
type Bar = bool
type Baz = Foo | Bar
```

Sum types are tagged or discriminated unions. Essentially, they are formed by wrapping a type in an alias. Doing so allows the available values to _not_ be de-duplicated.

In the example above, although the underlying type is `type Baz = bool | bool`, the available values isn't just a single `bool`, it is $\lvert\text{Foo}\rvert + \lvert\text{Bar}\rvert$, since the available values are now a summation of the two aliased values (this isn't the same as a product type since the total outcomes are not a combination of these fields, it's still an EITHER OR).
