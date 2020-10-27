const gameURL = 'https://api.twitch.tv/kraken/games/top';
const streamURL = 'https://api.twitch.tv/kraken/streams';
var element = document.querySelector('body')



fetch(gameURL + '?limit=5', {
	method: 'GET',
	headers: {
		'Accept': 'application/vnd.twitchtv.v5+json',
		'Client-ID': 'nd6ef3gaqvdaf137nhx8p3rnd49kpe'
	}
}).then(response => {
    if(!response.ok) {
      throw Error("HTTP status" + response.status);
    }
    return response.json()
}).then(response => {
  for (var i=0; i<response.top.length; i++) {
    var gamesName = response.top[i].game.name
    var list = document.querySelectorAll('.top_list li')
    list[i].innerText = gamesName
  }
  getStreams(response.top[0].game.name)
})

element.addEventListener('click',function(e){
  if(e.target.className == 'top') {
    //如果有list有class='active',刪除active
    if(document.querySelector('.top.active')){
      var delActiveTarget = document.querySelector('.top.active')
      delActiveTarget.classList.remove('active')
    }
    //被點到的li增加active
    e.target.className = 'top active'
    let name = e.target.innerText
    getStreams(name)
  }
})

//依照被點到的li的innerText抓前20直播
function getStreams(name) {

  fetch(`${streamURL}/?game=${name}&limit=20`, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'nd6ef3gaqvdaf137nhx8p3rnd49kpe'
    }
  }).then(response => {
      if(!response.ok) {
        throw Error("HTTP status" + response.status);
      }
      return response.json()
  }).then(response => {
    printStreams(response.streams)
  })
}


function printStreams (streams) {
  //更改標題和備註
  var gameName = document.querySelector('.game_name')
  gameName.innerText = `${streams[0].channel.game}`
  var pageSrc = document.querySelector('.page_scr')
  pageSrc.innerText = `Top 20 popular ${streams[0].channel.game} live streams sorted by current viewers`

  //跑回圈印出直播預覽
  var streamsBox = document.querySelector('.streams_box')
  streamsBox.innerHTML = ' '
  for (let i=0; i<streams.length; i++) {     
    var div = document.createElement('div')
    div.innerHTML = `
      <a href='${streams[i].channel.url}' target='_blank'>
        <li class='stream'>
            <img class='preview' src='${streams[i].preview.large}'/>
            <div class='banner'>
                <img class='logo' src='${streams[i].channel.logo}'/>
                <div class='status'>${streams[i].channel.status}</div>
                <div class='display_name'>${streams[i].channel.display_name}</div>
            </div>
        </li>
      </a>
    `
    streamsBox.appendChild(div)
  }
}
