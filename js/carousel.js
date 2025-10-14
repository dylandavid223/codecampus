// Circular Carousel System
class CourseCarousel {
    constructor(courses) {
        this.courses = courses;
        this.currentAngle = 0;
        this.radius = 400;
        this.autoRotateInterval = null;
        this.isAutoRotating = true;
        
        this.init();
    }
    
    init() {
        this.renderCarousel();
        this.setupEventListeners();
        this.startAutoRotation();
    }
    
    renderCarousel() {
        const carousel = document.getElementById('course-carousel');
        carousel.innerHTML = '';
        
        const angleStep = (2 * Math.PI) / this.courses.length;
        
        this.courses.forEach((course, index) => {
            const angle = this.currentAngle + index * angleStep;
            const x = Math.sin(angle) * this.radius;
            const z = Math.cos(angle) * this.radius;
            
            const card = this.createCourseCard(course, angle, x, z, index);
            carousel.appendChild(card);
        });
    }
    
    createCourseCard(course, angle, x, z, index) {
        const card = document.createElement('div');
        card.classList.add('course-card');
        card.dataset.courseId = course.id;
        
        // Calculate opacity and scale based on position
        const focusValue = Math.cos(angle);
        const opacity = 0.5 + 0.5 * focusValue;
        const scale = 0.8 + 0.2 * focusValue;
        
        card.style.opacity = opacity;
        card.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${-angle}rad) scale(${scale})`;
        
        // Add focused class to the front card
        if (focusValue > 0.9) {
            card.classList.add('focused');
        }
        
        card.innerHTML = `
            <div class="course-icon ${course.category}">${course.icon}</div>
            <h3 class="course-title">${course.title}</h3>
            <p class="course-description">${course.description}</p>
            <ul class="course-features">
                ${course.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <div class="course-pricing">
                <div>
                    <div class="price">${course.price}</div>
                    <div class="original-price">${course.originalPrice}</div>
                </div>
                <button class="enroll-button">Enroll Now</button>
            </div>
        `;
        
        // Add click event to enroll button
        const enrollButton = card.querySelector('.enroll-button');
        enrollButton.addEventListener('click', () => {
            this.selectCourse(course);
        });
        
        return card;
    }
    
    setupEventListeners() {
        // Navigation buttons
        document.getElementById('next-course').addEventListener('click', () => {
            this.nextCourse();
        });
        
        document.getElementById('prev-course').addEventListener('click', () => {
            this.prevCourse();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                this.nextCourse();
            } else if (e.key === 'ArrowLeft') {
                this.prevCourse();
            } else if (e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                const focusedCourse = this.getFocusedCourse();
                if (focusedCourse) {
                    this.selectCourse(focusedCourse);
                }
            }
        });
        
        // Mouse wheel navigation
        document.addEventListener('wheel', (e) => {
            if (e.deltaY > 0) {
                this.nextCourse();
            } else {
                this.prevCourse();
            }
        });
        
        // Touch swipe support
        this.setupTouchEvents();
        
        // Auto-rotation control
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter', () => {
            this.stopAutoRotation();
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            this.startAutoRotation();
        });
    }
    
    setupTouchEvents() {
        let touchStartX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = touchEndX - touchStartX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.prevCourse();
                } else {
                    this.nextCourse();
                }
            }
        });
    }
    
    nextCourse() {
        this.currentAngle -= (2 * Math.PI) / this.courses.length;
        this.renderCarousel();
    }
    
    prevCourse() {
        this.currentAngle += (2 * Math.PI) / this.courses.length;
        this.renderCarousel();
    }
    
    startAutoRotation() {
        if (this.isAutoRotating) return;
        
        this.isAutoRotating = true;
        this.autoRotateInterval = setInterval(() => {
            this.currentAngle -= 0.002;
            this.renderCarousel();
        }, 50);
    }
    
    stopAutoRotation() {
        this.isAutoRotating = false;
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
            this.autoRotateInterval = null;
        }
    }
    
    getFocusedCourse() {
        const focusedCard = document.querySelector('.course-card.focused');
        if (focusedCard) {
            const courseId = parseInt(focusedCard.dataset.courseId);
            return this.courses.find(course => course.id === courseId);
        }
        return null;
    }
    
    selectCourse(course) {
        this.showAchievement(`Course Selected: ${course.title}`);
        
        // Here you would typically navigate to the course page
        console.log(`Selected course: ${course.title}`);
    }
    
    showAchievement(text) {
        const notification = document.getElementById('achievement-notification');
        document.getElementById('achievement-text').textContent = text;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CourseCarousel;
}