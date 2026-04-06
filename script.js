// TYPEWRITER EFFECT
        const titles = ["C++ Developer", "AI/ML Builder", "Graphic Designer", "Game Developer"];
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typewriterElement = document.getElementById('typewriter');
        
        function typeEffect() {
            if(!typewriterElement) return;
            const currentTitle = titles[titleIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentTitle.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at the end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                typeSpeed = 500; // Pause before typing next
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        // Start typewriter on load
        setTimeout(typeEffect, 1000);

        // NUMBER COUNTER (ANIMATED)
        const counters = document.querySelectorAll('.stat-number');
        let hasCounted = false;

        function runCounters() {
            if(hasCounted) return;
            hasCounted = true;
            counters.forEach(counter => {
                counter.innerText = '0';
                const target = +counter.getAttribute('data-target');
                const updateCounter = () => {
                    const c = +counter.innerText;
                    const increment = target / 50; // speed
                    if (c < target) {
                        counter.innerText = Math.ceil(c + increment);
                        setTimeout(updateCounter, 30);
                    } else {
                        counter.innerText = target + (target > 3 ? '+' : ''); // add plus to some
                    }
                };
                updateCounter();
            });
        }

        // SCROLL REVEAL (INTERSECTION OBSERVER)
        const revealElements = document.querySelectorAll('.reveal');
        const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

        const revealObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                    if(entry.target.classList.contains('hero-stats')) runCounters();
                }
            });
        }, observerOptions);

        revealElements.forEach(el => revealObserver.observe(el));

        // NAVBAR ACTIVE STATE & BACKGROUND CHANGE
        const sections = document.querySelectorAll('section, header');
        const navLinks = document.querySelectorAll('.nav-links a:not(.nav-btn)');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });

        // EXPERIENCE MODAL LOGIC
        const modal = document.getElementById('experience-modal');
        const modalClose = document.querySelector('.modal-close');
        const openModalBtns = document.querySelectorAll('.open-modal-btn');
        
        const modalTitle = document.getElementById('modal-title');
        const modalCompany = document.getElementById('modal-company');
        const modalDate = document.getElementById('modal-date');
        const modalDesc = document.getElementById('modal-desc');

        if(modal && openModalBtns.length > 0) {
            openModalBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Populate data
                    modalTitle.textContent = btn.getAttribute('data-title');
                    modalCompany.textContent = btn.getAttribute('data-company');
                    modalDate.textContent = btn.getAttribute('data-date');
                    modalDesc.textContent = btn.getAttribute('data-desc');
                    
                    // Show modal
                    modal.classList.add('active');
                    // Prevent background scrolling
                    document.body.style.overflow = 'hidden';
                });
            });

            // Close actions
            const closeModal = () => {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            };

            modalClose.addEventListener('click', closeModal);
            
            // Close on outside click
            modal.addEventListener('click', (e) => {
                if(e.target === modal) {
                    closeModal();
                }
            });
            
            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if(e.key === 'Escape' && modal.classList.contains('active')) {
                    closeModal();
                }
            });
        }