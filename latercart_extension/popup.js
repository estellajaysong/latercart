// import product from './getInfo.js'
const popProduct = {}

chrome.storage.sync.get(['product'], function ({ product }) {
  popProduct.name = product.name
  popProduct.img_url = product.image
  popProduct.price = product.price

  $( "#title" ).html(popProduct.name)
  $( "#price").html(popProduct.price)
  $( "#img" ).attr("src", "https://www.sephora.com" + popProduct.img_url)

  // post new product on confirm
  $( "#confirm" ).click(function () {
    axios.post('http://localhost:3000/api/products#create', 
    {name: popProduct.name, price: popProduct.price, img_url: popProduct.img_url, wishlist_id: 1})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  })

  $( "#editName").click(() => {
    let placeholder = popProduct.name
    let input = `<form class='editName'><input type='text' placeholder='${placeholder}' name='name'></form>`
    $( "#title").html(input)
    $( ".editName").submit((e) => {
    e.preventDefault()
    console.log($( ".editName").text())
    console.log(e)
    console.log("DID IT")})
  })

})   



  
  // send request to http server
  // <link rel="canonical" href="https://www.sephora.com/ca/en/product/power-trio-digital-bundle-P444308">