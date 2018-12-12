/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2018. MIT licensed.
 */
var body = document.querySelector('body');
var buttons = ["Prev", "Next", "Parent", "Children"];
var btnSearch, btnChildren, btnParent, btnNext, btnPrevious, closeIcon, form, chosenElement;


function createMenu() {
    var fragment = document.createDocumentFragment();
    var form = document.createElement('form');
    var input = document.createElement("input");
    var h4 = document.createElement("h4");
    closeIcon = document.createElement("span");
    btnSearch = document.createElement("button");
    var style = document.createElement("style");

    btnSearch.innerText = "Search";
    h4.innerText = "Search node element";
    h4.classList.add("menu-header");
    h4.style.cursor = "pointer";
    style.innerHTML = '.chosen {outline: 1px solid red}; .form {border-color: #fff;}';
    btnSearch.setAttribute('style', `
            margin-left: 10px;
            padding: 5px;
            border-radius: 5px;
            border-color: #c75a28;
            background: #eb7d4b;
            color: #000; 
        `);

    form.setAttribute('style', `
        width: 300px;
        height: 100px;
        position: fixed;
        top: 20px;
        background: #e89067;
        padding: 20px;
        
    `);
    input.setAttribute('style', `
        width: 225px;
        margin-bottom: 10px;
    `);
    closeIcon.setAttribute('style', `
        position: absolute;
        top: 0;
        right: 6px;
        cursor: pointer;
    `);

    closeIcon.innerHTML = '&#10006';
    form.classList.add('form');
    input.classList.add('input');
    closeIcon.classList.add('closeIcon');
    btnSearch.classList.add('search-button');

    body.appendChild(style);
    form.appendChild(h4);
    form.appendChild(closeIcon);
    form.appendChild(input);
    form.appendChild(btnSearch);

    buttons.forEach((buttonName) => {
        var button = document.createElement("button");
        button.innerText = buttonName;
        button.classList.add(buttonName + '-button');
        button.setAttribute('style', `
            margin-left: 10px;
            padding: 5px;
            border-radius: 5px;
            border-color: #c75a28;
            background: #eb7d4b;
            color: #000;
        `);
        button.style.disabled = "background";
        button.style.filter = "grayscale(70%)";
        button.disabled = true;
        form.appendChild(button);
    });
    fragment.appendChild(form);
    body.appendChild(fragment);

    form = document.querySelector('.form');
    closeIcon = document.querySelector('.closeIcon');

    btnPrevious = document.querySelector('.Prev-button');
    btnNext = document.querySelector('.Next-button');
    btnParent = document.querySelector('.Parent-button');
    btnChildren = document.querySelector('.Children-button');

    form.addEventListener('click', preventDef);
    closeIcon.addEventListener('click', closeForm);
    btnSearch.addEventListener('click', findNode);
    btnPrevious.addEventListener('click', toPreviousSibling);
    btnNext.addEventListener('click', toNextSibling);
    btnParent.addEventListener('click', toParent);
    btnChildren.addEventListener('click', toChild);
}

function preventDef(event) {
    event.preventDefault();
}

function findNode() {
    var input = document.querySelector('.input');
    chosenElement = document.querySelector('.chosen');
    if (chosenElement) {
        chosenElement.classList.remove('chosen');
        checkButtons();
    }
    if (input.value) {
        var searchNodeName = input.value;
        var searchNode = document.querySelector(searchNodeName);
        if (searchNode) {
            searchNode.classList.add("chosen");
            checkButtons();
        } else {
            console.log("No node found!")
        }
        input.value = "";
    }
}

function checkButtons() {
    chosenElement = document.querySelector('.chosen');
    btnSearch = document.querySelector('.Search-button');
    btnChildren = document.querySelector('.Children-button');
    btnParent = document.querySelector('.Parent-button');
    btnNext = document.querySelector('.Next-button');
    btnPrevious = document.querySelector('.Prev-button');

    if (chosenElement) {
        if (chosenElement.children.length) {
            btnChildren.disabled = false;
            btnChildren.style.filter = "grayscale(0%)";
        } else {
            btnChildren.disabled = true;
            btnChildren.style.filter = "grayscale(70%)";
        }

        if (chosenElement.parentNode) {
            btnParent.disabled = false;
            btnParent.style.filter = "grayscale(0%)";
        } else {
            btnParent.disabled = true;
            btnParent.style.filter = "grayscale(70%)";
        }

        if (chosenElement.nextElementSibling) {
            btnNext.disabled = false;
            btnNext.style.filter = "grayscale(0%)";
        } else {
            btnNext.disabled = true;
            btnNext.style.filter = "grayscale(70%)";
        }

        if (chosenElement.previousElementSibling) {
            btnPrevious.disabled = false;
            btnPrevious.style.filter = "grayscale(0%)";
        } else {
            btnPrevious.disabled = true;
            btnPrevious.style.filter = "grayscale(70%)";
        }
    } else {
        btnChildren.disabled = true;
        btnParent.disabled = true;
        btnNext.disabled = true;
        btnPrevious.disabled = true;
    }
}

function toNextSibling() {
    chosenElement = document.querySelector('.chosen');
    if (chosenElement) {
        chosenElement.classList.remove('chosen');
        chosenElement.nextElementSibling.classList.add('chosen');
        checkButtons();
    }
}

function toPreviousSibling() {
    chosenElement = document.querySelector('.chosen');
    if (chosenElement) {
        chosenElement.classList.remove('chosen');
        chosenElement.previousElementSibling.classList.add('chosen');
        checkButtons();
    }
}

function toChild() {
    chosenElement = document.querySelector('.chosen');
    if (chosenElement) {
        chosenElement.classList.remove('chosen');
        chosenElement.children[0].classList.add('chosen');
        checkButtons();
    }
}

function toParent() {
    chosenElement = document.querySelector('.chosen');
    if (chosenElement) {
        chosenElement.classList.remove('chosen');
        chosenElement.parentNode.classList.add('chosen');
        checkButtons();
    }
}

function closeForm() {
    form = document.querySelector('.form');
    form.remove();
    chosenElement = document.querySelector('.chosen');
    if(chosenElement) {
      chosenElement.classList.remove('chosen');
    }
}

createMenu();
dragElement(document.querySelector('.form'));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    document.querySelector(".menu-header").onmousedown = dragMouseDown;


    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}