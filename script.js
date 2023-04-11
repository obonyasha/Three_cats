//Удаление кота, запись обновленных данных в локальное хранилище
function deleteCard(id, el) {
    if (id) {
        fetch(`${path}/delete/${id}`, {
            method: "delete"
        })
            .then(res => {
                if (res.status === 200) {
                    el.remove();
                    pets = pets.filter(p => p.id !== id);
                    localStorage.setItem("three-cats", JSON.stringify(pets));
                };
            })
    }
}
//Если локальное хранилище не пустое, то отрисует данные из хранилища
if (pets) {
    try {
        pets = JSON.parse(pets);
        console.log(pets);
        for (let pet of pets) {
            createCard(pet, block);
        }
    } catch (err) {
        pets = null;
    }
} else {
    //Если локальное хранилище пустое, то отрисует данные из сервера и запишит в локальное хранилище
    fetch(path + "/show")
        .then(function (res) {
            //Если сервер вернул успешный ответ, попровит отдать данные
            return res.json();
        })
        .then(function (data) {
            if (!data.length) {
                block.innerHTML = "<div class=\"empty\">У вас пока еще нет питомцев</div>"
            } else {
                pets = [...data];
                localStorage.setItem("three-cats", JSON.stringify(data));
                for (let pet of data) {
                    createCard(pet, block);
                }
            }
        })
}


// let ids = [];
// fetch(path + "/ids")
//     .then(res => res.json())
//     .then(data => {
//         ids = [...data];
//         pet3.id = ids.length ? ids[ids.length - 1] + 1 : 1;
//         addPet(pet3);
//     })

// function addPet(pet) {
//     fetch(path + "/add", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(pet)
//     })
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);
//         })

// };

// Открытие модального окна(окно добавления кота)
addBtn.addEventListener("click", e => {
    mdBox.classList.toggle("active");
});
//Закрытие модального окна(окно добавления кота) через кнопку close
mdClose.addEventListener("click", e => {
    mdBox.classList.remove("active");
})
//Закрытие модального окна(окно добавления кота) при нажатии на любую область
mdBox.addEventListener("click", e => {
    if (e.target === e.currentTarget) {
        mdBox.classList.remove("active")
    }
});
//Обновление картинки в формедобавления кота после ввода ссылки 
addForm.elements.image.addEventListener("change", e => {

    prevTag.style.backgroundImage = `url(${e.currentTarget.value})`;
})
//Добавление кота через форму в модальном окне и отправка его на сервер, обновление данных в локальном хранилище
addForm.addEventListener("submit", e => {
    e.preventDefault();
    const body = {};
    for (let i = 0; i < addForm.elements.length; i++) {
        const el = addForm.elements[i];
        if (el.name) {
            if (el.name === "favorite") {
                body[el.name] = el.checked;
            } else {
                body[el.name] = el.value;
            }
        }
    }
    fetch(path + "/ids")
        .then(res => res.json())
        .then(ids => {
            body.id = ids[ids.length - 1] + 1;
            return fetch(path + "/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            })
                .then(res => {
                    if (res.status === 200) {
                        addForm.reset();
                        prevTag.style = null;
                        mdBox.classList.remove("active");
                        createCard(body, block);
                        pets.push(body);
                        localStorage.setItem("three-cats", JSON.stringify(pets));
                    }
                })
        })
})