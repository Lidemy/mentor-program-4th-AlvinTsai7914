function solve(lines){
    console.log(lines)
    var n = Number(lines[0])
    for (var i=1; i<=n; i++){
        var arr = lines[i].split(' ')
        duel(arr[0],arr[1],arr[2])
        console.log(arr)
    }
}

function duel(x,y,z){
    var A = BigInt(x)
    var B = BigInt(y)
    if (A == B) {
        console.log('DRAW')
    }else {
        if (z == 1) {
            if (A>B) {
                console.log('A')
            }else if (A<B) {
                console.log('B')
            }
        }else {
            if (A>B) {
                console.log('B')
            }else if (A<B) {
                console.log('A')
            }
        }
    }
}

solve(['3','2 1 1','2 1 -1','1 1 1'])