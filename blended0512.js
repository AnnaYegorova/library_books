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

function renderMarkUp() {
  const bookMarkUp = books
    .map(
      ({
        title,
      }) => `<li><p class = "bookTitle">${title}<button class ="editButton">Edit</button>
    <button class="deleteButton">Delete</button></p></li>`
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

  const addButton = document.querySelector(".addBtn");
  addButton.addEventListener("click", onAddBtnClick);
}
renderMarkUp();

function renderPreview(event) {
  // const bookFind = books.find(
  //   (element) => element.title === event.currentTarget.textContent
  // );
  // console.log(bookFind);
  console.log(123);
}

function onEditBtnClick() {
  console.log("edit");
}
function onDeleteBtnClick() {
  console.log("delete");
}

function onAddBtnClick() {
  console.log("Add new book");
}
