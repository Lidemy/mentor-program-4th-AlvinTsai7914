function solve(lines){
    var arr = lines.split(' ')
    findFlower(arr[0],arr[1])
    /*function findFlower(n,m){
        for (var i=Number(n); i<=Number(m); i++) {
            var str = i.toString()
            var arr = str.split('')
            var sum = 0
            for (var j=0; j<arr.length; j++) {
                sum += (arr[j] ** arr.length)         
            }
        
            if (sum === i) {
                console.log(i)
            }
        }
    }*/
}

function findFlower(n,m){
    for (var i=Number(n); i<=Number(m); i++) {
        var sum = 0
        var num = i.toString()
        var digits = num.length
        while (num !== 0){
            if (num%10 !== 0){  
                sum += ((num % 10) ** digits)
                num = Math.floor((num/10));
            }else{
                num = Math.floor((num/10));
            }
        }
        if (sum === i) {
            console.log(i)
        }
    }
}
solve('5 200')

/*
先將y數字拆成陣列
判斷陣列有 x 個值(幾位數)
將每個陣列的值 乘上 x 次方後相加
判斷是否與 y 相等 true 的畫印出來
*/