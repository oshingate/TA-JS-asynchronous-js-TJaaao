let root = document.querySelector('.root');
let root2 = document.querySelector('.root2');
let mainSec = document.querySelector('.main-sec');
let secSec = document.querySelector('.sec-sec');

let getData = () => {
  return new Promise((res, rej) => {
    fetch('https://www.anapioficeandfire.com/api/books')
      .then((val) => val.json())
      .then((val) => {
        res(val);
      });
  });
};

//cardUI func
function createCardUI(ele) {
  let article = document.createElement('article');
  article.classList.add('card', 'flex-50');
  let h2 = document.createElement('h2');
  h2.innerText = ele.name;
  let h5 = document.createElement('h5');
  h5.innerText = ele.authors[0];
  let a = document.createElement('a');
  a.classList.add('btn');
  a.href = '#';
  a.innerText = `Show Characters(${ele.characters.length})`;

  article.append(h2, h5, a);
  return article;
}

// createRootSecUI()
function createRootSecUI(e) {
  return fetch(e)
    .then((val) => val.json())
    .then((val) => {
      //   let div = document.createElement('div');
      //   div.classList.add('chars');
      let h4 = document.createElement('h4');
      h4.innerText = val.name;
      //   console.log(val.name);
      //   div.append(h4);
      return h4;
    });
}

// handle click
function handleCrossEvent(event) {
  console.log('crss clicked');
  root.innerHTML = '';
  root2.innerHTML = '';
  mainSec.classList.toggle('none');
  secSec.classList.toggle('none');

  createMainUI();
}

function handleInfo(event, element) {
  mainSec.classList.toggle('none');
  secSec.classList.toggle('none');
  element.characters.forEach((e) => {
    let div = Promise.all([createRootSecUI(e)]);
    div.then((val) => {
      //   console.dir(val[0].innerText);
      let div = document.createElement('div');
      div.classList.add('chars');
      div.innerText = val[0].innerText;
      root2.append(div);
    });
  });
  let cross = secSec.querySelector('a');
  cross.addEventListener('click', (event) => {
    handleCrossEvent(event);
  });
}

// main  ui function

function createMainUI() {
  getData().then((val) => {
    root.innerHTML = '';
    root2.innerHTML = '';
    val.forEach((element) => {
      let card = createCardUI(element);
      let a = card.querySelector('.btn');
      a.addEventListener('click', (event) => {
        handleInfo(event, element);
      });
      root.append(card);
    });
  });
}
createMainUI();
