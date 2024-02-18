

// ID reference:
// 1: Ads
// 2: TOILETS
// 3: BASINS
// 4: TOILET ACCESSORIES
// 5: MIRRORS/MIRROR CABINETS
// 6: Toilets


class Product {
    constructor(model, genre, size, details, id) {
      this.model = model;
      this.genre = genre;
      this.size = size;
      this.details = details;
      this.id = id;
    }
}

const toilets = [
    new Product(`Mayfair WC 8116`, `toilets`, ``, ``, `2-1`),
    new Product(`Mayfair WC 8126`, `toilets`, ``, ``, `2-2`)
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