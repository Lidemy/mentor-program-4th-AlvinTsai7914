/*
將字串賦予成變數 n
建立答案變數 revDone = ''
建立function reverse(n)
使用迴圈從 i = unRev.length-1 ; i >=0 ; i=i-1
將 revDone += n[i];
return revDone
*/

function reverse(n){
    let unRev = n;
    let revDone = '';
    for (var i = unRev.length-1; i>=0; i=i-1){
        revDone += unRev[i]
    }
    return revDone;
}

console.log(reverse('AlvinTsai'))