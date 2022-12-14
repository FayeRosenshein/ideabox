var ideas = []
var newIdea;

var showIdeaButton = document.querySelector('#show-idea-button')
var formInput = document.querySelector('#idea-form')
var titleInput = document.querySelector('#title-input')
var bodyInput = document.querySelector('#body-input')
var searchInput = document.querySelector('#search-input')
var searchButton = document.querySelector('#search-button')
var saveButton = document.querySelector('#save-button')
var ideaCardGrid = document.querySelector('#idea-card-grid')

showIdeaButton.addEventListener('click', function () {
    changeIdeasButton()
})

saveButton.addEventListener('click', function () {
    saveIdea()
})

formInput.addEventListener('input', function () {
    enableSaveButton()
})

searchInput.addEventListener('input', function () {
    filterIdeas()
})

ideaCardGrid.addEventListener('click', function (event) {
    deleteIdea(event)
    starIdea(event)
    displayIdeas()
})

function enableSaveButton() {
    if (titleInput.value !== '' && bodyInput.value !== '') {
        saveButton.classList.remove('disabled')
    } else {
        saveButton.classList.add('disabled')
    }
}

function saveIdea(title, body) {
    newIdea = new Idea(title, body)
    newIdea.title = titleInput.value
    newIdea.body = bodyInput.value
    if (titleInput.value !== '' && bodyInput.value !== '') {
        ideas.push(newIdea)
        displayIdeas()
        clearForm()
    }
}

function ideaCard(i) {
        ideaCardGrid.innerHTML += `
        <article class="idea-card" id="${ideas[i].id}">
            <nav class="card-nav">
                <img src="${star(i)}" class="star-image" id="star-image">
                <img src="./assets/delete.svg" class="delete-image" id="delete-image">
            </nav>
            <section class="card-body">
                <p class="idea-title" id="idea-title">${ideas[i].title}</p>
                <p class="idea-body" id="idea-body">${ideas[i].body}</p>
            </section>
            <section class="bottom-bar">
            </section>
        </article>`
}

function displayIdeas() {
    showIdeaButton.innerText = 'Show Starred Ideas'
    ideaCardGrid.innerHTML = ''
    for (var i = 0; i < ideas.length; i++) {
        ideaCard(i)
    }
}

function displayStarred() {
    showIdeaButton.innerText = 'Show All Ideas'
    ideaCardGrid.innerHTML = ''
    for (var i = 0; i < ideas.length; i++) {
        if (ideas[i].star) {
            ideaCard(i)
        }
    }
}

function changeIdeasButton() {
    if (showIdeaButton.innerText === 'Show Starred Ideas') {
        displayStarred()
    } else if (showIdeaButton.innerText === 'Show All Ideas') {
        displayIdeas()
    }
}

function clearForm() {
    titleInput.value = ''
    bodyInput.value = ''
    saveButton.classList.add('disabled')
}

function deleteIdea(event) {
    var targetId = event.target.closest('article').id
    if (event.target.id === 'delete-image') {
        for (var i = 0; i < ideas.length; i++) {
            if (ideas[i].id === Number(targetId)) {
                ideas.splice(i, 1)
            }
        }
    }
}

function starIdea(event) {
    var targetStarId = event.target.closest('article').id
    if (event.target.id === 'star-image') {
        for (var i = 0; i < ideas.length; i++) {
            if (ideas[i].id === Number(targetStarId)) {
                ideas[i].updateIdea()
            }
        }
    }
}

function star(i) {
    if (ideas[i].star) {
        return './assets/star-active.svg'
    }
    return './assets/star.svg'
}

function filterIdeas() {
    ideaCardGrid.innerHTML = ''
    for (var i = 0; i < ideas.length; i++) {
        if (ideas[i].title.includes(searchInput.value) || ideas[i].body.includes(searchInput.value)) {
            ideaCard(i)
        }
    }
}