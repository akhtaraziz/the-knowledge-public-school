// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');
const inquiryForm = document.getElementById('inquiryForm');
const newsletterForm = document.getElementById('newsletterForm');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Inquiry Form Submission
if(inquiryForm) {
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        
        // Show success message
        showNotification(`Thank you ${name}! Your inquiry has been submitted. We will contact you at ${email} soon.`, 'success');
        
        // Reset form
        this.reset();
    });
}

// Newsletter Form Submission
if(newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // Show success message
        showNotification(`Thank you for subscribing with ${email}! You'll receive our updates soon.`, 'success');
        
        // Reset form
        this.reset();
    });
}

// Notification Function
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add close button event
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if(document.body.contains(notification)) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.program-card, .campus-card, .facility-card').forEach(el => {
    observer.observe(el);
});

// Phone number click handler
document.querySelectorAll('.phone').forEach(phoneElement => {
    phoneElement.addEventListener('click', function() {
        const phoneNumber = this.textContent.trim();
        if(confirm(`Call ${phoneNumber}?`)) {
            window.location.href = `tel:${phoneNumber.replace(/-/g, '')}`;
        }
    });
});

// Current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.querySelector('.copyright p');
    if(yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', new Date().getFullYear());
    }
    
    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if(scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Add active class styles
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu a.active {
            color: var(--primary-color) !important;
        }
        .nav-menu a.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);
});

// School Announcement Banner (Optional Feature)
function createAnnouncementBanner() {
    const banner = document.createElement('div');
    banner.id = 'announcement-banner';
    banner.innerHTML = `
        <span>🎓 Admissions Open for 2024-2025! <a href="#admissions">Apply Now</a></span>
        <button id="close-banner">&times;</button>
    `;
    
    banner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to right, var(--primary-color), var(--accent-color));
        color: white;
        padding: 10px 20px;
        text-align: center;
        z-index: 1001;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    banner.querySelector('a').style.cssText = `
        color: var(--secondary-color);
        font-weight: bold;
        margin-left: 5px;
        text-decoration: none;
    `;
    
    banner.querySelector('a').addEventListener('mouseover', function() {
        this.style.textDecoration = 'underline';
    });
    
    banner.querySelector('a').addEventListener('mouseout', function() {
        this.style.textDecoration = 'none';
    });
    
    banner.querySelector('#close-banner').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0 10px;
    `;
    
    banner.querySelector('#close-banner').addEventListener('click', function() {
        banner.style.transition = 'transform 0.3s ease';
        banner.style.transform = 'translateY(-100%)';
        setTimeout(() => banner.remove(), 300);
        
        // Store in localStorage to not show again for 24 hours
        localStorage.setItem('bannerClosed', new Date().getTime());
    });
    
    // Check if banner was recently closed
    const lastClosed = localStorage.getItem('bannerClosed');
    if(lastClosed) {
        const hoursSinceClosed = (new Date().getTime() - lastClosed) / (1000 * 60 * 60);
        if(hoursSinceClosed < 24) {
            return; // Don't show banner if closed within 24 hours
        }
    }
    
    document.body.prepend(banner);
    
    // Adjust header position
    const header = document.querySelector('header');
    if(header) {
        header.style.top = '40px';
    }
}

// Initialize announcement banner after page loads
window.addEventListener('load', createAnnouncementBanner);

// Image Gallery Functionality (for future enhancement)
function initializeImageGallery() {
    // This function can be expanded to create an image gallery
    // for the school photos when you add actual images
    console.log('Image gallery ready for implementation');
}

// Call initialization functions
initializeImageGallery();
