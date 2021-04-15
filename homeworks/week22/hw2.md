## 請列出 React 內建的所有 hook，並大概講解功能是什麼

1. `useState`：建立及初始化並保存 local state，` [thisState, setThisState] = useState()` : 以 useState 初始化 state ，thisState 負責存取 state 的值，setThisState 為改變 thisState 值所使用的函式。

2. `useEffect`：負責渲染後或是 dependencies 改變時要執行的動作，包含一個**函式**與一個**陣列**，函式為畫面渲染後要執行的動作，陣列裡則放入 useEffect 的 dependencies，useEffect 除了在第一次渲染時執行，之後則在 dependencies 改變時重新執行函式，若是空陣列時只有第一次渲染會執行，沒有放入陣列的話每次重新渲染都會執行。

   ```
   useEffect(() => {
   //要執行的動作
   },[ //dependencies ]);
   ```

3. `useContext`：負責將 props 跳過中間層給子級元件取用，`React.createContext()`來建立 context物件，利用最外層包`< MyContext.Provider value={value}>`傳遞給子級元件，子及元件利用 `useContext()`取得 props。

   ```
   const MyContext = React.createContext() //建立constext
   const App = () => {
   	return (
           <MyContext.Provider value={someValue}> //負責傳遞
               <ContextComponent />
           </MyContext.Provider>
   	)
   }
   
   const ContextComponent = () => {
       const myContext = useContext(MyContext) //接context
       // use myContext 
   }
   ```

4. `useReducer`：useState 進階版本，擁有 action、dispatch 等方法，需要複雜的 state 邏輯、包含多個子數值或 state 間相互依賴時可使用。

5. `useCallback`：為了避免 component 內的 function 每次 render 時都重新宣告，當 function 被當成 props 往下傳給子層級造成子級無意義的重新渲染，`useCallback`回傳一個 memoized 的 callback function，包含一個 inline callback 和 dependencies array，當 dependencies 裡的值改變時才重新建立並回傳整個函式。

6. `useMemo`：為了避免複雜的計算函式在每次 render 時都重新執行，與 useCallback 相似，但記住的為值，包含一個 create function 和 dependencies array，當 dependencies array 裡的值改變時，重新執行函式、計算並記下值。

7. `useRef`： 類似 state 建立並儲存一個 (`initialValue`)，但相較於 state，useRef 的值改變時不會觸發 component 重新渲染，當有不和畫面互動的參數時就可以使用 useRef。

8. `useImperativeHandle`：與 `useRef` 搭配使用，將子級自定義的值向上傳遞給父級。

9. `useLayoutEffect`：功能與 `useEffect`類似，但執行的時間點不同，`useLayoutEffect`執行於 state 改變完，DOM更新後執行，而非渲染後才執行，但如果 `useLayoutEffect` 過於複雜會延遲畫面的渲染。

10. `useDebugValue`：使用 React DevTools 的時候，在客制化的 hooks 旁邊顯示想要顯示的標籤。

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

1. `render()`：畫面渲染時使用，為 class component 中必要的 method。
2. `contructor(props)`：初始化 component 中的 state，會在 mount 之前被呼叫，使用時第一行得寫上 `super(props)`避免 bug，。
3. `componentDidMount(prevProps, prevState, snapshot)`：當 component 被加入 DOM tree (mount) 後被呼叫，適合用在 network request，並使用 `setState()` 重新觸發 `render()`來將新的 state 放上畫面。
4. `componentDidUpdate()`：類似 `componentDidMount()` 但第一次 render 時不呼叫，而是在 component 更新後被呼叫，
5. `componentWillUnmount()`：當 component unmount 和 destroy 時被呼叫，例如用來移除 network request 或 `componentDidMount()` 所建立的 subsciption 。
6. `shouldComponentUpdate(nextProps, nextState)`：
7. ` static getDerivedStateFromProps(props, state)`：component render 時被呼叫，針對新的 props 來判斷要不要進行更新 state。
8. `getSnapshotBeforeUpdate(prevProps, prevState)`：將 update 前的 props、state 傳入。

## 請問 class component 與 function component 的差別是什麼？

1. props：class component 使用 this.props，當不同的狀況下 this 改變，this.props 也會不同，function component 具有閉包特性，props 會一直是原本的傳入的，不會跟著更新。
2. 生命週期：原本 class component 裡的 componentDidMount、componentDidUpdate、componentWillUnmount，在 function component 裡由 useEffect 和 useLayoutEffect 取代。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

controlled component 將 state 與元件綁定，當使用者對此元件進行變動或是輸入不同的值時，得經過 handler 判斷並改變 state 後，再重新將新的畫面 render 到瀏覽器上 ( state 與畫面必需同步 )。

uncontrolled component 則與 state 不關聯，所以畫面可隨意更動 ( 如 textArea、checkbox )，component 中並不會有畫面上的值 ( state 與畫面不需同步 )。

