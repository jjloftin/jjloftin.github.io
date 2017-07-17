$("#random").on("click", function(e){
  window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
});
$("#submit").on("click",function(e){
  
  //save searchbar 
  var str = $("#searchbar").val();
  
  //prevent page-reload
  e.preventDefault();
  
  //if string not empty - use API call to search, and then write results to page.
  if(str.trim() !== ''){
  $.ajax({
   url: "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=" + str +      "&limit=10&namespace=0&format=json&redirects=resolve",
   success: writeSearchResults
  });
  };
});

/*
function writeSearchCall(str) {
  var  str = encodeURI("action=opensearch&search=+" + str + "&limit=10&namespace=0&redirects=resolve&format=json&callback=?");
  return str;
}*/

function writeSearchResults(json){
  var titles = json[1];
  var summaries = json[2];
  var urls = json[3];
  
  var html = "<div class = 'panel panel-default'>";
  
  for(var i = 0; i < titles.length; i++){
    html+= "<div class = 'panel-heading'><h1 class = 'panel-title'><a target = '_blank' href='" + urls[i] + "'>"  + titles[i] + "</h1></a></div>".trim();
    html+= "<div class = 'panel-body'><p>" + summaries[i] + "</p></div></div><div class = 'panel panel-default'>";
   
  }

  html += "</div>";
  $("#results").html(html);
}