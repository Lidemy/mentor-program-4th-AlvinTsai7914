function repeat(a,b){
    var repeatBox = '';
    for (var i=1 ; i<=b ;i++){
        repeatBox += a;
    }
    console.log(repeatBox);
}


repeat('Hi!',2)