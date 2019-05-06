// import product from './getInfo.js'
const popProduct = {}

chrome.storage.sync.get(['product'], function ({ product }) {
  popProduct.name = product.name
  popProduct.img_url = product.img
  popProduct.price = product.price
  popProduct.state = false

  $("#title").html(popProduct.name)
  $("#price").html(popProduct.price)
  $("#img").attr("src", popProduct.img_url)
  

  
  // post new product on confirm
  $("#confirm").click(function () {

    let title = $("#title").html()
    let price = $("#price").html()
    let img = $("#img").attr("src")

    axios({
      method: 'get',
      url: 'http://localhost:3000/api/wishlists',
      headers: { 'Authorization': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTcyNTMyMDksInN1YiI6MSwibmFtZSI6IkFsaWNlIn0.xkfpdW-MQpVZ9M4xCN5ns7pNO6Fr1X4yKvzxnozUnNI" }
    })
      .then(response => {
        //generate user lists with checkboxes
        $("#firstPage").css("display", "none")
        $("#lists").append("<ul>Add to List(s)<br><br>")
        response.data.forEach((list) =>
          $("ul").append(`<li>${list.name}<input id="${list.id}" type="checkbox"></li>`)
        )
        $('#lists').append('</ul>')
        $("#secondPage").css("display", "block")
        //give user ability to review 
        $("#heart5").click(() => {
          $("#heart5").attr("src", "/images/fullHeart.png")
          $("#heart4").attr("src", "/images/fullHeart.png")
          $("#heart3").attr("src", "/images/fullHeart.png")
          $("#heart2").attr("src", "/images/fullHeart.png")
          $("#heart1").attr("src", "/images/fullHeart.png")
        })

        $("#heart4").click(() => {
          $("#heart5").attr("src", "/images/emptyHeart.png")
          $("#heart4").attr("src", "/images/fullHeart.png")
          $("#heart3").attr("src", "/images/fullHeart.png")
          $("#heart2").attr("src", "/images/fullHeart.png")
          $("#heart1").attr("src", "/images/fullHeart.png")
        })

        $("#heart3").click(() => {
          $("#heart5").attr("src", "/images/emptyHeart.png")
          $("#heart4").attr("src", "/images/emptyHeart.png")
          $("#heart3").attr("src", "/images/fullHeart.png")
          $("#heart2").attr("src", "/images/fullHeart.png")
          $("#heart1").attr("src", "/images/fullHeart.png")
        })

        $("#heart2").click(() => {
          $("#heart5").attr("src", "/images/emptyHeart.png")
          $("#heart4").attr("src", "/images/emptyHeart.png")
          $("#heart3").attr("src", "/images/emptyHeart.png")
          $("#heart2").attr("src", "/images/fullHeart.png")
          $("#heart1").attr("src", "/images/fullHeart.png")
        })

        $("#heart1").click(() => {
          $("#heart5").attr("src", "/images/emptyHeart.png")
          $("#heart4").attr("src", "/images/emptyHeart.png")
          $("#heart3").attr("src", "/images/emptyHeart.png")
          $("#heart2").attr("src", "/images/emptyHeart.png")
          $("#heart1").attr("src", "/images/fullHeart.png")
        })

        $("#submit").click((e) => {
          e.preventDefault()

          let listIds = []
          for (list of $("input[type='checkbox']:checked")) {
            listIds.push(list.id)
          }
          let rating = $(".heart[src$='/images/fullHeart.png']").length
          let notes = $("textarea").val()

          listIds.forEach((list) => {
            // code for posting a new product 
            axios.post('http://localhost:3000/api/products',
              { name: title, price: price, img_url: img, wishlist_id: list, rating: rating, note: notes })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
          })
        })
      })
      .catch(error => {
        console.log(error)
      })
  })
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
