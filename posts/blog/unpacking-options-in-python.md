---
title: "Unpacking Options in Python"
subtitle: "Providing type guarantees for many arguments in Python"
date: 2025-12-27
draft: false
pinned: false
---

I have been working on pretty interesting problems as part of
[Git-Mastery](https://github.com/git-mastery) (we are looking for open-source
contributors!) and one of the most interesting problems I have encountered
recently is having to design a wrapper around the Git CLI.

A Git command (or any CLI in general) can comprise of arguments, options, and 
flags.

```bash
git commit [-a | --interactive | --patch] [-s] [-v] [-u[<mode>]] [--amend]
	   [--dry-run] <commit>_ | --fixup [(amend|reword):"><commit>]
	   [-F <file> | -m <msg>] [--reset-author] [--allow-empty]
	   [--allow-empty-message] [--no-verify] [-e] [--author=<author>]
	   [--date=<date>] [--cleanup=<mode>] [--[no-]status]
	   [-i | -o] [--pathspec-from-file=<file> [--pathspec-file-nul]]
	   [(--trailer <token>[(=|:)<value>])…​] [-S[<keyid>]]
	   [--] [<pathspec>…​]
```

How do we exactly model so much information within a single function?

```python
git.commit()
```

Arguments will become parameters:

```python
def commit(
    self,
    pathspec: Optional[str] = None,
) -> None:
```

But because the order of the flags and options can vary, it does not make sense
to expand every single one of them into a separate parameter (because it's not 
very sustainable to maintain it in my opinion).

Instead, we represent the flags and options as a `TypedDict`
([docs](https://docs.python.org/3/library/typing.html#typing.TypedDict)) instead:

```python
class CommitOptions(TypedDict, total=False):
    all: bool
    reuse_message: str
    message: str
    allow_empty: bool
    no_edit: bool
```

Then, we can use `Unpack` 
([docs](https://docs.python.org/3/library/typing.html#typing.Unpack)) to expand
these parameters while providing type hints for the fields of the `TypedDict`:

```python
def commit(
    self,
    pathspec: Optional[str] = None,
    **options: Unpack[CommitOptions],
) -> None:
```

It works in tandem with `**` to expand these into the respective fields.

When we call this function, we will see that the type hints include every field
along with its associated type:

![Type hint](/post/unpacking-options-in-python/type-hint.png)

Then, to access the fields, you can use `options.get()` (since we have specified 
`total=False`).

The result is a function that we can call with any order of parameters without
exploding our function signature at once:

```python
git.commit(
  "dest", 
  message="Add dest/", 
  no_edit=True, 
  allow_empty=True
)
```

This works especially well when you have a much larger number of flags and 
options:

```python
class RestoreOptions(TypedDict, total=False):
    source: str

    worktree: bool
    staged: bool

    ours: bool
    theirs: bool

    merge: bool
    conflict: Union[Literal["merge"], Literal["diff3"], Literal["zdiff3"]]

    ignore_unmerged: bool
    ignore_skip_worktree_bits: bool

    recurse_submodules: bool
    no_recurse_submodules: bool

    overlay: bool
    no_overlay: bool
```

If you are interested in how we have used this pattern in Git-Mastery, feel free
to refer to the `repo-smith` repository: <https://github.com/git-mastery/repo-smith>
