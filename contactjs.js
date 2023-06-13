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
                console.log('FAILED...', error);
                document.querySelector('.w-form-fail > div').innerHTML = 'Ceva nu a functionat. Incearca mai tarziu';
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
