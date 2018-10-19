// get the form and input from the HTML
let form = document.querySelector('.form');
let input = document.querySelector('input');
// get the container to populate
// data with. Has to be a global variable
// because we are going to be using this in more
// then one spot
let posts = document.querySelector('#posts');


// have javascript listen to the submit event listener on the form
form.addEventListener('submit', function (event) {

  // this will stop the form from
  // actually submitting
  event.preventDefault();

  // add class to the form
  // to move it to top after searching
  form.classList.add('form--searched');

  // clear all the post after every search
  posts.innerHTML = "";

  // checking if the input value
  // isn't empty
  if (input.value) {
    search(input.value);
  }

  // reset the input field
  input.value = "";
});

// pass in a string of the subreddit
function search(subreddit) {
  // concat the subreddit with the url
  fetch("https://www.reddit.com/r/" + subreddit + ".json")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      // an array of objects with data about posts
      let postFromFrontPage = json.data.children;

      console.log(postFromFrontPage)
      dataToDom(postFromFrontPage);
    });
};

function dataToDom(arr) {
  // we will put all the data
  // we want from the object here
  let data = [];

  // looping through the array of objects
  // that we got from the reddit api
  arr.forEach(function (obj) {
    // pass in a object with the data
    // we want and the element ot append
    // the data with

    data.push({
      data: obj.data.title,
      element: 'h1'
    });

    // if an image exist
    if (obj.data.url.includes('jpg')) {
      data.push({
        data: obj.data.url,
        element: 'img'
      });
    } else {
      data.push({
        data: 'no image',
        element: 'div'
      })
    }

    // we will pass in the data array
    // and the link to the post to another function
    createElementsAndAppendElements(data, obj.data.permalink);

    // need to reset the data array
    // because we only want to pass
    // the title and image of individual post
    data = [];
  });
}

function createElementsAndAppendElements(arr, url) {
  // have the a tag be the container, so the whole content
  // is clickable to the reddit post
  let createA = document.createElement('a');
  createA.href = 'https://www.reddit.com/' + url;

  arr.forEach((obj) => {
    let createElement = document.createElement(obj.element);
    // if it is an image add a source to the image otherwise give it text
    if (obj.element == 'img') {
      createElement.src = obj.data;
    } else {
      createElement.textContent = obj.data;
    }

    createA.appendChild(createElement);

    // populate the posts div with post
    posts.appendChild(createA)
  });
};