var todoCount = 0
var uncompleteTodoCount = 0
var listSta = 'All'

$(document).ready(() => {
  //輸入新任務
  
  $('.text-input').keypress(e=>{
    if (e.key == 'Enter'){
      if ($('.text-input').val() == '') {
        alert('請填寫代辦事項')
        return
      }
      appendList(listSta)
      todoCount++
      uncompleteTodoCount++
      updateCounter()
      $('.text-input').val('')
    }
  })

  //刪除任務
  /*$('.check-list').click((e) => {
    if ($(e.target).hasClass('close')) {
      console.log($(e.target))
      $(e.target).parents('li').remove()
    }
  })*/
  $('.check-list').on('click','button[class="close"]',(e) => {
    $(e.target).parents('li').remove()
    todoCount--
    var isChecked = $(e.target).siblings('input:checkbox').is(":checked")
    if (!isChecked) {
      uncompleteTodoCount--
    } 
    updateCounter()
  })

  //變更任務狀態
  
  $(document).on('change','input[type="checkbox"]',e => {
    $(e.target).parents('li').toggleClass('checked')
    var isChecked = $(e.target).is(":checked")
    if (isChecked) {
      uncompleteTodoCount--
    } else {
      uncompleteTodoCount++
    }
    updateCounter()
    //showAllCheckedBtn()
  })

  //下方狀態欄變換
  $('.list-status-box').click((e) => {
    $('li[class="list-group-item list-status selected"]').toggleClass('selected')
    $(e.target).toggleClass('selected')

    let checked_lists = $('input[type="checkbox"]:checked').parents('li')
    let unchecked_lists = $('input[type="checkbox"]:not(:checked)').parents('li')

    if ($(e.target).text() == 'All') {
      console.log('all')
      unchecked_lists.fadeIn(500)
      checked_lists.fadeIn(500)
      return listSta = 'All'
    }else if ($(e.target).text() == 'Active') {
      console.log('act')
      unchecked_lists.fadeIn(500)
      checked_lists.hide()
      return listSta = 'Active'
    }else {
      console.log('comp')
      checked_lists.fadeIn(500)
      unchecked_lists.hide()
      return listSta = 'Completed'
    }w
  })
  
  //左上全部完成按鈕
  $('.checked-all').click((e) => {
    var checkedLength = $('input[type="checkbox"]:checked').length
    var allBoxsLength = $('input[type="checkbox"]').length
    if (checkedLength == allBoxsLength){
      uncompleteTodoCount = uncompleteTodoCount + checkedLength
      $('input[type="checkbox"]').prop("checked",false)
    }else {
      uncompleteTodoCount = uncompleteTodoCount - (allBoxsLength - checkedLength)
      $('input[type="checkbox"]:not(:checked)').prop("checked",true)
    }
    updateCounter()
  })

  //清除完成
  $('.all-clear-btn').click((e) => {
    $('input[type="checkbox"]:checked').parents('li').remove()
  })

  //雙擊開啟編輯框
  $(".check-list").dblclick((e) => {
    if ($(e.target).hasClass('list-group-item border-white')) {
      $(e.target).append(`
      <input type="text" class="form-control border-white text-input edit-checkbox-input" value='${$(e.target).children('label').text()}'>
      `)
      var t=$('.edit-checkbox-input').val();
      $(e.target).children('.edit-checkbox-input').val("").focus().val(t);
    }
  });
  //編輯框功能
  $(".check-list").keypress(function (e) {
      if (e.key == 'Enter') {
        if ($('.edit-checkbox-input').val() == '') {
          alert('請填寫代辦事項')
          return
        }
        var editInput =  $('.edit-checkbox-input')
        var editedText = $('.edit-checkbox-input').val()
        editInput.siblings('label').text(editedText)
        editInput.remove()
      }
  });

  //點選編輯框外就刪掉編輯框
  $(document).click(e => {
    if (!$(e.target).is('.edit-checkbox-input')) {
      $('.edit-checkbox-input').remove()
    }
  })
})


function updateCounter() {
  $('.uncomplete-count').text(uncompleteTodoCount)
}

function appendList(listSta) {
  if (listSta == 'Completed'){
    $('.check-list').append(`
    <li class="list-group-item border-white" style="display:none;">
      <input class="checkbox" type="checkbox" aria-label="Checkbox for following text input">
      <label>${escape($('.text-input').val())}</label>
      <button type="button" class="close" aria-label="Close">
        <span class="close" aria-hidden="true">&times;</span>
      </button>
    </li>
    `)
  }else {
    $('.check-list').append(`
    <li class="list-group-item border-white">
      <input class="checkbox" type="checkbox" aria-label="Checkbox for following text input">
      <label>${escape($('.text-input').val())}</label>
      <button type="button" class="close" aria-label="Close">
        <span class="close" aria-hidden="true" po>&times;</span>
      </button>
    </li>
  `)
  }
}

function escape(toOutput){
  return toOutput.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\%/g, '(percent)')
    .replace(/\//g, '&#x2F');
}