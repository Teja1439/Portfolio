// Mobile Menu Toggle
const menuButton = document.getElementById('menuButton');
const menuItems = document.getElementById('menuItems');
const body = document.body;

// Create overlay element
const overlay = document.createElement('div');
overlay.classList.add('menu-overlay');
document.body.appendChild(overlay);

menuButton.addEventListener('click', () => {
  menuButton.classList.toggle('active');
  menuItems.classList.toggle('active');
  overlay.classList.toggle('active');
  
  // Prevent body scrolling when menu is open
  if (menuItems.classList.contains('active')) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }
});

// Close menu when clicking on overlay
overlay.addEventListener('click', () => {
  menuButton.classList.remove('active');
  menuItems.classList.remove('active');
  overlay.classList.remove('active');
  body.style.overflow = '';
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (menuItems.classList.contains('active')) {
        menuButton.classList.remove('active');
        menuItems.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
      }
    }
  });
});

// Tab Functionality for Internships
function showInternship(id, btn) {
  // Hide all internship contents
  document.querySelectorAll('.internship-content').forEach(content => {
    content.classList.remove('active');
  });
  
  // Remove active class from all buttons
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('active');
  });
  
  // Show selected content and mark button as active
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}

// Animate Elements on Scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.skill-card, .card-wrapper, .section');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Initialize elements as hidden
document.querySelectorAll('.skill-card, .card-wrapper, .section').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Project card functionality
const knowMoreButtons = document.querySelectorAll('.know-more-btn');
knowMoreButtons.forEach(button => {
  button.addEventListener('click', function() {
    const card = this.closest('.project-card');
    const isExpanded = card.classList.contains('expanded');
    
    // Close all other expanded cards
    document.querySelectorAll('.project-card.expanded').forEach(expandedCard => {
      if (expandedCard !== card) {
        expandedCard.classList.remove('expanded');
        expandedCard.querySelector('.know-more-btn').textContent = 'Know More';
      }
    });
    
    // Toggle current card
    card.classList.toggle('expanded');
    this.textContent = isExpanded ? 'Know More' : 'Show Less';
  });
});

// Enhanced Video Modal functionality
const demoLinks = document.querySelectorAll('.demo-link');
const videoModal = document.querySelector('.video-modal');
const closeModal = document.querySelector('.close-modal');
const modalVideo = document.querySelector('.modal-video');

if (demoLinks.length && videoModal && closeModal) {
  demoLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const videoSrc = this.getAttribute('data-video');
      
      // Set video source
      if (modalVideo) {
        modalVideo.innerHTML = '';
        const source = document.createElement('source');
        source.src = videoSrc;
        source.type = 'video/mp4';
        modalVideo.appendChild(source);
        
        // Show modal
        videoModal.style.display = 'flex';
        
        // Play the video
        modalVideo.load();
        modalVideo.play().catch(e => console.log('Autoplay prevented:', e));
      }
    });
  });

  closeModal.addEventListener('click', function() {
    videoModal.style.display = 'none';
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.currentTime = 0;
    }
  });

  // Close modal when clicking outside or pressing ESC
  window.addEventListener('click', function(e) {
    if (e.target === videoModal) {
      videoModal.style.display = 'none';
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
      }
    }
  });

  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoModal.style.display === 'flex') {
      videoModal.style.display = 'none';
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
      }
    }
  });
}

// Close menu when clicking on menu items (for mobile)
document.querySelectorAll('.menu-item a').forEach(item => {
  item.addEventListener('click', function() {
    if (window.innerWidth <= 768) {
      menuButton.classList.remove('active');
      menuItems.classList.remove('active');
      overlay.classList.remove('active');
      body.style.overflow = '';
    }
  });
});

// Close menu when window is resized above mobile breakpoint
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    menuButton.classList.remove('active');
    menuItems.classList.remove('active');
    overlay.classList.remove('active');
    body.style.overflow = '';
  }
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Trigger once on page load
window.addEventListener('load', () => {
  animateOnScroll();
  
  // Set first internship tab as active by default
  const firstTab = document.querySelector('.tab-button');
  if (firstTab) {
    firstTab.click();
  }
});