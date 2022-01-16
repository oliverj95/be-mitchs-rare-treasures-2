const { referenceObj, formatTreasureData } = require("../utils/index");

describe("referenceObj", () => {
  test("returns an empty object when passed an empty array", () => {
    expect(referenceObj([])).toEqual({});
  });
  test("returns an object with a single reference ", () => {
    const input = [
      {
        shop_id: 1,
        shop_name: "shop-b",
        owner: "firstname-b",
        slogan: "slogan-b",
      },
    ];
    expect(referenceObj(input)).toEqual({
      "shop-b": 1,
    });
  });
  test("returns an object with a multiple references ", () => {
    const input = [
      {
        shop_id: 1,
        shop_name: "shop-b",
        owner: "firstname-b",
        slogan: "slogan-b",
      },
      {
        shop_id: 2,
        shop_name: "shop-d",
        owner: "firstname-c",
        slogan: "slogan-d",
      },
    ];
    expect(referenceObj(input)).toEqual({
      "shop-b": 1,
      "shop-d": 2,
    });
  });
  describe("Pure Function ", () => {
    test("does not mutate input", () => {
      const input = [
        {
          shop_id: 1,
          shop_name: "shop-b",
          owner: "firstname-b",
          slogan: "slogan-b",
        },
      ];
      referenceObj(input);
      expect(input).toEqual([
        {
          shop_id: 1,
          shop_name: "shop-b",
          owner: "firstname-b",
          slogan: "slogan-b",
        },
      ]);
    });
  });

  describe.only("formatTreasure", () => {
    test("receives an empty array and gives an empty array as result", () => {
        const input = []
expect(formatTreasure(input)).toEqual([])
    })
    test("returns an array with the updated key and value when passed a single reference ", () => {
      const input = [
        {
          treasure_name: "treasure-a",
          colour: "turquoise",
          age: 200,
          cost_at_auction: "20.00",
          shop: "shop-b",
        },
      ];
      const shopRef = {
        "shop-b": 1,
        "shop-d": 2,
        "shop-e": 3,
        "shop-f": 4,
        "shop-g": 5,
        "shop-h": 6,
        "shop-i": 7,
        "shop-a": 8,
        "shop-j": 9,
        "shop-k": 10,
        "shop-c": 11,
      };
      const output = [["treasure-a", "turquoise", 200, "20.00", 1]];
      expect(formatTreasure(input, shopRef)).toEqual(output);
    });
  });
});
