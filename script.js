const header = document.querySelector('header');
const clearBtn = document.getElementById('clear-btn');
const cardsContainer = document.querySelector('.cards-container');
const form = document.querySelector('form');
const bookTitle = document.getElementById('book-title');
const bookPriority = document.getElementById('book-priority');
const submit = document.querySelector('input[type="submit"]');

let tasks = [

    // {
    //     title: "Lotr",
    //     priority: "1"

    // },
    // {
    //     title: "Le Hobbit",
    //     priority: "2"

    // },
    // {
    //     title: "Le silmarillon",
    //     priority: "2"

    // },
    // {
    //     title: "Eragon",
    //     priority: "3"

    // },

];

const storing = function () {
    window.localStorage.list = cardsContainer.innerHTML.trim();
    console.log(window.localStorage.list.length)
}

const restoring = function () {

    if (window.localStorage.list && window.localStorage.list.length > 0) {
        cardsContainer.innerHTML = window.localStorage.list
        document.querySelectorAll('.card').forEach((c) => {
            c.addEventListener('click', () => {
                c.classList.toggle('checked')
                storing();
            });
        });


    }
}

const cardsDisplayer = function () {
    cardsContainer.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {

        cardsContainer.innerHTML +=
            `
        <div class="card" data-title="${tasks[i].title}">
        <p>Title: ${tasks[i].title}</p>
        <p class="${tasks[i].priority == 1 ? "high" : tasks[i].priority == 2 ? "medium" : "low"}">Priority: ${tasks[i].priority}</p>
        </div>
        `
    }

    document.querySelectorAll('.card').forEach((c) => {
        c.addEventListener('click', () => {
            c.classList.toggle('checked')
            storing();
        });
    });

    storing();
}

clearBtn.addEventListener('click', (e) => {
    document.querySelectorAll('.checked').forEach((card) => {
        const dataTitle = card.dataset.title
        tasks = tasks.filter((book) => {
            return book.title !== dataTitle
        })

        card.remove()
        storing()
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (bookTitle.value && bookPriority.value) {

        tasks.push({
            title: bookTitle.value,
            priority: bookPriority.value,
        })
        cardsDisplayer();
    }
});

restoring();




































