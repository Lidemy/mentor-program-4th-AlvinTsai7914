function solve(lines){
    var str = lines[0]
    console.log(findReverse(str))
}

function findReverse(str){
    var revStr = reverse(str)
    for (var i=0; i<str.length; i++){
        if (revStr[i] !== str[i]) {
            return 'False'
        }
    }
    return 'True'
}

function reverse(str){
    var revStr = ''
    for (var i=str.length-1; i>=0; i--) {
        revStr += str[i]
    }
    return revStr
}
solve(['aabbaaa'])