emailjs.init('EJx66pTUSl1mZKrT2');

document.querySelector('.submit-button').addEventListener('click', function(event) {
    var isFormComplete = formCheck(document.querySelector('#name').value,
        document.querySelector('#email').value,
        document.querySelector('#message').value);

    if(!isFormComplete){
        document.querySelector('.w-form-fail').style.display = 'block';
    } else {
        event.preventDefault();
        var submitButton = document.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.style.backgroundColor = "#ffffff90";

        emailjs.sendForm('service_y6k7skr', 'template_du3t41e', '#email-form')
            .then(function() {
                document.querySelector('.w-form-fail').style.display = 'none';
                document.querySelector('.w-form-done').style.display = 'block';
                submitButton.style.display = 'none';
            }, function(error) {
                document.querySelector('.w-form-fail > div').innerHTML = `Ceva nu a functionat. Incearca mai tarziu<br>${error}`;
                document.querySelector('.w-form-fail').style.display = 'block';
            });
    }
});

function formCheck(name, email, message) {
    if(name == '' || email == '' || message == '') {
        return false;
    }
    //var validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        return false;
    }
    return true;
}


const bisericaSocialButtons = document.querySelectorAll(".biserica-socials > img");
bisericaSocialButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // basically i check the source name and add the links accordingly
        if (btn.src.includes("facebook")) {
            window.open("https:///www.facebook.com/bpsperanta", '_blank');
        }
        // else if (btn.src.includes("instagram")) {
        //     window.open("", '_blank');
        // }
        else if (btn.src.includes("youtube")) {
            window.open("https://www.youtube.com/@SperantaOradea1", '_blank');
        }
    });
});

const tineretSocialButtons = document.querySelectorAll(".tineret-socials > img");
tineretSocialButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // basically i check the source name and add the links accordingly
        if (btn.src.includes("facebook")) {
            window.open("https://www.facebook.com/tineretsperantaoradea", '_blank');
        }
        else if (btn.src.includes("instagram")) {
            window.open("https://www.instagram.com/tineret_speranta_oradea/", '_blank');
        }
    });
});


