// ===== Custom front-end interactions for Tipsy Bean =====

document.addEventListener('DOMContentLoaded', function () {
  // ---------- Custom Carousel Logic (Home Page only) ----------
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const leftArrow = document.querySelector('.carousel-arrow.left');
  const rightArrow = document.querySelector('.carousel-arrow.right');

  if (slides.length > 0 && dots.length > 0 && leftArrow && rightArrow) {
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
    dots.forEach((dot, i) =>
      dot.addEventListener('click', () => showSlide(i))
    );

    showSlide(0);
  }

  // ----------- Bestseller quantity logic ----------
  document.querySelectorAll('.bestseller-item').forEach((item) => {
    const btns = item.querySelectorAll('.bestseller-qty-btns button');
    const qtySpan = item.querySelector('.bestseller-qty-btns span');
    if (!btns.length || !qtySpan) return;

    let qty = 1;
    btns[0].addEventListener('click', () => {
      if (qty > 1) {
        qty--;
        qtySpan.textContent = qty;
      }
    });
    btns[1].addEventListener('click', () => {
      qty++;
      qtySpan.textContent = qty;
    });
  });

  // ---------- lightGallery initialization (Events gallery) ----------
  const galleryEl = document.getElementById('lightgallery');
  if (galleryEl && typeof lightGallery === 'function') {
    lightGallery(galleryEl, {
      plugins: typeof lgZoom !== 'undefined' ? [lgZoom] : [],
      speed: 500,
      download: false,
    });
  }

  // ---------- Booking form handler (Events page) ----------
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dateField = document.getElementById('eventDate');
      const msg = document.getElementById('formMessage');
      if (!dateField || !msg) return;

      if (!dateField.value) {
        dateField.classList.add('is-invalid');
        msg.style.display = 'none';
      } else {
        dateField.classList.remove('is-invalid');
        msg.textContent = 'Thank you! Your reservation is being processed.';
        msg.className = 'text-success mt-2';
        msg.style.display = 'block';
        setTimeout(() => (msg.style.display = 'none'), 4000);
        bookingForm.reset();
      }
    });
  }

  // ---------- Subscription form feedback (Contact page) ----------
  const subscribeForm = document.getElementById('subscribeForm');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('subscribeName');
      const email = document.getElementById('subscribeEmail');
      const msg = document.getElementById('subscribeMsg');
      if (!name || !email || !msg) return;

      let isValid = true;

      if (!name.value.trim()) {
        name.classList.add('is-invalid');
        isValid = false;
      } else {
        name.classList.remove('is-invalid');
      }

      if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
      } else {
        email.classList.remove('is-invalid');
      }

      if (isValid) {
        msg.textContent = 'Thank you for subscribing!';
        msg.className = 'text-success mt-2';
        msg.style.display = 'block';
        subscribeForm.reset();
        setTimeout(() => (msg.style.display = 'none'), 3500);
      } else {
        msg.style.display = 'none';
      }
    });
  }

  // ---------- Contact form feedback (Contact page) ----------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName');
      const email = document.getElementById('contactEmail');
      const message = document.getElementById('contactMessage');
      const msg = document.getElementById('contactMsg');
      if (!name || !email || !message || !msg) return;

      let isValid = true;

      if (!name.value.trim()) {
        name.classList.add('is-invalid');
        isValid = false;
      } else {
        name.classList.remove('is-invalid');
      }

      if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
      } else {
        email.classList.remove('is-invalid');
      }

      if (!message.value.trim()) {
        message.classList.add('is-invalid');
        isValid = false;
      } else {
        message.classList.remove('is-invalid');
      }

      if (isValid) {
        msg.textContent =
          "Thank you for reaching out! We’ll get back to you soon.";
        msg.className = 'text-success mt-2';
        msg.style.display = 'block';
        contactForm.reset();
        setTimeout(() => (msg.style.display = 'none'), 3500);
      } else {
        msg.style.display = 'none';
      }
    });
  }
});
