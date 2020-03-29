## Datasets Found

#### 1 Movie shots
##### **link**: http://people.psych.cornell.edu/~jec7/data.htm
The dataset includes 220 popular movies from 1915 to 2015. It includes the shot duration of each cut of each movie, and the shot motion, shot luminance, and shot clutter of these cuts. It also includes a file which concerns 24 movies out of the 220 and records their shot scale of each cut.
What is unique for this dataset is that the data is all seperated for each movie, and each movie has two excel files and one csv file, regarding different aspects. So the first thing I am going to do is to concacenate the files for each movie. For the visualization, it could first examine the number of cuts for different movies, probably shown in a group of circles, each represent a individual cut. And when clicking on the group, the circle could spread to a line, and under each circle the detailed information like shot motion, shot luminance, and shot clutter of these cuts could be shown. Then, could compare the difference of each category with other movies, with regard to the genre and director style. However, the dataset does not contain these information for the movie, so I probably need to create a small dataset with the information collected from IMDB.

#### 2 Twitter Emoji
##### **link**: EmojifyData-EN: English tweets, with emojis: https://www.kaggle.com/rexhaif/emojifydata-en
##### Twitter Emoji Scraper: https://github.com/miikargh/twitter-emoji-scraper
##### One great example and it has a context with helps with the analysis: https://christinequan.github.io/airtweets/ & https://towardsdatascience.com/the-data-files-twitter-emoji-analysis-987093f9c1ee (for the detailed process)
It is a raw dataset of 18 millions english tweets, all with emoticons included. I could process the dataset with regard to each emoji's appearance frequency, its word context, how it is used for combination, and create links between them, and could see how many emoji's are least used, and see what the context are when they are used. Also, the skin color for those emojis of faces and gestures could be analyzed.
And if these data does not suffice, I found the scraping code on github which should be able to help. And i could probably combine it with the general scraping tool to get more information.


#### 3 Trump's Twitter
##### **link**: Obama Tweets (2012-2019): https://www.kaggle.com/datacrux/barack-obama-twitterdata-from-20122019
##### Trump Tweets (2009-2019): https://components.one/datasets/trumps-tweets-updated-daily/
##### Raw Twitter Timelines w/ No Retweets(Mainly 2014-2016): https://www.kaggle.com/speckledpingu/RawTwitterFeeds
##### Scrape Data from Twitter using Python: https://github.com/taspinar/twitterscraper
So these datasets are all about tweets on Twitter, and are all quite raw. They include time, detailed text, and number of likes and retweets for each of the twitter. I probably is going to ananlyze Trump's tweets with respect to:
the words frequency i.e. what are the most used words?
the sentiment score (calculated by Google’s Natural Language API),
the number of likes and retweets, especially examines the growth from 2009 to 2019,
the time Trump tweets the most [could use the overlay of individual points]
the daily tweeting frequency...
If possible, could compare Trump's tweet with Obama's tweet during his presidency with regard to sentiment and frequency.

#### 4 Steam dataset (just an inspiration)
**link**: https://steamdb.info/#stats
This database website is sooo detailed concerning all kinds of data involved in Steam store, gaming hardware, netspeed in regions, frequency of gaming, type of games that are played the most and so on. **However, it says clearly: NO SCRAPING.**
