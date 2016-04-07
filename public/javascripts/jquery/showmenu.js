$(document).ready(function(){
  $(document).keydown(function(e){
    if(e.keyCode == 13){
      $("#menu").toggle()
    }
  })
})
