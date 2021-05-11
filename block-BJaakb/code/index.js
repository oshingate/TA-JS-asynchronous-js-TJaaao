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
