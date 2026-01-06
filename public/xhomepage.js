(function(){  

alert("A: script start");

var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];  

alert("B: vars loaded");

function addHomepageDate(box,dateObj){  
  alert("addHomepageDate called");
}  

function lastDayDate(day){  
  alert("lastDayDate called");
}  

function formatDate(date){  
  alert("formatDate called");
  return("0"+date.getDate()).slice(-2)+"/"+("0"+(date.getMonth()+1)).slice(-2)+"/"+date.getFullYear();  
}  

function numbers(day,mtp){  
  alert("numbers called");
}  

function overlayNumbers(box,nums,dayName,dateStr,mtp,smallSet){  
  alert("overlayNumbers called");
}  

function applyOverlay(post){  
  alert("applyOverlay called");
}  

function sortValue(post){  
  alert("sortValue called");
}  

function initPosts(){  
  alert("initPosts called");
}  

function handleLoadMore(hiddenPosts){  
  alert("handleLoadMore called");
}  

alert("C: before initPosts");

var postsData=initPosts();  

alert("D: after initPosts");

if(postsData){
  alert("E: before handleLoadMore");
  handleLoadMore(postsData.hiddenPosts);  
}

alert("F: script end");

})();
