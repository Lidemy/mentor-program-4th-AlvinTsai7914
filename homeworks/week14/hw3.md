## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

#### 什麼是 DNS？

**D**omain **N**ame **S**ystem 域名系統

將 IP 形容成網站的地址的話、域名 domain name 就類似網站的店名，當使用者想去什麼網站時，可以選擇給出確切的 IP 地址直接到達想去的網站，也可以選擇使用 domain name 讓瀏覽器先和 DNS 說「我想去某某某店」，當 DNS server 依照店名找出相對應的 IP 地址給瀏覽器後，使用者就能順利到達，且相較之下由於 domain name 可以更語意化、方便記憶，網路越來越普及的情況下 DNS 的服務亦愈趨便利和多元。





#### Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

對大眾的好處：

1. 加速瀏覽體驗：google 的 caching 機制可以預先下載使用者之後可能會用的資料，避免某些要多次查詢 DNS 的網頁導致網頁的速度變慢。
2. 網路安全：google DNS 的控管比一般 ISP 提供得更為嚴格。
3. 減少查詢的層級：相較於其他 DNS ，google public DNS 位於 DNS root 的下一層，最多只要網上找一層就能找到，避免了要透過多層查詢的麻煩。
4. DNS 更新較快，如果網站搬家了會較快轉更新資訊。

對 Google 的好處：

​		擁有更多使用者的瀏覽資訊，就相當於有更多的資料可以做分析，尤其在這大數據的時代，越多的使用資料就代表可以更準確分析使用者習慣，在將數據轉換成商業、廣告、和網路產品的設計都會是很有用的資產。






## 什麼是資料庫的 lock？為什麼我們需要 lock？

當網站的瀏覽覽和使用量越來大時，原本資料的讀取和寫入在基數少的時候不容易碰撞，但數量大時可能會出現兩筆或兩筆以上的 request 要求變更同個數據（例如電影搶票或是特賣會搶購），這時就有機率產生衝突（只剩一張票但同時有兩筆購買紀錄，造成超賣），這時就需要 lock 機制，當發生上述情形時，先鎖定住其中一筆 request ，執行完成後再解鎖執行另外一筆，減少錯誤的發生。





## NoSQL 跟 SQL 的差別在哪裡？

兩者的儲存讀取與變更方式不相同。

SQL ：以類似表格的方式儲存和讀取資料，例如一個班級裡的學生：姓名、年齡、地址、電話，透過分類好的欄位再將各個相關的的資料填入下方，由於是固定的資料欄位，優點在於數據的一致、穩定，且標準化的情況下更新的成本較低且入門簡單，但由於 schem 格式下，資料數目龐大且分散時，效能以及擴充性就會降低（例如你要收集全台北上下班時的通勤路線，就沒辦法這麼簡單的做出分類），因此 NoSQL 的形式才熱門了起來。

NoSQL：跳脫出 schema 格式，大多以 JSON 格式做儲存，讓原本需要分類做處理的東西轉換成 Key-Value 的方式，將資料轉換成類似物件的格式完整儲存起來，每筆資料之間不相關，如此一來複雜或是分散的數據就可以較輕易的儲存起來，資料庫擴充也不必擔心資料被分散的問題，相反的分散切割的資料就無法執行類似 Join 等較複雜的指令。





## 資料庫的 ACID 是什麼？

原子性（atomicity，或稱不可分割性）、一致性（consistency）、隔離性（isolation，又稱獨立性）、持久性（durability），此四特性來維持資料庫在變動的正確與可靠性。

A 原子性：每筆交易只會有成功與失敗，兩者其中一個可能發生，不存在執行到一半或是一部分的狀況，若發生錯誤就會被滾回 rollback 成變動前的狀態。

C 一致性：資料庫在變動前後都得維持資料庫規則，包括 index、format 不變動，以及 table 創建所設下的規則。

I 隔離性：兩筆要變動同一個數據的交易相互隔離，透過 lock 與 block 來完成，當其中一筆交易完成後另一筆才能開始執行。

D 持久性：當交易完成後，對資料的修改以及資料的儲存屬永久性的，不論資料重啟或任何問題，所有交易行為都會被保存。

