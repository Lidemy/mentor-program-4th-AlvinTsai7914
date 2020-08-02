const request = require('request');
const process = require('process')


request.get(
    `https://restcountries.eu/rest/v2/name/${process.argv[2]}`,
    function (error,response,body) {
        var countries = JSON.parse(body) 
        for (var i=0; i<countries.length; i++) {
            console.log(`國家：${countries[i].name}`)
            console.log(`首都：${countries[i].capital}`)
            console.log(`貨幣：${countries[i].currencies[0].code}`)
            console.log(`國碼：${countries[i].callingCodes}`)
            console.log(`=============`)
        }
    }
);



