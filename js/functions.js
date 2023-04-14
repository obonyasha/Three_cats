// Создание карточки с котом, отрисовка на странице
function createCard(pet, tag) {

    const card = document.createElement("div");
    card.className = "card";

    const cardImg = document.createElement("div");
    cardImg.className = "pic";
    if (pet.image) {
        cardImg.style.backgroundImage = `url(${pet.image})`
    } else {
        cardImg.classList.add("tmp");
    }

    const cardTitle = document.createElement("h2");
    cardTitle.innerText = pet.name;
    cardTitle.style.color = "#034ff9";

    const cardAge = document.createElement("p");
    cardAge.className = "cat-age";
    cardAge.innerText = pet.age ? textAge(pet.age) : '';

    const cardLike = document.createElement("i");
    cardLike.className = "like fa-heart";
    cardLike.classList.add(pet.favorite ? "fa-solid" : "fa-regular");
    cardLike.addEventListener("click", e => {
        e.stopPropagation();
        setLike(cardLike, pet.id, !pet.favorite);
    });

    const trash = document.createElement("i");
    trash.className = "fa-solid fa-trash card-trash";
    trash.addEventListener("click", e => {
        deleteCard(pet.id, e.currentTarget.parentElement);
    });

    const edit = document.createElement("i");
    edit.className = "fa-solid fa-pen-to-square card-edit";
    edit.addEventListener("click", e => {
        editBox.classList.toggle("active");
        openCard(cardTitle, pet.image, pet.age, pet.description, pet);
    });

    card.append(cardImg, cardTitle, cardLike, trash, edit, cardAge);

    tag.append(card);
}

//Постановка лайка, отправка обновленных данных на сервер и запись в локальное хранилище
function setLike(el, id, like) {
    el.classList.toggle("fa-solid");
    el.classList.toggle("fa-regular");
    if (id) {
        fetch(`${path}/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ favorite: like })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                pets = pets.map(p => {
                    if (p.id === id) {
                        p.favorite = like;
                    }
                    return p;
                });
                localStorage.setItem("three-cats", JSON.stringify(pets));
            })
    }
}

//Просмотр информации о коте
function openCard(name, imgUrl, age, info, pet) {
    editForm.querySelector("#id").value = pet.id;
    editForm.querySelector("#name").value = name.innerText;
    editForm.querySelector("#image").value = `${imgUrl}`;
    editForm.querySelector(".preview").style.backgroundImage = `URL(${imgUrl})`;
    editForm.querySelector("#age").value = age ? age : "";
    editForm.querySelector("#description").value = info ? info : "";
    editForm.querySelector("#favorite").checked = pet[editForm.querySelector("#favorite").name];
};

function textAge(age) {
    if (age % 100 >= 5 && age % 100 <= 20) {
        return age + ' лет';
    } else {
        age % 100 == age % 100 % 10;
        if (age % 100 == 1) {
            return age + ' год';
        } else if (age % 100 >= 2 && age % 100 <= 4) {
            return age + ' года';
        } else {
            return age + ' лет';
        }
    }
}
