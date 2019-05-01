//get the site_selector info from the db

axios.get('http://localhost:3000/api/site_selectors',
  { params: { site_name: document.location.origin } })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });



const prodname = $("#name").html();
const prodprice = $("#price1").html();
const prodimg = $("#productImg").prop("src");

const sitename = document.location.origin
const product = {name:prodname, price:prodprice, img:prodimg};





chrome.storage.sync.set({product:product}, ()=>
console.log("product is set"))

console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")