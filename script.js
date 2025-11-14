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
