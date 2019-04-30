const prodname = document.getElementsByTagName('title')[0].innerHTML;
const prodprice = document.getElementsByClassName('css-14hdny6')[0].innerHTML;
const prodimg = document.getElementsByClassName('css-19iuywx')[0].innerHTML;

const product = {name:prodname, price:prodprice, img:prodimg};
// console.log("getinfo")
console.log(product)
chrome.storage.sync.set({product:product}, ()=>
console.log("product is set"))
