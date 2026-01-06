
(function(){
alert("SCRIPT START");

var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function addHomepageDate(box,dateObj){
  alert("addHomepageDate called");
  if(!box)return;
  if(!(window.location.pathname==="/"||window.location.pathname==="/index.html"))return;
  if(box.querySelector(".thumbnail-date-overlay"))return;
  var tag=document.createElement("div");
  tag.className="thumbnail-date-overlay";
  tag.innerHTML=dateObj.getDate()+" "+dateObj.toLocaleString("en-US",{month:"long"})+" "+dateObj.getFullYear()+"<br>  By Carta Planbee";
  box.appendChild(tag);
}

function lastDayDate(day){
  alert("lastDayDate called for "+day);
  var d=new Date();
  var idx=days.indexOf(day);
  var diff=(d.getDay()-idx+7)%7;
  d.setDate(d.getDate()-diff);
  d.setHours(0,0,0,0);
  return d;
}

function formatDate(date){
  alert("formatDate called");
  return("0"+date.getDate()).slice(-2)+"/"+("0"+(date.getMonth()+1)).slice(-2)+"/"+date.getFullYear();
}

function numbers(day,mtp){
  alert("numbers called for "+day+", mtp="+mtp);
  var d=lastDayDate(day);
  var idx=days.indexOf(day);
  var seedStr=day+idx+(mtp?"MTP":"NORMAL")+"_"+formatDate(d);
  var seed=0;
  for(var i=0;i<seedStr.length;i++)seed=(seed*31+seedStr.charCodeAt(i))>>>0;
  var a=1664525,c=1013904223,m=4294967296;
  var x=seed;
  var nums=[];
  while(nums.length<16){
    x=(a*x+c)%m;
    var n=x%10;
    if(nums.filter(v=>v===n).length<2)nums.push(n);
  }
  return nums;
}

function overlayNumbers(box,nums,dayName,dateStr,mtp,smallSet){
  alert("overlayNumbers called for "+dayName+", mtp="+mtp+", smallSet="+smallSet);
  if(!box)return;
  box.style.position="relative";
  box.style.overflow="hidden";
  box.querySelectorAll(".num-box,.carta-date,.carta-day").forEach(x=>x.remove());
  if(mtp)box.classList.add("mtp");else box.classList.remove("mtp");
  var isHome=window.location.pathname==="/"||window.location.pathname==="/index.html";
  if(isHome)box.classList.add("homepage-overlay");else box.classList.remove("homepage-overlay");
  var dayDiv=document.createElement("div");
  dayDiv.className="carta-day";
  dayDiv.textContent=dayName;
  box.appendChild(dayDiv);
  var dateDiv=document.createElement("div");
  dateDiv.className="carta-date";
  dateDiv.textContent=dateStr;
  box.appendChild(dateDiv);
  addHomepageDate(box,lastDayDate(dayName));
  var ids=mtp?
  ["n1-mtp","n2-mtp","n3-mtp","n4-mtp","n5-mtp","n6-mtp","n7-mtp","n8-mtp","n9-mtp","n10-mtp","n11-mtp","n12-mtp","n13-mtp","n14-mtp","n15-mtp","n16-mtp"]:
  ["n1","n2","n3","n4","n5","n6","n7","n8","n9","n10","n11","n12","n13","n14","n15","n16"];
  nums.forEach((n,i)=>{
    if(smallSet&&i>=8)return;
    var d=document.createElement("div");
    d.className="num-box";
    d.id=ids[i];
    d.textContent=n;
    box.appendChild(d);
  });
}

function applyOverlay(post){
  alert("applyOverlay called for post");
  if(post.dataset.processed)return;
  var titleEl=post.querySelector("h1,h2,h3,.entry-title,.post-title");
  if(!titleEl)return;
  var link=titleEl.querySelector("a");
  var text=link?link.textContent.trim():titleEl.textContent.trim();
  var day=days.find(d=>text.toLowerCase().startsWith(d.toLowerCase()));
  var mtp=text.toLowerCase().includes("mtp");
  if(!day)return;
  var dateStr=formatDate(lastDayDate(day));
  if(link)link.textContent=text.replace(/\s*-\s*./,"")+" - "+dateStr;
  else titleEl.textContent=text.replace(/\s-\s*.*/,"")+" - "+dateStr;
  var imgs=post.querySelectorAll("img");
  var box;
  var isHome=window.location.pathname==="/"||window.location.pathname==="/index.html";
  if(isHome){
    box=post.querySelector(".post-thumb,.entry-thumb,.post-thumbnail,.jeg_thumb")||imgs[0]?.parentElement||imgs[0];
  }else{
    if(imgs.length===1)box=imgs[0].parentElement||imgs[0];
    else if(imgs.length>=2){
      overlayNumbers(imgs[0].parentElement||imgs[0],numbers(day,mtp),day,dateStr,mtp,true);
      imgs[0].parentElement?.classList.add("post-first");
      box=imgs[1].parentElement||imgs[1];
    }
  }
  overlayNumbers(box,numbers(day,mtp),day,dateStr,mtp,isHome);
  post.dataset.day=day;
  post.dataset.mtp=mtp?"1":"0";
  post.dataset.processed="1";
}

function sortValue(post){
  var today=new Date().getDay();
  var day=post.dataset.day;
  var mtp=post.dataset.mtp==="1";
  if(!day)return 999;
  var order=[];
  for(var i=0;i<7;i++)order.push(days[(today-i+7)%7]);
  var pos=order.indexOf(day);
  if(pos===-1)return 999;
  return pos*2+(mtp?0:1);
}

function initPosts(){
  alert("initPosts start");
  var container=document.querySelector("#Blog1 .blog-posts");
  if(!container)return;
  var allPosts=Array.from(container.querySelectorAll("article,.post,.blog-post,.jeg_post"));
  allPosts.forEach(applyOverlay);
  allPosts.sort((a,b)=>sortValue(a)-sortValue(b));
  var hiddenPosts=[];
  var postNav=container.parentElement.querySelector(".post-nav");
  container.innerHTML="";
  allPosts.forEach((p,i)=>{
    if(i>=7){
      p.style.display="none";
      hiddenPosts.push(p);
    }
    container.appendChild(p);
  });
  if(postNav)container.parentElement.appendChild(postNav);
  alert("initPosts end");
  return {container,hiddenPosts};
}

function handleLoadMore(hiddenPosts){
  alert("handleLoadMore setup");
  var btn=document.querySelector(".blog-pager-older-link,.load-more,a.load-more");
  if(!btn)return;
  btn.addEventListener("click",function(){
    setTimeout(function(){
      hiddenPosts.forEach(p=>{
        p.style.display="";
        applyOverlay(p);
      });
      hiddenPosts.length=0;
    },200);
  });
}

function run(){
  alert("run start");
  var postsData=initPosts();
  if(postsData)handleLoadMore(postsData.hiddenPosts);
  alert("run end");
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",run);
}else{
  run();
}

alert("SCRIPT END");

})();
