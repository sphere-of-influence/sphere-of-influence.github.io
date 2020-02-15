Contributors Guide
~
There's no formal design system to Sphere of Influence, just some principals and conventions to follow. Here some guidance is given and some rules explained.
~

![](https://pbs.twimg.com/media/EQxUqcZUcAEKNbn?format=jpg&name=900x900)

There's no formal design system to Sphere of Influence, just some principals and conventions to follow. Here some guidance is given and some rules explained. Though this is not a formal document and more a collection of thoughts, it should be taken as the most current authoritative guide to contributing to the project.

## Content Centric 

Although the map is a core element of the project, it must play second fiddle to the content visually. 

In visual depth, the content must always feel a-top the map. This is acheived by providing a "in the clouds" sensation by subtly vignetting in white, any new elements should mimic this or adapt to the existing sensation.

If possible use slight transparency for any elements which overlay the map.

## Colours

Outside of content and the map there must only be Primary and greyscale (white to black), images accompanying articles are considered content and are not restricted in palette. On Sphere of Influence the Primary colour is Soviet Red `#CD0000`, from the flag of the USSR.

Though blue is not part of the palette it features heavily on the map, given the earth is thankfully very much ocean. This blue has not been filtered from the map intentionally (though changing a maps palette is a [common exercise](https://www.mapbox.com/gallery/)) so as to give a *feeling* of the RSFSR's flag of 1991–1993 without fully featuring it in the project.

## Beauty First

Sphere of Influence is an exercise in optmism and presents a view of the USSR through an intentionally rose-tinted lense, elements on the project must adhere to a level of beauty before going live, there are to be no rough edges which might disrupt this lense. 

**The following rules should be adhered to when developing features:**

- If it does not look beautiful or does not fit the feel of the project, iterate and improve until it does or start again. 
- Keep minimalist, keep elements lightweight feeling. Nothing is to feel heavy.
- Do not add colours not in the palette. If you cannot make it work without breaking this rule, start again or try harder.

## Icons

**The Star is to be used only in titles.** The Star is the de-facto logo of the project, it  must not be used in excess, this would risk diluting its impact. 

**The Star is not used on the map.** Typically a star denotes a capital city on a map, we are not mapping capital cities.

**The Flag is only to be used in relation to content.** Content is ever changing and temporary, aside from those planted on the moon, most flags are also only ever temporary. The flag is a second logo to the project, try not to use it to excess or outside the map's context. 

**Do not introduce or invent new icons.** If a graphical element is required, eg. a checkmark for *okay* then keep it minimal, use the current close icon as inspiration. **Do not use icons from FontAwesome or similar**, we've all seen enough of those for a lifetime.

## Copy

**Be authoritative but relaxed**, do not worry about being casual. Speak directly to the reader and do not shy from using terms like *we* and *our* when referring to the project. 

**Refer to Sphere of Influence as a project**  and not as an app, website or site.

 **Say *we* not *I***, even in cases of lone contribution use collective terms.

**Treat bots and alts as seperate persons.** For instance, if you are maintaining a bot account (eg. [@sovietarchitect](https://twitter.com/sovietarchitect)) this account must be referred to as a seperate person.

## New Features (technical implementation)

**Leave the core code alone**, any new features should be implemented using the existing plugin system. The [map file](/maps/sphere-of-influence.json) contains a `scripts: [ .. ]` slot in which to point towards plugins to run after map load. Assets for these plugins should be unique in name and placed within the `src/maps/scripts` directory. For example, `on-this-day` targets the entry point of `on-this-day.js`.

## Alternate Maps

There exists an ability to create alternate maps with differing focus, currently this feature remains dormant. Each [map file](/maps/sphere-of-influence.json) allows for some base settings but with plugins maps can be extended infinitely. 

If you have a serious suggestion for an alternate map contact details can be found on the [about page](/pages/about.html).