## ALT1040.com Node Api for appfog.com ##

[Implemented in ALT1040 for Android](https://play.google.com/store/apps/details?id=com.alt1040.android)

## Configuration: ##
- 1 - Open config.js file
- 2 - Set diffbot key [Create key here](http://www.diffbot.com/plans/free)
- 3 - Set mongodb url connection [Create mongodb database here](https://bridge.mongohq.com/signup)
- 4 - Set api key to acces data, need to create request data.

## Important diffbot: ##
To create categorydate and author fields [need customize url](http://diffbot.com/dev/customize/).
 - .categorias a:first-child is css selector to categories
 - .fecha is css selector to date
 - .autor a is css selector to author

 <iframe width="420" height="315" src="http://www.youtube.com/embed/mjmH_OFCtY0" frameborder="0" allowfullscreen></iframe>

## How to work: ##
Read all feed rss and get data from diffbot via url read and save in database.