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

      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
      
    });
    
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
    
    // Validar formato de email
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
    `;
    document.head.appendChild(style);
  });