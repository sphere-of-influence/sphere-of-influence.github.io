Operating Guide
~
Sphere of Influence is dedicated to tracking lefty news on Twitter with a focus on the United Kingdom. 
Contributors wanted! Currently in Beta!
~

*This guide chiefly focuses on operating procedure*. For the meat of the technical details you can read the [source code on GitHub](https://github.com/sphere-of-influence/sphere-of-influence).

## Contributing 

Once you've become a contributor your tweets will appear in the feed on Sphere'. If you're worried about all your new tweets appearing consider using a separate dedicated account for Sphere' instead.

### Location Tagging

Sphere' uses Twitter's location features to grab where things are, you'll need to active this in your Twitter profile settings.

Once active you'll be able to set locations on your tweets, sometimes some locations won't be there, so go for the next best location if this happens. 

If you don't attach a location Sphere' won't assign it to the map but will still list it.

### Location Tagging Retweets

*Location tagging is only available on Twitter's mobile apps, you will need to use these to be a contributor.*

Twitter only allows location tagging on original tweets or quote tweets, *not* basic retweets.

To workaround this limitation Sphere' will list a quoted tweet instead of a wrapping quote tweet, but will use the location of the wrapping quote tweet.

In other words, if you want to retweet John Smith's tweet but set the location as London you should quote tweet John, then set a location on your quote tweet with some tweet text (can be anything), then send. Sphere' will pick this up, display John's tweet but with the location you set. Your tweet text will not be visible, because it will be John's tweet being shown.

### Working with an Alt Account

If you're using a secondary account to contribute, its easy to switch between accounts on the Twitter's mobile apps, just tap your profile picture in the tweet compose view, or in the timeline view hold down the home icon.

## Administration & Other Content

It's not all tweets, there can also be long-form materials for editorials, or pages like this.

### Page Articles

If you're the technical maintainer or writing page articles (like this one) you'll need Push permissions to the Git repository.

Articles are written in Markdown and stored within the `src-pages/content/` directory, with the filename as the slug, the contents in the format:

    title
    ~
    description
    ~
    markdown here on..

Once written, build the pages using the command `npm run build-pages`. 

### Previewing Content

Serve the `public/` directory as a http server locally to preview changes. The npm package `http-server` is recommended, but its up to you what you use - it'll only be static content you're serving.

### Publishing Content

To publish changes you'll need Push permissions to the Git repository. 

Running the command `npm run publish` will copy the current `public/` contents to the places they need to be to work with GitHub pages.

Follow this with `git add . && git commit -m "Updated Content" && git push origin master`

Changes will now be live.