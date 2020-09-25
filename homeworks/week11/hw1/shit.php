<?php



//八個字
//ord() 65~12



function isTokenValid($token) {
  if (strlen($token) !== 8) return false;
  for($i = 1; $i <= 7; $i+=2) {
    if ((ord($token[$i]) * ord($token[$i - 1])) % $i !== 0) {     //$i 1 3 5 7
      return false;
    }
  }
  return true;
}


function find() {
  for ($o=3; $o<=7; $o+=2) {
    for ($n=65; $n<=122; $n++) {
      for ($m=65; $m<=122; $m++) {
        if (($n * $m) % $o == 0) {
          echo '$n:' .$n .' $m:' .$m . ' $o:' . $o .'<br>'; 
        }
      }
    }
  }
}

find();
?>