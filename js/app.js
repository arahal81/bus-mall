'use strict';
let maxAttempts = 25;
let attemptsCounter = 0;
let leftImageI;
let middleImageI;
let rightImageI;
let leftImageE = document.getElementById('leftImage');
let middleImageE = document.getElementById('middleImage');
let rightImageE = document.getElementById('rightImage');
let rsection = document.getElementById('imgDiv');
let veiwAttemptForm = document.getElementById('btnAtt');
let submitbtn = document.getElementById('submit');
let txt = document.getElementById('attemptsNumper')
let resultsBtn = document.getElementById('resultsBtn');
let formattemp = document.getElementById('attform');
let rl = document.getElementById('rl')
let namesAll = [];
let votesAll = [];
let shownAll = [];
function ProductsImgs(name, src) {
    this.name = name;
    this.src = src;
    this.shown = 0;
    this.votes = 0;
    ProductsImgs.allProductsImg.push(this);
    namesAll.push(this.name);

}

/*
function updatemax() {
    let new_max = prompt("The default number of attempts is 25. If you want to change it, please enter the number")
    if (condition) {
        
    }
}*/
ProductsImgs.allProductsImg = [];

new ProductsImgs('bag', 'img/bag.jpg');
new ProductsImgs('banana', 'img/banana.jpg');
new ProductsImgs('goat-bathroom', 'img/bathroom.jpg');
new ProductsImgs('boots', 'img/boots.jpg');
new ProductsImgs('breakfast', 'img/breakfast.jpg');
new ProductsImgs('bubblegum', 'img/bubblegum.jpg');
new ProductsImgs('chair', 'img/chair.jpg');
new ProductsImgs('cthulhu', 'img/cthulhu.jpg');
new ProductsImgs('dog-duck', 'img/dog-duck.jpg');
new ProductsImgs('dragon', 'img/dragon.jpg');
new ProductsImgs('pen', 'img/pen.jpg');
new ProductsImgs('pet-sweep', 'img/pet-sweep.jpg');
new ProductsImgs('scissors', 'img/scissors.jpg');
new ProductsImgs('shark', 'img/shark.jpg');
new ProductsImgs('sweep', 'img/sweep.png');
new ProductsImgs('tauntaun', 'img/tauntaun.jpg');
new ProductsImgs('unicorn', 'img/unicorn.jpg');
new ProductsImgs('usb', 'img/usb.gif');
new ProductsImgs('water-can', 'img/water-can.jpg');
new ProductsImgs('wine-glass', 'img/wine-glass.jpg');
//console.log(ProductsImgs.allProductsImg);



function setLSData() {

    let allProductsLS = JSON.stringify(ProductsImgs.allProductsImg);
    localStorage.setItem('allProducts', allProductsLS);

    //console.log(allProductsLS);

}

function getLSData() {

    let stringallProductsLS = localStorage.getItem('allProducts');
    let objectallProductsLS = JSON.parse(stringallProductsLS);
    //console.log('allProducts ' + objectallProductsLS);


    //console.log(nOShownAll);

    if (objectallProductsLS !== null) {
        ProductsImgs.allProductsImg = objectallProductsLS;
    }
}
getLSData();
function generateRandom() {
    return Math.floor(Math.random() * ProductsImgs.allProductsImg.length);
}


veiwAttemptForm.addEventListener('click', showForm)

function showForm(event) {
    // event.preventDefault();
    txt.style.display = 'block';
    submitbtn.style.display = 'block';
    //submitbtn.style.display = 'none'
    veiwAttemptForm.style.display = 'none';
    // txtbox.style.visibility;


}

submitbtn.addEventListener('click', updateAttNum)
function updateAttNum(event) {
    event.preventDefault();

    //console.log(maxAttempts);
    maxAttempts = txt.value;
    txt.style.display = 'none';
    submitbtn.style.display = 'none';


    //txt.style.display = 'none';
    // submitbtn.style.display = 'block'



    // txtbox.style.visibility;

}




function renderThreeImages() {
    let lastImages = [leftImageI, middleImageI, rightImageI]
    //console.log(lastImages);
    do {
        leftImageI = generateRandom();
    } while (lastImages.includes(leftImageI));
    //console.log(leftImageI);
    do {
        middleImageI = generateRandom();
    } while (leftImageI === middleImageI || lastImages.includes(middleImageI));
    // console.log(middleImageI);
    do {
        rightImageI = generateRandom();
    } while (rightImageI === leftImageI || rightImageI === middleImageI || lastImages.includes(rightImageI));
    //  console.log(rightImageI);

    //console.log(ProductsImgs.allProductsImg[leftImageI].src);
    leftImageE.src = ProductsImgs.allProductsImg[leftImageI].src;
    middleImageE.src = ProductsImgs.allProductsImg[middleImageI].src;
    rightImageE.src = ProductsImgs.allProductsImg[rightImageI].src;

}
renderThreeImages();

//leftImageE.addEventListener('click', userClick);
//middleImageE.addEventListener('click', userClick)
//rightImageE.addEventListener('click', userClick);
imgDiv.addEventListener('click', userClick)

function userClick(event) {
    formattemp.remove();
    // veiwAttemptForm.style.display = 'none';
    // give the user 10 tries to click after that show result
    attemptsCounter++;

    // console.log(event.target.id);

    if (attemptsCounter <= maxAttempts) {
        if (event.target.id === 'leftImage') {
            ProductsImgs.allProductsImg[leftImageI].votes++;

        } else if (event.target.id === 'middleImage') {
            ProductsImgs.allProductsImg[middleImageI].votes++;
        }
        else {
            ProductsImgs.allProductsImg[rightImageI].votes++;
        }
        ProductsImgs.allProductsImg[leftImageI].shown++;
        ProductsImgs.allProductsImg[middleImageI].shown++;
        ProductsImgs.allProductsImg[rightImageI].shown++;
        renderThreeImages();

    } else {
        imgDiv.removeEventListener('click', userClick);
        //console.log(ProductsImgs.allProductsImg);
        resultsBtn.style.display = 'block';

        for (let i = 0; i < ProductsImgs.allProductsImg.length; i++) {
            votesAll.push(ProductsImgs.allProductsImg[i].votes);

            shownAll.push(ProductsImgs.allProductsImg[i].shown);

        }

        drowChart();
        setLSData();

    }

}

resultsBtn.addEventListener('click', viewResult)
function viewResult() {
    let parent = document.getElementById('ls');
    parent.style.display = 'block'
    let h2 = document.createElement('h2');
    parent.appendChild(h2);
    h2.textContent = "Result"
    let ul = document.createElement('ul');
    parent.appendChild(ul);
    for (let i = 0; i < ProductsImgs.allProductsImg.length; i++) {
        let listitem = document.createElement('li');
        ul.appendChild(listitem);
        listitem.textContent = `${ProductsImgs.allProductsImg[i].name}: had ${ProductsImgs.allProductsImg[i].votes} votes, and was seen ${ProductsImgs.allProductsImg[i].shown} times`

    }

    resultsBtn.style.display = 'none'
}
function drowChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: namesAll,
            datasets: [{
                label: 'Shown',
                backgroundColor: '#d89216',
                borderColor: 'rgb(255, 99, 132)',
                data: shownAll
            }, {
                label: 'Votes',
                backgroundColor: '374045',
                borderColor: 'rgb(255, 99, 132)',
                data: votesAll
            }]
        },

        // Configuration options go here
        options: {

        }
    });
}





