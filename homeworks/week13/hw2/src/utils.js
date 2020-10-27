
export function escape(toOutput){
  return toOutput.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\%/g, '(percent)')
    .replace(/\//g, '&#x2F');
}

export function appendCommentToDOM(container, comment, isPrepend) { 
  const card = `
    <div class="card">
      <div class="card-body">
        ${comment.id}
        <h5 class="card-title">${escape(comment.nickname)}</h5>
        <p class="card-text">${escape(comment.content)}</p>
      </div>
    </div>
  `
  if (isPrepend) {
    container.prepend(card)
  }else {
    container.append(card)
  }
}

export function appendStyle(cssTemplate) {
  const styleElement = document.createElement('style')
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(cssTemplate));
  document.head.appendChild(styleElement)
}