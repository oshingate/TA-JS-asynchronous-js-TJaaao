let search = document.querySelector('.search');
let proImg = document.querySelector('.felxi-img');
let h1 = document.querySelector('h1');
let h3 = document.querySelector('h3');
let follower = document.querySelectorAll('.small-img1');
let following = document.querySelectorAll('.small-img2');

function createUI(data) {
  proImg.src = data.avatar_url;
  h1.innerText = data.name;
  h3.innerText = '@' + data.login;
}
let handleSearch = (e) => {
  if (e.keyCode == 13) {
    let username = e.target.value;

    //
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/users/${username}`);
    xhr.onload = function () {
      let userData = JSON.parse(xhr.response);
      console.log(userData);
      createUI(userData);
    };
    xhr.send();
    //xhr2 is for follower
    let xhr2 = new XMLHttpRequest();
    xhr2.open('GET', `https://api.github.com/users/${username}/followers`);
    xhr2.onload = function () {
      let arrOfFollower = JSON.parse(xhr2.response);
      follower.forEach((e, i) => {
        e.src = arrOfFollower[i].avatar_url;
      });
    };
    xhr2.send();

    //xhr3 is for following
    let xhr3 = new XMLHttpRequest();
    xhr3.open('GET', `https://api.github.com/users/${username}/following`);
    xhr3.onload = function () {
      let arrOfFollower = JSON.parse(xhr3.response);
      following.forEach((e, i) => {
        e.src = arrOfFollower[i].avatar_url;
      });
    };
    xhr3.send();
  }
};
search.addEventListener('keyup', (e) => {
  handleSearch(e);
});

//

let cat = document.querySelector('.cat');
let btn = document.querySelector('.btn');

function handleClick(e) {
  let xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    `https://api.thecatapi.com/v1/images/search?limit=1&size=full`
  );
  xhr.onload = function () {
    let catData = JSON.parse(xhr.response);
    console.log(catData);
    cat.innerHTML = '';
    let image = document.createElement('img');
    image.alt = 'cat';
    image.src = './images.jpg';

    image.src = catData[0].url;
    cat.append(image);
  };
  xhr.send();
}

btn.addEventListener('click', (e) => {
  handleClick(e);
});
