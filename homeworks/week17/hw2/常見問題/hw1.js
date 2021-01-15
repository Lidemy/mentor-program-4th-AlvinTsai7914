var request = new XMLHttpRequest()
var element = document.querySelector('body')


element.addEventListener('click' ,function(e) {
    if (e.target.type == 'button') {
        get()
        if (request.status >= 200 && request.status <400) {
            var objLottery = JSON.parse(request.responseText)
            console.log(objLottery.prize)
            if (objLottery.prize == 'FIRST'){
                console.log('頭獎')
                let active = document.querySelector('.active')
                active.classList.remove('active')
                var first = document.querySelector('.first_price_background')
                first.className += ' active'
            }else if(objLottery.prize == 'SECOND') {
                console.log('貳獎')
                let active = document.querySelector('.active')
                active.classList.remove('active')
                var second = document.querySelector('.second_price_background')
                second.className += ' active'
            }else if(objLottery.prize == 'THIRD') {
                console.log('參獎')
                let active = document.querySelector('.active')
                active.classList.remove('active')
                var third = document.querySelector('.third_price_background')
                third.className += ' active'
            }else if( objLottery.prize == 'NONE'){
                console.log('銘謝惠顧')
                let active = document.querySelector('.active')
                active.classList.remove('active')
                var none = document.querySelector('.none_price_background')
                none.className += ' active'
            }
        }else {
            alert('系統不穩定，請再試一次')
        }
    }
})




function get(){
    request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery',false)
        
    request.send() 
    
    console.log('request.status' + request.status)
}

//function change()
