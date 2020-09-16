## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

varchar：最大空間 65535 個位元組，存取後會有1~2個位元用來記錄字節長度，可以定義默認值，索引的速度比較快，假如要儲存的資料不會太大並且字符數不一定的話適合用 varchar 型態來存取。例如：帳號、密碼、使用者名稱等。

text：最大到 65535 個位元組，但資料要再大的話還有 mediumtext 和 longtext，最大到 4G ，但索引資料的速度較慢，適合存取字符數不一並且數據量較大的資料，例如文章這種可能出現大量字符的地方。

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

server 最主要的工作就是處理每一筆從 client 端傳送過來的 request，並傳送相對應的 response 回去，但對 server 來說每一次的 request 都是獨立的，因為他沒辦法分辨每一個 client 之前做過了什麼動作，或是沒做過什麼，而 cookie 就是用來解決這問題的一個方法：每次 client 對 server 發出 request 時，server 除了對 request 做出處理並回傳 response，還會在 response 中夾帶一個 cookie 的資料給 client 的瀏覽器，並記錄「你是陳小明，完成了登入」，等下次 client 端再發出 request 時也會夾帶著 cookie 給 server，server 就會知道「喔喔！你是剛剛完成登入的陳小明，這次你想要編輯使用者資料 。」

所以每次 client 和 server 一來一往的溝通時，就是透過 cookie 來做為狀態和身分的表示。


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

1. 密碼是明碼儲存，容易造成使用者資料外洩。
2. 沒有防特殊字元，會有 XSS 的疑慮。