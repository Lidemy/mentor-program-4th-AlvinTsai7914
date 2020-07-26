function solve(lines){
    var starLines = lines
    printStar(starLines)
}

function printStar(n){
    for(let i=1; i<=n; i++){
        var result = ''
        for(let j=1; j<=i; j++){
            result += '*'
        }
        console.log(result)
    }
}
