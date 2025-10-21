---
Topic: HTML
type: blog
Language: english
title: 'Esoteric HTML tags'
description: "I bet you don't know these guys"
date: 2025-10-21
tags: ['HTML']
---

Some time ago, while i was searching for how to use the `<details>` tag, I found website called [justfuckingusehtml](https://justfuckingusehtml.com/). It's a really good reminder that you can do many things natively with HTML elements that people (myself included) usually handle with other tools or frameworks.

I was surprised by how many HTML tags exists that I didn't even know about. Even though I work as a front-end dev, I barely use them at work.

I just hit _Inspect element_ to see all the tags and how they work.
I saw the _classic_ ones `<em>`, `<b>`, `<summmary>`, the surprisingly good `<dialog>` and a lot of options for the input tag. But after reading the whole article, I wasn't satisfied I knew that if I there were so many HTML elements I didn't know, there must be even more out there I still don't know about.

So there is a list of some obscure HTML elements that I think are really awesome.

### Ruby

I had NEVER heard of something like this. Maybe because I'm not on the
right side of the world.

The `<ruby>` and `<rt>` tag create a small annotations for a main text. They're usually used for explaining
pronunciation or the meaning of certain characters like, Japanese Kanji.

  <p>
    <ruby>
      漢 <rt>kan</rt>
      字 <rt>ji</rt>
    </ruby>
  </p>

<details>
  <summary>See the code</summary>

```html
<ruby> 漢 <rt>kan</rt> 字 <rt>ji</rt> </ruby>
```

</details>

Of course, you can use the `<ruby>` with any character, not only the Asian ones:

  <ruby>
    résumé <rt>reh-zoo-may</rt>
  </ruby>

  <br>
<details>
  <summary>See the code</summary>

```html
<ruby>résumé <rt>reh-zoo-may</rt></ruby>
```

</details>

I think looks cool and it's also very helpful if you want to explain one concept more clearly.

[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ruby).

### KBD

The `<kbd>` tag represents the keyboard input, simple as that. It's typically represented with
the browser default's monospace font.

<p>
  Please press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> to start start a new game
</p>

<p>
  Move your character using <kbd>h</kbd> <kbd>j</kbd> <kbd>k</kbd> <kbd>l</kbd> keys
</p>

<details>
  <summary>See the code</summary>

```html
<p>
  Please press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> to start a new
  game
</p>

<p>
  Move your character using <kbd>h</kbd> <kbd>j</kbd> <kbd>k</kbd>
  <kbd>l</kbd> keys
</p>
```

</details>

That looks way better than just writing the keys directly on the HTML. And remember,
it's a simple HTML tag, so you can use CSS for making look however you want.

[MDN Reference](https://developer.mozilla.org/es/docs/Web/HTML/Reference/Elements/kbd)

### Mark

Do you remember those days on the school? I was in love with using markers for my notes.
I don't know what I liked the most, was it the color or was it the aroma? ┐(´∀ ｀)┌

The good news is that you can make something like that on HTML using the `<mark>` tag. Commonly used
for making highlight of something important or relevant content.

<p>The most important finding was that <mark>90% of users preferred the new design</mark> over the old one.</p>
<details>
<summary>see the code </summary>

```html
<p>
  The most important finding was that
  <mark>90% of users preferred the new design</mark> over the old one.
</p>
```

</details>

So, don't let your readers lost any important information and use it.

[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/mark)

### Map

This is the hidden gem from the list. If your website uses this, you're without a doubt a cool person.
Have you ever wanted to create a visual representation of links? Maybe literally making an image
where you can click on different areas, and each one redirects you to a different place?

Well, you can do it with the `<map>` element, and the good news is that it has full browser support.

Let's see this example i grabbed from [w3schools](https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_areamap).

This is a simple img tag, but you can click on certain elements inside. Try to click on the computer, phone or the cup of coffee.

<img src="/assets/images/workplace.jpg" alt="Workplace" usemap="#workmap" style="max-width: 400px; height: auto;">

<map name="workmap">
  <area shape="rect" coords="34,44,270,350" alt="Computer" onclick="alert('Computer'); return false;" style="cursor: pointer;">
  <area shape="rect" coords="290,172,333,250" alt="Phone" onclick="alert('Phone'); return false;" style="cursor: pointer;">
  <area shape="circle" coords="337,300,44" alt="Cup of coffee" onclick="alert('Coffee'); return false;" style="cursor: pointer;">
</map>

  <br>

Do you see it? It feels like MS Encarta from the 2000s! I personally love it.
The best part is that you can use images or SVGs! And instead of triggering something boring like an alert, you can redirect to another page, show a hidden HTML element, or trigger any event you like.

<details>
  <summary>See the code</summary>

```html
<img src="/assets/images/workplace.jpg" alt="Workplace" usemap="#workmap" />

<map name="workmap">
  <area
    shape="rect"
    coords="34,44,270,350"
    alt="Computer"
    onclick="alert('Computer'); return false;"
    style="cursor: pointer;"
  />
  <area
    shape="rect"
    coords="290,172,333,250"
    alt="Phone"
    onclick="alert('Phone'); return false;"
    style="cursor: pointer;"
  />
  <area
    shape="circle"
    coords="337,300,44"
    alt="Cup of coffee"
    onclick="alert('Coffee'); return false;"
    style="cursor: pointer;"
  />
</map>
```

</details>

The `<map>` element defines clickable areas on an image. Each `<area>` tag inside specifies a region with coordinates, a link, and accessibility attributes. You can use different shapes: `rect` (rectangle), `circle`, or `poly` (polygon) for more complex regions.

[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map)

### Final thoughts

HTML is a powerful tool (no wonder why is the foundation of the web) that gives you many options for doing common and _not so common_ things! You don't need a new framework or even JavaScript for a lot of stuff.
Let’s make our sites leaner and take full advantage of the tools the web already provides.
