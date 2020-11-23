## hw2：Event Loop + Scope

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```
for(var i=0; i<5; i++) {
 	console.log('i: ' + i)
    setTimeout(() => {
    	console.log(i)
 	}, i * 1000)
}
```

1. ``` javascript
   //執行文件，設定 globalEC
   globalEC{
   	VO{
   		i:undefined;
   		setTimeout:function
   	},
   	scopeChain: globalEC.VO
   }
   ```

2. ``` javascript
   /*
   1.call stack 載入 for(var i=0; i<5; i++)，設 i=0 放入 gobalEC.VO，
   2.call stack 執行 console.log('i: ' + i) 印出 i:0，
   3.call stack 載入 setTimeout(() => {console.log(i)}, 0)，設定 setTimeoutEC，由於 setTimeoutEC.AO 並沒有 i 值，沿著 scopeChain 往  	globalEC.VO 找 i=1，丟給 webAPIs 執行。
   4.webAPIs 執行 setTimeout()，等待 0 秒後將放入 callback queue
   */
   globalEC{
   	VO{
   		i:0;
   		setTimeout:function
   	},
   	scopeChain: globalEC.VO
   }
   
   setTimeoutEC{
       AO{ 
       },
       scopeChain: [setTimeoutEC.AO,globalEC.VO]
   }
   
   callback queue{
       setTimeout(() => {
       console.log(i)
     	});
   }
   
   console:{i:0}
   ```
   
3. ```javascript
   /*
   上面步驟重複四次，call stack 印出 i:1~4 並丟給 webAPIs 四次 setTimeout()，到 i=5 時跳出for迴圈，
   這段時間 call stack 還正在執行程序所以 callback queue 裡的程序並不會執行，
   而 webAPIs 正在執行剛被傳進來的四個 setTimeout()
   */
   globalEC{
   	VO{
   		i:5;
   		setTimeout:function
   	},
   	scopeChain: globalEC.VO
   }
   
   setTimeoutEC{
       AO{ 
       },
       scopeChain: [setTimeoutEC.AO,globalEC.VO]
   }
   
   webAPIs{
         	setTimeout(() => {
           console.log(i)
           },1);
           setTimeout(() => {
           console.log(i)
           },2);
           setTimeout(() => {
           console.log(i)
           },3);
           setTimeout(() => {
           console.log(i)
           },4);
   }
   
   callback queue{
       setTimeout(() => {
    console.log(i)
     	},0);
   }
   
   console:{
       i:0
   	i:1
   	i:2
   	i:3
   	i:4
   }
   ```
   
4. ``` javascript
   /* 
   call stack 清空，event loop 將 callback function 從 callback queue 移到 call stack 執行，建立 cb function EC，webAPIs 裡的 setTimeout 也依序照著 1~4 秒輸出到 callback queue，並由 event loop 移到 callstack 執行 console.log(i)，由於 cb function 沿著的 scopeChain 往上找到 globalEC.VO 裡的 i 這時已經是 5，所以接下來每隔一秒會印出 5 總共五次。 
   */
   globalEC{
   	VO{
   		i:5;
   		setTimeout:function
   	},
   	scopeChain: globalEC.VO
   }
   
   setTimeoutEC{
       AO{ 
       },
       scopeChain: [setTimeoutEC.AO,globalEC.VO]
   }
   
   cbFunctionEC{
           AO{ 
       },
       scopeChain: [cbFunctionEC.AO,setTimeoutEC.AO,globalEC.VO]
   }
   
   console:{
       i:0
   	i:1
   	i:2
   	i:3
   	i:4
		5
   	5
		5
   	5
		5
   }
   ```
   
   
   
   
   
   