  var LincolnQuotes = [
    {quote: 'When it comes to this I should prefer emigrating to some country where they make no pretence of loving liberty -- to Russia, for instance, where despotism can be taken pure, and without the base alloy of hypocracy.', context: 'From the August 24, 1855 Letter to Joshua Speed'},
    {quote: 'The world has never had a good definition of the word liberty, and the American people, just now, are much in want of one. We all declare for liberty; but in using the same word we do not all mean the same thing.', context:'April 18, 1864 Address at Baltimore'},
    {quote:'I believe it is an established maxim in morals that he who makes an assertion without knowing whether it is true or false, is guilty of falsehood; and the accidental truth of the assertion, does not justify or excuse him.' , context:'August 11, 1846 Letter to Allen N. Ford'},
    {quote: 'Towering genius distains a beaten path. It seeks regions hitherto unexplored.', context:'January 27, 1838 Lyceum Address'},
    {quote:'At what point then is the approach of danger to be expected? I answer, if it ever reach us, it must spring up amongst us. It cannot come from abroad. If destruction be our lot, we must ourselves be its author and finisher. As a nation of freemen, we must live through all time, or die by suicide.' , context:'January 27, 1838 Lyceum Address'},
    {quote: 'The legitimate object of government, is to do for a community of people, whatever they need to have done, but can not do, at all, or can not, so well do, for themselves -- in their separate, and individual capacities.', context:'July 1, 1854 [?] Fragment on Government'},
    {quote:'With malice toward none; with charity for all; with firmness in the right, as God gives us to see the right, let us strive on to finish the work we are in; to bind up the nation\'s wounds; to care for him who shall have borne the battle, and for his widow, and his orphan...' , context:'March 4, 1865 Inaugural Address'},
    {quote: 'Every blade of grass is a study; and to produce two, where there was but one, is both a profit and a pleasure.', context:'September 30, 1859 Address before the Wisconsin State Agricultural Society'},
    {quote:'I have endured a great deal of ridicule without much malice; and have received a great deal of kindness, not quite free from ridicule. I am used to it.' , context:'November 2, 1863 Letter to James H. Hackett'},
  ];

function generateQuote(quotes){
  var i = Math.floor(Math.random()*quotes.length);
  return quotes[i];
}; 

function placeQuote(){
  var q = generateQuote(LincolnQuotes);
  
  $("#quote").html('<h1>' + q.quote + '</h1>' +  "<footer><cite><h2><b>" + q.context + "</h2></cite></footer>");
  
  return q;
};

function tweetQuote(q){
  var st = q.quote + ' -Abe Lincoln';
  var encoded = encodeURI(st);
  var s =      'https://twitter.com/intent/tweet?text='+encoded;
  $("#TweetHere").attr("href",s);
  
};

function newColor(){
  var r = Math.floor(125* Math.random());
  var g = Math.floor(125* Math.random());
  var b = Math.floor(125* Math.random());
  var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
  $("body").css("color",rgb);
  $("body").css("background-color",rgb);
  $("i").css("color",rgb);

};

$(document).ready(function(){
  var q = placeQuote();
  tweetQuote(q);
  newColor();

 $("#refresh").on('click',function(){
   q = placeQuote();
   tweetQuote(q);
   newColor();
 });

  
    
    
 
});