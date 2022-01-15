const { treasureData} = require("../db/data/dev-data");

//create a function that creates reference object of the shop owner and shop id for every shop
function referenceObj(arr) {
    let arr1 = [...arr]
  if (arr1.length === 0) {
    return {};
  } else {        
      const result = {}
    arr1.forEach((object) => {
  const objKey = object.shop_name;
  const objValue = object.shop_id;
   result[objKey] = objValue 
  })   
  console.log(result)
// return result  
}   
}

function formatTreasure (referenceObj, treasureData) {
    treasureData.forEach((data))
}
//create a function that manipulates the treasure data to remove shop key and replace it with a shop id key, WITHOUT maniuplating the original data

module.exports = {referenceObj, formatTreasure};
