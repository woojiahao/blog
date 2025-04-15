---
draft: false
title: The Great Migration
date: 2025-04-15
description: Migrating this blog from Hugo →  Astro
---

Over the past weekend, I have been working on migrating this blog (`https://blog.woojiahao.com`) from a [Hugo](https://gohugo.io/) blog using the [`hugo-tania`](https://github.com/WingLim/hugo-tania) theme to a custom Astro page.

Today, I have finally completed the migration, with 90% of the content migrated over successfully. I wanted to write this quick short to explain the rationale behind the migration.

As a quick blast from the past, my blog has gone through dozens of iterations, bouncing between templated blogs like Hugo and [Jekyll](https://jekyllrb.com/) to custom built blogs using frameworks like [Gatsby.js](https://www.gatsbyjs.com/). This migration will likely not be the last, but hopefully will be one that I am happy to stick with for a while.

The key motivators to migrate were because:

1. I want to really get back into deep technical writing and commentary (as I have with older posts like the [Open-source Deep Dive](/post/odd-broadway-1) series)
2. I had written several articles for other companies like AppSignal and BetterStack but did not have those linked to my old blog
3. I have several repositories of notes that I have written for computer science and software engineering, but they are all scattered around
4. I want to share my recommended readings/watches but the old Notion page I had just didn't cut it and I didn't feel motivated to keep it
5. I have been sharing my personal takes and advice on various topics in tech and internships, but they were not centralized anywhere

So these all culminated into wanting to build a more robust blogging platform for myself to house all of this into a single site.

> Why not extend the `hugo-tania` theme instead?

Very valid question, but I think that my personal experience with Hugo was that it is great if you want to use the template as it is, but extending it requires understanding the Hugo syntax and I don't think I want to invest time into doing that. I've also been working with Astro lately for [`git-mastery`](https://github.com/git-mastery/learning-lab) and found it really intuitive and fun to use (a lot better than Gatsby.js), so I decided to adopt Astro instead.

Stay tuned for more posts and updates on this blog!

_P.S. I have something about chaos engineering and Elixir in the works!_
