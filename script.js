let galleryImages = document.querySelectorAll(".slide_image");
let getLatestOpenImg;
let windowWidth = window.innerWidth;

if (galleryImages) {
  galleryImages.forEach(function (i, index) {
    i.onclick = function () {
      let getFullImgSrc = i.getAttribute("src");
      let getImgUrlPos = getFullImgSrc.substring(23);
      getLatestOpenImg = index + 1;

      let container = document.body;
      let newImageWindow = document.createElement("div");
      container.appendChild(newImageWindow);
      newImageWindow.setAttribute("class", "img-window");
      newImageWindow.setAttribute("onclick", "closeImg()");

      let newImg = document.createElement("img");
      newImageWindow.appendChild(newImg);
      newImg.setAttribute("src", "./imgs/new/" + getImgUrlPos);
      newImg.setAttribute("id", "current-img");

      newImg.onload = function () {
        let imgWidth = this.width;
        let calcImgToEdge = (windowWidth - imgWidth) / 2 - 100;

        let newNextBtn = document.createElement("a");
        let btnNexttext = document.createTextNode("Next");
        newNextBtn.appendChild(btnNexttext);
        container.appendChild(newNextBtn);
        newNextBtn.setAttribute("class", "img-btn-next");
        newNextBtn.setAttribute("onclick", "changeImg(1)");
        newNextBtn.style.cssText = "right: " + calcImgToEdge + "px;";

        let newPrevBtn = document.createElement("a");
        let btnPrevtext = document.createTextNode("Prev");
        newPrevBtn.appendChild(btnPrevtext);
        container.appendChild(newPrevBtn);
        newPrevBtn.setAttribute("class", "img-btn-prev");
        newPrevBtn.setAttribute("onclick", "changeImg(0)");
        newPrevBtn.style.cssText = "left: " + calcImgToEdge + "px;";
      };
    };
  });
}

function closeImg() {
  document.querySelector(".img-window").remove();
  document.querySelector(".img-btn-next").remove();
  document.querySelector(".img-btn-prev").remove();
}

function changeImg(changeDir) {
  document.querySelector("#current-img").remove();

  let getImgWindow = document.querySelector(".img-window");
  let newImg = document.createElement("img");
  getImgWindow.appendChild(newImg);

  let calcNewImg;
  if (changeDir === 1) {
    calcNewImg = getLatestOpenImg + 1;
    if (calcNewImg > galleryImages.length) {
      calcNewImg = 1;
    }
  } else if (changeDir === 0) {
    calcNewImg = getLatestOpenImg - 1;
    if (calcNewImg < 1) {
      calcNewImg = galleryImages.length;
    }
  }

  newImg.setAttribute("src", "./imgs/new/img" + calcNewImg + ".png");
  newImg.setAttribute("id", "current-img");

  getLatestOpenImg = calcNewImg;
}
