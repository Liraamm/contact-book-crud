const contactContainer = document.querySelector(".contact-container");
const addForm = document.querySelector(".add-contact");
const addName = document.querySelector("#add-name");
const addSurname = document.querySelector("#add-surname");
const addPicture = document.querySelector("#add-url");
const addNumber = document.querySelector("#add-number");
const editModal = document.querySelector("#edit-modal");
const closeModalBtn = document.querySelector("#close-modal");
const editInputName = document.querySelector("#edit-input-name");
const editInputSurname = document.querySelector("#edit-input-surname");
const editInputNumber = document.querySelector("#edit-input-number");
const editInputPicture = document.querySelector("#edit-input-picture");
const editCancel = document.querySelector("#edit-cancel");
const editSubmit = document.querySelector(".edit-submit");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

render();

//! read
function render() {
  contactContainer.innerHTML = "";
  contacts.forEach((item) => {
    contactContainer.innerHTML += `
    <div class="contact-item" style="background-color:white">
    <img src="${item.picture}" alt="" style="width: 50px; height: 50px; border-radius: 50px;">
    <span>${item.name}</span>
    <span>${item.surname}</span>
    <span>${item.number}</span>
    <div>
      <button id="${item.id}" class="edit-btn">edit</button
      ><button id="${item.id}" class="delete-btn">delete</button>
    </div>
  </div>`;
  });
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !addName.value.trim() ||
    !addNumber.value.trim() ||
    !addSurname.value.trim()
  ) {
    addName.value = "";
    addNumber.value = "";
    return;
  }
  const contact = {
    id: Date.now(),
    name: addName.value,
    surname: addSurname.value,
    picture: addPicture.value,
    number: addNumber.value,
  };
  contacts.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  addName.value = "";
  addSurname.value = "";
  addPicture.value = "";
  addNumber.value = "";
  render();
});

//! delete

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    contacts = contacts.filter((item) => item.id != e.target.id);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    render();
  }
});

//! edit
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    editModal.style.visibility = "visible";
    const contactEdit = contacts.find((item) => item.id == e.target.id);
    editInputName.value = contactEdit.name;
    editInputSurname.value = contactEdit.surname;
    editInputNumber.value = contactEdit.number;
    editInputPicture.value = contactEdit.picture;
    editSubmit.id = e.target.id;
  }
});

closeModalBtn.addEventListener("click", (e) => {
  editModal.style.visibility = "hidden";
});

editCancel.addEventListener("click", (e) => {
  editModal.style.visibility = "hidden";
});

editSubmit.addEventListener("click", (e) => {
  if (
    !editInputName.value.trim() ||
    !editInputSurname.value.trim() ||
    !editInputNumber.value.trim()
  ) {
    return;
  }
  contacts = contacts.map((item) => {
    if (item.id == e.target.id) {
      item.name = editInputName.value;
      item.surname = editInputSurname.value;
      item.number = editInputNumber.value;
      item.picture = editInputPicture.value;
    }
    return item;
  });
  localStorage.setItem("contacts", JSON.stringify(contacts));
  render();
  editCancel.click();
});
