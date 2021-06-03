const fs = require('fs');
var Chance = require('chance');

var chance = new Chance();
var regions = ["United States",
    "Europe",
    "APAC",
    "Latin America"]

let index = 0;
var users = new Array(1011).fill().map(function () {
    return {
        id: index++,
        birthday: chance.integer({ min: 1, max: 12 }),
        spend: chance.integer({ min: 0, max: 5000 }),
        region: regions[chance.integer({ min: 0, max: 3 })],
        gender: chance.gender(),
    };
});
var json = JSON.stringify({ users: users }, null, 2);

fs.writeFile("./testUserData.json", json, (err) => {
    if(err) throw err;
});
console.log("Done");