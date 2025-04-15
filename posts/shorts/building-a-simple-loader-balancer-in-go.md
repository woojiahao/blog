---
draft: false
title: Building a simple load balancer in Go
recommendation: building-a-simple-loader-balancer-in-go
date: 2019-10-08
---

Load balancers are a quintessential tool in backend development. The power to distribute network requests among a fleet of machines to help prevent fires in a data center is crucial in ensuring the survival of our applications. However, as much as it is used in development, it is also a mystery to most developers. And it is understandable why. With the existence of cloud platforms like AWS introducing tools like Elastic Load Balancer, the barrier for entry to integrating load balancers into one’s application has been simplified by magnitudes.

The article takes a step back and teaches readers how they can implement their own load balancers with Go. Explaining the commonly used principles for routing requests among connected machines and how requests are forwarded from one machine to another.
