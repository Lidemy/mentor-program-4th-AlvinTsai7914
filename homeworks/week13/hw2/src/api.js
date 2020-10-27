export function getComments(apiUrl, site_key, before, cb) {
  let url = `${apiUrl}/handle_comment.php?site_key=${site_key}`
  if (before) {
    url += '&before=' + before
  }
  $.ajax({
    url
  }).done(function (data){
    cb(data)
  })
}

export function addComments(apiUrl, site_key, data, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/handle_add_comment.php`,	
    data
  }).done(function (data) {
    cb(data)
  });
}