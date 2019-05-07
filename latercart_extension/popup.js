// import product from './getInfo.js'

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.executeScript(
    tabs[0].id,
    {
      file: 'jQuery.js'
    });
  chrome.tabs.executeScript(
    tabs[0].id,
    {
      file: 'axios.js'
    });
  chrome.tabs.executeScript(
    tabs[0].id,
    {
      file: 'getInfo.js'
    });
});


setTimeout(() => {

  const popProduct = {}

  chrome.storage.sync.get(['product'], function ({ product }) {
  
    popProduct.name = product.name
    popProduct.img_url = product.img
    popProduct.price = product.price
  
    $("#loading").css("display", "none")
    $("#title").html(popProduct.name)
    $("#price").html(popProduct.price)
    $("#img").attr("src", popProduct.img_url)
    $("#confirm").css("display", "inline-block")
    $(".editIcon").css("display", "inline")
  
    $("#confirm").click(function () {
  
      let title = $("#title").html()
      let price = $("#price").html()
      let img = $("#img").attr("src")
      let url = product.url

  
      if (price !== popProduct.price) {
        chrome.storage.sync.set({ price_input: price }, () =>
          console.log("price_input set"))
  
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.executeScript(
            tabs[0].id,
            {
              file: 'makePriceQuery.js'
            });
        });
  
        chrome.storage.sync.get(['price_selector'], function ({ price_selector }) {
          console.log(`$("${price_selector}").html()`)
        })
      }
   
  
    // if (price !== popProduct.price){
  
    // }
  
    // if (title !== popProduct.name){
  
    // }
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/wishlists',
      headers: { 'Authorization': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTczNDk2NTMsInN1YiI6MSwibmFtZSI6IkFsaWNlIn0.jNoDnskdlnY2EpJMtP_dx6GbbAQq4OjgRwVWgOdn7Jc" }
    })
      .then(response => {
        //generate user lists with checkboxes
        $("#firstPage").css("display", "none")
        $("#lists").append("<ul>Add to List(s)<br><br>")
        response.data.forEach((list) =>
          $("ul").append(`<li><input id="${list.id}" type="checkbox"> ${list.name}</li>`)
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
  
        console.log($("#title").html())
        console.log(popProduct.name)
  
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
              { name: title, price: price, img_url: img, wishlist_id: list, rating: rating, note: notes, url: url })
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
      $(".editIcon").css("display", "none")
      if (field === "#img") {
        $("#imgForm").html(input)
        $(".edit").submit((e) => {
          e.preventDefault()
          $(".editIcon").css("display", "inline")
          let img_input = $(`.input${+ button}`).val()
          console.log(img_input)
          $("#imgForm").html(`<img id="img" src=${$(`.input${+ button}`).val()}><img id="editImg" class="editIcon" src="/images/pencil.png">`)
        })
      } else {
        $(field).html(input)
        $(".edit").submit((e) => {
          e.preventDefault()
          $(".editIcon").css("display", "inline")
          if (field === "#title") {
            let title_input = $(`.input${+ button}`).val()
            console.log(title_input)
          } else if (field === "#price") {
            let price_input = $(`.input${+ button}`).val()
            console.log(price_input)
          }
          $(field).html($(`.input${+ button}`).val())
        })
      }
    })
  }
  changeVal("#editName", "#title")
  changeVal("#editImg", "#img")
  changeVal("#editPrice", "#price")
  
  
  console.log("end of script")
}, 1500)
