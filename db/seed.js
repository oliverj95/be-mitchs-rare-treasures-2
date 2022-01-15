const db = require("./");
const format = require("pg-format");
const {referenceObj} = require("../utils/index");
const seed = ({ shopData, treasureData }) => {
  return db
    .query(`DROP TABLE IF EXISTS treasures;`)
    .then(() => {
      return db.query("DROP TABLE IF EXISTS shops;");
    })
    .then(() => {
      return db.query(`
      CREATE TABLE shops (
        shop_id SERIAL PRIMARY KEY,
        shop_name VARCHAR(255) NOT NULL,        
        owner TEXT,
        slogan TEXT
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE treasures (
        treasure_id SERIAL PRIMARY KEY,
        treasure_name TEXT NOT NULL,
        colour TEXT,
        age INT,
        cost_at_auction FLOAT,
        shop_id INT,
        FOREIGN KEY (shop_id) REFERENCES shops(shop_id));`);
    })
    .then(() => {
      // INSERT INTO shops (owner, shop_name, slogan) VALUES %L RETURNING *;
      //format shop data into a format for PG-format to deal with
      const formattedShopNames = shopData.map((shop) => [
        shop.shop_name,        
        shop.owner,
        shop.slogan,
      ]);

      const insertQuery = format(
        `INSERT INTO shops (owner, shop_name, slogan) VALUES %L RETURNING *;
      `,
        formattedShopNames
      );
      return db.query(insertQuery);
    })
    .then((shops) => {
      return shops.rows;
})
    .then((shops) => {
    const shopRef = 
// const formattedTreasureData = treasureData.map((treasure) => 
//  [ 
//   treasure.treasure_name, 
//   treasure.colour,
//   treasure.age,
//   treasure.cost_at_auction,
//   treasure.shop
// ])
// console.log(formattedTreasureData)
})
};

module.exports = seed;
