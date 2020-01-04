from flask import Flask
from flask import jsonify
from flask import request

from flask_sqlalchemy import SQLAlchemy
from flask_heroku import Heroku

import time
import json

import tweepy
import os

from geotextbig import GeoText 

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

account_list = (os.environ.get('CONTRIBUTORS', '')).split()
country_codes = (os.environ.get('COUNTRIES', '')).split()
tweet_limit = int(os.environ.get('LIMIT', ''))

Geo = GeoText()

class Dataentry(db.Model):
    __tablename__ = "twitter_cache"
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.Text())
    timestamp = db.Column(db.Integer)

    def __init__ (self, data):
        self.data = data
        self.timestamp = int(time.time())

# uncomment on first time run via heroku local
#db.create_all()

#def post_to_db(data):
#    indata = Dataentry(data)
#    try:
#        db.session.add(indata)
#        db.session.commit()
#    except Exception as e:
#        print("FAILED data entry")
#        print(e)
#    return "Data entry SUCCESS"

#post_to_db('Nothing here yet')

def updateCache(data):
    cache = db.session.query(Dataentry).first()
    cache.data = data
    cache.timestamp = int(time.time())
    db.session.commit()

def fetchTweets():

    tweets = []

    if len(account_list) > 0:
        for target in account_list:
            item = None
            try:
                item = api.get_user(target)
            except:
                print("Whoops! Something went wrong trying to get " + target + " skipping this user..")

            if item == None:
                continue

            for status in tweepy.Cursor(api.user_timeline, id=target, tweet_mode="extended").items(tweet_limit):


                id = status.id_str
                if status.is_quote_status:
                    try:
                        id = status.quoted_status_id_str
                    except:
                        id = status.id_str

                if hasattr(status, 'retweeted_status'):
                    place = status.retweeted_status._json['place'] or status._json['place'] or {}
                else: 
                    place = status._json['place'] or {}

                # "found" meaning the sytem found the place
                # "found" may be false, but there can still be a inherent "place" from twitter
                found_place = None
                place_is_found = 'False'

                if place == {}:

                    if hasattr(status, 'retweeted_status'):
                        found_place = Geo.find(status.retweeted_status.full_text, country_codes).best_city
                    else:
                        found_place = Geo.find(status.full_text, country_codes).best_city
                        
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

                Geo.clear()

        return sorted(tweets, key=lambda k: int(k['id']), reverse=True) 

    else:
        return []


@app.route('/')
def index(force_fresh=False, update_cache=True):

    callback = request.args.get("callback", "callback")
    demand = request.args.get("demand", "nothing")

    if demand == "fresh":
        force_fresh = True

    if demand == "dummy":
        force_fresh = True
        update_cache = False
    
    cache = db.session.query(Dataentry).first()

    if force_fresh or cache.timestamp < ( int(time.time()) - (15 * 60)):
        from_cache = False
        tweets = fetchTweets()
        if update_cache:
            updateCache(json.dumps(tweets))
    else:
        from_cache = True
        tweets = cache.data
            
    return '{0}({1}) /* from cache? {2}, demanding? {3}, with contributors: {4}*/'.format(callback, tweets, from_cache, demand, ', '.join(account_list))
    
if __name__ == '__main__':
    app.run()