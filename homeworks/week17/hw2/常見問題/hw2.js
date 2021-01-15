/*var body = document.querySelector('body')

addEvent('.how_to_return')
addEvent('.how_to_pay')
addEvent('.how_to_credit_card')
addEvent('.how_to_check_order')
addEvent('.change_and_cancel')
addEvent('.when_wil_purchase')

function addEvent(className) {
    document.querySelector(className).addEventListener('click',function(e){
        console.log(className)
        var clickTarget = document.querySelector(`li[class=${className}]`)
        var addDiv = document.createElement('div')
        clickTarget.appendChild(addDiv)
    })
}*/

var item = document.querySelectorAll('.item')
console.log(item)
for (let i=0; i<item.length; i++) {
    item[i].addEventListener('click',function(e){
        console.log(this)
        item[i].classList.toggle('active')
    })  
}



