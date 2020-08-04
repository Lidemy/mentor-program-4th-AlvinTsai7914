## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

1. `<bgsound />`：背景音樂，後面加上`src='音樂路徑'`和`loop='重複播放次數'`。
2. `<em>`：特別強調的文字。
3. `<cite>`：顯示出後續連結作品的標題。

## 請問什麼是盒模型（box modal）

視覺和分層化 HTML 裡元素的範圍大小和控制範圍的參數，各層分為 padding,border,margin，padding 和 border 會將元素的盒模型向外延伸，而 margin 則類似一圈引立場，將元素本身以外的其他元素向外排擠、推開，不影響元素本身大小。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

- `display:inline`：`<span>` 、`<p> `、`<a>`，不能調整盒模型，但會主要用在文字的顯示。
- `display:block`：`<div>`、`<section>`、`<header>`、`<footer>`，用來分版面區塊，可以調整上下左右長度，若不設定則預設為填滿母區塊。
- `display:inline-block`：多用在 `<img>`、`<btn>`，有 `display:inline` 的互相對齊，而又有`display:block`可調整 box 的特性。


## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

- ` position: static`：預設值，沒特別的定位和錨點，由瀏覽器自動配置到畫面上。
- ` position: relative`：不設定參數的話會出現` position: static`同樣的地方，以此位置為錨點，可用 `top`、 `right` 、 `bottom`、 `left`等參調整到「相對於錨點，往上/右/下/左移多少位置」。

- `position: absolute`：向上尋找到一個非 ` position: static` 的容器（若找不到則以`<body>`為容器），出現在此容器最左上角，並以此容器最左上角為錨點，使用 `top`、 `right` 、 `bottom`、 `left`等參數，調整到「距離母容器上/右/下/左多少的位置」。
- ` position: fixed`：不被 `<body>` 或任何容器設限，不論網頁如何調整，以「瀏覽器」本身為錨點，固定在瀏覽器上設定的位置面。