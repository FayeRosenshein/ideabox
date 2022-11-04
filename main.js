//main.js file that contains all DOM related JavaScript.

//Next step would be to create instances of our Idea Class

// Variables
var ideas = []
var newIdea;
// JQuery Selectors

// Main
// inputs
// buttons
var showStarredIdeaButton = document.querySelector('#show-starred-button')

// Form
// inputs
var formInput = document.querySelector('#idea-form')
var titleInput = document.querySelector('#title-input')
var bodyInput = document.querySelector('#body-input')
var searchInputValue = document.querySelector('#search-input')
// buttons
var searchButton = document.querySelector('#search-button')
var saveButton = document.querySelector('#save-button')


// Cards
// inputs
var ideaCardGrid = document.querySelector('#idea-card-grid')
var ideaCard = document.querySelector('#idea-card')
var ideaTitle = document.querySelector('#idea-title')
var ideaBody = document.querySelector('#idea-body')

// Add Event Listeners
showStarredIdeaButton.addEventListener('click', function() {
})

saveButton.addEventListener('click', function() {
    saveIdea()
})

formInput.addEventListener('input', function() {
    toggleSaveButton()
})

// searchButton.addEventListener('click', function() {
// })

// starButton.addEventListener('click', function() {
// })

ideaCardGrid.addEventListener('click', function(event) {
    deleteIdea(event)
    starIdea(event)
    displayIdeas()
})

// Functions and Event Handlers

function toggleSaveButton() {
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

function displayIdeas() {
    ideaCardGrid.innerHTML = ''
    for(var i = 0; i < ideas.length; i++) {
        ideaCardGrid.innerHTML += `
        <article class="idea-card" id="${ideas[i].id}">
            <nav class="card-nav">
                <button type="button" class="star-button" id="starButton"></button>
                <button type="button" class="delete-button" id="deleteButton"></button>
            </nav>
            <section class="card-body">
                <p class="idea-title" id="idea-title">${ideas[i].title}</p>
                <p class="idea-body" id="idea-body">${ideas[i].body}</p>
            </section>
            <section class="bottom-bar">
            </section>
        </article>`
    }
}

function clearForm() {
    titleInput.value = ''
    bodyInput.value = ''
    saveButton.classList.add('disabled')
}

function deleteIdea(event) {
    var targetId = event.target.closest('article').id
    if (event.target.id === 'deleteButton'){
        for (var i = 0; i < ideas.length; i++) {
            if (ideas[i].id === Number(targetId)){
                ideas.splice(i,1)
            }
        }
    }
}

function starIdea(event) {
    var targetStarId = event.target.closest('article').id
    if (event.target.id === 'starButton'){
        for (var i = 0; i < ideas.length; i++) {
            if (ideas[i].id === Number(targetStarId)){
                ideas[i].updateIdea()
                console.log('hi')
                event.target.classList.remove('star-button')
                event.target.classList.add('starred-button')
                console.log(event.target)
            }
        }
    }
}