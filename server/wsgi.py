from flask import Flask
from flask import jsonify
from flask import request
import tweepy
import os

consumer_key = os.environ.get('CONSUMER_KEY','')
consumer_secret = os.environ.get('CONSUMER_SECRET','')
access_token =  os.environ.get('ACCESS_TOKEN','')
access_token_secret = os.environ.get('ACCESS_TOKEN_SECRET','')

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

account_list = (os.environ.get('CONTRIBUTORS', '')).split()

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




app = Flask(__name__)

@app.route('/')
def index():
    callback = request.args.get("callback", "callback")
    return '{0}({1})'.format(callback, tweets)
    
if __name__ == '__main__':
    app.run()