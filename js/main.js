/*=============== NAV MENU TOGGLE (mobile) ===============*/
const navMenu   = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose  = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
}
if (navClose) {
  navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
}

// Close menu when a nav link is clicked
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
});

/*=============== HEADER SHADOW ON SCROLL ===============*/
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scroll-header', window.scrollY >= 50);
});

/*=============== SKILLS ACCORDION ===============*/
document.querySelectorAll('.skills__header').forEach(header => {
  header.addEventListener('click', () => {
    const parent = header.parentElement;
    // Close all others
    document.querySelectorAll('.skills__content').forEach(content => {
      if (content !== parent) {
        content.classList.remove('skills__open');
        content.classList.add('skills__close');
      }
    });
    // Toggle current
    parent.classList.toggle('skills__open');
    parent.classList.toggle('skills__close');
  });
});

/*=============== QUALIFICATION TABS ===============*/
const tabs    = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

// Add data-content attribute programmatically
document.querySelectorAll('.qualification__content').forEach(content => {
  content.setAttribute('data-content', '');
});

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);

    // Remove active from all contents
    document.querySelectorAll('.qualification__content').forEach(c =>
      c.classList.remove('qualification__active')
    );
    target.classList.add('qualification__active');

    // Remove active from all tabs
    tabs.forEach(t => t.classList.remove('qualification__active'));
    tab.classList.add('qualification__active');
  });
});

/*=============== ACTIVE NAV LINK ON SCROLL ===============*/
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

function updateActiveLink() {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const sectionTop    = section.offsetTop - 80;
    const sectionHeight = section.offsetHeight;
    const sectionId     = section.getAttribute('id');
    const link = document.querySelector(`.nav__link[href="#${sectionId}"]`);

    if (link) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(l => l.classList.remove('active-link'));
        link.classList.add('active-link');
      }
    }
  });
}
window.addEventListener('scroll', updateActiveLink);

/*=============== SCROLL UP BUTTON ===============*/
const scrollUp = document.getElementById('scroll-up');
window.addEventListener('scroll', () => {
  scrollUp.classList.toggle('show-scroll', window.scrollY >= 350);
});

/*=============== CONTACT FORM (basic) ===============*/
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#22c55e';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = 'Send Message <i class="ri-send-plane-line"></i>';
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
// Lightweight IntersectionObserver-based fade-in
const revealElements = document.querySelectorAll(
  '.about__container, .skills__content, .project__card, .qualification__data, .contact__card, .contact__form'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transition = `opacity .6s ease ${i * 0.1}s, transform .6s ease ${i * 0.1}s`;
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  revealObserver.observe(el);
});
