<template>
  <div>
    {{letter}}
  </div>    
</template>

<script>
function toLetters(num) {
    "use strict";
    var mod = num % 26,
        pow = num / 26 | 0,
        out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
    return pow ? toLetters(pow) + out : out;
}
export default {
mounted(){

  this.letter = toLetters(this.id + 1);

},
data(){
  return {
   letter: "",
  }
  
},
props:{
  id:Number
},
}
</script>

<style>

</style>