let root = document.querySelector('.root');
let addInput = document.querySelector('.addInput');

function fetchList() {
  let url = 'https://sleepy-falls-37563.herokuapp.com/api/todo';
  return fetch(url).then((val) => val.json());
}
function addToList(todo) {
  let url = 'https://sleepy-falls-37563.herokuapp.com/api/todo';
  fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo), // body data type must match "Content-Type" header
  }).then((val) => {
    createUI();
  });
}
function updateList(todo, id) {
  let url = 'https://sleepy-falls-37563.herokuapp.com/api/todo/' + id;
  fetch(url, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo), // body data type must match "Content-Type" header
  }).then((val) => {
    createUI();
  });
}
function deletList(id) {
  let url = 'https://sleepy-falls-37563.herokuapp.com/api/todo/' + id;
  fetch(url, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then((val) => {
    createUI();
  });
}
// add toto to list
function handleAddEvent(event) {
  if (event.keyCode == 13) {
    let obj = {
      todo: {
        title: '',
        isCompleted: false,
      },
    };
    obj.todo['title'] = event.target.value;
    addToList(obj);
    event.target.value = '';
  }
}

addInput.addEventListener('keyup', (event) => {
  handleAddEvent(event);
});

//handle update event
function handleUpdateFinal(event, ele) {
  if (event.keyCode == 13) {
    console.log(ele);
    let obj = {
      todo: {
        title: '',
      },
    };
    obj.todo['title'] = event.target.value;
    updateList(obj, ele._id);
  }
}

function handleUpdateEvent(target, ele) {
  target.style.border = '1px solid black';
  target.readOnly = '';
  target.addEventListener('keyup', (event) => {
    handleUpdateFinal(event, ele);
  });
}

// createUI functions
function createTodoUI(ele) {
  let div = document.createElement('div');
  div.classList.add('todo');
  let check = document.createElement('input');
  check.type = 'checkbox';
  check.name = 'todo-check';
  check.classList.add('todo-check');

  let input = document.createElement('input');
  input.type = 'text';
  input.name = 'todo-input';
  input.classList.add('todo-input');
  input.placeholder = 'Todo';
  input.value = ele.title;
  input.readOnly = 'readOnly';

  let a = document.createElement('a');
  a.href = '#';
  a.innerText = 'X';

  div.append(check, input, a);
  return div;
}

function createUI() {
  root.innerHTML = '';
  let list = fetchList();
  list.then((val) => {
    val['todos'].forEach((ele) => {
      let div = createTodoUI(ele);
      let input = div.querySelector('.todo-input');
      let a = div.querySelector('a');

      //   handling delet event on crss
      a.addEventListener('click', (event) => {
        deletList(ele._id);
      });
      //handle update event
      input.addEventListener('dblclick', (event) => {
        handleUpdateEvent(event.target, ele);
      });
      root.append(div);
    });
  });
}
createUI();
