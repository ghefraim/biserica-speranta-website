emailjs.init('EJx66pTUSl1mZKrT2');

document.querySelector('.submit-button').addEventListener('click', function(event) {
    //TODO: add email and string check
    event.preventDefault();
    // const contactForm = document.querySelector('#email-form');
    // console.log(contactForm);
    // these IDs from the previous steps
    emailjs.sendForm('service_y6k7skr', 'template_du3t41e', '#email-form')
        .then(function() {
            console.log('SUCCESS!');
        }, function(error) {
            console.log('FAILED...', error);
        });
});