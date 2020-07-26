function solve(lines){
    for (let i=1; i<lines.length; i++ ){
        findPrime(lines[i])
    }
}

function findPrime(n){

    if (Number(n) === 1) {
        console.log('Composite') 
        return
    }

    let arr = []
    for (var i=1; i<=n; i++) {
        if (Number(n)%i === 0){
            arr.push(i)   
        }
    }

    if (arr.length == 2){
        console.log('Prime')
    }else{
        console.log('Composite')
    }

}

solve(['5','1','2','3','4','5'])