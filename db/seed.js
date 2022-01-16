const db = require("./");
const format = require("pg-format");
const {referenceObj, formatTreasureData} = require("../utils/index");
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
      console.log(formattedShopNames)

      const insertQuery = format(
        `INSERT INTO shops (shop_name, owner, slogan) VALUES %L RETURNING *;
      `,
        formattedShopNames
      );
      return db.query(insertQuery);
    })
    .then((shops) => {
      return shops.rows;
})
    .then(
      (shopData) => {
        const shopRef = referenceObj(shopData.rows)
        const formattedTreasures = formatTreasureData(treasureData, shopRef)
        const insertTreasuresQuery = format(
          `INSERT INTO treasures (treasure_name, colour, age, cost_at_auction, shop_id) VALUES %L RETURNING *;`, 
          formattedTreasures
        )
        return db.query(insertTreasuresQuery+)
})
};

module.exports = seed;
