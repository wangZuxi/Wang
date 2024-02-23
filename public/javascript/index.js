
class Product {
    constructor(model, size, details) {
      this.model = model;
      this.size = size;
      this.details = details;
    }
}

const advertisements = [
    // new Product(`Mayfair WC 8116`, ``, ``, `1-1`),
    // new Product(`Mayfair WC 8126`, ``, ``, `1-2`),
    // new Product(`Mayfair WC 8116`, ``, ``, `1-3`),
    // new Product(`Mayfair WC 8126`, ``, ``, `1-4`),
    // new Product(`Mayfair WC 8116`, ``, ``, `1-5`)
]


function changeIcon(){
    document.getElementById('menuIcon').innerHTML == 'menu' ? document.getElementById('menuIcon').innerHTML = 'close' : document.getElementById('menuIcon').innerHTML = 'menu'
}


let adsCount = 1;
function switchup(){
    adsCount += 1
    adsCount == 6 ? adsCount = 1 : 1;
    document.getElementById('ads').style.backgroundImage = `url(../images/1-${adsCount}.png)`
}

function viewMoar(){
    window.location.href = './advertisements.html';
}