from flask import Flask
from flask import jsonify
from flask import request

from flask_sqlalchemy import SQLAlchemy
from flask_heroku import Heroku

import time
import json

import tweepy
import os

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

                tweets.append({
                    "id": id,
                    "date":  status._json['created_at'],
                    "place": status._json['place'] or {}
                })

        return tweets

    else:
        return []


@app.route('/')
def index():

    callback = request.args.get("callback", "callback")
    
    cache = db.session.query(Dataentry).first()

    if cache.timestamp < ( int(time.time()) - (15 * 60)):
        from_cache = False
        tweets = fetchTweets()
        updateCache(json.dumps(tweets))
    else:
        from_cache = True
        tweets = cache.data
        
    return '{0}({1}) /* from cache? {2} */'.format(callback, tweets, from_cache)
    
if __name__ == '__main__':
    app.run()