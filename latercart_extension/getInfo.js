const prodname = document.getElementById('name').innerHTML;
const prodprice = document.getElementById('price1').innerHTML;
const prodimg = document.getElementById('productImg').src;

const product = {name:prodname, price:prodprice, img:prodimg};

chrome.storage.sync.set({product:product}, ()=>
console.log("product is set"))
