export const cssTemplate = `
  .card {
    margin-top: 16px;
  }

  .comments {
    margin-bottom: 16px;
  }

  .more-comments-btn{
    position: absolute;
    left: 50%;
    transition: translat;
    transform: translateX(-50%);
    margin-top: 16px;
  }
`


export function getForm(className, commentsClassName) {
  return`
    <div class='${className}-table'>
      <form class='${className}'>
        <div class="form-group">
          <label for="nickname">Nickname</label>
          <input name='nickname' type="text" class="form-control" id="form-nickname">
        </div>
        <div class="form-group">
          <label for="content-textarea">Comment</label>
          <textarea name='content' class="form-control" id="content-textarea" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">送出</button>
      </form>
      <div class='${commentsClassName}'>
      </div>
    </div>
  `
}

export function getLoadMoreButton(className) {
  return `<button type="button" class="${className} btn btn-primary more-comments-btn">更多留言</button>`
}