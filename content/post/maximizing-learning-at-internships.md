---
status: publish
title: "Maximizing learning at internships"
date: "2024-12-17"
description: "Lessons from countless experiences about maximizing your learning at internships (and even full-time roles)!"
tags:
- reflection
- software engineering
- internships
---

"Congratulations! XYZ company would love to extend an offer to you for the summer! Please find the offer letter attached!"

The dopamine rush from finally seeing your efforts pay off is unbeatable! After going through countless rounds of interviews with recruiters, engineers, and hiring managers, you finally have a foot into XYZ!

However, as you start the internship, you quickly realize that getting in was step 0. The real battle starts here and now you are wondering how you are going to maximize your three-months as an intern. I will attempt to share the insights that I have gained throughout my internship experiences.

If you just want a TL;DR of the advice as bullet points, find them [here](#tips-at-a-glance).

# But first, why should you listen to me?

This is the part where I get to toot my horn a little to set the precedence on why I believe that my advice should matter to you. The advice I am about to share is the culmination of all of these experiences.

I have been very fortunate to have been…

1. Android Engineer @ MightyAim (Feb 2018 to Apr 2018) [**Tech**/*Startup*]
2. IT Intern @ DBS Bank (Apr 2019 to Aug 2019) [**Finance**/*Bank*]
3. Research Intern @ DSO National Laboratories (Jul 2020 to Sep 2020) [**Research**/*NLP*]
4. Backend Engineer @ NUS GDSC Project Sight Words (Aug 2022 to Aug 2023) [**Tech**/*Volunteer*]
5. Software Engineer Intern @ Betafi (May 2023 to Aug 2023) [**Tech**/*Startup*]
6. Site Reliability Engineer Intern @ Citadel (May 2024 to Aug 2024) [**Finance**/*Hedge Fund*]
7. Software Engineer Intern @ Palantir (Aug 2024 to Dec 2024) [**Tech**/*Big Tech*]

Today, I will focus on answering four fundamental questions I had when I started every internship:

1. How do I ask questions?
2. How do I navigate the complex codebases?
3. How do I understand the overall product easily?
4. How do I contribute to the projects?

# Asking questions

Just like raising your hand in class to ask a question, going to someone in a new environment to ask seemingly silly questions can feel like a daunting task. But as with anything new, the first step is always the hardest. These are some tips to help you figure out the best way to phrase and ask questions to maximize your takeaway.

## Compile questions

As you are reading through the codebase or using the product, keep a document/notebook/napkin of questions you have in mind and try connecting the dots as you go through the system(s). Cross out questions you figured out the answers for and highlight those that you need help with. This helps collect your thoughts and tracks important questions to ask, ensuring that you fully grasp the system.

## Research beforehand

Perform preliminary research as you compile your questions. Here is a hypothetical: would you rather have to explain a concept to someone who has no idea what is going on? Or would you rather have a discussion about the concept with this person who is actively clarifying their understanding with you? I am sure everyone would much rather do the second so do to others what you would have them do to you.

## Pay attention and ask follow-up questions

As someone is answering your questions, pay attention and think of any follow-up questions you might have. Try connecting the explanation to your understanding of the other systems and think about whether this new information supports or contradicts what you know already. Ask follow-up questions based on this and ensure that you leave the session with a better understanding than before.

## Just ask

Do not wait for the perfect opportunity to ask a question, it does not exist. It is not 3 hours later, it is not a day later. It is as soon as you realize that you are going nowhere with your own research and efforts. Once you have hit the brick wall, you should ask the people around you for help. If you do not know when you have hit the brick wall, a rule of thumb I have is that if I have made no concrete progress in 30 minutes, it is time to ask someone for help. Keeping your questions to yourself will only harm your learning.

# Navigating complex codebases

No matter where you go, there is a 90% chance you end up having to comb through a relatively complex codebase. As opposed to working on side projects or school work, you will rarely be creating new systems from scratch. So learning to navigate a complex codebase is a crucial skill to learn.

## Use search tools

Search tools like [SourceGraph](https://sourcegraph.com/) are amazing ways of searching across repositories. If your organization does not use SourceGraph, GitHub's built-in search functionality works well too. Even a simple `grep` command can be leveraged to navigate through the codebase quickly! Understanding these search tools can be key in getting the relevant code in front of you as soon as possible.

## Search and trace smartly

Knowing WHAT to search for is as important as having good search tool. For instance, if you are looking at a front-end project and want to make changes to a page, the fastest way to figure out what file the page belongs to is by looking up words on the page. For back-end projects, you may want to use tools like "Jump to implementation/references" to figure out what are the parent classes and definitions. There are many ways to search smartly and navigate a complex codebase, so the best way is to figure out what a good starting point is and going from there.

## Read other codebases

While it may seem like self-inflicted torture, getting good at navigating complex codebases is a learned skill and the best way to train that skill is to read other codebases. Whether it is other services within your organization or open-source projects, you can only get good at understanding code by reading code. One thing I did a few years ago was to analyse open-source Elixir projects, take detailed notes, and [write blog posts about them](https://blog.woojiahao.com/post/odd-broadway-1/).

## Understand underlying libraries and tools

It is very easy to treat underlying libraries and tools as blackboxes. However, this mental model of systems is usually unsustainable in the long term. So it is usually better to treat the underlying libraries as though they are part of your projects and delve deep when and where you can. This way, when you are faced with a random error thrown from a dependency, you will not be stuck staring at the stack trace. The same goes for the tools you are using, whether it's your IDE or logging tools like Grafana Loki or CI/CD tools. Knowing the tools you use well ensures that you do not get stuck the moment something in the background stops working.

## Organize teach back sessions

You have amassed all of this new knowledge, that's awesome! But are you sure that you have fully understood the systems? This is why teach back sessions are amazing, they give you the platform to share your knowledge with others. Yes, it is going to be scary presenting your potentially flawed ideas to the "experts" but remember: everyone is there to see you succeed, not to see you fail. Having these "experts" listening to your interpretation of the system can boost your confidence and if you are mistaken, you have access to immediate feedback and correction. It is a win-win! So put some time on your team's calendar and present your findings to them!

## Start with low-hanging issues

If your team labels their issues with `good first issue` (or something equivalent), focus on knocking those out first. Try to solve at least one a day (this is not a hard rule, just something that I try to achieve to ensure that I have a healthy pace of learning) and pick the ones that allow you to work across all the core platforms that your team manages. They might feel like menial tasks, but they are essential in wetting your feet and giving you confidence! If you are lost on where to start or if you are going in the right direction, ASK!

# Contributing to codebases

Now that you have understood how to navigate a complex codebase, the tricky part is actually contributing code to it! Try out these tips to maximize your contributions.

## Start small

Building on top of ["Start with low-hanging issues"](#start-with-low-hanging-issues), you should start with small issues and work your way up. Starting small also applies to the types of changes you are making. Focus on making small changes to one affected area at a time and moving to the next. In Palantir, we called it [decomping](https://www.palantir.com/careers/getting-hired/navigating-open-ended-questions/) a problem, so start by breaking down the problem into smaller parts and focus on solving them individually until you have managed to fix the problem or add the feature!

## Use existing PRs as reference

No, it is not cheating! You do not need to come up with the solutions all on your own and bang your head against the wall trying to work with a foreign system! A big benefit of working in a team and working on a developed codebase is having fallbacks and references in the form of other people's code! So leverage this advantage and use existing PRs as reference when writing your code! Not only will it help you get over the hurdle of "This task feels too big", it can also save you a ton of time re-inventing what others have thought of and done. Additionally, existing PRs set precedence on the best practices and structure of codebases and it is always best to follow (and sometimes question) these practices.

## Git blame excessively

While [Git blame](https://git-scm.com/docs/git-blame) can be used to, well, blame people for making changes that might have broken production, it can also be an invaluable tool when contributing to a codebase because you now can (nicely) approach the latest editor to figure out their rationale of things. There have been many times where the decisions for code felt confusing and I was itching to fix it, but through Git blame and speaking to the last editor, I was able to understand the rationale and (a) identify new issues, (b) learn something new, or (c) work with them to streamline the code.

## Review your own code

When you create your PRs, do not just create a giant essay for the PR description. Invest time into using the "Files" panel (or equivalent) to review your changes. Use GitHub's "Viewed" to methodically check off files you have reviewed yourself. Add comments about questions you had about the code, rationales behind the code you have written, follow-ups, descriptions, and more. Think about the code you have written and try to identify code smell that you may have introduced. Test your changes and try to break your feature. These help to criticalensure that you are producing the best possible code, giving clarity to actual reviewers, and ultimately, training you to critically analyze your own code effectively.

## Get frequent feedback

It is easy to feel like your changes should be perfect on the first go to avoid having back and forth with reviewers. But that is a very flawed way of viewing code reviews. Code reviews are built to review your code (seems silly to explain it but it is important to remind yourself from time to time). It gives you the opportunity to get other people's eyes on your changes to ensure that they are sensible. So, rather than spending time trying to create the perfect PR, create the PR, [review your own code](#review-your-own-code), and open the floodgates for comments. Iterate on the feedback quickly and ask questions about the comments. This allows you to work closer with your team and helps accelerate your pace of work!

# Understanding the overall product

Being a software engineer is not all about producing the most amount of code or reviewing the most number of PRs. It is also about understanding the product that your company is building and how your team and your work fits into the bigger picture. Knowing all of this helps you to think about the "What's next?".

## Treat the product like an end user

The easiest way to understand a product is to be a consumer. Approach it with skepticism and play around with the features that the product has. Come up with use cases and use the product to solve them. Use these opportunities to pinpoint flaws in the product and identify core pain points. This process is commonly known as "[Dogfooding](https://en.wikipedia.org/wiki/Eating_your_own_dog_food)" and it is crucial in giving you insight into how your end users approach your software. It is not easy pretending to be the end user if you know all of the quirks of your own system, but perhaps those quirks are signals into making use case paths clearer or improving some feature.

## Look for corner cases

While [dogfooding](#treat-the-product-like-an-end-user) or running your changes, always think about "What if I tried this?" and act on it. Look for corner cases in your feature and see if it has been built to handle these cases. Similar to dogfooding, this explicit chasing of corner cases will help in highlighting critical paths that may not have been accounted for and this gives you critical "What's next?" signals.

## Talk to teams who own features or services

The world is much bigger than your team and your impact within the team. Speak to teams of other features and services to understand how their features work. Ask about the decisions that have gone into shaping the software and think about how their work fits into the overall product that the company builds. These conversations are great ways to meet more people and understand more systems. They may also uncover potential collaboration between teams, where you discover that your work can be intersected with theirs to create even better user experiences.

# Conclusion

Securing internships are hard so do not let all of that effort go to waste by not learning as much as you can. You should be a sponge and use every opportunity to learn and grow as an engineer.

All the best with your internships!

# Tips at a glance

These are the tips at a glance:

1. Asking questions
    1. Compile questions
    2. Research beforehand
    3. Pay attention and ask follow-up questions
    4. Just ask
2. Navigating complex codebases
    1. Use search tools like SourceGraph
    2. Search and trace smartly
    3. Read other codebases
    4. Understand underlying libraries and tools
    5. Organize teach back sessions
    6. Start with low-hanging issues
3. Contributing to codebases
    1. Start small
    2. Use existing PRs as reference
    3. Git blame excessively
    4. Review your own code
    5. Get frequent feedback
4. Understanding the overall product
    1. Treat the product like an end user
    2. Look for corner cases
    3. Talk to teams who own features or services