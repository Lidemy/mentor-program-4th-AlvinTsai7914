## hw4：What is this?

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```js
const obj = {
  value: 1,
  hello: function() {
    console.log('out' + this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log('in' + this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // 2
obj2.hello() // 2
hello() // undefined
```



解釋：

this 和作用域剛好相反，作用域裡的變數視宣告時的位置而定，無論如何呼叫都指向同一個，反之 this 則依照呼叫的方法而定，不被宣告的位置改變。

1. 物件導向下，this 會成為 instance 本身。
2. 而在非物件導向下，瀏覽器預設 this 為 window、node.js 預設則為 global（嚴格模式下不論執行環境為何，都預設為 undefined）。
3. 使用 .call() / .apply() / .bind() 則會將 this 換成後面帶的參數。



`obj.inner.hello()`：利用 .call()，`obj.inner.hello() == obj.inner.hello.call(obj.inner) //true`，代表 this 指向 obj.inner，所以`this.value == obj.inner.value`，log 2。



`obj2.hello()`：`obj2.hello() == hello.call(obj2)`，由於 `const obj2 = obj.inner`，變數 obj2 指向和 obj.inner 相同的記憶體位置，故`this == obj.inner`，log 2。



`hello()`：`hello() == hello.call()` 非物件導向下  this 視執行環境與模式出現 window/global/undefined（瀏覽器/node.js/嚴格模式）。





