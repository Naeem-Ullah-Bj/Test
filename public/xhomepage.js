
(function () {
  "use strict";
alert():
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  function formatDate(date) {
    return ("0" + date.getDate()).slice(-2) + "/" +
           ("0" + (date.getMonth() + 1)).slice(-2) + "/" +
           date.getFullYear();
  }

  function addHomepageDate(box, dateObj) {
    if (!box || box.querySelector(".thumbnail-date-overlay")) return;

    const div = document.createElement("div");
    div.className = "thumbnail-date-overlay";
    div.textContent = formatDate(dateObj);

    box.style.position = "relative";
    box.appendChild(div);
  }

  function applyOverlay(post) {
    if (!post) return;

    const thumb = post.querySelector(".post-thumbnail, .thumbnail, img");
    if (!thumb) return;

    const dateAttr =
      post.getAttribute("data-date") ||
      post.querySelector("time")?.getAttribute("datetime");

    const dateObj = dateAttr ? new Date(dateAttr) : new Date();
    addHomepageDate(thumb.parentElement || post, dateObj);
  }

  function initPosts() {
    const posts = document.querySelectorAll(".post, article, .blog-post");
    posts.forEach(applyOverlay);
  }

  function observePosts() {
    const observer = new MutationObserver(() => initPosts());
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function init() {
    initPosts();
    observePosts();
    
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
alert('1235');
})();
