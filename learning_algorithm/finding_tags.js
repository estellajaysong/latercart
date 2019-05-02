var fs = require('fs');

fs.readFile('theBay.rtf', 'utf8', function (err, contents) {
  let theBay = contents
  let image = "https://image.s5a.com/is/image/TheBay/192114454401_main"

  let startIndex = theBay.indexOf(image)

  getElement = () => {
    let htmlTag = "";

    for (let i = startIndex; theBay[i] !== "<"; i--) {
      htmlTag = theBay[i] + htmlTag
    }
    htmlTag = "<" + htmlTag

    for (let i = startIndex + 1; theBay[i] !== ">"; i++) {
      htmlTag += theBay[i]
    }
    htmlTag += ">"

    console.log(htmlTag)
  }

  // getElement()

  let queryInfo = `<meta property="og:image" content="`

  htmlQuery = () => {
    let htmlTag = ""
    let startIndex = theBay.indexOf(queryInfo)
  
    for (let i = startIndex + queryInfo.length; theBay[i] !== `"`; i++) {
      htmlTag += theBay[i]
    }

    console.log(htmlTag)

  }

  htmlQuery()


});
