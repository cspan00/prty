$(document).ready(function(){
  alert("linked")
  $(document).keydown(function(e){
    if(e.keyCode == 13){
      $("#menu").toggle()
    }

  })


})
