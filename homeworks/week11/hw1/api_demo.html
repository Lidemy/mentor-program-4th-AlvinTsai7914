<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="utf-8">

    <title>留言板</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>

  <header class='warning'>
    <strong>注意！本網站為練習用，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼！</strong>
  </header>

  <main class='board'>   
    <h1 class='board__title'>Comments</h1>

    <!--留言表單-->
    <form class='board__new-commnet-form'>
      <textarea name='content' row='5'></textarea>
        <input type='submit' class='board__submit-btn'></input>
    </form>

    <!--分隔線-->
    <div class='board__hr'></div> 
    
    <!--下面的留言-->
    <section>
        
    </section>
</main>


<script>
  var request = new XMLHttpRequest();
  request.open('GET', 'api_comments.php', true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      var resp = this.response;
      var json = JSON.parse(resp)
      var comments = json.comments
      for (var i=0; i<comments.length ; i++) {
        var comment = comments[i]
        var div = document.createElement('div')
        div.classList = 'card'
        div.innerHTML = `
            <div class='card__avatar'></div>
            <div class='card__body'>
              <div class='card__info'>
                <span class='card__autor'>
                  ${comment['nickname']} (@${comment['username']})
                </span>
                <span class='card__time'>
                  ${comment['created_at']}
                </span>
              </div>  
              <p class="card__content">${encodeHTML(comment['content'])}</p>
            </div>
        `
        document.querySelector('section').appendChild(div)
      }
    }
  };
  request.send();

  document
    .querySelector('.board__new-commnet-form')
      .addEventListener('submit',function(e) {
        e.preventDefault();
        var content = document.querySelector('textarea[name=content]').value;
        var request = new XMLHttpRequest();
        request.open('POST', 'api_add_comment.php', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send('username=aaa && content=' + encodeURIComponent(content));
        request.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            var resp = this.response;
            var json = JSON.parse(resp)
            if (json.result) {
              location.reload()
            }else {
              alert(json.messsage)
            }
          }
        }
      })

  function encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  }
</script>
</body>
</html>
