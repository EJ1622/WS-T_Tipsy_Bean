// carousel logic for custom slides: vanilla JS, works with Bootstrap!
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const leftArrow = document.querySelector('.carousel-arrow.left');
  const rightArrow = document.querySelector('.carousel-arrow.right');
  let current = 0;

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    slides.forEach((slide) => slide.classList.remove('active'));
    dots.forEach((dot) => dot.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    current = index;
  }

  leftArrow.addEventListener('click', () => showSlide(current - 1));
  rightArrow.addEventListener('click', () => showSlide(current + 1));
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });
  
  showSlide(0);
});

// Bestseller quantity logic

document.querySelectorAll('.bestseller-item').forEach(function(item) {
  const minusBtn = item.querySelector('button:nth-of-type(1)');
  const qtySpan = item.querySelector('.bestseller-qty-btns span');
  const plusBtn = item.querySelector('button:nth-of-type(3)');
  let qty = 1; // default quantity

  minusBtn.addEventListener('click', function() {
    if (qty > 1) {
      qty--;
      qtySpan.textContent = qty;
    }
  });
  plusBtn.addEventListener('click', function() {
    qty++;
    qtySpan.textContent = qty;
  });
});

// Lightgallery initialization for event photo grid
lightgallery(document.getElementById('lightgallery'), {
  plugins:[lgZoom],
  speed: 500,
  download: false,
});

//Booking form handler (client-side validation and siple feedback)
document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const dateField = document.getElementById('eventDate');
  const msg = document.getElementById('formMessage');
  if (!dateField.value) {
    dateField.classList.add('is-invalid');
    msg.style.display = 'none';
  } else {
    dateField.classList.remove('is-invalid')
    msg.textContent = 'Thank you! Your reservation is being processed.';
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 4000);
    this.reset();
  }
});

// Subscription form feedback
document.getElementById('subscribeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('subscribeName');
  const email = document.getElementById('subscribeEmail');
  const msg = document.getElementById('subscribeMsg');
  let isValid = true;
  
  // Simple validation
  if (!name.value.trim()) { name.classList.add('is-invalid'); isValid = false; }
  else { name.classList.remove('is-invalid'); }
  if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) { email.classList.add('is-invalid'); isValid = false; }
  else { email.classList.remove('is-invalid'); }
  
  if (isValid) {
    msg.textContent = "Thank you for subscribing!";
    msg.style.display = 'block';
    this.reset();
    setTimeout(() => { msg.style.display = 'none'; }, 3500);
  } else {
    msg.style.display = 'none';
  }
});

// Contact form feedback
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('contactName');
  const email = document.getElementById('contactEmail');
  const message = document.getElementById('contactMessage');
  const msg = document.getElementById('contactMsg');
  let isValid = true;

  // Simple validation
  if (!name.value.trim()) { name.classList.add('is-invalid'); isValid = false; }
  else { name.classList.remove('is-invalid'); }
  if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) { email.classList.add('is-invalid'); isValid = false; }
  else { email.classList.remove('is-invalid'); }
  if (!message.value.trim()) { message.classList.add('is-invalid'); isValid = false; }
  else { message.classList.remove('is-invalid'); }

  if (isValid) {
    msg.textContent = "Thank you for reaching out! We’ll get back to you soon.";
    msg.style.display = 'block';
    this.reset();
    setTimeout(() => { msg.style.display = 'none'; }, 3500);
  } else {
    msg.style.display = 'none';
  }
});
