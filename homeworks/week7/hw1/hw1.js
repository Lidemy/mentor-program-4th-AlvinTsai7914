
const allForm = document.querySelector('form');
const allInput = document.querySelectorAll('input');
const allLabel = document.querySelectorAll('label');
const allError =  document.querySelectorAll('.error');
const allDiv = document.querySelectorAll('div');
var flag = 0

var formGroup = document.querySelector('.form-group')
formGroup.addEventListener('change',function(e){
    var flag = 0
    var changedTarget = e.target
    var targetForm = changedTarget.closest('.form')
    if (changedTarget.value !== '' && changedTarget.type !== 'radio') { 
        targetForm.removeChild(targetForm.querySelector('.error'))
    }

    var targetFormInline = changedTarget.closest('.form-inline')
    if (changedTarget.checked == true) { 
        targetFormInline.removeChild(targetFormInline.querySelector('.error'))
    }
})


allForm.addEventListener('submit',function(e){
    //text input 跑迴圈確認
    function inputCheck(){
        for (let i=0; i<allInput.length-1; i++) {
            if (allInput[i].value == "" && allInput[i].type!=='radio' && allInput[i].type!=='submit' && allInput[i].name !== 'other') {
                e.preventDefault()
                switch (i) {
                    case 0: 
                        var inputName = '暱稱';
                        break;
                    case 1: 
                        var inputName = '電子郵件';
                        break;
                    case 2: 
                        var inputName = '手機號碼';
                        break;
                    case 5: 
                        var inputName = '怎麼知道這個活動的？';
                        break;
                }
    
                if (allInput[i].closest('.form').querySelector('.error') !== null) {
                    return
                }else {
                    var flag = 1
                    var addDiv = document.createElement('div');
                    addDiv.innerText = `請填寫${inputName}`;
                    allInput[i].closest('div').appendChild(addDiv);
                    var addClass = allInput[i].closest('.form').querySelector('div')
                    addClass.classList.add('error') 
                }
            }        
        }
            return true
    }    

    function radioCheck () {
        if (document.querySelector('.form-inline input[value=inbed]').checked === false && document.querySelector('.form-inline input[value=onfloor]').checked === false) {
            if (document.querySelector('.form-inline input[value=inbed]').closest('.form-inline').querySelector('.error') !== null) {
                return
            } else {
                e.preventDefault()
                var addDiv = document.createElement('div');
                addDiv.innerText = `請勾選`;
                addDiv.classList = 'error';
                document.querySelector('.form-inline').appendChild(addDiv)
            }      
        }
        return true
    }

inputCheck() 
radioCheck ()


    if (inputCheck() && radioCheck ()){
        e.preventDefault()
        alert(`
        報名資訊：
            姓名：${allInput[0].value}
            電子郵件：${allInput[1].value}
            手機號碼：${allInput[2].value}
            報名類型：${signUp()}
            怎麼知道這個活動的？：${allInput[5].value}
            其他：${allInput[6].value}
        `)
    }
})


function signUp() {
    if (document.querySelector('.form-inline input[value=inbed]').checked === true) {
        return '躺在床上用想像力實作'
    }else if (document.querySelector('.form-inline input[value=onfloor]').checked === true) {
        return '趴在地上滑手機找現成的'
    }
}


