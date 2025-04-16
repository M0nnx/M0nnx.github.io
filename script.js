document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');
  const header = document.querySelector('header');
  const backToTop = document.querySelector('.back-to-top');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const proyectoCards = document.querySelectorAll('.proyecto-card');
  const skillItems = document.querySelectorAll('.skill-item');
  const contactForm = document.getElementById('contactForm');

  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      menu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (backToTop) { 
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });
  
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        proyectoCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'block';
          } else {
            if (card.getAttribute('data-category') === filter) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const mensaje = document.getElementById('mensaje').value;
      
      if (!nombre || !email || !mensaje) {
        showFormMessage('Por favor, completa todos los campos', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showFormMessage('Por favor, ingresa un email válido', 'error');
        return;
      }

      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;

      setTimeout(() => {
        showFormMessage('¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
  
  function showFormMessage(message, type) {
    if (!contactForm) return;
    
    const oldMessage = document.querySelector('.form-message');
    if (oldMessage) {
      oldMessage.remove();
    }

    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;

    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.parentNode.insertBefore(messageElement, submitBtn.nextSibling);
    
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
  
  if (!backToTop) {
    const backToTopButton = document.createElement('a');
    backToTopButton.className = 'back-to-top';
    backToTopButton.href = '#';
    backToTopButton.setAttribute('aria-label', 'Volver arriba');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    
    document.body.appendChild(backToTopButton);
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  const style = document.createElement('style');
  style.textContent = `
    .form-message {
      padding: 10px 15px;
      margin-top: 15px;
      border-radius: var(--border-radius);
      font-weight: 500;
    }
    .form-message.success {
      background-color: rgba(76, 175, 80, 0.1);
      color: #4caf50;
      border: 1px solid #4caf50;
    }
    .form-message.error {
      background-color: rgba(244, 67, 54, 0.1);
      color: #f44336;
      border: 1px solid #f44336;
    }
    .no-scroll {
      overflow: hidden;
    }
    .back-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background-color: var(--color-primary, #4a90e2);
      color: white;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
    }
    .back-to-top.visible {
      opacity: 1;
      visibility: visible;
    }
    .back-to-top:hover {
      background-color: var(--color-primary-dark, #3570b4);
      transform: translateY(-3px);
    }
  `;
  document.head.appendChild(style);
});