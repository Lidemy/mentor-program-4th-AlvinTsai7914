## 交作業流程

#### **1. 下載與編輯作業** 

1. 登入 [GitHub Classroom](https://classroom.github.com/assignment-invitations/16599b0b5ba5e09e449a8b4e067da0cb ) 加入課程計畫，網頁會自動複製 [Lidemy GitHub]( https://github.com/Lidemy/mentor-program-4th) 的課程 reponsitory，成為＂你自己＂的 reponsitory。 
2. `$ git clone https://github.com/Lidemy/mentor-program-4th-userName.git ` 複製遠端 reponsitory 到本地電腦裡。
3. `$ git branch <branchName>` 開啟一個新的 branch。
4. `$ git checkout <branchName>` 跳轉至 branch。
   - 可以使用`$ git checkout -b <branchName>` 同時開新 branch 和切換 
5. 進入 C:\Users\User\mentor-program-4th-userName\homeworks\（clone 時的下載位置 ）。
6. 進入當周資料夾，打開作業檔案（例如：第一周第一個作業 ~/week1/hw1.md）。
7. 使用 Markdown 格式寫作業**（一定要在新的 branch 上寫作業！）**（Markdown 基礎指令在文末）。



#### **2. 交作業 - 上傳至 GitHub** 

1. 寫完作業後，`$ git push origin <branchName>` 將 branch 推到 GitHub 上。 

2. 登入 GitHub 網站。

3. 進入首頁左邊的 mentor-program-4th-userName。 

4. 點擊 Pull request 分頁。 

5. 點擊 Compare & pull request。 

6. 如果沒有出現 Compare & pull request： 	

   - 點擊 New pull request。 	
   - 選擇當周作業 branch。 

7. 選擇 Base repository 和 Base，命名、留言。

8. 送出。	

   

#### **3. 交作業 - GitHub 連結 學習系統** 

    		1. 進入 [Lidemy 學習系統](https://learning.lidemy.com/)，
    		2. 進入作業列表分頁。 
    		3. 點選 新增作業。 
    		4. 選擇 學習週數，貼上PR網頁連結 **（注意！是 Pull request 頁面連結）**。
    		5. 點擊送出。



#### **4. 改完作業後** - 同步版本

    		1. 確認助教批改好 mentor-program-4th-userName 上的 branch 並已經與 master 合併（Merged）。 
    		2. 輸入`$ git checkout master` 切換到本地 master 。
    		3.  `$ git pull master`，將遠端 master 合併到本機上。 
    		4. `$ git branch -d <branchName>` 刪除本地 branch。



![作業一圖流](https://i.imgur.com/CpuX6YD.png)



網站連結：

GitHub Classroom  https://classroom.github.com/assignment-invitations/16599b0b5ba5e09e449a8b4e067da0cb 

Lidemy 學習系統 https://learning.lidemy.com/

Lidemy GitHub https://github.com/Lidemy/mentor-program-4th

Markdown 基礎指令 https://markdown.tw/