## 什麼是 DOM？

**Document Object Model** **- 文件物件模型**

將 HTML 中的各個元素定義成物件，形成一個樹狀圖，依照這樹狀圖，設計者使用 JS 透過 DOM 將 HTML元素提取出來並且做更改，分為 document（整份文件）、element（各個元素如<head>、<body>、<div>、<p>.....）、text（各元素中的文字）和Attribute（各個元素中的屬性），而各階層又分為父子關係和兄弟關係。

要 JS 提取 HTML 裡的元素則使用 document.getElementById('idName') (id 可更改為 ClassName、tagName)或使用 document.querySelector('selector') (注：若有**多個**與 selector 相關的元素，此指令會提取相對應的**第一個元素**)以及 document.querySelectorAll('selector')(注：此方法會提取 selevtor 相關的**所有元素**並以**陣列**方式表示)。



## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

當觸發了事件監聽如 "click"、"submit"等，瀏覽器會依照 DOM 模型，從最上層window、HTML、Document......依序往下傳遞，這個過程稱為**Capture Phase - 捕獲**階段，而到達觸發監聽的元素後則為**Target Phase - 目標階段**，獨立於捕獲和冒泡之間，之後再從目標階段依序往上傳遞到瀏覽器並送出，此過程則為**Bubbling Phace**，事件傳遞機制就是這整個**捕獲 - 目標 - 冒泡**的過程，此過程可以用 `e.stopPropagation` 來中斷。



## 什麼是 event delegation，為什麼我們需要它？

在寫網頁時，常會用到**新增元素**（todo list 裡新增項目）或是**不同元素都要有同樣的監聽功能**（FAQ每個問題被點擊後展開答案），這時最土法煉鋼的方法就是在每個你要元素上新增重複的監聽事件，但若元素有 100 或 1000 個時，整個 JS 就會變得很肥大和臃腫，且網頁讀取完後才新增上的元素也得特別加上監聽，這樣吃力又不討好的手續，

而 **event delegation** 可以利用事件傳遞機制的原理，將事件監聽統一寫在要監聽的元素的**父級元素**上，利用 **e.target** 抓出究竟是哪個元素被啟動，再用**判斷式**來對相對應的元素來做出回饋，

1. 可以省去重複不必要的寫入監聽，減少程式的體積。

2. 不管是預先寫入的元素或是新增上的元素都可以被監聽，不會有因為網頁讀取時沒有這個元素導致 bug。

   


## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

- `event.preventDefault() `：主要是用來阻止**事件原本的行為**，例如當填寫會員註冊列表按下**送出按鍵**，假如有欄位沒填到，`event.preventDefault()`就會阻止**送出按鍵**送出資料的行為。

- `event.stopPropagation()`：用來阻止事件冒泡，以填寫會員註冊列表為例，因為事件冒泡的規則，**監聽**這個動作可以寫在按鈕上或是列表中（整個流程：HTML > 註冊列表 > 按鈕（click） > 註冊列表 > HTML），但假如監聽寫在**按鍵**上並寫上了`event.stopPropagation()`，那**按下**這個動作就只能在按鈕上被監聽而不會回傳到註冊列表和 HTML（流程：HTML > 註冊列表 > 按鈕（click）> stopPropagation()）。

  