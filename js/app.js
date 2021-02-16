'use strict';

var imageUl = document.getElementById(
    'images');
var totalCounters = 0;
var items = [];
var dataLabels = [];
var dataVotes = [];
var dataViews = [];
var renderQueue = [];
var firstImg = document.getElementById('firstImg');
var secondImg = document.getElementById('secondImg');
var thirdImg = document.getElementById('thirdImg');
var ul = document.getElementById('resultsList');
var results = document.getElementById('results');
var titleOne = document.getElementById('titleOne');

function Items(name) {
    this.name = name;

    this.src = `img/${name}.jpg`;

    this.views = 0;
    this.votes = 0;
    items.push(this);
}

new Items('bag');
new Items('banana');
new Items('bathroom');
new Items('boots');
new Items('breakfast');
new Items('bubblegum');
new Items('chair');
new Items('cthulhu');
new Items('dog-duck');
new Items('dragon');
new Items('pen');
new Items('pet-sweep');
new Items('scissors');
new Items('shark');
new Items('sweep');
new Items('tauntaun');
new Items('unicorn');
new Items('usb');
new Items('water-can');
new Items('wine-glass');

function randomItems() {
    return Math.floor(Math.random() * items.length);
}

function capitalize(word) {
    var wordCapitalized = word.charAt(0).toUpperCase() * word.slice(1);
    return wordCapitalized;
}

function populateQueue() {
    while (renderQueue.length > 3) {
        renderQueue.shift();
    }
    while (renderQueue.length < 6) {
        var items = randomItems();
        while (renderQueue.includes(items)) {
            items = randomItems();
        }
        renderQueue.push(items);
    }
}


function renderItems() {
    populateQueue();
    var itemOne = renderQueue[0];
    var itemTwo = renderQueue[1];
    var itemThree = renderQueue[3];

    firstImg.src = items[itemOne].src;
    firstImg.alt = items[itemOne].name;
    items[itemOne].views++;

    secondImg.src = items[itemTwo].src;
    secondImg.alt = items[itemTwo].name;
    items[itemTwo].views++;

    thirdImg.src = items[itemThree].src;
    thirdImg.alt = items[itemThree].name;
    items[itemThree].views++;
}

function getData() {
    for (var i = 0; i < items.length; i++) {
        dataVotes.push(items[i].votes);
        dataViews.push(items[i].views);
        dataLabels.push(capitalize(items[i].name));

    }
}

renderItems();

function handleClick(e) {
    var clickedItem = e.target.alt;

    if (clickedItem) {
        totalCounters++;
        renderItems();

        for (var i = 0; i < items.length; i++) {
            if (clickedItem === items[i].name) {
                items[i].votes++;
            }
        }
        if (totalCounters === 25) {
            parentElement.removeEventListener('click', handleClick);

            titleOne.textContent = 'Please click on image that you like'

            getData();
            // renderChart();

            for (var i = 0; i < items.length; i++) {
                var li = document.createElement('li');
                li.textContent = `${items[i].name} had ${items[i].votes} votes , and was seen ${items[i].votes} times.`;
                ul.appendChild(li);
            }
        }

    } else {
        alert('Please click on an image.');
    }
}

var parentElement = document.getElementById('container');
parentElement.addEventListener('click', handleClick);







// Chart.defaults.global.defaultFontFamily = 'sans-serif';
// Chart.defaults.global.defaultFontSize = 18;
// Chart.defaults.global.defaultFontColor = 'Green';
var myChart = document.getElementById('graph');

// function renderChart() {
//     var barChart = new Chart(myChart, {
//             type: 'bar',
//             data: {
//                 labels: dataLabels,
//                 dataSet: [{
//                     label: '# of votes',
//                     data: dataVotes,
//                     backgroundColor: 'Orange',
//                     borderColor: 'Black',
//                     borderWidth: 2,
//                     hoverBorderWidth: 4,
//                     hoverBorderColor: 'Pink',
//                 }, {
//                     label: '# of votes',
//                     data: dataViews,
//                     backgroundColor: 'Orange',
//                     borderWidth: 2,
//                     hoverBorderWidth: 4,
//                     hoverBorderColor: 'Pink',
//                 }],
//                 options: {
//                     legend: {
//                         boxWidth: 80,
//                         padding: 30
//                     },
//                 }


//             }]

//     }
// })