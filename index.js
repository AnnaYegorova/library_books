const books = [
  {
    id: "1",
    title: `Apple. Эволюция компьютера`,
    author: `Владимир Невзоров`,
    img: `https://bukva.ua/img/products/449/449532_200.jpg`,
    plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
  },
  {
    id: "2",
    title: `Как объяснить ребенку информатику`,
    author: `Кэрол Вордерман`,
    img: `https://bukva.ua/img/products/480/480030_200.jpg`,
    plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
    оставаясь в безопасности. 
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
    объясняются наглядно с помощью иллюстраций и схем.`,
  },
  {
    id: "3",
    title: `Путь скрам-мастера. #ScrumMasterWay`,
    author: `Зузана Шохова`,
    img: `https://bukva.ua/img/products/480/480090_200.jpg`,
    plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
    какими инструментами ему нужно пользоваться.`,
  },
];
if (!localStorage.getItem("books")) {
  localStorage.setItem("books", JSON.stringify(books));
}

const root = document.getElementById("root");
const leftDiv = document.createElement("div");
const rightDiv = document.createElement("div");
root.append(leftDiv, rightDiv);

leftDiv.classList.add("leftdiv");
const h2 = document.createElement("h2");
h2.textContent = "Наш заголовок";
rightDiv.classList.add("rightdiv");

const ul = document.createElement("ul");

const addBtn = document.createElement("button");
addBtn.textContent = "ADD";
addBtn.classList.add("addBtn");
leftDiv.append(h2, ul, addBtn);

const refUl = document.querySelector("ul");

if (localStorage.getItem("object")) {
  createBookMarkUp(JSON.parse(localStorage.getItem("object")));
}

function renderMarkUp() {
  const bookMarkUp = JSON.parse(localStorage.getItem("books"))
    .map(
      ({ title, id }) => `<li id = ${id}><p class = "bookTitle">${title}</p>
      <button class ="editButton">Edit</button>
    <button class="deleteButton">Delete</button></li>`
    )
    .join("");

  refUl.insertAdjacentHTML("beforeend", bookMarkUp);

  const bookName = document.querySelectorAll(".bookTitle");
  bookName.forEach((element) =>
    element.addEventListener("click", renderPreview)
  );

  const editBtn = document.querySelectorAll(".editButton");
  editBtn.forEach((buttonE) => {
    buttonE.addEventListener("click", onEditBtnClick);
  });

  const deleteBtn = document.querySelectorAll(".deleteButton");
  deleteBtn.forEach((buttonD) => {
    buttonD.addEventListener("click", onDeleteBtnClick);
  });
}
renderMarkUp();

function renderPreview(event) {
  const { title, author, img, plot } = JSON.parse(
    localStorage.getItem("books")
  ).find((element) => element.title === event.target.textContent);
  // console.log(bookFind);
  function bookToFindMarkup(object) {
    rightDiv.innerHTML = "";
    const bookMarkUp = `<h2>${title}</h2>
    <p>${author}</p>
    <img src = ${img}>
    <p>${plot}</p>
    `;
    rightDiv.insertAdjacentHTML("beforeend", bookMarkUp);
  }
  bookToFindMarkup();
}
function createBookMarkUp(object) {
  rightDiv.innerHTML = "";
  const { title, author, img, plot } = object;
  localStorage.setItem("object", JSON.stringify(object));
  return rightDiv.insertAdjacentHTML(
    "beforeend",
    `<h2>${title}</h2>
  <p>${author}</p>
  <img src = ${img}>
  <p>${plot}</p>

  `
  );
}

function onEditBtnClick(event) {
  console.log("edit");
  rightDiv.innerHTML = "";
  const bookToEdit = event.currentTarget.parentNode;
  const localeStorageData = JSON.parse(localStorage.getItem("books"));
  const editBook = localeStorageData.find((element) => {
    if (element.id === bookToEdit.id) {
      return element;
    }
  });
  rightDiv.insertAdjacentHTML("beforeend", createFormMarkup(editBook));

  console.log(bookToEdit);
  console.log(editBook);
  formFunctionality(editBook);
  const btnEditSave = document.querySelector(".btn-save");
  btnEditSave.addEventListener("click", onBtnEditSaveClick);

  function onBtnEditSaveClick(event) {
    event.preventDefault();
    console.log("Save Edit Button Click");
    localStorage.setItem("books", JSON.stringify(localeStorageData));
    refUl.innerHTML = "";
    renderMarkUp();
    createBookMarkUp(editBook);
    setTimeout(() => alert("Books successfully updated! "), 300);
  }
}
function onDeleteBtnClick(event) {
  // console.log("delete");
  const bookToDelete = event.target.parentNode;
  console.log(bookToDelete);
  const localeStorageData = JSON.parse(localStorage.getItem("books"));
  const bookFind = localeStorageData.find((element) => {
    if (element.id === bookToDelete.id) {
      return element;
    }
  });

  const newData = localeStorageData.filter((element) => {
    if (element.id !== bookToDelete.id) {
      return element;
    }
  });
  console.log(newData);
  localStorage.setItem("books", JSON.stringify(newData));
  refUl.innerHTML = "";
  renderMarkUp(newData);
  if (rightDiv.children[0] === undefined) {
    return;
  }
  if (rightDiv.children[0].textContent === bookFind.title) {
    rightDiv.innerHTML = "";
  }
}

const addButton = document.querySelector(".addBtn");
addButton.addEventListener("click", onAddBtnClick);

function createFormMarkup(book) {
  return `<form>
  <label>Введите название книги 
  <input name = "title" type = "text" value = "${book.title}">
  </label>
  <label>Введите автора книги<input name = "author"  value = "${book.author}"></label>
  <label>Вставьте ссылку на картинку <input name = "img"  value = "${book.img}"></label>
  <label>Введите сюжет книги <input name = "plot"  value = "${book.plot}"></label>
  <button class = "btn-save">Save</button>
  </form>`;
}
function formFunctionality(objectBook) {
  const inputAll = document.querySelectorAll("input");
  // console.log(inputAll);
  inputAll.forEach((input) => input.addEventListener("change", onInputChange));

  function onInputChange(event) {
    objectBook[event.target.name] = event.target.value;
    console.log(objectBook);
  }
}

function onAddBtnClick() {
  rightDiv.innerHTML = "";
  const newBook = {
    id: `${Date.now()}`,
    title: "",
    author: "",
    img: "",
    plot: "",
  };
  rightDiv.insertAdjacentHTML("beforeend", createFormMarkup(newBook));
  formFunctionality(newBook);

  const btnSave = document.querySelector(".btn-save");
  const inputs = document.querySelectorAll("input");
  btnSave.addEventListener("click", onSaveBtnClick);

  function onSaveBtnClick(event) {
    event.preventDefault();
    inputs.forEach((input) => {
      if (input.value === "") alert("Заполни все поля");
      return;
    });
    if (newBook.title && newBook.author && newBook.img && newBook.plot) {
      const oldListBookLS = JSON.parse(localStorage.getItem("books"));
      const newListBooksLS = [...oldListBookLS, newBook];
      localStorage.setItem("books", JSON.stringify(newListBooksLS));

      ul.innerHTML = "";
      renderMarkUp();
      rightDiv.innerHTML = "";
      createBookMarkUp(newBook);
      setTimeout(() => alert("Book added successesfully!"), 300);
    }
  }
}
