---
status: publish
date: "2024-03-30"
title: "Preparing for Technical Interviews"
description: "Reflecting upon my summer 2024 internship hunt and my learning points from serious technical interviewing preparation!"
tags:
- Technical Interviews
- Internship
- Study
- Technique
- Leetcode
- Reflection
---

My friend, Devansh, recently wrote an article about
["Debunking Myths Regarding Tech Internship Applications"](https://medium.com/@devanshshah1309/debunking-myths-regarding-tech-internship-applications-c00c69213561)
, and I agree with many of his points. Proofreading his article gave me the opportunity to reflect on my own personal
journey through internship hunting and technical interviews in summer 2024 and I would love to share more about the
systems and techniques I had used to prepare for my technical interviews.

> **⚠️ DISCLAIMER ⚠️**
>
> I understand that the tech industry is very volatile at the moment and a lot of my "success" this
> internship cycle boils down to timing and luck along with a lot of preparations. I am incredibly thankful for the
> offers I have received and I will never know what combination of factors led to my ultimate success.
>
> If you are reading this and you have not had as much success so far, please do not stop trying. Keep pushing and you
> will definitely get an amazing offer :)

- [Who am I?](#who-am-i)
  - [My background](#my-background)
  - [First failures...](#first-failures)
  - [Formal exposure to data structures and algorithms](#formal-exposure-to-data-structures-and-algorithms)
  - [Turning point](#turning-point)
  - [Why am I writing this?](#why-am-i-writing-this)
- [Technical interviewing as a skill](#technical-interviewing-as-a-skill)
  - [Creating a good study plan](#creating-a-good-study-plan)
  - [Compiling useful notes](#compiling-useful-notes)
  - [Starting early](#starting-early)
  - [Interviewing with a passion](#interviewing-with-a-passion)
- [Conclusion](#conclusion)

# Who am I?

While you are reading this, you may be thinking to yourself, "Who is this person telling me about technical interviews?"
No worries, an introduction is in order. Of course, if you are just interested in the systems and techniques, you can
[jump to them here.](#technical-interviewing-as-a-skill)

## My background

I am Jiahao, a Computer Science undergraduate from the National University of Singapore. Before entering
university, I was studying Information Technology in Singapore Polytechnic.

I was also a complete "noob" at data structures and algorithms and technical interviews (my course in polytechnic never
taught us these subjects). As such, while I had built several projects in my own spare time and worked with various
teams, I was never well-versed in solving these data structure/algorithms problems and would struggle with even simple
LeetCode easy problems (no exaggeration, I would spend an eternity trying to solve
[Two Sum](https://leetcode.com/problems/two-sum/)).

## First failures...

My first true exposure to technical interviews was when I had started applying for internships when I first entered
university. I remember my very first online assessment (OA) was for the [Grab](https://www.grab.com/sg/) engineering
internship. Looking back, the questions really were super straightforward, yet I spent the entire one and a half hours
to solve them, and I had still answered them ALL wrongly 😱.

The rest of the application cycle played out similarly, having failed many of the OAs and even when I had passed to the
subsequent rounds, I would choke and fail at the live codings.

Thankfully, I still managed to secure a software engineering internship offer at [Betafi](https://betafi.co)
where I worked with Elixir + Phoenix to improve the platform (I am very grateful to my supervisor, Ethan, for reaching
out about this opportunity).

## Formal exposure to data structures and algorithms

The following semester, I took the mandatory [data structures and algorithms
course](https://nusmods.com/courses/CS2040S/data-structures-and-algorithms) that all CS undergraduates had to go
through. It was my first real brush with proper data structures and algorithms and it instilled in me the very
fundamentals of algorithmic thinking (thank you Prof Seth!). While I did not score amazingly (I got an A-), it gave me
the basic tools to start exploring algorithms on my own during the summer.

## Turning point

During the summer, I devised a study plan and techniques to help with my preparation for the next internship
cycle, committing myself to becoming good at technical interviews (on top of juggling my internship, summer projects,
and commitments with [NUS Hackers](https://www.nushackers.org/)).

As a result of the consistent effort, I was able to subsequently secure 4 offers (out of over 250+ applications),
receiving offers from companies like [Citadel](https://www.citadel.com/), [Palantir](https://www.palantir.com/),
[Google](https://www.google.com/), and [PayPal](https://www.paypal.com/sg/home) (all of which I am extremely thankful
for). While the following diagram is not 100% accurate, it hopefully gives you a rough idea on my overall success rate:

![Callback rate](post//technical-interview-systems/success-sankey.png)

## Why am I writing this?

While I am not claiming to be an absolute authority of technical interviews, I believe that my experiences, systems, and
techniques had proven to be successful and as such, I would love to share more about them in this article so that you
too can benefit and experience success in your own internship hunt! This article focuses on the "meta-discussion" of
studying for technical interviews and the state of technical interviews in general.

> If you are interested in my condensed notes for the various topics involved in technical interviews (data structures,
> algorithms, system design, behavioral, and resume writing), I have open-sourced my notes as a "Technical Interview
> Study Guide" that you can find here: <https://interviews.woojiahao.com>.

# Technical interviewing as a skill

I broadly classify every component of the SWE/SRE interviewing process as a technical interview, so it covers the
OA, initial phone screen, technical onsites, behaviorals, etc.

To me, technical interviewing is a skill. Much like how you would invest time and energy into getting good at games or
your studies, I believe technical interviewing deserves similar treatment. Similarly, much like gaming or studying,
there are fixed systems and techniques that you can use to streamline this process of improving.

I will talk about four key aspects of technical interview preparation that I briefly mentioned in my [Technical
Interview Study Guide](https://interviews.woojiahao.com):

1. [Creating a good study plan](#creating-a-good-study-plan)
2. [Compiling useful notes](#compiling-useful-notes)
3. [Starting early](#starting-early)
4. [Interviewing with a passion](#interviewing-with-a-passion)

## Creating a good study plan

> **TL;DR**
>
> Understand your weaknesses, create/use a study plan, and follow a reasonable timeline

Prior to creating a study plan, you should first identify your strengths and weaknesses. Before even thinking about the
questions I wanted to finish, I first sat down for about 30 minutes and thought hard about the topics that I found
particularly challenging from my data structure and algorithm course and noted them down. My list looked a little
something like...

1. Arrays
2. Linked lists
3. Dynamic programming
4. Greedy algorithms
5. Etc...

As you can see, there is no shame in admitting that you may not be good at what some may even consider as "basic"
topics (after all, you're doing this preparation for yourself).

Once you have established what you know and what you don't know, you can start thinking about a plan of attack (study
plan). A study plan comprises of two key ingredients: a fixed timeline and an exhaustive list of subjects to cover.

Luckily, [Yangshun](https://www.linkedin.com/in/yangshun/) had published a study plan on his [Tech Interview
Handbook](https://www.techinterviewhandbook.org/), where he provides a detailed list of questions per major topic of
technical interviews and a sample timeline to follow. So the first thing I did when I started was to first compile
his list of questions into a Google Sheets document with a slightly adjusted timeline. I used these questions as a
guideline on what to complete. I have since moved this study plan to my [Technical Interview Study
Guide](https://interviews.woojiahao.com/getting-started/study-plan), but this was what planning my study plan
looked like in Google Sheets:

![Study plan in Google Sheets](post//technical-interview-systems/study-plan.png)

The final secret sauce is to create and follow a reasonable study plan. For me, I used the number of questions and
familiarity with each topic as a gauge for how long I should spend on each topic. For instance, I felt more
comfortable with a topic like recursion so I allocated just a day for eight questions, but for dynamic programming, I
dedicated over five days for it (including the time to internalize and understand each solution).

You should also include the time it would take to revisit and revise topics. I usually try to revise topics about a week
after having finished their questions to ensure that I'm not forgetting the key concepts.

## Compiling useful notes

Once you have a study plan, you can start attempting the questions. Of course, having a systematic way of tackling
problems is quintessential for learning.

> **TL;DR**
>
> Focus on systematically capturing the intuition of problems and jotting down recurring/unique patterns in problems

I use [Notion](https://www.notion.so/) to store my notes for every LeetCode question I have attempted since starting
serious preparation. LeetCode has a built-in notetaking functionality and I know others who use tools like Google Sheets
to make such notes. The medium is secondary to the actual process of notetaking and internalizing the intuition of each
problem.

![Notion database for questions](post//technical-interview-systems/notion.png)

I recommend capturing the following "metadata" about each question:

- Concepts used
- Difficulty level (I follow LeetCode's grading system)
- Should you redo it? (I use this to gauge if I should redo a set of questions)
- Status of completion (for instance, did you give up? Did you solve it the first try?)
- Where the question came from

These metadata speed up the process of revision and let you revisit questions/topics that you found difficult in the
past.

After noting these metadata, I use a template for jotting down my notes per question. This template includes the
following:

- Intuition (base intuition for solving the problem written in your own words)
- Optimizations/notes (any notable optimizations/notes to make of this problem; if I gave up, I would often include the
  intuition for my failed attempt here)
- Alternatives (from the LeetCode "Solutions" tab where I try internalizing multiple ways of solving a problem)
- Remarks (any remarks about the problem)

For instance, this is what my note for [Range Sum in BST](https://leetcode.com/problems/range-sum-of-bst/):

![Note for Range Sum in BST](post//technical-interview-systems/sample-note.png)

When approaching a question, try to allocate a fixed time to solve it by before looking at the solution. This varies
per person. This allows you to stay on track with your timeline. However, do not just space out for the alloted time
because you know you will see the answers eventually. Try really hard to come up with the solution and implementing it
within the time. After seeing a solution, start by running through a few examples with the new algorithm, building a
strong intuition for it. Then, start jotting down your notes for the question. Take some time to also read any
alternative solutions as it allows you to learn more about different ways of approaching problems.

In addition to notes about questions, I also highly recommend notes about the topics. Much like how my [Technical
Interview Study Guide](https://interviews.woojiahao.com) includes information about the common patterns in each topic,
I highly recommend making your own notes for these topics (the content of the study guide comes from my own personal
notes!). While you can refer to online sources for these information, having a personalized set of notes is helpful
when it comes to linking concepts and revising! This was what my personal notes looked like:

![Concepts in Notion](post//technical-interview-systems/concepts.png)

## Starting early

All these preparations would be in vain if you only start in the middle of the internship cycle or if you start applying
late.

> **TL;DR**
>
> Start practicing as early as possible so that you are ready and able to apply to more roles

My personal timeline for summer 2024 was as such (taken from my [Technical Interview Study
Guide](https://interviews.woojiahao.com)):

1. Start of May 2023: sourcing for problems and figuring out my weaknesses when it comes to interviewing
2. May 2023 to mid June 2023: working on my fundamentals by completing questions by topic
3. Mid Jun 2023 to Jul 2023: working on other problems to expand my exposure and speed
4. Jul 2023 to Oct 2023: start applying for roles in Singapore, US, and UK
5. Aug 2023 to Mar 2024: started interviewing and received my offers

As you can see, as "kiasu" (Singaporean slang for "fear of losing") as it is to start the moment summer starts, it is
necessary if you're attempting to cover as much breadth and achieve as much depth as possible before the internship
applications open. Many large firms in the US opened while it was still the summer in Singapore and many large firms
in Singapore opened soon after the summer ended.

## Interviewing with a passion

It does not matter how much you prepare for the interview if you cannot convince your interviewers to want you on their
team.

> **TL;DR**
>
> Research every company in depth and understand their business, projects, and culture and find an alignment with them

Every interview with an engineer/manager/HR with the company is a two-way conversation. It is both a way for them to get
to know you as a candidate, but also for you to get to know about the company. However, in order for this conversation
to be effective and meaningful for both parties, you MUST do your due diligence in understanding more about the company.

A great example is learning about a company's open-source efforts and understanding these projects and talking to the
engineers about them! I find that finding these "talking points" about the company helped me to not only appear
interested in the company (because I was), but also helped me to ask meaningful questions about the company as my
curiosity would drive me to want to learn more.

However, this does not just apply to knowing more about the company. Being passionate about your past experiences like
past projects and internships also helps to show that you are someone who is invested. Be proactive in learning about
the industry you were in, the problems you were solving, the technical and non-technical challenges you faced, and how
you contributed to the team. These are all key things that help inform your perspective of these experiences and gives
the interviewer the sense that you CARE about the project beyond just being a "code monkey".

![Code monkey](post//technical-interview-systems/monkey-developer.gif)

# Conclusion

I have rambled for long enough.

If you were to take away just one thing from this, I hope it is this: technical interviews is a skill that takes time
and dedication to improve on. You cannot expect to be amazing at it without any practice, just as you would not expect
to be [Magnus Midtbø](https://www.youtube.com/@magmidt) when starting out climbing.

I hope that this article gives you both hope and guidance on how to navigate your technical interview preparation and I
hope that my [Technical Interview Study Guide](https://interviews.woojiahao.com) can become your study buddy throughout
your journey.

I am wishing you all the best and I am rooting for you! 🤩

P.S. If you have used my guide or just want to talk to someone about technical interview preparation, feel free to email
me at <woojiahao1234@gmail.com>!