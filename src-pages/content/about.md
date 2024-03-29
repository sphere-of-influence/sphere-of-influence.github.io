About Sphere of Influence
~
Sphere of Influence is dedicated to tracking Soviet culture on Twitter. 
Contributors wanted! Currently in Beta!
~

Sharing the stories of Soviet Citizens and insights into daily life within the Soviet Union, Sphere of Influence aims to cast the USSR in a positive light and share its culture with a modern audience.

Sphere of Influence is built and maintained by volunteers in their spare time.
We are currently in Beta so things might be a little rough & ready.

Current editors are [@sovietarchitect](//twitter.com/sovietarchitect) and [Bogstandard](//github.com/bogstandard), with assistance of family and friends.

___

## Why the USSR?
The USSR presents a unique study, a vast state encompassing many nations in one of the most culture rich periods of history. It also no longer exists.
Twitter has many dedicated accounts regularly posting snapshots of daily life from within its borders, these provide a rich steady source of content for the project and because the USSR is (in terms of man's history) relatively recent the geography hasn't changed much beyond renamings (and a [lost sea](https://en.wikipedia.org/wiki/Aral_Sea)!). This makes for relatively accurate best-guess geotagging.

###### A Positive Outlook?
The project employs a self-aware air of positivity towards the USSR as a [stylistic choice](/pages/contributing.html), the focus is on life within a now vanished-state & not so much the broader history. 

Occasionally the *On This Day* feature will display the darker side of the USSR.

## Under the bonnet
Sphere of Influence pulls all its content from Twitter, the contributor accounts are listed on the main feed, these accounts post frequently, so there's almost always new tweets waiting for visitors.

With some clever word matching and educated guesses Sphere of Influence matches tweet content to the world map, currently we only focus on Ex-Soviet States (and Germany). 

Content is ephemeral, meaning only the latest tweets from contributors are displayed. For older content please refer to the individual contributor Twitter feeds.

## The Stack
Sphere of Influence uses GitHub Pages for hosting the front-end and Heroku for providing the back-end. Open Layers and Open Street Map provide the mapping interface technology. Chiefly written in JavaScript and Python. There's a little caching going on so we don't max out the Twitter API.

We're not using a framework on the front-end (eg. Vue, React) for a few reasons; 1) OpenLayers and Twitter are already overhead heavy. 2) This is an exercise in roll-your-own minimalism. 3) It's nice to have a break. For full technical details you can read the [source code on GitHub](//github.com/sphere-of-influence/).

Sphere of Influence is a lite rebuild of [Bogstandard](//github.com/bogstandard)'s [Atlaski Project](https://folio.brighton.ac.uk/user/eric-daddio/atlaski-stories-mapped) for the University of Brighton.

## Other Maps
We're also developing [Northpole](/#!home/northpole) to map content at the top of the world & provide a playground for the engine.

___

## Get in touch
Current editors are [@sovietarchitect](//twitter.com/sovietarchitect) and [Bogstandard](//github.com/bogstandard). If you'd like to join the team, help out or just curious please contact either of us.

If you are serious about contributing to the project please read the [Contributors Guide](/pages/contributing.html).


<form name="mail" class="row" action="mailto:ericspublicinbox@gmail.com">
    <input name="subject" type="text" placeholder="Subject" class="ten columns" />
    <input type="submit" value="Send" class="two columns" />
    <textarea name="body" class="twelve columns"></textarea>
</form>

___

## Issues, Inaccuracies or Concerns 
If you've concerns about the content on Sphere of Influence, please contact an editor. All concerns will be promptly addressed.

## License
Until a robust license can be found which forbids commercial use this code-base remains proprietary and not free for re-use. We're aware this sucks and hope to change the license in future. If you have a suggestion for an appropriate license please contact an editor or contributor.
