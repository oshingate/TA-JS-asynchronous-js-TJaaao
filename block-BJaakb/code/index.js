function fetch(url) {
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
      res(JSON.parse(xhr.response));
    };
    xhr.onerror = function () {
      rej((error) => alert('Something is wrong'));
    };
    xhr.send();
  });
}

let search = document.querySelector('.search');
let root = document.querySelector('.all-div');

function createUI(ele) {
  let div = document.createElement('div');
  div.classList.add('flex-25');
  let image = document.createElement('img');
  image.src = ele.urls.regular;
  div.append(image);
  root.append(div);
}

function handleSearch(e) {
  if (e.keyCode == 13) {
    let val = e.target.value;
    let key = 'L7qHJTeKU__dnG3T2rgRRURMDSvxKOTgo78lnwvByN0';
    let xhr = new XMLHttpRequest();
    let url = `https://api.unsplash.com/search/photos?query=${val}&client_id=${key}`;
    //   xhr.open('GET', url);
    //   xhr.onload = function () {
    //     let data = JSON.parse(xhr.response);
    //     root.innerHTML = '';
    //     count = 0;
    //     data.results.forEach((ele) => {
    //       createUI(ele);
    //     });
    //   };
    //   xhr.onerror = function () {
    //     console.log('error');
    //   };
    //   xhr.send();
    fetch(url)
      .then((value) => {
        root.innerHTML = '';
        value.results.forEach((ele) => {
          createUI(ele);
        });
      })
      .catch((value) => {
        console.log('something is wrong');
      })
      .finally(() => {
        console.log('completed');
      });
  }
}

search.addEventListener('keyup', (e) => {
  handleSearch(e);
});
