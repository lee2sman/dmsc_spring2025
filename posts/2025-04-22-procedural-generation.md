---
title: Week 12 - Procedural Text Generation
---

* Markov
* 5 Card Nancy
* Generative text grammars
* Tracery
* Generative dungeons?

## Markov

<iframe width="560" height="315" src="https://www.youtube.com/embed/63HHmjlh794?si=-AhsJxE6q9bvhYYF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

> In the hands of metereologists, ecologists, computer scientists, financial engineers and other people who need to model big phenomena, Markov chains can get to be quite large and powerful. For example, the algorithm Google uses to determine the order of search results, called PageRank, is a type of Markov chain. --Victor Powell and Dr. Lewis Lehe, setosa.io

<iframe width="560" height="315" src="https://www.youtube.com/embed/sUjW5zlgeoQ?si=kpPn7Ff3K0O6fLP5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

*Note: take a look at the comments (don't make me regret this!) to see some complaints from people about the use of Markov text generation.*

> *Yeah, it is funny and all, but it totally ruins immersion. For some players it isn`t a big deal: some are playing for "intellectual challenge", some just having fun with procedural stuff, but lots of players care very much about overall consistency and atmosphere.. This feature would ruin game for them.*  

### RiTA library for working with Markov

[RiTa](https://rednoise.org/rita/) library in Javascript for natural language processing tools including Markov chain text generation. Works with p5.js.

* [RitaJS](https://creative-coding.decontextualize.com/intro-to-ritajs/) tutorial by Allison Parrish
* [Pon The Road](https://github.com/lee2sman/PonTheRoad-NaNoGenMo2016), a procedurally-generated iteration of On The Road via Markov Text, and an old project of mine

## 5 Card Nancy

> *A dadaist card game using panels from Ernie Bushmiller's 20th Century comic strip Nancy.--[Scott McCloud](https://www.scottmccloud.com/4-inventions/nancy/index.html)*

![image from Austin Kleon, original Nancy panels by Ernie Bushmiller](nancy.jpg)

[5 Card Nancy](https://web.archive.org/web/20120607063651/http://www.7415comics.com/nancy/index.shtml) from 741.5 Comics via the Wayback Machine 

## Generative Text 

Tracery is a generative grammar system / text replacement tool created by scholar Kate Compton. It is a javascript-based library where text expands with filled-in replacement words, and also includes affordances such as capitalization, a/an, and the like.

<iframe width="560" height="315" src="https://www.youtube.com/embed/isB82kORimk?si=cE9pMaXG0p3YZpCZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

* Simplest [tracery tutorial](https://tracery.io/archival/brightspiral/tracery/)
* Another [Tracery tutorial](https://tracery.io/archival/crystalcodepalace/tracerytut.html)

There is a bit of a bug when trying to integrate with p5.js and Tracery in the web editor as p5 delays the loading ofTracery. To counter this, we add a button to run our tracery generator. Alternatively, you can build in a delay to run tracery after p5 loads.

```html
<html lang="en">
<head>
 <title>My Tracery and p5.js project</title>
 
   <script src="p5.min.js">
   <!-- tracery requires jquery. i'm using jquery slim -->
   <script src="jquery.js"></script>
   <!-- import tracery -->
   <script src="tracery.min.js"></script>
   <meta charset="utf-8">
</head>
<body>
   <script src="script.js"></script>
</body>
</html>
```

starter code:

```javascript
//Lee Tusman 2025 CC BY NC SA

const ourText = {
  greeting: [
    "Hello!",
    "Top of the morning to ya!",
    "The best part of waking up is Folger's in your cup,",
  ],
  person: ["stranger", "sailor", "mom"],
  occurrence: ["talking to a #person#"],
  origin: [
    "#greeting# #person.capitalize#. I couldn't help but notice you #occurrence#.",
  ],
};
function setup(){
   noCanvas();
   btn = createButton("Generate");
   btn.mousePressed(gen);
}

function gen() {
  //starts up Tracery
  let grammar = tracery.createGrammar(ourText);
  //saves output as a string
  let s = grammar.flatten("#origin#");

  //create a paragraph
  let p = document.createElement('p');
  //add to page
  document.body.appendChild(p);
  //change text to our generated text
  p.innerHTML = s;
}
```

### Resources

* [Practical Low Effort Procedural Generation: Tracery and data oriented PCG authoring](https://www.youtube.com/watch?v=isB82kORimk) - Kate Compton, 31 minutes
* [Bots: A Definition and Some Historical Precedents](https://medium.com/datasociety-points/bots-a-definition-and-some-historical-threads-47738c8ab1ce) by Allison Parrish for Data & Society: Points
* [Generating Text with Tracery on a website](https://leetusman.com/nosebook/tracery) tutorial by Lee Tusman
* [Kate Compton's website](https://www.galaxykate.com/)
* [Markov by Candlelight](https://www.youtube.com/watch?v=zDTQM0Ipiz4) - Jason Grinblat - 27 minutes (Jason is a co-creator of Caves of Qud)


## Read

Ethical Procedural Generation - Mike Cook, from Procedural Generation in Game Design

Try Cook's [A Long Walk](https://illomens.itch.io/a-long-walk)

## Play a game that makes significant use of procedural generation


Recommendations:

[Reigns](https://www.reignsgame.com/reigns) - A free online or iOS/Android game. Flip through cards to make decisions and see how your games turns out playing as a king or queen of a rough middle ages empire.

Games from Michael Brough such as Zaga-88, 868-Hack or P1 Select - online at smestorp.com or on iOS, for download and on iOS. These small grid games are procedurally generated abstract puzzle games. Free or a few bucks.

[A Long Walk](https://illomens.itch.io/a-long-walk) - short experience, very simple but beautiful (i think), about walking past dedicated benches on a pier. Also see [other games by Cook](https://illomens.itch.io/).

[Dwarf Fortress](https://www.bay12games.com/dwarves/) - Both free and commercial versions available. Difficult to get started though new tutorials help. This is considered the largest procedurally generated worlds in any game, though has 'simple' 2d top down graphics.

Caves of Qud - a similar style of game. A generated world of mutants and broken technologies and the ruins of civilizations. 2d 'simple' top down graphics. 

Hades - commercial game, contemporary style procedurally generated RPG battles

Signs of the Sojourner - Commercial game but really cool procedurally generated magical realist story. Playing an alternate version of Dominos/matching game changes the story as the game progresses.
