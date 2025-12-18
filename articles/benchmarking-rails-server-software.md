---
title: Benchmarking Rails Server Software
blurb:
  Diving in to some performance benchmarks between Apache + Passenger and Nginx
  + Puma.
imageUrl: /images/covers/benchmark.webp
publishedAt: 2015-03-27
status: Published
tags: Ruby on Rails
---

Apache vs Nginx. Passenger vs Unicorn vs Puma. I’ve personally been running
Apache with Passenger as I got a lot more of Apache experience then with Nginx
but when setting up the servers for a recent Rails project I was not really
happy about the number of requests I could serve.

The test site is running on Digital Ocean $10 servers which yield the following
specs

- 1GB Memory
- 1 CPU Core
- SSD Drives

I use one server for the database, one with Apache + Passenger and one with
Nginx + Puma. Then I used another server with some more power behind it to run
Apache Benchmark with a conccurency level between 10 and 500.

I bashed the servers with 200, 1000, 5000, 10000 requests to measure number of
request per seconds it could handle and the mean response time.

## Requests per second

![request per secod](https://i.imgur.com/Z6V8S1O.jpg)

## Mean response time

![Mean response time](https://i.imgur.com/Z6V8S1O.jpg)

So it seems when it comes to Passenger vs Puma it seems like Puma is the way to
go.
