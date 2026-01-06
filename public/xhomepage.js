(function(){
var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function addHomepageDate(box,dateObj){
}

function lastDayDate(day){
}

function formatDate(date){
return("0"+date.getDate()).slice(-2)+"/"+("0"+(date.getMonth()+1)).slice(-2)+"/"+date.getFullYear();
}

function numbers(day,mtp){
}

function overlayNumbers(box,nums,dayName,dateStr,mtp,smallSet){
}

function applyOverlay(post){
}

function sortValue(post){
}

function initPosts(){
}

function handleLoadMore(hiddenPosts){
}

var postsData=initPosts();
if(postsData)handleLoadMore(postsData.hiddenPosts);

})();
