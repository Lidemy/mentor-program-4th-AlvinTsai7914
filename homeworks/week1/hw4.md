# 跟你朋友介紹 Git

## **Git 介紹**

#### **個人 - 管理檔案：**

檔案因為隨著時間和內容要素的更改，出現各種不同版本（報告1、報告2、報告定案、最終定

案……），而Git可以系統化的整理各版本檔案。

#### **團隊 - 多人協作：**

一個案子在同一時間有需要多人協作各種不同功能時，可經由 Git 分支出不同檔案，當各功能完成時

再合併起來。



## Git 安裝
#### windows：
https://git-scm.com/
右邊 Downloads 點下去，一直下一步就好了。
安裝完以後可以在 git-bash 試著輸入：git --version 並且按 enter，看有沒有印出什麼訊息就知道是否成功了！
參考影片：如何安裝 Git - Windows | Lidemy 鋰學院

#### mac：
在 Mac 底下的話請你打開 Terminal（右上角搜尋的按鈕按下去，輸入 terminal 就找得到了），並且輸入 git --version，按下 enter。
如果你的 MacOS 版本是 10.9 以上，就會自動跳出視窗指引你去安裝，或是你也可以參考 Git 官網的教學，直接下載安裝檔。



## 版本控制

#### 用資料夾示範版本控制 

1. 將想更新的檔案複製，更改檔案名稱。
2. 若資料夾裡某個檔案不需要版本控制或只供自己使用，把檔案從資料夾取出。
3. 為了避免版本衝突，資料夾使用亂碼設定版本號。
4. 創一個文字檔案，存取版本號、版本順序以及版本資訊。

####  

#### Git 版本控制流程

1. 打開 Git bash。
2. `pwd`  檢查自己現在位置。
3. `cd /<磁碟位置>`  轉移位置到你想存放檔案的位置。
4. `mkdir <資料夾名稱>`  創建版本管理用的資料夾。
5. `cd <資料夾名稱>` 打開資料夾。
6. `git init` 設置版本管理環境。
7. `touch joke.txt`  創建文檔（`git status` 檢查會出現 `Untracked files: joke.txt`）。
9. `git add joke.txt` 將文檔加入版本控制 （使用 `git status` 檢查會出現 `new file: joke.txt`）　。
10. `git commit -m "備註內容"` 留下版本資訊，好辨認版本差別。
11. 使用 `git log` 檢查版本紀錄。
11. 恭喜成功版本控制。

**新增文件：重複 7 ~ 10。**

**更新完文件：重複步驟 9 ~ 10。**

**想調出某一版本的檔案：**

1. `git log` 查出你想要的版本號。
2. `git checkout <版本號碼> `切換到你想要的版本。



**想做出分支版本（例如英文版）：**

1. `git branch <分支名稱>` 分支出新版本。

2. `git checkout <分支名稱>` 切換版本分支。

3. `git branch -v ` 查詢分支名稱和現在位在哪個分支。

4. 編輯完後，重複 8 ~ 10。

   

#### 如果想上傳到 GitHub 保存和分享：

**新建 repository**

1. GitHub 首頁登入帳號，畫面右上+號點開，點選第一個選項 New epository。
2. 填寫 Repository name 和 Description，點選 Public，點選確定。
3. 如果電腦裡已經有 Repository，使用 Git Bash cd 到 <repository 資料夾>，輸入

```
git remote add origin https://github.com/<帳號名稱>/<repository名稱>.git
git bush -u origin master
//（github教學上有可以複製）
//（如果發生問題，用 git status 檢查是否有檔案沒有 commit）
```

**Push 上傳檔案**

編輯完檔案 commit 完成後，或開新 Branch 編輯完後，Git Bash輸入：`git push origin master`

**Pull 下載檔案**

`git pull master`



## **基礎指令**

**git init  初始化**
版本控制的第一步，使用這指令在資料夾中創建 .git 資料夾，讓 Git 能協助管理檔案。

**git status - 檢查檔案狀態**
確認檔案狀態 staged/untrack

**git add  <檔案名稱> - 加入版本控制 （複製新資料夾）**

- 狀態 staged/untrack        //已加入/未加入版本控制

- `git rm --cached <檔案名稱>`        //取消版本控制

- `git add .`  (也可以輸入資料夾名稱)      //當前所在所有檔案加入版本控制      

- `git commit -m " "`  		//新建一個版本（將新資料夾命名新版本號）

- `git commit -m "版本資訊"`

- `git commit -am "版本資訊"`			//== git add . + git commit -m

**git log  歷史紀錄（查詢版本紀錄）**

- 輸入 `git log` 會顯示：

```shell
commit  f2246407089ef968b7d981fb3d145f80b2ffb6eb  (HEAD -> master)  //版本編號
Author: AlvinTsai <goape7914@gmail.com>        //使用者名稱
Date:   Wed Jun 17 23:36:40 2020 +0800        //版本訊息
```

- `git log --oneline`  精簡版歷史紀錄

```
626c0de (HEAD -> master) second test
f224640 first commit    //版本號前七碼 版本訊息
```

**git checkout  跳轉資料夾**

**.gitignore  忽略的檔案**
被放入的檔案不會被加入版本控制，通常是使用者個人檔案或作業系統產生的檔案。
方法：

```
touch .gitignore    //建立 .gitignore 
$ vim .gitignore      //進入 .gitignore 
按 i                  //進入編輯模式  
<檔案名稱>                  //輸入要忽略的檔案名稱              
按 esc                //退出編輯模式
:wq                   //存檔退出
```

**git commit --amend - 更改版本資訊**

如果已經push就不要更改，避免發生問題。

**git reset HEAD^ - 版本回朔**

- `git reset HEAD^ --hard` 直接全部刪除回上版本

- `git reset HEAD^ --soft` 默認參數，回朔至前一個版本，但做過的更改會留著。（最常用）

**git checkout --<檔案名稱> - 取消更動**

尚未 commit 前使用，將更改的東西全部刪除。