const block = document.querySelector(".wrapper");
const addBtn = document.querySelector(".add-cat");
const mdBox = document.querySelector(".modal-block");
const mdClose = mdBox.querySelector(".modal-close");
const addForm = document.forms.add;
const prevTag = addForm.querySelector(".preview");
const editBox = document.querySelector(".edit-block");

let name = "obonyasha";
let path = `https://cats.petiteweb.dev/api/single/${name}`;

//запись в переменную массива котов из локального хранилища
let pets = localStorage.getItem("three-cats");