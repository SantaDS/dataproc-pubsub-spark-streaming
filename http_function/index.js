/*
 Copyright Google Inc. 2018
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

exports.http_function = (request, response) => {

  // Imports the Cloud Datastore client library
  const Datastore = require('@google-cloud/datastore');

  // Your Google Cloud Platform project ID
  const projectId = process.env.GCLOUD_PROJECT;

  // Creates a client
  const datastore = new Datastore({
    projectId: projectId,
  });

  // Define the query: select the most recent record
  const query = datastore
    .createQuery('TrendingHashtags')
    .order('datetime', {
      descending: true,
    })
    .limit(1);
/*

  datastore.runQuery(query).then(results => {
    var responseString = '<html><head><meta http-equiv="refresh" content="5"></head><body>';
    const entities = results[0];

    if (entities.length && entities[0].hashtags.length) {
      responseString += '<h1>Trending hashtags</h1>';
      responseString += '<ol>';
      entities[0].hashtags.forEach(hashtag => {
        responseString += `<li>${hashtag.name} (${hashtag.occurrences})`;
      });
      response.send(responseString);
    }
    else {
      responseString += 'No trending hashtags at this time... Try again later.';
      response.send(responseString);
    }
  })

*/
  // Execute the query
	datastore.runQuery(query).then(results => {
    var responseString = '<html><head><meta http-equiv="refresh" content="5">    <style>
        * {
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
        }
        h2, h3, h4, h5, h6 {
            color: #002b31;
            font-weight: 160;
            font-size: 35px;
        }
        h1 {
            color: #0a899b;
            font-weight: 160;
        }
        body {
            background-color: #5e5e6e;
            margin: 0px;
        }
        path {
            stroke: rgb(47, 48, 28);
            stroke-width: 0.25px;
            fill:#77acb5;
        }
        .details {
            top: 0px;
            right: 0%;
            visibility: hidden;
            width: 300px;
            padding: 30px;
            height: 100%;
            opacity: 0.6;
            position: absolute;
            background-color: rgb(49, 50, 53);
            color: #0a899b;
            font-size: 16px;
            text-align: center;
        }
        .center {
            text-align: center;
        }
    </style></head>
    <body>
    
<h2 class="center">Twitter Trends & <br> Sentiment Analysis</h2>

<div class="details">
    <h1 class="country"></h1>
    <p class="hashtag1"></p>
    <p class="hashtag2"></p>
    <p class="hashtag3"></p>
    <p class="hashtag4"></p>
    <p class="hashtag5"></p>
    <p class="hashtag6"></p>
    <p class="hashtag7"></p>
    <p class="hashtag8"></p>
    <p class="hashtag9"></p>
    <p class="hashtag10"></p>
    <p class="hashtag1sentiment"></p>
    <p class="hashtag2sentiment"></p>
    <p class="hashtag3sentiment"></p>
    <p class="hashtag4sentiment"></p>
    <p class="hashtag5sentiment"></p>
    <p class="hashtag6sentiment"></p>
    <p class="hashtag7sentiment"></p>
    <p class="hashtag8sentiment"></p>
    <p class="hashtag9sentiment"></p>
    <p class="hashtag10sentiment"></p>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.11.0/d3.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.js"></script>
<script src="src/js/main.js"></script>';
    

    if (entities.length && entities[0].hashtags.length) {
      
      response.send(responseString);
    }
    else {
      responseString += '<html><head><meta http-equiv="refresh" content="5">    <style>
        * {
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
        }
        h2, h3, h4, h5, h6 {
            color: #002b31;
            font-weight: 160;
            font-size: 35px;
        }
        h1 {
            color: #0a899b;
            font-weight: 160;
        }
        body {
            background-color: #5e5e6e;
            margin: 0px;
        }
        path {
            stroke: rgb(47, 48, 28);
            stroke-width: 0.25px;
            fill:#77acb5;
        }
        .details {
            top: 0px;
            right: 0%;
            visibility: hidden;
            width: 300px;
            padding: 30px;
            height: 100%;
            opacity: 0.6;
            position: absolute;
            background-color: rgb(49, 50, 53);
            color: #0a899b;
            font-size: 16px;
            text-align: center;
        }
        .center {
            text-align: center;
        }
    </style></head>
    <body>
    
<h2 class="center">Twitter Trends & <br> Sentiment Analysis</h2>

<div class="details">
    <h1 class="country"></h1>
    <p class="hashtag1"></p>
    <p class="hashtag2"></p>
    <p class="hashtag3"></p>
    <p class="hashtag4"></p>
    <p class="hashtag5"></p>
    <p class="hashtag6"></p>
    <p class="hashtag7"></p>
    <p class="hashtag8"></p>
    <p class="hashtag9"></p>
    <p class="hashtag10"></p>
    <p class="hashtag1sentiment"></p>
    <p class="hashtag2sentiment"></p>
    <p class="hashtag3sentiment"></p>
    <p class="hashtag4sentiment"></p>
    <p class="hashtag5sentiment"></p>
    <p class="hashtag6sentiment"></p>
    <p class="hashtag7sentiment"></p>
    <p class="hashtag8sentiment"></p>
    <p class="hashtag9sentiment"></p>
    <p class="hashtag10sentiment"></p>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.11.0/d3.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.js"></script>
<script src="src/js/main.js"></script>';
      response.send(responseString);
    }
  })
  .catch(err => {
    response.send(`Error: ${err}`);
  });
};