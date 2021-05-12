let root = document.querySelector('.root');

//using fetch to get data

let data = fetch(
  'https://test.spaceflightnewsapi.net/api/v2/articles?_limit=30'
).then((val) => {
  if (!val.ok) {
    throw new Error(`invalid link error code- ${val.status}`);
  }
  return val.json();
});
//   .catch((error) => {
//     root.innerHTML = '';
//     root.innerText = error;
//   });

//using .then to get list of companies and storing in arrOfCompanies

let arrOfCompanies = data.then((val) => {
  console.log(val, 'val');
  let arrOfAgencies = [];

  val.forEach((ele) => {
    arrOfAgencies.push(ele.newsSite);
  });
  let final = arrOfAgencies.reduce((acc, cv) => {
    if (!acc.includes(cv)) {
      acc.push(cv);
    }
    return acc;
  }, []);
  return final;
});
console.log(arrOfCompanies);

//addling agencies into list

let selectElem = document.querySelector('#newsAgency');

arrOfCompanies.then((val) => {
  val.forEach((e) => {
    let option = document.createElement('option');
    option.value = e;
    option.innerText = e;
    selectElem.append(option);
  });
});
//function to create UI
{
  /* <article class="news flex">
            <div class="flex-50">
              <img
                src="https://mk0spaceflightnoa02a.kinstacdn.com/wp-content/uploads/2021/03/50875730681_b4e2d8c6cc_k.jpg"
                alt=""
              />
            </div>
            <div class="flex-50">
              <a class="btn btn-pri" href="#">news paper</a>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea,
                eveniet.
              </p>
              <a class="btn btn-sec" href="#">read more</a>
            </div>
          </article> */
}
function createUI(e) {
  let article = document.createElement('article');
  article.classList.add('news', 'flex');
  let div1 = document.createElement('div');
  div1.classList.add('flex-50');
  let img = document.createElement('img');
  img.src = e.imageUrl;
  div1.append(img);
  let div2 = document.createElement('div');
  div2.classList.add('flex-50');
  let a1 = document.createElement('a');
  a1.classList.add('btn', 'btn-pri');
  a1.innerText = e.newsSite;
  a1.href = '#';
  let p = document.createElement('p');
  p.innerText = e.title;
  let a2 = document.createElement('a');
  a2.classList.add('btn', 'btn-sec');
  a2.href = e.url;
  a2.innerText = 'Read More';
  div2.append(a1, p, a2);
  article.append(div1, div2);
  root.append(article);
}

// create function to get list of news according to agency
let arr = [];
function getNewsByAgency(agency) {
  if (agency == 'all') {
    return data;
  } else {
    return data.then((val) => {
      return val.filter((ele) => ele.newsSite == agency);
    });
  }
}

// adding event listner to input
function handleChange(e) {
  let list = getNewsByAgency(e.target.value).then((val) => {
    root.innerHTML = '';
    val.forEach((e) => {
      createUI(e);
    });
  });
}
console.dir(selectElem);
selectElem.addEventListener('change', (e) => {
  handleChange(e);
});

// creating main UI
function createMainUI(news) {
  news.forEach((val) => {
    createUI(val);
  });
}
data.then((val) => {
  root.innerHTML = '';
  createMainUI(val);
});
