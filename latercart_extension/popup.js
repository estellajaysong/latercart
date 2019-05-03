// import product from './getInfo.js'
const popProduct = {}

chrome.storage.sync.get(['product'], function ({ product }) {
  popProduct.name = product.name
  popProduct.img_url = product.img
  popProduct.price = product.price

  $("#title").html(popProduct.name)
  $("#price").html(popProduct.price)
  $("#img").attr("src", popProduct.img_url)

  // post new product on confirm
  $("#confirm").click(function () {
    let title = $("#title").html()
    let price = $("#price").html()
    let img = $("#img").attr("src")
    axios.post('http://localhost:3000/api/products',
      { name: title, price: price, img_url: img, wishlist_id: 1 })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  })
  // function to edit value before confirming a product
  function changeVal(button, field) {
    $(button).click(() => {
      let input = `<form class='edit'><input class='input${+ button}' type='text'></form>`
      if (field === "#img") {
        $("#imgForm").html(input)
        $(".edit").submit((e) => {
          e.preventDefault()
          $("#imgForm").html(`<img id="img" src=${$(`.input${+ button}`).val()}>`)
        })
      } else {
        $(field).html(input)
        $(".edit").submit((e) => {
          e.preventDefault()
          $(field).html($(`.input${+ button}`).val())
        })
      }
    })
  }
  changeVal("#editName", "#title")
  changeVal("#editImg", "#img")
  changeVal("#editPrice", "#price")
})
