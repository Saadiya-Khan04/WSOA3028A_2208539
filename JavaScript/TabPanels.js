function myFunction(Imagef) {

    var expandImg = document.getElementById("BigImg");
    var imgText = document.getElementById("imgtext");

    expandImg.src = Imagef.src;
    imgText.innerHTML = Imagef.alt;
    expandImg.parentElement.style.display = "block";
  }

  

