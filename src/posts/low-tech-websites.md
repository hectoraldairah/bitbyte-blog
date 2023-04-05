---
title: Low-Tech websites and why you should have one.
date: 2023-01-04
description: Getting more for less
featured: true
tags: ['web-dev', 'thoughts', 'programming']
---

I've been a web developer for almost 7 years, I think is a very little time to express my ol wizzar knowledge about
making websites (just kidding) but as a web-developer and more important web-astronaut I surface for a lot of websites
every day. Some are very nice and some don't.

Why? I really asdasdas when I see a very basic website, like a recepies content focus, developer blog, micro-bloggin website but full
of **unncesesarry** stuff, and I don't mean the content itself. I mean all the content that the browsers downloads in order to see the website.

```javascript
function outerFunction() {
  let outerVariable = 'I am outside!';

  function innerFunction() {
    let innerVariable = 'I am inside!';

    console.log(outerVariable);
    console.log(innerVariable);
  }

  return innerFunction;
}

let closure = outerFunction();

closure(); // Logs "I am outside!" and "I am inside!"
```

> The best way to predict the future is to invent it." - Alan Kay
