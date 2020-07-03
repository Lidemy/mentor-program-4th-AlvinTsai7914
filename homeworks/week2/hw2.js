
function capitalize(n){
    var change = n;
    var changeCode = change.charCodeAt(0);
    var changedWord = '';
    //console.log(change[2])
    for (var i=0; i<change.length; i++){
        if(i==0 && change[0] >='a' && change[0]<='z'){
            var changed = String.fromCharCode(changeCode-32);
            changedWord += changed;
            //console.log(changedWord);
        }else{
            changedWord += change[i];
        }
    }return changedWord;  
}

console.log(capitalize('zzzzzl1265489n'))
