import { getComments, addComments} from './api'
import $ from 'jquery'
import { escape, appendCommentToDOM, appendStyle } from './utils'
import { cssTemplate, getForm, getLoadMoreButton} from './templates'

let site_key = ''
let apiUrl = ''
let containerElement = null
let last_id = ''
let is_end = false
let commentDOM = null
let loadMoreClassName
let commentsClassName
let commentsSelector
let formClassName
let formSelector
let tableClassName
let tableSelector

export function init(options) {
  site_key = options.site_key
  apiUrl = options.apiUrl
  tableClassName = `${site_key}-add-comment-form-table`
  loadMoreClassName = `${site_key}-load-more`
  commentsClassName = `${site_key}-comments`
  formClassName = `${site_key}-add-comment-form`
  commentsSelector = '.' + commentsClassName
  formSelector = '.' + formClassName
  tableSelector = '.' + tableClassName

  containerElement = $(options.containerSelector)
  containerElement.append(getForm(formClassName, commentsClassName))
  appendStyle(cssTemplate)

  getNewComments()							

  $(tableSelector).on(`click`, '.' + loadMoreClassName, e => {
    getNewComments()
  })

  
  $(formSelector).submit(e => {
    e.preventDefault();
    const nickNameDOM = $(`${formSelector} input[name=nickname]`)
    const contentDOM = $(`${formSelector} textarea[name=content]`)
    const newCommentData = {
      'site_key':site_key,
      'nickname':nickNameDOM.val(),
      'content':contentDOM.val()
    }
    addComments(apiUrl, site_key, newCommentData, data => {
      if (!data.ok) {
        alert(data.message)
        return
      }
      const commentDOM = $(commentsSelector)
      appendCommentToDOM(commentDOM, newCommentData, true)
      nickNameDOM.val('')
      contentDOM.val('')
    })
  })
}

/*function getNewComments(site_key,before,cb){
    let url = `${apiUrl}/handle_comment.php?site_key=${site_key}`
    if (before) {
      url += '&before=' + before
    }
    $.ajax({
      url
    }).done(function (data){
      cb(data)
    })
}*/

  

function getNewComments() {
  const commentDOM = $(commentsSelector)
  getComments(apiUrl, site_key, last_id, data => {	
    if (!data.ok) {
      alert(data.message)
      return
    }

    const comments = data.discussions;
    for (let comment of comments) {
      appendCommentToDOM(commentDOM,comment)
    }
    
    let length = comments.length
    if (length === 0) {
      is_end = true
      $('.' + loadMoreClassName).hide()
      let isEndWarning = `<div>到底咯！</div>`
      $('.container').append(isEndWarning)
    } else {
      last_id = comments[length-1].id
      const loadMoreButtonHTML = getLoadMoreButton(loadMoreClassName)
      $(`.${formClassName}-table`).append(loadMoreButtonHTML)
    }
  })
}
