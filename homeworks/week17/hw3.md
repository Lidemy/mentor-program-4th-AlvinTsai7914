## 什麼是 MVC？

<<<<<<< HEAD
MVC (Model -View-Controller)屬於一種架構，主要將程式分成 模型 ( Model )、視圖( View ) 和 控制器( Controller )，三者相互溝通與資料傳遞來達成整個前後端的運作。最初的設計目的，是為了將 SQL query ( 資料傳遞 ) 和 HTML (資料表示) 混和再一起的情況 ，規範化並分離開來，雖然架構 MVC 會產生出額外的工作和資料，架設完成後修改或是擴充的便利性則會有明顯的提升，且也能讓工程師依照擅長的技術來分派工作。

1. Model ：負責動態數據結構，獨立於 View 和 Controller，直接管理程式的資料、邏輯和規則。

2. View：只負責資料顯示。

3. Controller：控制程式的流程，當 Controller 接收到使用者的輸入後，轉換成對 Model 或 View 的指令。

   ![200px-MVC-Process.svg](C:\Users\User\Desktop\200px-MVC-Process.svg.png)( 轉自 wiki )



## 請寫下這週部署的心得

慘，慘慘慘慘慘，看著影片手把手做出 bug，重新跟著文件自已做出 bug，前後部屬三次 ( 還不包括整個部屬泉刪重上傳 )就第三次真的順順利利，總結：

課程練習，忘記加上 .gitignore，heroku create 之後再新增 .gitignore 會出現無法 push 新版本的狀況 (卡了快兩天，東改西改 + 環境重新設定 + heroku 整個砍掉重傳，加上loisa 的網路還慢到崩潰)。

部屬作業二，大概一天，這次就憑記憶和筆記，問題集中在 config.json、package.json 設定不完整，並花了一點時間將 MySQL workbrench 熟悉  ( 這次將整個流程的步驟簡化的筆記下來了 )。

部屬作業一，花一個早上，整個流程很順利，但部屬完後發現要有管理員機制，花了 點時間查如何不使用 reverse，用 sequelize-cli 新增 migration 來達成在已存在的 table 增加 column ( 我就懶得reverse 後還得重寫 db 資料 )。(https://dev.to/nedsoft/add-new-fields-to-existing-sequelize-migration-3527)。

雖然課程都說 MVC 快樂寫程式、sequelize-cli 輕鬆傳遞資料、 heroku 誰都會部屬，如果真是這樣，大概我就是那萬中選一不適合後端的人，希望未來能和後端絕緣，挫折太多、收穫太少QQ。




## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？

這周 Node.js 使用了 MVC 整體寫起來簡潔明瞭，避免了整個程式看起來亂七八糟，Node.js 本身寫起來也是比較簡單，不需要和 PHP 依樣在同個頁面裡 又有邏輯又有資料傳遞又有畫面，但也因為 MVC ，在整個概念和架構沒有理清的狀況下，真的就只能跟著教學蝦雞巴亂寫，寫了 controller 又跳到 view 又跳回 controller 又 model，為什麼這樣寫 ? 我也不知道...... 一個被玩弄的感覺 ，需要一些學習成本，但整個概念邏輯理清楚後，整體效率就會大大提升，要找什麼要改什麼一清二楚。

PHP 雖然東西都寫在一起看起來很雜亂，但不需要一邊寫完又要換一個程式寫，只要顧著寫下去就行，看起來很遭但寫起來比較不需要這麼多時間學習和理解。

這周課程，真的花了太多時間，一下覺得自己太鑽牛角尖，一下又怕這周這樣打馬虎眼過去，看之後的課程會出現雪球效應，越滾越大，看了好幾次影片也還是自己查資料，最後還是靠著寫和實作才有點感覺，算是整個課程到目前最糾結的一周吧......

=======

## 請寫下這週部署的心得


## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？
>>>>>>> 4f72d5379052ebe6f51430fe17232000b96787dc
