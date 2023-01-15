import time
import json

import tweepy
import os

from geotextbig import GeoText 

# twitter stuff
consumer_key = os.environ.get('CONSUMER_KEY','')
consumer_secret = os.environ.get('CONSUMER_SECRET','')
access_token =  os.environ.get('ACCESS_TOKEN','')
access_token_secret = os.environ.get('ACCESS_TOKEN_SECRET','')

# authing twitter
auth = tweepy.OAuth1UserHandler(
    consumer_key, consumer_secret, access_token, access_token_secret
)

api = tweepy.API(auth)

# If the authentication was successful, this should print the
# screen name / username of the account
print('Operating as @' + api.verify_credentials().screen_name)

tweet_limit = int(os.environ.get('LIMIT', 100))

Geo = GeoText()

def fetch_tweets(handles, country_codes, extents=None):

    tweets = []
    ids = []

    if len(handles) > 0:
        for target in handles:
            item = None
            try:
                print(target)
                item = api.get_user(screen_name=target)
            except Exception as e: 
                print(e)
                print('Whoops! Something went wrong trying to get ' + target + ' skipping this user..')

            if item == None:
                continue

            for status in tweepy.Cursor(api.user_timeline, user_id=target, tweet_mode='extended', exclude_replies=True).items(tweet_limit):

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

                # 'found' meaning the sytem found the place
                # 'found' may be false, but there can still be a inherent 'place' from twitter
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
                        
                    if found_place != None and found_place['name'] != None:
                        place = found_place
                        place_is_found = 'True'

                if place != {}:

                    tweets.append({
                        'id': id,
                        'date':  status._json['created_at'],
                        'place': place,
                        'place_is_found': place_is_found,
                        'text': status.full_text
                    })

                    ids.append(id)

                Geo.clear()
                place = {}
            
        return sorted(tweets, key=lambda k: int(k['id']), reverse=True) 

    else:
        return []

def index():
    for file in os.listdir('../src/maps'):
        if file.endswith('.json') and file != 'index.json':
            slug = file[:-5]

            with open('../src/maps/' + slug + '.json' ) as map_json_file:
                map_json = json.load(map_json_file)
                print(map_json)

                tweets = fetch_tweets(map_json['handles'], map_json['country_codes'], map_json.get('fetch_extents'))

                out_json = {
                    'slug': slug,
                    'tweets': tweets,
                    'map': map_json
                }
                
                with open('../src/maps/tweets/' + slug + '.json', 'w', encoding='utf-8') as f:
                    json.dump(out_json, f, ensure_ascii=False, indent=4)


if __name__ == '__main__':
    index()