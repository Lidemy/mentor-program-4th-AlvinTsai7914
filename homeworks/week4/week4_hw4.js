const request = require('request');
const process = require('process')

request.get ( {
    url: 'https://api.twitch.tv/kraken/games/top',
    headers: {
        'Client-ID': 'pyffbpyz3af737314vacov3gy8seu2',
        'Accept': 'application/vnd.twitchtv.v5+json'
    }
},
    function (error,response,body) {
        var game_list = JSON.parse(body) 
        for (let i=0; i<game_list.top.length; i++){
            console.log(`${i+1}. ${game_list.top[i].viewers} | ${game_list.top[i].game.name}`)
        }
    }
);
