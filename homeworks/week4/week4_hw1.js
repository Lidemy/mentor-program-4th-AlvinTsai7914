const request = require('request');
const process = require('process')


request.get(
    ' https://lidemy-book-store.herokuapp.com/books?_limit=10',
    function (error,response,body) {
        var books = JSON.parse(body) 
        for (var i=0; i<books.length; i++) {
            console.log(`${i+1}. ${books[i].name}`)
        }
    }
);
