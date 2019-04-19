# Copyright Google Inc. 2018
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
import sys
import time
from google.cloud import pubsub
from faker import Faker
from faker.providers.lorem.en_US import Provider as LoremProvider
from ratelimit import rate_limited
#import json
#import tweepy
#import yweather
#import numpy as np
#import pandas as pd
#from textblob import TextBlob


if len(sys.argv) != 4:
    print("""Error: Incorrect number of parameters.

    Usage: python tweet-generator.py <project> <time> <rate>

        - project: ID of your GCP project
        - time: total execution time, in minutes
        - rate: number of tweets generated per minute
""")
    sys.exit()


PROJECT = sys.argv[1]
TOTAL_TIME = int(sys.argv[2])  # in minutes
RATE = int(sys.argv[3])  # in tweets per minute

ONE_MINUTE = 60
TOPIC_NAME = 'tweets'
TWEET_MAX_LENGTH = 140
HASHTAG_MIN_LENGTH = 5
HASHTAG_MAX_LENGTH = 15
HASHTAGS = [
    word for word in LoremProvider.word_list
    if len(word) > HASHTAG_MIN_LENGTH and len(word) <= HASHTAG_MAX_LENGTH
]

publisher = pubsub.PublisherClient()
topic_url = 'projects/{project_id}/topics/{topic}'.format(
    project_id=PROJECT,
    topic=TOPIC_NAME,
)
num_tweets = 0

"""
@rate_limited(RATE, ONE_MINUTE)
def generate_tweet():
    
    woeIds = [23424739, 23424742, 23424740, 23424744, 23424745, 23424747, 23424743, 23424748, 23424750, 23424741, 23424758, 23424759, 23424765, 23424757, 23424760, 23424764, 23424770, 23424762, 23424755, 23424768, 23424773, 23424771, 23424978, 23424774, 23424776, 23424785, 23424775, 23424794, 837054, 23424782, 23424971, 23424787, 23424779, 879050, 23424843, 23424793, 26812346, 23424796, 2345158, 23424798, 23424801, 23424802, 23424807, 23424805, 23424808, 23424813, 23424812, 23424819, 1329894, 1259029, 2347569, 23424829, 23424824, 23424833, 2414369, 83123, 23424835, 23424836, 23424839, 23424841, 2165352, 23424844, 23424845, 23424848, 23424846, 23424851, 2124082, 23424803, 23424847, 23424852, 23424853, 23424858, 23424856, 92155971, 23424860, 23424871, 23424863, 1940631, 23424874, 2437673, 23424880, 23424876, 23424882, 23424875, 979721, 2443718, 23424883, 23424889, 23424901, 23424891, 23424896, 23424894, 23424900, 23424885, 23424887, 20069817, 23424893, 23424902, 23424987, 23424911, 23424909, 23424903, 23424916, 23424915, 23424906, 23424908, 29145317, 23424898, 23424922, 28289408, 159386, 12491802, 23424917, 23424919, 23424934, 23424923, 23424925, 23424935, 28395013, 23424933, 23424992, 29125356, 23424943, 20069818, 1062844, 23424877, 23424945, 24865670, 23424950, 12467072, 905958, 23424913, 23424993, 23424954, 23424957, 23424956, 23424971, 23424961, 23424973, 23424960, 1048627, 23424958, 23424967, 23424969, 23424972, 1301134, 23424976, 23424738, 23424975, 23424977, 23424979, 23424980, 23424982, 23424984, 23425002, 23425003, 23425004, 23424936]
    countries = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bangladesh', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Denmark', 'Djibouti', 'Dominica', 'Ecuador', 'Egypt', 'El Salvador', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Greenland', 'Guatemala', 'Guinea', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Mali', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Romania', 'Samoa', 'Saudi Arabia', 'Senegal', 'Serbia', 'Sierra Leone', 'Slovakia', 'Slovenia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe', 'Russia']
    
    trendingHashTags = []
    
    for woeId,country in zip(woeIds,countries):
        try:
            trends = api.trends_place(woeId)[0]['trends']

            for trend in trends:
                if trend['tweet_volume'] is None:
                    trend['tweet_volume'] = 0

            trends = sorted(trends, key = lambda i: i['tweet_volume'],reverse=True)

            sentimentscore = 0
            tempDict = {}
            tempDict["country"] = country
            totalTrendingTweets = 0
            count = 1
            for trend in trends:
                if count <= 10:

                    trend["name"] = trend["name"].replace('"', '')
                    trend["name"] = trend["name"].replace("'", '')

                    if trend["name"][0] != "#":
                        tempDict["hashtag"+ str(count)] = "#" + trend["name"]

                    else:
                        tempDict["hashtag" + str(count)] = trend["name"]

                    totalTrendingTweets += trend['tweet_volume']

                    public_tweets = api.search(q=str(trend["name"]), count=10)
                    for tweet in public_tweets:
                        analysis = TextBlob(tweet.text)
                        sentimentscore += analysis.sentiment[0]
                    if sentimentscore > 0:
                        tempDict["hashtag"+ str(count)+"sentiment"] = "Positive"
                    elif sentimentscore < 0:
                        tempDict["hashtag"+ str(count)+"sentiment"] = "Negative"
                    else:
                        tempDict["hashtag"+ str(count)+"sentiment"] = "Neutral"

                    count += 1
                    sentimentscore = 0
                else:
                    break

            tempDict["total"] = totalTrendingTweets
            trendingHashTags.append(tempDict)

        except:
            tempDict = {"country": country, "hashtag1": "content blocked", "hashtag1sentiment": "NA", "hashtag2": "content blocked", "hashtag2sentiment": "NA", "hashtag3": "content blocked", "hashtag3sentiment": "NA", "hashtag4": "content blocked", "hashtag4sentiment": "NA", "hashtag5": "content blocked", "hashtag5sentiment": "NA", "hashtag6": "content blocked", "hashtag6sentiment": "NA", "hashtag7": "content blocked", "hashtag7sentiment": "NA", "hashtag8": "content blocked", "hashtag8sentiment": "NA", "hashtag9": "content blocked", "hashtag9sentiment": "NA", "hashtag10": "content blocked", "hashtag10sentiment": "NA","total": 0}
            trendingHashTags.append(tempDict)
            continue


    trendingHashTags_json = json.dumps(trendingHashTags)
    trendingHashTags_json = trendingHashTags_json.replace("'", '"')
    with open('../http_function/src/data/population.json', 'w') as outfile:
    json.dump(trendingHashTags_json, outfile)

"""
@rate_limited(RATE, ONE_MINUTE)
def generate_tweet():
    """
    Generates a single random tweet.
    """
    global num_tweets
    fake = Faker()
    hashtag = fake.random_element(HASHTAGS)
    tweet = fake.text(max_nb_chars=TWEET_MAX_LENGTH-HASHTAG_MAX_LENGTH)
    words = tweet.split()
    index = fake.random.randint(0, len(words))
    words.insert(index, '#%s' % hashtag)
    tweet = ' '.join(words)
    publisher.publish(topic_url, tweet.encode('utf-8'))
    num_tweets += 1
    
auth = tweepy.AppAuthHandler('5CkHWfGCiQ5XaWbVyIho05ihq', '5mucz0S7LGLypB1HMFbum1hbXIBlyHFoI7ypb6x09vwXWTB0Fy')

api = tweepy.API(auth, wait_on_rate_limit=True,wait_on_rate_limit_notify=True)

if (not api):
    print ("Can't Authenticate")

now = start_time = time.time()
while now < start_time + TOTAL_TIME * ONE_MINUTE:
    generate_tweet()
    now = time.time()

elapsed_time = time.time() - start_time
print("Elapsed time: %s minutes" % (elapsed_time / 60))
print("Number of generated tweets: %s" % num_tweets)