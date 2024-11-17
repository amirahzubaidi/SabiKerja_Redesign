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

  document.querySelectorAll('.stat-number .stat-number-img').forEach(stat => {
      observer.observe(stat);
  });

  //Contact Us

  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const spinner = document.getElementById('spinner');
    const button = this.querySelector('button');
    const buttonText = button.querySelector('span');
    
    // Show loading state
    spinner.style.display = 'block';
    buttonText.style.display = 'none';
    button.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Basic valid
        if (!name || !email || !subject || !message) {
            showAlert('error');
            return;
        }

        // Email valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('error');
            return;
        }

        showAlert('success');
        this.reset();

        // Reset button state
        spinner.style.display = 'none';
        buttonText.style.display = 'inline';
        button.disabled = false;
    }, 2000);
});

function showAlert(type) {
    const successAlert = document.getElementById('successAlert');
    const errorAlert = document.getElementById('errorAlert');

    if (type === 'success') {
        successAlert.style.display = 'block';
        errorAlert.style.display = 'none';
    } else {
        successAlert.style.display = 'none';
        errorAlert.style.display = 'block';
    }

    setTimeout(() => {
        successAlert.style.display = 'none';
        errorAlert.style.display = 'none';
    }, 5000);
}

// Add hover effect to social icons
document.querySelectorAll('.social-icons a').forEach(icon => {
    icon.addEventListener('mouseover', function() {
        this.style.transform = 'rotate(360deg) scale(1.2)';
        this.style.transition = 'all 0.5s ease';
    });

    icon.addEventListener('mouseout', function() {
        this.style.transform = 'rotate(0deg) scale(1)';
    });
});

//Chat bot logo 
const chatBubble = document.querySelector('.chat-bubble');
    
chatBubble.addEventListener('click', () => {
  chatBubble.style.background = getRandomColor();
  const bubble = chatBubble.querySelector(':before');
  if (bubble) {
    bubble.style.borderTopColor = chatBubble.style.background;
  }
});

function getRandomColor() {
  const colors = [
    '#2196F3', // Blue
    '#4CAF50', // Green
    '#9C27B0', // Purple
    '#FF9800', // Orange
    '#E91E63'  // Pink
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}