const noButton = document.getElementById("noButton");

noButton.addEventListener("mouseover", function() {
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 80);

    noButton.style.left = x + "px";
    noButton.style.top = y + "px";
});
