var fs = require('fs');

fs.readFile('theBay.rtf', 'utf8', function (err, contents) {
  let theBay = contents
  let image = 'product-item__price-list">$94.99'



  getElement = () => {

    //shows what it returns w the info produced by getElement
    htmlQuery = (queryInfo) => {
      let htmlInfo = ""
      let startIndex = theBay.indexOf(queryInfo)

      if (queryInfo[queryInfo.length - 1] === ">") {
        for (let i = startIndex + queryInfo.length; theBay[i] !== `<`; i++) {
          htmlInfo += theBay[i]
        }
      } else {
        for (let i = startIndex + queryInfo.length; theBay[i] !== `"`; i++) {
          htmlInfo += theBay[i]
        }
      }
      // console.log(htmlInfo)
      return htmlInfo
    }

    // recursive if statement to find the right item if there's multiple items with the same html tag info
    // extendQuery = () => {
    //   if (htmlQuery(htmlTag) !== image) {
    //     for (let i = startIndex - htmlTag.length - 1; theBay[i] !== "<"; i--) {
    //       htmlTag = theBay[i] + htmlTag
    //     }
    //     htmlTag = "<" + htmlTag
    //     // console.log(htmlTag)
    //   } else {
    //     // console.log(htmlTag)
    //     return htmlTag
    //   }
    // }

    let startIndex = theBay.indexOf(image)
    let htmlTag = "";

    for (let i = startIndex - 1; theBay[i] !== "<"; i--) {
      htmlTag = theBay[i] + htmlTag
    }
    htmlTag = "<" + htmlTag

    for (let i = startIndex ; theBay[i] !== ">"; i++) {
      htmlTag = htmlTag + theBay[i]
    }
    htmlTag = htmlTag + ">" 

    console.log(htmlTag)
    // extendQuery()
    return htmlTag
  }

  getElement()




});
