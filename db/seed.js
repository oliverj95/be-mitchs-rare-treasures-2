const db = require('./');
const seed = ({ shopData, treasureData }) => {
  return db
    .query(`DROP TABLE IF EXISTS treasures;`)
    .then(() => {
      return db.query('DROP TABLE IF EXISTS shops;')
    })
    .then(() => {
      return db.query(`
      CREATE TABLE shops (
        shop_id SERIAL PRIMARY KEY,
        shop_name VARCHAR(255) NOT NULL,
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
        FOREIGN KEY (shop_id) REFERENCES shops(shop_id));`)
    })
    .then(() => {
      const shopNames = shopData.map((shop) => [shop.shop_name])
      console.log(shopNames)

      const sql = format    })
};

module.exports = seed;
