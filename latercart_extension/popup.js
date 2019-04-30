// import product from './getInfo.js'
const popProduct = {}

chrome.storage.sync.get(['product'], function ({ product }) {
  popProduct.name = product.name
  popProduct.img_url = product.image
  popProduct.price = product.price

  document.getElementById('title').innerHTML = popProduct.name
  document.getElementById('price').innerHTML = popProduct.price
  document.getElementById('img').setAttribute("src", "https://www.sephora.com" + popProduct.img_url)
  // alert(popProduct.img)

  document.getElementById("confirm").addEventListener("click", function () {

    console.log(popProduct)

    axios.post('http://localhost:3000/api/products#create', 
    {name: popProduct.name, price: popProduct.price, img_url: popProduct.img_url, wishlist_id: 1})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  })

})   



  
  // send request to http server
  // <link rel="canonical" href="https://www.sephora.com/ca/en/product/power-trio-digital-bundle-P444308">