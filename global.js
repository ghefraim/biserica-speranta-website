const popup = document.querySelector(".popup-nav");
const navigation = document.querySelector(".navigation");
const navbtn = document.querySelector(".menu-button").addEventListener("click", function() {
    if(popup.style.opacity == "0") {
        // popup.style.display = "flex";
        popup.style.opacity = "1";
        popup.style.top = "70px";
        navigation.style.backgroundColor = "rgb(66, 75, 84)";
    } else {
        // popup.style.display = "none";
        popup.style.opacity = "0";
        popup.style.top = "-1000px";
        navigation.style.backgroundColor = "rgba(0, 0, 0, 0)";
    }
});


const footerSocialButtons = document.querySelectorAll(".footer-wrap > div > div > img");
footerSocialButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // basically i check the source name and add the links accordingly
        if (btn.src.includes("facebook")) {
            window.open("https:///www.facebook.com/bpsperanta", '_blank');
        }
        else if (btn.src.includes("instagram")) {
            window.open("https://www.instagram.com/tineret_speranta_oradea/", '_blank');
        }
        else if (btn.src.includes("youtube")) {
            window.open("https://www.youtube.com/@SperantaOradea1", '_blank');
        }
    });
});