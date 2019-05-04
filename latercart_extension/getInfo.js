//get the site_selector info from the db
axios.get('http://localhost:3000/api/site_selectors',
  { params: { site_name: document.location.origin } })
  .then(function (response) {
    let record = response.data[0];
    const prodname = eval(record.title_tag)
    const prodprice = eval(record.price_tag)
    const prodimg = eval(record.img_tag)
    const produrl = document.location.href

    const product = { name: prodname, price: prodprice, img: prodimg, url: produrl};

    chrome.storage.sync.set({ product: product }, () =>
      console.log("product is set"))
  })
  .catch(function (error) {
    console.log(error);
  });






