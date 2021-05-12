- Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.

```js
let one = new Promise((res, rej) => {
  setTimeout(() => {
    res('A');
  }, 1000);
});
let two = new Promise((res, rej) => {
  setTimeout(() => {
    res('B');
  }, 2000);
});
let three = new Promise((res, rej) => {
  setTimeout(() => {
    res('C');
  }, 3000);
});
let four = new Promise((res, rej) => {
  setTimeout(() => {
    res('D');
  }, 4000);
});

let all = Promise.all([one, two, three, four]).then((val) => console.log(val));
```

- Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.

```js
const users = ['prank7', 'prank7', 'prank7', 'prank7', 'prank7'];

let userData = Promise.all(
  users.map((ele) => {
    fetch(`https://api.github.com/users/${ele}`).then((val) => val.json());
  })
).then((val) => console.log(val));
```

- Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

  - https://random.dog/woof.json
  - https://aws.random.cat/meow

```js
let url1 = 'https://random.dog/woof.json';
let url2 = 'https://aws.random.cat/meow';

let one = fetch(url1).then((val) => val.json());
let two = fetch(url2).then((val) => val.json());

Promise.race([one, two]).then((val) => console.log(val));
```

- Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not

```js
const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

Promise.allSettled([one, two, three]).then((val) =>
  val.forEach((e) => {
    console.log(e.value);
  })
);
```

- What will be the output of the following code snippet? How much time will it take for the promise to resolve?

```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 1000);
  }),
  'Sam',
  { name: 'John' },
]).then(console.log); //it will take 1 sec toi resolve and return array[Arya,Sam,{name:"John"}]
```
