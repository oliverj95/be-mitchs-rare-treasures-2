const {referenceObj, formatTreasure} = require("../utils/index")

describe("referenceObj", () => {
    test("returns an empty object when passed an empty array" , () => {
        expect(referenceObj([])).toEqual({})
    })
    test("returns an object with a single reference ", () => {
        expect(referenceObj([{
            shop_id: 98,
            shop_name: 'Carlos',
            owner: 'Borer - Rath',
            slogan: 'Focused mobile website'
          }])).toEqual({
           'Borer - Rath':98
          })
    })
    test("returns an object with a multiple references ", () => {
        expect(referenceObj([{
            shop_id: 98,
            shop_name: 'Carlos',
            owner: 'Borer - Rath',
            slogan: 'Focused mobile website'
          },  {
            shop_id: 99,
            shop_name: 'Stephanie',
            owner: 'Berge - Witting',
            slogan: 'Future-proofed modular infrastructure'
          }])).toEqual({
           'Borer - Rath': 98,
           'Berge - Witting': 99
          })
            })
})
describe("Pure Function ", () => {
    test("does not mutate input" , () => {
        const input = [{
            shop_id: 99,
            shop_name: 'Stephanie',
            owner: 'Berge - Witting',
            slogan: 'Future-proofed modular infrastructure'
        }]
        referenceObj(input)
        expect(input).toEqual([{
            shop_id: 99,
            shop_name: 'Stephanie',
            owner: 'Berge - Witting',
            slogan: 'Future-proofed modular infrastructure'
        }])
    })
})
describe("formatTreasure", () => {
    test("receives and empty array and gives an empty array as result", () => {
        const input = []
expect(formatTreasure(input)).toEqual([])
    })
    test("returns an array with the updated key and value when passed a single reference ", () => {
        const input = [{
            treasure_name: 'treasure-a',
            colour: 'turquoise',
            age: 200,
            cost_at_auction: '20.00',
            shop: 'shop-b',
          }]
          const output = [{
            treasure_name: 'treasure-a',
            colour: 'turquoise',
            age: 200,
            cost_at_auction: '20.00',
            'firstname-b': 1
          }]
        expect(referenceObj(input)).toEqual(output)
})

})