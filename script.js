// initial value of count set to 10 so that it can load faster
let count=10;
let photosArray =[];
const imgContainer=document.getElementById('img-container');
const loader=document.getElementById('loader');
const backToTop= document.getElementById('back-to-top');

const apiKey='7VjrJ8oaI5fsghaK3-1HuhVzvP7S1TZ_JinMlcA9Eo4';
const apiUrl=`https://api.unsplash.com/photos/random?count=${count}&client_id=${apiKey}`
let totalPhotos=0;
let photosLoaded=0;
let ready=false;


// Getting images from API

async function getImages(){

try{
const response = await fetch(apiUrl);
photosArray =await response.json();
displayPhotos();
}catch(error){
   getImages();
    console.log(error);
}
}

// Setting attributes

function setAttributes(element,attributes){
for (const attr in attributes){
element.setAttribute(attr,attributes[attr]);
}
}

 // checking if all the images has been loaded
function imageLoaded(){

  photosLoaded++;
   if(photosLoaded === totalPhotos){
      ready=true;
      loader.hidden=true;
      // changing value of count after initial load 
     count=30;
   }
}

// Displaying Images

function displayPhotos(){
   photosLoaded=0;
   totalPhotos=photosArray.length;
    for(let photo of photosArray){
//  Creating image links

       const imageLink = document.createElement('a');
    setAttributes(imageLink,{
    'href':photo.links.html,
    'target':'_blank'
    });

       const image=document.createElement('img');

    setAttributes(image,{
       'src':photo.urls.regular,
       'alt':photo.alt_description,
       'title':photo.alt_description
    });

    imgContainer.appendChild(imageLink);
       imageLink.appendChild(image);

// check to see if each image is loaded
image.addEventListener('load',imageLoaded);
}
}


// checking if the user has reached the bottom and if so, then load more images
window.addEventListener('scroll',()=>{
if(loader.hidden){
backToTop.hidden= false;
}
 if(window.innerHeight+window.scrollY >= document.body.offsetHeight-2000 && ready){
    getImages();
    ready=false;
 }
})


// On load
getImages();