About Sphere of Influence
~
Sphere of Influence is dedicated to tracking Soviet culture on Twitter. 
Contributors wanted! Currently in Beta!
~

Sphere of Influence is dedicated to tracking Soviet culture on Twitter. We are currently in Beta so things might be a little rough & ready.

Current editors are [@sovietarchitect](//twitter.com/sovietarchitect) and [@OldNewStandard](//twitter.com/OldNewStandard). If you'd like to join the team please contact either of us. Tweets not from editor accounts will also appear if they are of particular interest.

## How does this work?

Sphere of Influence pulls its content from Twitter, the contributor accounts are listed on the main feed.

Content is ephemeral, meaning only the latest stories from contributors are displayed. For  a partial slice of archived content please refer to the individual contributor Twitter feeds.

We use GitHub Pages for hosting the front-end and Heroku for providing the back-end. Open Layers and Open Street Map provide the mapping interface technology. Chiefly written in JavaScript and Python. There's a little caching going on so we don't max out the Twitter API.

For technical details you can read the [source code on GitHub](https://github.com/sphere-of-influence/sphere-of-influence).

___

## Get in touch

Current editors are [@sovietarchitect](//twitter.com/sovietarchitect) and [@OldNewStandard](//twitter.com/OldNewStandard). If you'd like to join the team please contact either of us. Tweets not from editor accounts will also appear if they are of particular interest.

<script>
function makeMail() {
    window.location = 'mailto:ericspublicinbox@gmail.com?subject='+document.mail.subject.value.replace(/ /g, '%20')+'&body='+document.mail.body.value.replace(/ /g, '%20');
    return false;
}
</script>
<form name="mail" class="row" onsubmit="return makeMail()">
    <input name="subject" type="text" placeholder="Subject" class="ten columns" />
    <input type="submit" value="Send" class="two columns" />
    <textarea name="body" class="twelve columns"></textarea>
</form>

___

## Issues, Inaccuracies or Concerns 
If you've concerns about the content on Sphere of Influence, please contact an editor. All concerns will be promptly addressed.

## Previous Works

Sphere of Influence is a super-light rebuild of a concept originally realised by [@OldNewStandard](//twitter.com/OldNewStandard) with his [Atlaski Project](https://folio.brighton.ac.uk/user/eric-daddio/atlaski-stories-mapped) for the University of Brighton.

## License

Until a robust license can be found which forbids commercial use this code-base remains proprietary and not free for re-use. We're aware this sucks and hope to change the license in future. If you have a suggestion for an appropriate license please contact an editor or contributor.
