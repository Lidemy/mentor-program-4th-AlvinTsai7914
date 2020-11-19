## hw3：Hoisting

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100 
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

1. ``` javascript
   /*
   進入文件設定初始化 globalEC{
   */
   globalEC{
       VO{
           a:undefined,
           fn:function,
         	
       }
       scopeChain:globalEC.VO
   }
   ```

2. ```javascript
   /*
   執行第一行：a=1。
   */
   globalEC{
       VO{
           a:1,
           fn:function,
         	
       }
       scopeChain:globalEC.VO
   }
   ```

3. ```javascript
   /*
   執行第二行：進入 fn(),初始化 fnEC。
   */
   fnEC{
   	AO{
   		a:undefined,
   		fn2:function
   	},
   	scopeChain:[fnEC.AO,globalEC.VO]
   }
   
   globalEC{
       VO{
           a:1,
           fn:function,
         	
       }
       scopeChain:globalEC.VO
   }
   ```

4. 

   ```javascript
   /*
   執行fn()
   執行第三行： console.log(a)，由於 fn() 裡的 a 並沒有被賦值，印出 undefined。
   */
   fnEC{
   	AO{
   		a:undefined,
   		fn2:function
   	},
   	scopeChain:[fnEC.AO,globalEC.VO]
   }
   
   globalEC{
       VO{
           a:1,
           fn:function,
         	
       }
       scopeChain:globalEC.VO
   }
   
   console{
   	undefined
   }
   ```

5. ```javascript
   /*
   執行第四行： fnEC.AO 裡的 a=5。
   */
   fnEC{
   	AO{
   		a:5,
   		fn2:function
   	},
   	scopeChain:[fnEC.AO,globalEC.VO]
   }
   
   globalEC{
       VO{
           a:1,
           fn:function,
         	
       }
       scopeChain:globalEC.VO
   }
   
   console{
   	undefined
   }
   ```

6. ```javascript
   /*
   執行第五行：console.log(a)，fnEC.AO.a = 5，印出 5。
   */
   fnEC{
   	AO{
   		a:5,
   		fn2:function
   	},
   	scopeChain:[fnEC.AO,globalEC.VO]
   }
   
   globalEC{
       VO{
           a:1,
           fn:function,
         	
       }
       scopeChain:globalEC.VO
   }
   
   console{
   	undefined
   	5
   }
   ```

7. ```javascript
   /*
   執行第六行：a++，fnEC.AO.a = 6
   */
   fnEC{
   	AO{
   		a:6,
   		fn2:function
   	},
   	scopeChain:[fnEC.AO,globalEC.VO]
   }
   
   globalEC{
       VO{
           a:1,
           fn:function,
         	
       }
       scopeChain:globalEC.VO
   }
   
   console{
   	undefined
   	5
   }
   ```

8. ```javascript
   /*
   執行第七行：var a，fnEC.AO 裡已經有 a，沒任何意義。
   */
   fnEC{
   	AO{
   		a:6,
   		fn2:function
   	},
   	scopeChain:[fnEC.AO,globalEC.VO]
   }
   
   globalEC{
       VO{
           a:1,
           fn:function,
         	
       }
       scopeChain:globalEC.VO
   }
   
   console{
   	undefined
   	5
   }
   ```

9. ```
   /*
   執行第八行：fn2()，初始化 fn2EC，由於 fn2() 宣告在 fn() 裡，scopeChain 為 fn2() > fn() > global。
   */
   fn2EC{
   	AO{
   	},
   	scopeChain:[fn2EC.AO,fnEC.AO,globalEC.VO]
   }
   
   fnEC{
   	AO{
   		a:6,
   		fn2:function
   	},
   	scopeChain:[fnEC.AO,globalEC.VO]
   }
   
   globalEC{
       VO{
           a:1,
           fn:function,
         	
       }
       scopeChain:globalEC.VO
   }
   
   console{
   	undefined
   	5
   }
   ```

10. ```
    /*
    執行第十一行：fn2() 裡的  console.log(a)，由於 fn2EC.AO 裡並沒有宣告任何變數，沿著 scopeChain 網上找到 fnEC.AO 裡的 a:6，印出 6。
    */
    fn2EC{
    	AO{
    	},
    	scopeChain:[fn2EC.AO,fnEC.AO,globalEC.VO]
    }
    
    fnEC{
    	AO{
    		a:6,
    		fn2:function
    	},
    	scopeChain:[fnEC.AO,globalEC.VO]
    }
    
    globalEC{
        VO{
            a:1,
            fn:function,
          	
        }
        scopeChain:globalEC.VO
    }
    
    console{
    	undefined
    	5
    	6
    }
    ```

11. ```
    /*
    執行第十二行： a = 20，fn2EC.AO 裡沒有 a 值，找到 fnEC.AO 裡的 a，並賦值 a=20
    */
    fn2EC{
    	AO{
    	},
    	scopeChain:[fn2EC.AO,fnEC.AO,globalEC.VO]
    }
    
    fnEC{
    	AO{
    		a:20,
    		fn2:function
    	},
    	scopeChain:[fnEC.AO,globalEC.VO]
    }
    
    globalEC{
        VO{
            a:1,
            fn:function,
          	
        }
        scopeChain:globalEC.VO
    }
    
    console{
    	undefined
    	5
    	6
    }
    ```

12. ```
    /*
    執行第十三行： b=100，fn2EC.AO 裡沒有 a 值，沿 scopeChain 裡也找不到已宣告的 b，所以將此句視為宣告全域變數，在 globalEC.VO 裡宣告 b 並賦值 b=100。
    */
    fn2EC{
    	AO{
    	},
    	scopeChain:[fn2EC.AO,fnEC.AO,globalEC.VO]
    }
    
    fnEC{
    	AO{
    		a:20,
    		fn2:function
    	},
    	scopeChain:[fnEC.AO,globalEC.VO]
    }
    
    globalEC{
        VO{
            a:1,
            fn:function,
            b:100
        }
        scopeChain:globalEC.VO
    }
    
    console{
    	undefined
    	5
    	6
    }
    ```

13. ```
    /*
    fn2() 執行完畢，離開 fn2EC 並刪除。
    */	
    
    fnEC{
    	AO{
    		a:20,
    		fn2:function
    	},
    	scopeChain:[fnEC.AO,globalEC.VO]
    }
    
    globalEC{
        VO{
            a:1,
            fn:function,
            b:100
        }
        scopeChain:globalEC.VO
    }
    
    console{
    	undefined
    	5
    	6
    }
    ```

14. ``` 
    /*
    執行第九行：console.log(a)，此時處於 fn() 的作用域裡，印出fnEC.AO 裡的 20。
    */
    
    fnEC{
    	AO{
    		a:20,
    		fn2:function
    	},
    	scopeChain:[fnEC.AO,globalEC.VO]
    }
    
    globalEC{
        VO{
            a:1,
            fn:function,
            b:100
        }
        scopeChain:globalEC.VO
    }
    
    console{
    	undefined
    	5
    	6
    	20
    }
    ```

15. ```
    /*
    fn() 執行完畢，離開 fnEC 並刪除。
    */	
    
    globalEC{
        VO{
            a:1,
            fn:function,
            b:100
        }
        scopeChain:globalEC.VO
    }
    
    console{
    	undefined
    	5
    	6
    	20
    }
    ```

16. ```
    /*
    執行第十七行：console.log(a)，此時位於 globalEC 下，印出 globalEC.VO.a:1
    */	
    
    globalEC{
        VO{
            a:1,
            fn:function,
            b:100
        }
        scopeChain:globalEC.VO
    }
    
    console{
    	undefined
    	5
    	6
    	20
    	1
    }
    ```

17. ```
    /*
    執行第十八行：a=10，將 globalEC.VO.a 設為10
    */	
    
    globalEC{
        VO{
            a:10,
            fn:function,
            b:100
        }
        scopeChain:globalEC.VO
    }
    
    console{
    	undefined
    	5
    	6
    	20
    	1
    }
    ```

18. ``` 
    /*
    執行第十九行：console.log(a) ，globalEC.VO.a 為 10，印出 10。
    */	
    
    globalEC{
        VO{
            a:10,
            fn:function,
            b:100
        }
        scopeChain:globalEC.VO
    }
    
    console{
    	undefined
    	5
    	6
    	20
    	1
    	10
    }
    ```

19. ```
    /*
    執行第二十行：console.log(b) ，globalEC.VO.b 為 100，印出 100。
    */	
    
    globalEC{
        VO{
            a:10,
            fn:function,
            b:100
        }
        scopeChain:globalEC.VO
    }
    
    console{
    	undefined
    	5
    	6
    	20
    	1
    	10
    	100
    }
    ```

20. ```
    /*
    整份文件執行完畢，離開文件，刪除 globalEC。
    */
    
    console{
    	undefined
    	5
    	6
    	20
    	1
    	10
    	100
    }
    ```

    