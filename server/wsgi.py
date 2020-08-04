from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS, cross_origin

from flask_sqlalchemy import SQLAlchemy
from flask_heroku import Heroku

import time
import json

import tweepy
import os

from geotextbig import GeoText 

# for the arch bot
import requests
import random
from time import sleep

consumer_key = os.environ.get('CONSUMER_KEY','')
consumer_secret = os.environ.get('CONSUMER_SECRET','')
access_token =  os.environ.get('ACCESS_TOKEN','')
access_token_secret = os.environ.get('ACCESS_TOKEN_SECRET','')

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
heroku = Heroku(app)
db = SQLAlchemy(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

tweet_limit = int(os.environ.get('LIMIT', ''))
map_root_url = (os.environ.get('MAP_ROOT_URL', ''))
bot_trigger = (os.environ.get('BOT_TRIGGER', ''))

Geo = GeoText()

class Dataentry(db.Model):
    __tablename__ = "twitter_cache_slugs"
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.Text())
    timestamp = db.Column(db.Integer)
    slug = db.Column(db.String)

    def __init__ (self, data, slug):
        self.data = data
        self.timestamp = int(time.time())
        self.slug = slug

# uncomment on first time run via heroku local
#db.create_all()

def post_to_db(data, slug):
    indata = Dataentry(data, slug)
    try:
        db.session.add(indata)
        db.session.commit()
    except Exception as e:
        print("FAILED data entry")
        print(e)
    return indata

def update_cache(data, slug):

    cache = db.session.query(Dataentry).filter(Dataentry.slug==slug).first()
    if cache is None:
        cache = post_to_db('[]', slug)

    cache.data = data
    cache.timestamp = int(time.time())
    cache.slug = slug
    db.session.commit()

def fetch_tweets(handles, country_codes, extents=None):

    tweets = []
    ids = []

    if len(handles) > 0:
        for target in handles:
            item = None
            try:
                item = api.get_user(target)
            except:
                print("Whoops! Something went wrong trying to get " + target + " skipping this user..")

            if item == None:
                continue

            for status in tweepy.Cursor(api.user_timeline, id=target, tweet_mode="extended", exclude_replies=True).items(tweet_limit):

                id = status.id_str
                if status.is_quote_status:
                    try:
                        id = status.quoted_status_id_str
                    except:
                        pass
                
                if hasattr(status, 'retweeted_status'):
                    try:
                        id = status.retweeted_status.id_str
                    except:
                        pass

                if id in ids: 
                    continue

                if hasattr(status, 'retweeted_status'):
                    place = status.retweeted_status._json['place'] or status._json['place'] or {}
                else: 
                    place = status._json['place'] or {}

                # "found" meaning the sytem found the place
                # "found" may be false, but there can still be a inherent "place" from twitter
                found_place = None
                place_is_found = 'False'
                
                if place != {} and extents is not None and extents:
                    for extent in extents:
                        xs = [ i[0] for i in place['bounding_box']['coordinates'][0] ]
                        ys = [ i[1] for i in place['bounding_box']['coordinates'][0] ]
                        cx = (min(xs) + max(xs)) / 2
                        cy = (min(ys) + max(ys)) / 2
                        place['latitude'] = cx
                        place['longitude'] = cy
                        if not ((('min_latitude' in extent and float(place['latitude']) >= extent['min_latitude']) or 'min_latitude' not in extent)\
                            and (('max_latitude' in extent and float(place['latitude']) <= extent['max_latitude']) or 'max_latitude' not in extent)\
                            and (('min_longitude' in extent and float(place['longitude']) >= extent['min_longitude']) or 'min_longitude' not in extent)\
                            and (('max_longitude' in extent and float(place['longitude']) <= extent['max_longitude']) or 'max_longitude' not in extent)):
                            place = {}

                if place == {}:

                    if hasattr(status, 'retweeted_status'):
                        found_place = Geo.find(status.retweeted_status.full_text, country_codes, extents).best_city
                    else:
                        found_place = Geo.find(status.full_text, country_codes, extents).best_city
                        
                    if found_place != None and found_place["name"] != None:
                        place = found_place
                        place_is_found = 'True'

                if place != {}:

                    tweets.append({
                        "id": id,
                        "date":  status._json['created_at'],
                        "place": place,
                        "place_is_found": place_is_found,
                        "text": status.full_text
                    })

                    ids.append(id)

                Geo.clear()
                place = {}

        return sorted(tweets, key=lambda k: int(k['id']), reverse=True) 

    else:
        return []


@app.route('/', methods = ['GET'])
def ghosts():
    return 'Nothing here but us ghosts.'

@app.route('/', methods = ['POST'])
@cross_origin()
def index(force_fresh=False, update_the_cache=True, from_cache=False):

    slug = request.json['slug']

    demand = request.args.get("demand", "nothing")

    if demand == "stale":
        from_cache = True
        update_the_cache = False

    if demand == "fresh":
        force_fresh = True
        update_the_cache = True

    if demand == "dummy":
        force_fresh = True
        update_the_cache = False
    
    tweets = []

    cache = db.session.query(Dataentry).filter(Dataentry.slug==slug).first()
    if cache is None:
        cache = post_to_db('[]', slug)

    if force_fresh or (from_cache == False and cache.timestamp < ( int(time.time()) - (15 * 60)) ):
        from_cache = False
        tweets = fetch_tweets(request.json['handles'], request.json['country_codes'], request.json.get('fetch_extents'))
        if update_the_cache:
            update_cache(json.dumps(tweets), slug)
    else:
        from_cache = True

        tweets = json.loads(cache.data)

    out = {
        "slug": slug,
        "tweets": tweets,
        "map": request.json,
        "from_cache": from_cache,
        "force_fresh": force_fresh,
        "demand": demand
    }
    
    return out



'''

    Arch bot code
    This is not required for sphere'

'''
@app.route('/' + bot_trigger)
def arch_bot_tweet():

    def random_line(afile):
        with open(afile) as f:
            lines = f.readlines()
            return random.choice(lines)

    def tweet_image(url, message):
        filename = 'temp.jpg'
        request = requests.get(url, stream=True)
        if request.status_code == 200:
            with open(filename, 'wb') as image:
                for chunk in request:
                    image.write(chunk)

            api.update_with_media(filename, status=message)
            os.remove(filename)
            return True
        else:
            return False

    sent = False
    while sent != True:
        line = (random_line('./arch-bot/src.csv')).split()
        url = line[:1][0]
        message = ' '.join(line[1:])
        message = (message[:275] + '..') if len(message) > 275 else message
        sent = tweet_image(url, message)

    return 'Tweet Sent: ' + url + ' ' + message


if __name__ == '__main__':
    app.run()