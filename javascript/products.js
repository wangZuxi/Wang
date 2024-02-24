

// ID reference:
// 1: Ads e.g. 1-0, 1-1, 1-2, so on....
// 2: TOILETS
// 3: BASINS
// 4: TOILET ACCESSORIES
// 5: MIRRORS/MIRROR CABINETS
// 6: Toilets


class Product {
    constructor(model, size, details) {
      this.model = model;
      this.size = size;
      this.details = details;
    }
}

const advertisements = [
    new Product(`Mayfair WC 8116`, ``, ``, `1-0`),
    new Product(`Mayfair WC 8126`, ``, ``, `1-1`),
    new Product(`Mayfair WC 8116`, ``, ``, `1-2`)
]

const toilets = [
    new Product(`Model WC 8116`, `680mm x 390mm x H780mm`, `S-Trap 6” & 10”.`),
    new Product(`Model WC 8126`, `700mm x 400mm x H630mm`, `P-Trap 180mm with flexible connector also for S-Trap 2” to 10”.`)
]

const basins = [
    // Basin Mixers
    new Product(`Model 019W`, ``, `Basin Mixer, Bright white & chrome.`),
    new Product(`Model 019B`, ``, `Basin Mixer, Matt black & chrome.`),
    new Product(`Model 019WH`, ``, `Basin Mixer, Bright white & chrome.`),
    new Product(`Model 019BH`, ``, `Basin Mixer, Bright black & chrome.`),

    // Wall Hung / Mounted Basins
    new Product(`Model 5300`, `515mm x 430mm x 180mm`, `Wall hung Basin.`),
    new Product(`Model 682`, `465mm x 465mm x 160mm`, `Wall hung Basin.`),
    new Product(`Model 1164-P`, `590mm x 400mm x 140mm`, `Top mount.`),

    // Stainless Steel Basin Cabinets
    new Product(`Model 1003`, `520mm x 460mm x H500mm`, `Stainless steel Basin cabinet with White marble effect.`),
    new Product(`Model 1005`, `610mm x 480mm x H500mm`, `Stainless steel Basin cabinet with White marble effect.`),
    new Product(`Model 6578`, `600mm x 480mm x H480mm`, `Water cloud Gauze table top, with a French sycamore cabinet. Sintered stone top.`),
    new Product(`Model 6628`, `610mm x 485mm x H525mm`, `Stainless steel Basin cabinet with Birch effect.`),
    new Product(`Model 6627`, `615mm x 470mm x H500mm`, `Stainless steel Basin cabinet with Matt Khaki.`),
    new Product(`Model 6622`, `700mm x 480mm x H500mm`, `Black marble table top and cabinet.`),
    new Product(`Model 1032`, `710mm x 490mm x H490mm`, `stainless steel basin cabinet.`),

    // PVC Basin Cabinets
    new Product(`Model 621`, `510mm x 450mm x H490mm`, `PVC Basin cabinet.`),

    // Solid Wood Basin Cabinets
    new Product(`Model 1182`, `Basin Cabinet: 700mm x 490mm x H500mm, Mirror: 550mm x 850mm, Wash Bowl: 620mm x 320mm x H130mm`, `Solid Wood Basin Cabinet.`),
    new Product(`Model 1224`, `Basin Cabinet: 715mm x 480mm x H500mm`, `Solid Wood Basin Cabinet.`)
]

const bathroom = [
    // Racks / Towerbars
    new Product(`Model 55402`, `D15mm x 580mm`, `Single rack, Stainless steel 304. Satin finish: Model 55402-S. Polish finish: Model 55402-P.`),
    new Product(`Model 55403`, `D15mm x 560mm`, `Double rack, Stainless steel 304. Satin finish: Model 55403-S. Polish finish: Model 55403-P.`),
    new Product(`Model 55401`, `D15mm x 570mm`, `Towelbar, Stainless steel 304. Satin finish: Model 55401-S. Polish finish: Model 55401-P.`),
    new Product(`Model 502T`, `600mm x 220mm x 150mm`, `Foldable Towerbar, Stainless steel 304. Satin finish: Model 502T-S.`),

    // Corner Shelves / Baskets
    new Product(`Model 51004`, `220mm x 220mm x H60mm`, `Corner Shelf, Stainless steel 304. Satin finish: Model 51004-S. Polish finish: Model 51004-P.`),
    new Product(`Model 51038`, `265mm x 125mm x H60mm`, `Basket, Stainless steel 304. Satin finish: Model 51038-S. Polish finish: Model 51038-P.`),
    new Product(`Model 51003`, `250mm x 250mm x H60mm`, `Corner Shelf, Stainless steel 304. Satin finish: Model 51003-S. Polish finish: Model 51003-P.`),
    new Product(`Model 51047`, `220mm x 220mm x H75mm`, `Corner Shelf, Stainless steel 304. Satin finish: Model 51047-S. Polish finish: Model 51047-P.`),

    // Others
    new Product(`Model 55411`, ``, `Paper Holder, Stainless steel 304. Satin finish: Model 55411-S. Polish finish: Model 55411-P.`),
    new Product(`Model 55404`, `80mm x 60mm x 50mm`, `Hook, Stainless steel 304. Satin finish: Model 55404-S. Polish finish: Model 55404-P.`),
    new Product(`Model 55406`, `110mm x 85mm x 100mm`, `Cup Holder, Stainless steel 304. Satin finish: Model 55406-S. Polish finish: Model 55406-P.`),
    new Product(`Model E25B`, `250mm x 250mm x 150mm`, `PVC box, black.`),
    new Product(`Model 54303`, `2er-hook: 115mm, 4er-hook: 265mm, 6er-hook: 415mm`, `Hook, Stainless steel 304. Satin finish: Model 54303-(No. of hooks)-S. Polish finish: Model 54303-(No. of hooks)-P.`),
    new Product(`Model C1`, ``, `Bedit spray, Stainless steel 304. Satin finish.`)
]

const mirrors = [
    new Product(`Model 2012-2`, `385mm x 450mm`, `Mirror, Stainless steel 304.`),
    new Product(`Model 722`, `600mm x 400mm x 130mm`, `Mirror cabinet, Stainless steel 304.`)
]



function changeIcon(){
    document.getElementById('menuIcon').innerHTML == 'menu' ? document.getElementById('menuIcon').innerHTML = 'close' : document.getElementById('menuIcon').innerHTML = 'menu'
}

let adsCount = 1;
function switchup(){
    adsCount == advertisements.length ? adsCount = 0 : 0;
    document.getElementById('ads').style.backgroundImage = `url(./images/1-${adsCount}.jpeg)`
    adsCount += 1;
}
setInterval(switchup, 3000)

function viewMoar(){
    window.location.href = './advertisements.html';
}

switch(document.querySelector('h1').innerHTML){
    case 'TOILETS':
        toilets.map((e)=>{
            document.getElementById('products').innerHTML += `
                <li class="row" id="2-${toilets.indexOf(e)}">

                <img class="col-xs-6" src="./images/2-${toilets.indexOf(e)}.jpeg" alt="product">

                <div class="col-xs-6">
                <h2>${e.model}</h2>
                <p>${e.size}</p>
                <p>${e.details}</p>
                </div>
                </li>
            `;
        })
        break;
    case 'BASINS':
        basins.map((e)=>{
            document.getElementById('products').innerHTML += `
                <li class="row" id="3-${basins.indexOf(e)}">

                <img class="col-xs-6" src="./images/3-${basins.indexOf(e)}.jpeg" alt="product">

                <div class="col-xs-6">
                <h2>${e.model}</h2>
                <p>${e.size}</p>
                <p>${e.details}</p>
                </div>
                </li>
            `;
        })
        break;
    case 'BATHROOM ACCESSORIES':
        bathroom.map((e)=>{
            document.getElementById('products').innerHTML += `
                <li class="row" id="4-${bathroom.indexOf(e)}">

                <img class="col-xs-6" src="./images/4-${bathroom.indexOf(e)}.jpeg" alt="product">

                <div class="col-xs-6">
                <h2>${e.model}</h2>
                <p>${e.size}</p>
                <p>${e.details}</p>
                </div>
                </li>
            `;
        })
        break;
    case 'MIRRORS/MIRROR CABINETS':
        mirrors.map((e)=>{
            document.getElementById('products').innerHTML += `
                <li class="row" id="5-${mirrors.indexOf(e)}">

                <img class="col-xs-6" src="./images/5-${mirrors.indexOf(e)}.jpeg" alt="product">

                <div class="col-xs-6">
                <h2>${e.model}</h2>
                <p>${e.size}</p>
                <p>${e.details}</p>
                </div>
                </li>
            `;
        })
        break;
}
