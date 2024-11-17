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
  
  // Stats Section 
  function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    const range = end - start;
    const minTimer = 50;
    const stepTime = Math.abs(Math.floor(duration / range));
    const startTime = new Date().getTime();
    const endTime = startTime + duration;
    let timer;

    function run() {
        const now = new Date().getTime();
        const remaining = Math.max((endTime - now) / duration, 0);
        const value = Math.round(end - (remaining * range));
        if (id === 'talent') {
            obj.innerHTML = value.toLocaleString() + '++';
        } else if (id === 'clients') {
            obj.innerHTML = value + '+';
        } else {
            obj.innerHTML = value;
        }
        if (value === end) {
            clearInterval(timer);
        }
    }

    timer = setInterval(run, stepTime);
    run();
}

// Start animations when page loads
window.onload = function() {
    animateValue("minutes", 0, 10, 1000);
    animateValue("talent", 0, 25000, 2000);
    animateValue("clients", 0, 50, 1500);
}

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