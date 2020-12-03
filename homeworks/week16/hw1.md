## hw1：Event Loop

#### call stack： 

JS 執行任務的集合區塊，JS 會將要執行的程序依序移至 call stack，執行完成移出後，在移入下一個程序進入並執行（一次一件事），但若單一個程序裡需要呼叫另一個程序，則會依序向上堆疊形成 stack，先執行最上層的程序，直到整個堆疊完成 （Last in, first out. 後進先出）。

``` JS
例如：fnA(){ fnB() }
//1
fnA()

//2
fnB()
fnA()

//3
//fnb()完成
fnA() 

//4
//fnB()完成
//fnA()完成
```



#### event queue：

當  JS 執行到 setTimeout()，會先將其移入 webAPIs 中持續等待設定的時間到達（setTimeout並非 JS 原生而是瀏覽器提供的一個功能），當時間跑完 cb function 會被移入 event queue 中排隊，而在等待 setTimeout 的這段時間，call stack 會繼續執行後面的程序，等到 call stack 沒有程序要跑了，event loop 會檢查 event queue 裡有沒有等待執行的任務（假設此時 setTimeout 已經完成並將 cb 移入），並依續將 event queue 裡的程序移到 call stack 來執行。



#### 程式實例：

``` 
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

```
1
3
5
2
4
//結束程序
```



步驟：

1. 執行第一行：印出 **1**。

2. call stack：

   執行第二行：將 setTimeout 移至 webAPIs 。

   執行第五行：印出 **3**。

   webAPIs：

   接收到 setTimeout 後的開始讀秒，讀完將 ()  =>{console.log(2)} 移至 event queue。

   ``` 
   event queue：
   1. () => {console.log(2)}
   ```

3. call stack：

   執行第六行：將 setTimeout 移至 webAPIs 。

   執行第九行：印出 **5**。

   webAPIs：

   接收到 setTimeout 後的開始讀秒，讀完將 ()  =>{console.log(4)} 移至 event queue。

   ```
   event queue：
   1. () => {console.log(2)}
   2. () => {console.log(4)}
   ```

4. call stack 清空，event loop 檢查 queue 裡有程序待執行，依序將 queue 裡的程序排進 call stack 執行。

   印出 **2**。

   印出 **4**。