//get the site_selector info from the db
axios.get('http://localhost:3000/api/site_selectors',
  { params: { site_name: document.location.origin } })
  .then(function (response) {
    var prodname = $(record.title_tag).html();
    var prodprice = $(record.price_tag).html();
    var prodimg = $(record.img_tag).prop("src");
    // let record = response.data[0];
    // if (record){ 
    // var prodname = $(record.title_tag).html();
    // var prodprice = $(record.price_tag).html();
    // var prodimg = $(record.img_tag).prop("src");
    // } else {
    // var prodname = $("title").html();
    // var prodprice = $(".PDPPrice_3HTapM").html();
    // var prodimg = $(".HyperLink_6o9ywu ProductMediaCarouselStyle_XKpkhr").prop("src");
    // }

    const product = { name: prodname, price: prodprice, img: prodimg };
    chrome.storage.sync.set({ product: product }, () =>
      console.log("product is set"))
  })
  .catch(function (error) {
    console.log(error);
  });


