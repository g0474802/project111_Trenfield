"use strict";
/*    JavaScript 7th Edition
      Chapter 11
      Project 11-01

      Project to retrieve the Astronomy Picture of the Day from NASA
      Author: Graham Trenfield
      Date: 5/4  

      Filename: project11-01.js
*/

let imageBox = document.getElementById("nasaImage");
let dateBox = document.getElementById("dateBox");
let dateStr = dateBox.value;//gets selected date from the input

dateBox.onchange = function() {   
      fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${dateStr}`)//sends a request to the NASA API 
    .then(response => response.json())//converts HTTP into JSON format
    .then(json => showPicture(json))//calls a function showPicture()
    .catch(error => console.log("Error:", error));//logs any errors 
};

function showPicture(json) {//will display the image or video 
      if (json.media_type === "video") {//if media is a video, show it inside <iframe>.
        imageBox.innerHTML = `<iframe src="${json.url}"></iframe><h1>${json.title}</h1><p>${json.explanation}</p>`;
      } else if (json.media_type === "image") {//if an image, show it using <img> tag
        imageBox.innerHTML = `<img src="${json.url}"><h1>${json.title}</h1><p>${json.explanation}</p>`;
      } else {//if it's something else, show “Image not available.”
        imageBox.innerHTML = "Image not available.";
      }
    }
