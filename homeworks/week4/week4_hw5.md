## 請以自己的話解釋 API 是什麼

> API 可以想像成自己在麥當勞使用觸控自助點餐的機器，使用時會出現各種讓你套餐、單點、新品等等分頁，假設你點套餐分頁，選擇了大麥克套餐，接下來就會跳出薯條要不要加大的選項，以及飲料要選擇什麼和大小杯的頁面，最後還會問你有沒有想要加價購四塊雞塊，點完後就會告訴你取餐號碼，內場也會開始幫你準備你剛說你想要的東西，並且傳給讓前台讓前台叫號並且將餐點送到你的手中。

API 就是上述所說的這個點餐機器，然而和學習 CLI 的狀況一樣，我們人類是依靠視覺和直覺的動物，所以麥當勞點餐機器會設計成客人一看就知道該點哪個頁面，並且依序引導客人點完餐點，然而電腦沒辦法看到我們看的這些好看的 UI 和圖片，電腦只讀取你傳給他的指令，並且將指令中的文字一一帶進電腦內部設定好的點餐格式。

所以換個方式想像：

> 隔天你又想吃麥當勞大麥克套餐，但當你進去店家時發現換了個點餐機器並且櫃台完全沒有服務人員，這機器沒有液晶螢幕而是一個90年代的超大顆電腦螢幕和一個鍵盤，並且螢幕上只顯示出黑底綠色螢光的「歡迎點餐，請輸入您想點的餐點類別」這行字和下方一個跳動著的輸入條，這時你發現鍵盤旁邊有張小紙條上面寫滿各種餐點的點餐方法，你從這一推文字當中找出「大麥克套餐流程」，照著紙條上所寫，先輸入「進入套餐接口」，然後再下方輸入你想點的所有餐點和細節，「大麥克套餐 一份，薯條 加大，飲料 大杯 可樂」，你好不容易寫完並且按下了 ENTER，電腦卻顯示「狀態碼：400，可樂暫不提供」，你只能很沮喪的重新輸入一次餐點，並且將飲料換成雪碧，按下 ENTER 後螢幕顯示出「狀態碼：200，點餐成功，正在準備您的餐點，取餐號 001」，取完餐後看著熱騰騰的漢堡，正要咬下去的那一剎那你醒了過來，並且發現嘴裡正咬著棉被，雖然沒吃到漢堡但你慶幸至少現實中不需要再操作一次那個不人性化的點餐機器。

第二則故事的點餐機器就是 API 的操作方式，鍵盤旁的小紙條就是串接需要的 API 文件，而進入套餐接口就是你需要輸入的URL，而你輸入的餐點就是你輸入的參數和想要拿到的資料，最後麥當勞送出的套餐就是你和網站要到的資料，當然像剛剛沒有可樂一樣對方網站可能沒有你要的資料，這時你得再檢查你要的東西是不是有錯，還是只是你的字打錯了。



## 請找出三個課程沒教的 HTTP status code 並簡單介紹

1. **505**－請求使用的 HTTP 版本不被伺服器支援，可能是你的網頁或對方伺服器該更新了。
2. **451**－用戶端請求違法的資源，例如受政府審查的網頁。
3. **413**－請求的實體資料大小超過了伺服器定義的上限，伺服器會關閉連接或返回一個 `Retry-After` 回應頭。



## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

### Root URL

```
https://api.eatTillIDie.com/
```

#### 獲取所有餐廳資料

| Method | Path         | 參數                    | 範例                  |
| ------ | ------------ | ----------------------- | --------------------- |
| GET    | /restaurants | _limit:限制回傳資料數量 | /restaurants?_limit=5 |

``` 
request.get(
        'https://api.eatTillIDie.com.com/restaurants?_limit=5	//前五家
        function (error,response,body) {
            var restaurants_list = JSON.parse(body) 
            for (var i=0; i<restaurants_list.length; i++) {
                console.log(`${i+1}. ${restaurants_list[i].name} id: ${restaurants_list[i].id}`)
            }
        }
    );
```



------

#### 獲取單一餐廳資料

| Method | Path             |
| ------ | ---------------- |
| GET    | /restaurants/:id |

```
request.get(
        'https://api.eatTillIDie.com.com/restaurants/{id}',
        function (error,response,body)
            var restaurants = JSON.parse(body) 
            console.log(restaurants.name)
        }
    );
```



------

#### 刪除餐廳資料

| Method | Path             |
| ------ | ---------------- |
| DELETE | /restaurants/:id |

```
request.delete(
        'https://api.eatTillIDie.com.com/restaurants/{id},
        function (error,response,body) {
            if (response.statusCode == 200) {
                console.log(`已刪除`)
            }else {
                console.log(`刪除失敗，請確認輸入格式與餐廳id`)
            }
        }
    );
```



------

#### 新增餐廳資料

| Method | Path         | 參數                              |
| ------ | ------------ | --------------------------------- |
| POST   | /restaurants | form:{name:{餐廳名}，id:{id號碼}} |

```
   request.post(
        {url:'https://api.eatTillIDie.com.com/restaurants', form: {name:{餐廳名}，id:{id號碼}}},
        function (error,response,body) {
            console.log(body)
        }
    );
```



------

#### 更改餐廳資料

| Method | Path             | 參數                  |
| ------ | ---------------- | --------------------- |
| PATCH  | /restaurants/:id | form: {name:{餐廳名}} |

```
request.patch(
        {url:'https://api.eatTillIDie.com.com/restaurants/{id},form: {name:{餐廳名}}',
        function (error,response,body) {
            if (response.statusCode == 200) {
                console.log(`更改成功`)
            }else {
                console.log(`更改失敗，請確認輸入格式與餐廳id`)
            }
        }
    );
```

