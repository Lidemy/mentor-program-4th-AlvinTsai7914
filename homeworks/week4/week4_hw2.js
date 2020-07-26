const request = require('request');
const process = require('process')


if (process.argv[2] == 'list') {
    request.get(
        'https://lidemy-book-store.herokuapp.com/books?_limit=20',
        function (error,response,body) {
            console.log(`查詢前 20 本書籍`)
            var books = JSON.parse(body) 
            for (var i=0; i<books.length; i++) {
                console.log(`${i+1}. ${books[i].name} id: ${books[i].id}`)
            }
        }
    );
}else if (process.argv[2] == 'read') {
    request.get(
        'https://lidemy-book-store.herokuapp.com/books/' + process.argv[3],
        function (error,response,body) {
            console.log(`依 id 查詢書名`)
            var books = JSON.parse(body) 
            console.log(`id: ${process.argv[3]} ，書名：「${books.name}」`)
        }
    );
}else if (process.argv[2] == 'delete') {
    request.delete(
        'https://lidemy-book-store.herokuapp.com/books/' + process.argv[3],
        function (error,response,body) {
            if (response.statusCode == 200) {
                console.log(`id: ${process.argv[3]} 書籍已刪除`)
            }else {
                console.log(`刪除失敗，請確認輸入格式與書籍id`)
            }
        }
    );
}else if (process.argv[2] == 'create') {
    request.post(
        {url:'https://lidemy-book-store.herokuapp.com/books/', form: {name: process.argv[4]}},
        function (error,response,body) {
            console.log(body)
        }
    );
}else if (process.argv[2] == 'update') {
    request.patch(
        {url:'https://lidemy-book-store.herokuapp.com/books/' + process.argv[3],form: {name: process.argv[4]}},
        function (error,response,body) {
            if (response.statusCode == 200) {
                console.log(`id: ${process.argv[3]} 書名已更改為: ${process.argv[4]}`)
            }else {
                console.log(`更改失敗，請確認輸入格式與書籍id`)
            }
        }
    );
}
