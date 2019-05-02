//get the site_selector info from the db
axios.get('http://localhost:3000/api/site_selectors',
  { params: { site_name: document.location.origin } })
  .then(function (response) {
    let record = response.data[0];
    const prodname = $(record.title_tag).html();
    const prodprice = $(record.price_tag).html();
    const prodimg = $(record.img_tag).prop("src");

    const product = { name: prodname, price: prodprice, img: prodimg };

    chrome.storage.sync.set({ product: product }, () =>
      console.log("product is set"))
  })
  .catch(function (error) {
    console.log(error);
  });






