import os

from geotext import geotext # module
from geotext import GeoText # class

from newspaper import Article

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

def parse_article(url):
    
    article = Article(url)
    article.download()
    article.parse()
    text = article.text

    nuisance_strings = ["Media playback is unsupported on your device", "Media caption"]
    for cur_word in nuisance_strings:
        text = text.replace(cur_word, '')

    location = best_match_city(text)
    info = {
        "url" : url,
        "summary" : ((text[:280] + '..') if len(text) > 280 else text),
        "image" : article.top_image
    }
    info.update(location)


stock_coords_index()
print(best_match_city("Just testing this from London"))
parse_article("https://www.bbc.co.uk/news/world-australia-50879850")