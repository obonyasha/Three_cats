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

    const caredTitle = document.createElement("h2");
    caredTitle.innerText = pet.name;
    caredTitle.style.color = "rgba(17, 165, 25, 0.945)";

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

    card.append(cardImg, caredTitle, cardLike, trash);

    // card.addEventListener("click", (event) => {
    //     deleteCard(pet.id, card)
    // });

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