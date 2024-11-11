  // Scroll to top functionality
  const scrollTop = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
      if (window.pageYOffset > 200) {
          scrollTop.classList.add('visible');
      } else {
          scrollTop.classList.remove('visible');
      }
  });

  scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  // Number animation for stats
  function animateNumber(element, target, duration = 2000) {
      let start = 0;
      const increment = target / (duration / 16);
      
      function updateNumber() {
          start += increment;
          if (start < target) {
              element.textContent = Math.floor(start);
              requestAnimationFrame(updateNumber);
          } else {
              element.textContent = target;
          }
      }
      
      updateNumber();
  }

  // Trigger animation when elements are in view
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const target = parseInt(entry.target.textContent);
              animateNumber(entry.target, target);
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(stat => {
      observer.observe(stat);
  });