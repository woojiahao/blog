---
status: publish
date: "2024-04-13"
title: "Appreciating 'Largest Rectangle in Histogram'"
description: "Appreciating the beauty of the 'Largest Rectangle in Histogram' problem"
mathjax: true
tags:
- Learning
- Leetcode
- DSA
- Proofs
---

# Problem statement

The 'Largest Rectangle in Histogram' problem is as follows:

> Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return
> the area of the largest rectangle in the histogram.

I love this problem as it provides an amazing introduction to problem solving, more specifically, formalizing proofs of
why algorithms work. Let's start with an example:

Let the array of heights be `[1, 4, 7, 5, 7]`:

![Initial](post//leetcode/largest-rectangle/initial.png)

The answer is `16`:

![Answer](post//leetcode/largest-rectangle/answer.png)

If you have solved this problem before, or just looked at the answer, you may have found it hard to convince yourself
why the algorithm works. Fret not, I am here to _try_ formalizing the proof of the algorithm so that you can understand
how exactly it works!

> The general solution is to keep a monotonically increasing stack of indices

# Invariants

We can think of the monotonically increasing property as an invariant that the stack must maintain.

As a refresher, an **invariant** is a property that is always true across iterations (of a loop) or for all elements
in a data structure.

A monotonically increasing stack of indices maintains the following invariants:

1. $S[0] < S[1] < \cdots < S[-1]$
2. $H[S[0]] \leq H[S[1]] \leq \cdots \leq H[S[-1]]$

# Notations

For each index $i \in [0, n)$ where $H$ is the array of heights and $n = |H|$. Let $S$ be the monotonically increasing
stack.

# Operations

Many monotonic stack problems involve thinking about two key operations:

1. When to push?
2. When to pop?

## Push

When $|S| = 0$ or $H[i] \geq H[S[-1]]$, then we push $i$ to the stack as it maintains the invariant.

## Pop

When $|S| > 0$ and $H[i] < H[S[-1]]$, then we pop from the stack, receiving index $j$, and try computing the largest
rectangle $L$ using $H[j]$ as the shortest rectangle.

To calculate the $L$, let $S' = S - [j]$. The height of $L$, $h = H[j]$.

To derive the width of $L$, $w$, we need to find the leftmost and rightmost rectangles that are
still $\geq H[j]$. We can label the indices of these rectangles as $l$ and $r$.

$$
H[l] \geq H[j] \land H[r] \geq H[j]
$$

Otherwise, $H[j]$ will no longer be the shortest rectangle. After computing $L$, we can push $i$ onto the stack as well.

# Solving $L$

## Finding the rightmost index

Notice that if $H[i] < H[j]$ and $S$ is monotonically increasing, then $H[i - 1]$ must be the rightmost tallest
rectangle. Formally, the claim can be written as

$$
\forall k \in [j, i - 1], H[k] \geq H[j]
$$

The above claim implies that $L$ can go from $j$ to $i - 1$ without encountering a shorter rectangle in between.

Suppose that $\exists k' \in [j, i - 1] : H[k'] < H[j]$, then it must have caused $j$ to be popped off of $S$ prior
to $i$. However, this causes a contradiction as $j \in S$. Therefore, the claim holds and as a result, $l = i - 1$.

## Finding the leftmost index

### Case 1: $j - S'[-1] = 1$

If $j - S'[-1] = 1$, then $H[j] \geq H[S'[-1]]$ by monotonic stack. Thus, the $l = S'[-1] + 1$ as that implies that the
leftmost rectangle that is $H[l] \geq H[j]$ is $j$ itself.

### Case 2: $j - S'[-1] > 1$

If $j - S'[-1] > 1$, then what we want to show is that

$$
\forall k \in (S'[-1], j), H[k] \geq H[S[-1]] \land H[k] \geq H[j]
$$

To prove this, notice that $\forall k \in (S'[-1], j), \exists o \in (k, j) : H[o] < H[k]$ given that $k \not\in S'$.
Also notice that $H[o] \geq H[S'[-1]]$, otherwise, $S'[-1]$ would not be in $S'$. This proves the first part of the
claim where $H[k] \geq H[S[-1]]$ as $H[o]$ can be interchanged with $H[k]$.

Given that $o \not\in S'$ as well (otherwise $S'[-1] = o$), then $\forall o \in (k, j), H[o] \geq H[j]$, otherwise,
$o \in S'$ which is a contradiction. That means $H[j]$ would have caused the final $o$ to be popped from the stack.

Therefore, the claim is proven and we know that $l = S'[-1] + 1$ as the leftmost rectangle that is $H[l] \geq H[j]$ is
$H[S'[-1] + 1]$ given that $H[S'[-1]] \leq H[j]$ by monotonic stack.

### Case 3: $|S'| = 0$

If $|S'| = 0$. When this happens there is no leftmost rectangle, so we can set $l = 0$.

## Calculating $w$

Therefore, we have found both the rightmost index where $H[r] \geq H[j]$, $r = i - 1$ and the leftmost index where
$H[l] \geq H[j]$, $l = S'[-1] + 1$ or $l = 0$. The width of $L$ is therefore, $w = r - l + 1$.

If $|S'| > 0$, then $w = (i - 1) - (S'[-1] + 1) + 1 = i - S'[-1] - 1$.

If $|S'| = 0$, then $w = (i - 1) - 0 + 1 = i$.

# Implementation

When we implement the algorithm, we see that we naturally derive the ideal stack solution:

```python
def largestRectangleArea(self, heights: List[int]) -> int:
    stack = []
    heights.append(0)
    n = len(heights)
    ans = 0
    for i in range(n):
        while stack and heights[i] < heights[stack[-1]]:
            j = stack.pop()
            h = heights[j]
            w = i if not stack else (i - stack[-1] - 1)
            ans = max(ans, w * h)
        stack.append(i)
    return ans
```

# Conclusion

There you have it! The largest rectangle in histogram algorithm has now been formally proven and the magic numbers have
been answered! Of course, when working on these problems during an interview, it is not expected of you to derive these
proofs from scratch, but having such an intuition about monotonic stacks help a lot in reasoning with the magic values
that are used!


