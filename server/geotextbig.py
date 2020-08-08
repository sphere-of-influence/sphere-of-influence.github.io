# -*- coding: utf-8 -*-

from collections import namedtuple, Counter, OrderedDict
import re
import os
import io

_ROOT = os.path.abspath(os.path.dirname(__file__))

def get_data_path(path):
    return os.path.join(_ROOT, 'data', path)

def read_table(filename, usecols=[0,1], sep='\t', comment='#', encoding='utf-8', skip=0, dictify=False):

    colnames = ["geonameid","name","asciiname","alternatenames","latitude","longitude","feature class","feature code","country code","cc2","admin1 code","admin2 code","admin3 code","admin4 code","population","elevation","dem","timezone","modification date"]
    
    with io.open(filename, 'r', encoding=encoding) as f:
        # skip initial lines
        for _ in range(skip):
            next(f)

        # filter comment lines
        lines = (line for line in f if not line.startswith(comment))

        d = dict()
        for line in lines:
            columns = line.split(sep)
            key = columns[usecols[0]].lower()
            if dictify:
                value = dict()
                for col in usecols[1:]:
                    value[colnames[col]] = columns[col].rstrip('\n')
                    value[colnames[8]] = columns[8].rstrip('\n') # country code enforeced for filtering
                    value[colnames[14]] = columns[14].rstrip('\n') # population is enforced for overrides handling
            else:
                value = columns[usecols[1]].rstrip('\n')

            fresh = False
            if key not in d:
                d[key] = value
                fresh = True

            else:
                if int(d[key]['population']) < int(value['population']):
                    d[key] = value
                    fresh = True
            
            if fresh:
                alt_names = (columns[3].rstrip('\n')).split(',')
                for alt in alt_names:
                    if alt.lower() not in d:
                        d[alt.lower()] = d[key] # point to its originator




    return d


def build_index():

    # parse http://download.geonames.org/export/dump/countryInfo.txt
    countries = read_table(
        get_data_path('countryInfo.txt'), usecols=[4, 0], skip=1)

    # parse http://download.geonames.org/export/dump/cities15000.zip
    cities = read_table(get_data_path('cities5000.txt'), usecols=[1, 1, 8, 4, 5, 14], dictify=True)

    Index = namedtuple('Index', 'cities countries')
    return Index(cities, countries)


class GeoText(object):

    """Extract cities and countries from a text

    Examples
    --------

    >>> places = GeoText("London is a great city")
    >>> places.cities

    """

    index = build_index()

    def find(self, text, countries=None):
        city_regex = r"[A-ZÀ-Ú]+[a-zà-ú]+[ \-]?(?:d[a-u].)?(?:[A-ZÀ-Ú]+[a-zà-ú]+)*"
        candidates = re.findall(city_regex, text)
        # Removing white spaces from candidates
        candidates = [candidate.strip() for candidate in candidates]
        self.countries = [each for each in candidates
                          if each.lower() in self.index.countries]

        self.cities = [each for each in candidates
                       if each.lower() in self.index.cities
                       # country names are not considered cities
                       and each.lower() not in self.index.countries]

        self.cities = [self.index.cities[x.lower()] for x in self.cities]

        if countries is not None:
            self.cities = [city for city in self.cities if self.index.cities[city['name'].lower()]['country code'] in countries]

        self.best_city = None
        if len(self.cities) > 0:
            self.best_city = sorted(self.cities, key = lambda i: int(i['population']),reverse=True)[0]

        return self

    def clear(self):
        self.countries = []
        self.cities = []
        self.best_city = None
    

if __name__ == '__main__':
    print(GeoText('In a filing with the Hong Kong bourse, the Chinese cement producer said ...').countries)
