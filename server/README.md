# Sphere of Influence Server
A Python backed REST API which provides the tweets which appear on the static front end maps.
This is currently hosted on Heroku.

## Caching
The server will provide cached data when a demand for `stale` is made & will provide hot data when 
`fresh` is demanded or the timestamp on the last cache is in excess of 15 minutes (when `nothing` is demanded).

Maps will always call for `stale` first so the user has tweets as soon as possible, they will then make 
a call for `nothing`, which will if the cache is old fetch new tweets and then provide those.

## Repo update-ness 
This repo may not always reflect the latest version of the Python app which is sat on Heroku, this may 
be the case because: 
  - Beta features are being tested. 
  - Protection of credentials, some details need to be hidden for safety.
  
## Deployment
The server is not deployed on GitHub Pages, it is for deployment somewhere that supports Python Flask apps 
(in this case, Heroku).

The server does not provide a front end, this is done elsewhere (in this case, GitHub Pages).
