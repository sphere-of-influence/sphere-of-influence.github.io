from flask import Flask
from flask import jsonify
from flask import request

from flask_sqlalchemy import SQLAlchemy
from flask_heroku import Heroku

import time
import json

import tweepy
import os

from geotext import geotext # module
from geotext import GeoText # class

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


coords_index = {}
def stock_coords_index():

    path = os.path.dirname(geotext.__file__) + "/data/cities15000.txt"
    lat = geotext.read_table(path, usecols=[1,4])
    lon = geotext.read_table(path, usecols=[1,5])

    for t, n in zip(lat, lon):
        lat[t] = float(lat[t])
        lon[n] = float(lon[n])
        coords_index[t] = [lat[t], lon[n]]

# implement the ignore list, recursive programming here..
def best_match_city(text, ignore=[]):

    fresh_cities = GeoText(text).cities
    cities = [x for x in fresh_cities if x not in ignore]

    if cities == []:
        top_hit = None
        latitude = None
        longitude = None

    else:
        top_hit = max(set(cities), key = cities.count)

        try:
            coords = coords_index[top_hit.lower()]
        except:
            ignore.append(top_hit)
            return best_match_city(text, ignore)
        
        latitude = coords_index[top_hit.lower()][0]
        longitude = coords_index[top_hit.lower()][1]

    return {
        "city": top_hit,
        "latitude": latitude,
        "longitude": longitude
    }

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

            for status in tweepy.Cursor(api.user_timeline, _id=item.id).items():

                if status.is_quote_status:
                    id = status.quoted_status_id_str
                else:
                    id = status.id_str

                if hasattr(status, 'retweeted_status'):
                    place = status.retweeted_status._json['place'] or status._json['place'] or {}
                else: 
                    place = status._json['place'] or {}

                found_place = None
                place_is_found = 'False'

                if place == {}:
                    found_place = best_match_city(status.text)
                    print(status.text, found_place)
                    if found_place != None and found_place["city"] != None:
                        place = found_place
                        place_is_found = 'True'

                if place != {}:
                    tweets.append({
                        "id": id,
                        "date":  status._json['created_at'],
                        "place": place,
                        "place_is_found": place_is_found
                    })

        return tweets

    else:
        return []


@app.route('/')
def index(force_fresh=False):

    stock_coords_index()

    callback = request.args.get("callback", "callback")
    
    cache = db.session.query(Dataentry).first()

    if force_fresh or cache.timestamp < ( int(time.time()) - (15 * 60)):
        from_cache = False
        tweets = fetchTweets()
        updateCache(json.dumps(tweets))
    else:
        from_cache = True
        tweets = cache.data
            
    return '{0}({1}) /* from cache? {2} */'.format(callback, tweets, from_cache)
    
if __name__ == '__main__':
    app.run()