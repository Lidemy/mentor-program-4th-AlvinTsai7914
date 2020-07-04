/*
創造funtion PF(n)
    for i=1 i<=n i++
        如果 n% i ===0
        print i
    end for
*/

function printFactor(n){
    for (var i=1 ; i<=n ; i++){
        if(n%i==0){
            console.log(i)
        }
    }
    return;
}


printFactor(11)