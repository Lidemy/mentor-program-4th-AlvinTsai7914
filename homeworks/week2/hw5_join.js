/*
fuc join(a.b)
    var 接收答案的變數 joinStr
    for i=0 i<a.length i++
        joinStr += (a[i]+'b')
    end for
*/


function join(a,b){
    var joinStr = '';
    for (var i=0 ; i<a.length ; i++){
        joinStr += (a[i] + b)
    }
    console.log(joinStr);
}

join(['a',258,7,'!!!','jolin','Ah','@#$'],'|')
