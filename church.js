document.querySelectorAll('.b1').forEach(button =>{
  button.addEventListener('click', function() {
    const paymentOptions = document.getElementById('paymentOptions');
    if (paymentOptions) {
      paymentOptions.style.display = paymentOptions.style.display === 'none' ? 'block' : 'none';
    }
  });
});

// Contact form submission
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (form && formMessage) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name && email && message) {
      formMessage.style.color = 'green';
      formMessage.textContent = 'Thank you for reaching out! We will get back to you soon.';
      form.reset();
    } else {
      formMessage.style.color = 'red';
      formMessage.textContent = 'Please fill in all fields.';
    }
  });
}
