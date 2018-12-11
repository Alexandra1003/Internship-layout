var body = document.querySelector('body');
var buttons = ["Prev", "Next", "Parent", "Children"];
var btnSearch, btnChildren, btnParent, btnNext, btnPrevious, closeIcon, form, chosenElement;


function createMenu() {
    var fragment = document.createDocumentFragment();
    var form = document.createElement('form');
    var input = document.createElement("input");
    var h4 = document.createElement("h4");
    var closeIcon = document.createElement("span");
    var btnSearch = document.createElement("button");
    var style = document.createElement("style");

    btnSearch.innerText = "Search";
    h4.innerText = "Search node element";
    style.innerText = ".chosen {outline: 1px solid red};"

    form.style.width = "300px";
    form.style.height = "100px";
    form.style.position = "absolute";
    form.style.top = "20px";
    form.style.background = "grey";
    input.style.width = "80%";

    closeIcon.classList.add("fa");
    closeIcon.classList.add("fa-times");
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
        button.disabled = true;
        form.appendChild(button);
    });
    fragment.appendChild(form);
    body.appendChild(fragment);

    var form = document.querySelector('.form');
    var closeIcon = document.querySelector('.closeIcon');

    var btnPrevious = document.querySelector('.Prev-button');
    var btnNext = document.querySelector('.Next-button');
    var btnParent = document.querySelector('.Parent-button');
    var btnChildren = document.querySelector('.Children-button');

    form.addEventListener('click', preventDef);
    closeIcon.addEventListener('click', test);
    btnSearch.addEventListener('click', findNode);
    btnPrevious.addEventListener('click', toPreviousSibling);
    btnNext.addEventListener('click', toNextSibling);
    btnParent.addEventListener('click', toParent);
    btnChildren.addEventListener('click', toChild);
}

/* function addEventListeners() {
    var form = document.querySelector('.form');
    var closeIcon = document.querySelector('.closeIcon');

    btnPrevious = document.querySelector('.Prev-button');
    btnNext = document.querySelector('.Next-button');
    btnParent = document.querySelector('.Parent-button');
    btnChildren = document.querySelector('.Children-button');

    form.addEventListener('click', preventDef);
    closeIcon.addEventListener('click', test);
    btnSearch.addEventListener('click', findNode);
    btnPrevious.addEventListener('click', test);
    btnNext.addEventListener('click', toNextSibling);
    btnParent.addEventListener('click', test);
    btnChildren.addEventListener('click', test);
} */

function test() {
    console.log("hello");
}

function preventDef(event) {
    event.preventDefault();
}

function findNode() {
    var input = document.querySelector('.input');
    var chosenElement = document.querySelector('.chosen');
    if (chosenElement) {
        chosenElement.classList.remove('chosen');
        checkButtons();
    }
    if (input.value) {
        var searchNodeName = input.value;
        var searchNode = document.querySelector(searchNodeName);
        if (searchNode) {
            searchNode.classList.add("chosen");
            console.log(searchNode);
            checkButtons();

            /* var nodeChildren = searchNode.children;
            if (nodeChildren) {
                var btnChildren = document.querySelector('.Children-button');
                btnChildren.disabled = false;
            }

            var nodeParent = searchNode.parentNode;
            if (nodeParent) {
                var btnParent = document.querySelector('.Parent-button');
                console.log(nodeParent);
                btnParent.disabled = false;
            }

            var nodeNextSibling = searchNode.nextElementSibling;
            if (nodeNextSibling) {
                var btnNext = document.querySelector('.Next-button');
                console.log(nodeNextSibling);
                btnNext.disabled = false;
            }

            var nodePreviousSibling = searchNode.previousElementSibling;
            if (nodePreviousSibling) {
                var btnPrevious = document.querySelector('.Prev-button');
                console.log(nodePreviousSibling);
                btnPrevious.disabled = false;
            } */
        } else {
            console.log("No node found!")
        }
        input.value = "";
    }
}

function checkButtons() {
    var chosenElement = document.querySelector('.chosen');
    var btnSearch = document.querySelector('.Search-button');
    var btnChildren = document.querySelector('.Children-button');
    var btnParent = document.querySelector('.Parent-button');
    var btnNext = document.querySelector('.Next-button');
    var btnPrevious = document.querySelector('.Prev-button');

    if (chosenElement) {
        if (chosenElement.children) {
            btnChildren.disabled = false;
        } else {
            btnChildren.disabled = true;
        }

        if (chosenElement.parentNode) {
            btnParent.disabled = false;
        } else {
            btnParent.disabled = true;
        }

        if (chosenElement.nextElementSibling) {
            btnNext.disabled = false;
        } else {
            btnNext.disabled = true;
        }

        if (chosenElement.previousElementSibling) {
            btnPrevious.disabled = false;
        } else {
            btnPrevious.disabled = true;
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

createMenu();

/* browsers.forEach(function (browser) {
    var h6 = document.createElement('h6');
    h6.textContent = browser;
    fragment.appendChild(h6);
});

element.appendChild(fragment); */


/* var uniqueInOrder = function (iterable) {
    var list = [];
    if (Array.isArray(iterable)) {
        var initialList = iterable;
    } else {
        initialList = iterable.split('');
    }
    initialList.forEach((item, index) => {
        if (item !== initialList[index + 1]) {
            list.push(item);
        }
    })
    return list;
}
console.log(uniqueInOrder('AAAABBBCCDAABBB'));
console.log(uniqueInOrder('aaabbbc'));
console.log(uniqueInOrder([1,2,2,3,3,3,4])); */


/* function iqTest(str) {
    var initialList = str.split(' ');
    var even = [];
    var odd = [];
    console.log(initialList);

    initialList.forEach((item, index) => {
        if (item % 2 === 0) {
            even.push(item);
        } else {
            odd.push(item);
        }
    })
    if (even.length > odd.length) {
        var result = initialList.indexOf(odd[0]) +1;
    } else {
        result = initialList.indexOf(even[0]) +1;
    }
    return result;
}

console.log(iqTest("1 2 2")); */



/* function getSum(a, b) {
        if (a < b) {
            var sum = 0;
            var temp = a;
            for (var i = 0; i < (b - a - 1); i++) {
                sum = sum + temp + 1;
                temp++;
            }
            return sum + a + b;
        } else if (a > b) {
            var sum = 0;
            var temp = b;
            for (var i = 0; i < (a - b - 1); i++) {
                sum = sum + temp + 1;
                temp++;
            }
            return sum + a + b;
        } else {
            return a;
        }

    } 

console.log(getSum(1, 7));
console.log(getSum(7, 1));
console.log(getSum(7, 7));
console.log(getSum(-3, -1));
console.log(getSum(-1, -7));
console.log(getSum(-1, 1));
console.log(getSum(-3, 2));

console.log(getSum(0, -1));
console.log(getSum(0, 1)); */