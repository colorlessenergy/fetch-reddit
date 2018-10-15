fetch("https://www.reddit.com/r/programmerhumor.json")
  .then(function (response) {
    return response.json();
  }).then(function (json) {
    // change json => json.data.children
    return json.data.children;
  });