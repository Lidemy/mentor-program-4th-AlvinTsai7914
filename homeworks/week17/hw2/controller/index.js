const db = require('../models');
const Lottery = db.Lottery
var prize = null

const indexController = {
  index: (req, res) => {
    res.render('../views/index')
  },
  lottery: (req, res) => {
    res.render('../views/lottery', { prize })
  },
  handleLottery: (req, res) => {
    Lottery.findAll(
    ).then(prizes => {
      prizes.sort(function (a, b) { return a.weight - b.weight; });
      var prizeName = [];
      var prizeWeight = [];
      prizes.forEach(prize => {
        prizeName.push(prize.prize);
        prizeWeight.push(prize.weight)
      })

      var weightSum = prizeWeight.reduce(function (prev, currVal) {    //計算權重之和：1+5+20+74=100
        return prev + currVal;    //prev 是前一次累加後的數值，currVal 是本次待加的數值
      }, 0);
      console.log(weightSum)
      var prize = pickPrize(weightSum)

      function pickPrize(weightSum) {
        var res = "未中獎"; //預設設定抽獎結果為“未中獎”
        console.log("本程式的獎項權重和值：", weightSum);

        //生成一個權重隨機數，介於0-weightSum之間
        var random = Math.random() * weightSum; //生成一個權重隨機數（0 到 weightSum 之間）
        console.log("本次抽獎的權重隨機數：", random);

        //權重陣列重組並排序
        var concatWeightArr = prizeWeight.concat(random); //將隨機數加入權重陣列
        var sortedWeightArr = concatWeightArr.sort(function (a, b) { return a - b; }); //將包含隨機數的新權重陣列按從小到大（升序）排序
        console.log("含權重隨機數的新權重陣列升序排序後：", sortedWeightArr);

        //索引權重隨機數的陣列下標
        var randomIndex = sortedWeightArr.indexOf(random); //索引隨機數在新權重陣列中的位置
        randomIndex = Math.min(randomIndex, prizes.length - 1); //權重隨機數的下標不得超過獎項陣列的長度-1，重新計算隨機數在獎項陣列中的索引位置                
        console.log("本次權重隨機數對應的陣列下標：", randomIndex);

        //取出對應獎項
        res = prizes[randomIndex]; //從獎項陣列中取出本次抽獎結果
        console.log("本次抽獎結果：", JSON.stringify(res, null, 4));

        return res; //返回本次抽獎結果
      };
      res.render('../views/lottery', { prize })

    }).catch(err => {
      console.log(err)
    })
  }
}

module.exports = indexController

