document.addEventListener("DOMContentLoaded", function () {
    const agreeButton = document.querySelector('.agree');
    const overlay = document.querySelector('.overlay');
    const cookieDiv = document.querySelector('.cookie-container');
    const agreeBox = document.querySelector('#agree-box');
    const cookieMessage = document.createElement('div');
    const form = document.querySelector('.review');
    const submit = document.querySelector('.submit');
    const spilaPodcast = document.querySelector('.spila-podcast');
    const passwordContainer = document.querySelector('.password-container');
    
    cookieMessage.style.display = 'none';
    cookieMessage.style.backgroundColor = '#f44336';
    cookieMessage.style.color = 'white';
    cookieMessage.style.padding = '10px';
    cookieMessage.style.borderRadius = '5px';
    cookieMessage.style.width = '100%';
    cookieMessage.style.minWidth = '250px';
    cookieMessage.style.maxWidth = '500px';
    cookieMessage.style.marginLeft = '20px';
    cookieMessage.style.marginRight = '20px';
    cookieMessage.style.marginTop = '20px';
    cookieMessage.style.textAlign = 'center';
    cookieMessage.textContent = 'Þarf er að samþykkja skilamála';

    cookieDiv.appendChild(cookieMessage);

    if (localStorage.getItem('cookiesAccepted') === 'true') {
        overlay.style.display = 'none';
        cookieDiv.style.display = 'none';
    }

    agreeButton.addEventListener('click', function () {
        if (agreeBox.checked) {
            localStorage.setItem('cookiesAccepted', 'true');
            overlay.style.display = 'none';
            cookieDiv.style.display = 'none';
        } else {
            cookieMessage.style.display = 'block';
            setTimeout(function () {
                cookieMessage.style.display = 'none';
            }, 3000);
        }
    });

    submit.addEventListener('click', function (e) {
        e.preventDefault();

        const name = document.querySelector('#review-name').value.trim();
        const email = document.querySelector('#review-email').value.trim();
        const review = document.querySelector('#review-p').value.trim();

        if (!name || !email || !review) {
            alert('Please fill out all fields before submitting.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        const webhookURL = '8UNuxNsOkIFVcA0iIl6M0m2cC';
        const payload = {
            content: `New Review Submitted! 🎉\n\n**Name:** ${name}\n**Email:** ${email}\n**Review:** ${review}`
        };

        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you for your review!');
                review.style.display = 'none';
                form.reset();
            } else {
                alert('Failed to send your review. Please try again later.');
            }
        })
        .catch(error => {
            console.error('Error sending the webhook:', error);
            alert('An error occurred. Please try again later.');
        });
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.querySelector('.overlay');
    const spilaPodcast = document.querySelector('.spila-podcast');
    const passwordContainer = document.querySelector('.password-container');
    const podcastContainer = document.querySelector('.podcast-container');
    const passwordConfirm = document.querySelector('.password-confirm');
    const passwordInput = document.querySelector('.password');
    const cookieMessage = document.createElement('div');
    const toastMessage = document.createElement('div');

    cookieMessage.style.display = 'none';
    cookieMessage.style.backgroundColor = '#f44336';
    cookieMessage.style.color = 'white';
    cookieMessage.style.padding = '10px';
    cookieMessage.style.borderRadius = '5px';
    cookieMessage.style.width = '100%';
    cookieMessage.style.minWidth = '250px';
    cookieMessage.style.maxWidth = '500px';
    cookieMessage.style.marginLeft = '20px';
    cookieMessage.style.marginRight = '20px';
    cookieMessage.style.marginTop = '20px';
    cookieMessage.style.textAlign = 'center';
    cookieMessage.textContent = 'Incorrect Password';

    toastMessage.style.display = 'none';
    toastMessage.style.backgroundColor = '#26bf4f';
    toastMessage.style.color = 'white';
    toastMessage.style.padding = '10px';
    toastMessage.style.borderRadius = '5px';
    toastMessage.style.width = '100%';
    toastMessage.style.minWidth = '250px';
    toastMessage.style.maxWidth = '500px';
    toastMessage.style.marginLeft = '20px';
    toastMessage.style.marginRight = '20px';
    toastMessage.style.marginTop = '20px';
    toastMessage.style.textAlign = 'center';
    toastMessage.textContent = 'Access Granted';

    const PASSWORD = "guggaGiveMeAn_A";

    if (passwordContainer) {
        passwordContainer.appendChild(cookieMessage);
    }

    if (spilaPodcast) {
        spilaPodcast.addEventListener('click', function () {
            overlay.style.display = 'flex';
            passwordContainer.style.display = 'flex';
        });
    }

    if (passwordConfirm) {
        passwordConfirm.addEventListener('click', function () {
            if (passwordInput.value === PASSWORD) {
                sessionStorage.setItem('podcastAccess', 'true');
                passwordContainer.style.display = 'none';
                podcastContainer.style.display = 'flex';
                cookieMessage.style.display = 'block';
            } else {
                cookieMessage.style.display = 'block';
                setTimeout(function () {
                    cookieMessage.style.display = 'none';
                }, 3000);
            }
        });
    }
});

