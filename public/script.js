// GSAP, ScrollTrigger, and Lenis are loaded via CDN as globals
gsap.registerPlugin(ScrollTrigger);

// Expose globals for backward compatibility if inline scripts use them
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
window.Lenis = Lenis;

/* ═══════════════════════════════════════════════
   SITE-WIDE PAGE TRANSITION (FADE)
   ═══════════════════════════════════════════════ */
(function () {
    // ── Create the persistent overlay element ──────────────────────────
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay is-entering';
    document.body.appendChild(overlay);

    // Fade the overlay in on the new page (entry animation)
    function fadeIn() {
        overlay.classList.add('is-entering');
        // Let the browser paint first, then fade out the overlay
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                overlay.classList.remove('is-entering');
            });
        });
    }

    // Fade the overlay out on the current page, then navigate (exit animation)
    function navigateTo(href) {
        overlay.classList.add('is-leaving');
        setTimeout(() => {
            window.location.href = href;
        }, 360); // matches the CSS transition duration (0.35s + 10ms buffer)
    }

    function closeMobileMenuIfOpen() {
        const mobileMenu = document.querySelector('.mobile-fullscreen-menu');
        if (mobileMenu) mobileMenu.classList.remove('is-active');
        document.body.style.overflow = '';
    }

    function scrollToHashTarget(hash) {
        if (!hash) return;
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        const targetEl = document.querySelector(hash);
        if (!targetEl) return;

        const navOffset = 120;

        if (window.lenis) {
            window.lenis.scrollTo(targetEl, { offset: -navOffset, immediate: false, force: true });
        } else {
            const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navOffset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    }

    function revealAboutHeroSection() {
        if (!document.body.classList.contains('about-page')) return;

        const aboutSection = document.querySelector('.about-hero-new');
        const heroTopGroup = document.querySelector('.hero-top-group');
        if (!aboutSection) return;

        requestAnimationFrame(() => {
            setTimeout(() => {
                aboutSection.classList.add('about-hero-active');
                if (heroTopGroup) {
                    heroTopGroup.classList.add('about-hero-active');
                }

                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.refresh();
                }
            }, 10);
        });
    }

    // Expose helpers to global scope
    window.revealAboutHeroSection = revealAboutHeroSection;
    window._pageTransitionFadeIn = fadeIn;

    // ── Intercept clicks on internal links ─────────────────────────────
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        const target = link.getAttribute('target');
        const noSwup = link.hasAttribute('data-no-swup'); // respect opt-out attr if used
        const isInternal = href && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel') && !href.startsWith('//');
        if (!isInternal || target === '_blank') return;

        const isHashOnly = href && href.startsWith('#');
        const isMobileMenuLink = !!link.closest('.mobile-fullscreen-menu');

        // Same-page hash scroll
        if (isHashOnly) {
            e.preventDefault();
            if (isMobileMenuLink) closeMobileMenuIfOpen();
            setTimeout(() => scrollToHashTarget(href), isMobileMenuLink ? 250 : 0);
            return;
        }

        // Cross-page deep link (e.g. about.html#contact) — let browser handle natively
        const isCrossPageHash = href && href.includes('#') && !href.startsWith('#');
        if (isCrossPageHash) {
            if (isMobileMenuLink) closeMobileMenuIfOpen();
            e.preventDefault();
            if (isMobileMenuLink) {
                setTimeout(() => navigateTo(href), 250);
            } else {
                navigateTo(href);
            }
            return;
        }

        // Normal cross-page navigation — fade out then go
        e.preventDefault();
        if (isMobileMenuLink) closeMobileMenuIfOpen();
        navigateTo(href);
    });

    // Trigger the fade-in on page load
    fadeIn();
})();

// Force scroll to top on page reload
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    // Swup swaps DOM without reloading; this handler may be re-fired manually.
    // Guard global-only bootstrapping to avoid duplicating Lenis/scroll listeners.
    const isReinit = !!window.__appBootstrapped;
    const mainContent = document.getElementById('main-content');

    if (!isReinit) {

        // Cinematic Smooth Scroll initialization (once)
        if (!window.lenis && typeof Lenis !== 'undefined') {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: false,
                touchMultiplier: 2,
                infinite: false,
            });
            window.lenis = lenis;

            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        }

        initPageReveal();
        window.__appBootstrapped = true;
    }

    setupTypedReveal();

    // Handle hash scrolling after page load
    // Always scroll to the hash after layout + animations are kicked in.
    if (window.location.hash) {
        const hash = window.location.hash;
        // For about.html, render the content in large panels.
        // Delay the hash scroll until after those first reveal steps.
        const delay = window.appIsInternalNav ? 0 : 1200;
        setTimeout(() => {
            scrollToHashTarget(hash);
            setTimeout(() => {
                if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
            }, 80);
        }, delay);
    }



    function setupTypedReveal() {
        const textElement = document.querySelector('.supporting-text');
        if (!textElement) return;
        if (textElement.dataset.typedRevealReady === 'true') return;

        const text = textElement.textContent.trim();
        const words = text.split(/\s+/);
        textElement.innerHTML = ''; // clear original text

        words.forEach(word => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            textElement.appendChild(span);
        });

        // Container can now be visible since children are hidden
        textElement.style.opacity = '1';
        textElement.dataset.typedRevealReady = 'true';
    }

    function initPageReveal() {
        document.body.style.overflow = 'auto';
        document.body.classList.add('page-visible');
        if (mainContent) mainContent.classList.add('visible');

        // Wait 240ms then play the cinematic text reveal
        setTimeout(() => {
            const heroNav = document.querySelector('.hero-nav');
            if (heroNav) heroNav.classList.add('nav-reveal');

            const heroHeadline = document.querySelector('.hero-headline-container');
            if (heroHeadline) {
                heroHeadline.classList.add('reveal-step-1');
                setTimeout(() => heroHeadline.classList.add('reveal-step-2'), 240);
                setTimeout(() => heroHeadline.classList.add('reveal-step-3'), 480);
                setTimeout(() => {
                    const textElement = document.querySelector('.supporting-text');
                    if (textElement) {
                        const spans = textElement.querySelectorAll('span');
                        spans.forEach((span, index) => {
                            setTimeout(() => span.style.opacity = '1', index * 12);
                        });
                    }
                    setTimeout(() => {
                        document.querySelectorAll('.cta-container, .vertical-indicator, .hero-bottom-badge')
                            .forEach(el => el.classList.add('reveal-final'));
                    }, 120);
                }, 600);
            } else {
                document.querySelectorAll('.hero-nav, .cta-container, .vertical-indicator, .hero-bottom-badge')
                    .forEach(el => el.classList.add('nav-reveal', 'reveal-final'));
            }

            // Crucial: Resolve cross-page deep linking anchors (e.g. from Home -> About#Contact)
            if (window.location.hash) {
                const hashTarget = document.querySelector(window.location.hash);
                if (hashTarget) {
                    setTimeout(() => {
                        if (window.lenis) window.lenis.scrollTo(hashTarget, { offset: -120, immediate: true, force: true });
                        else hashTarget.scrollIntoView(true);
                    }, 50);
                }
            }
        }, 240);
    }

    // Scroll-linked interactions for hero interface elements
    function setupHeroScrollInteractions() {
        const heroBadgeInner = document.getElementById('hero-badge-inner');
        const heroSocials = document.querySelector('.hero-socials');

        if (!window.lenis || (!heroBadgeInner && !heroSocials)) return;

        // Only set up once per Swup cycle
        if (window.__heroScrollBound) {
            window.lenis.off('scroll', window.__heroScrollHandler);
        }

        const scrollHandler = (e) => {
            const scrollY = e.animatedScroll;

            if (heroBadgeInner) {
                const rotation = scrollY * 0.15;
                heroBadgeInner.style.transform = `rotate(${rotation}deg)`;
            }

            if (heroSocials) {
                if (scrollY > 50) {
                    heroSocials.classList.add('visible');
                } else {
                    heroSocials.classList.remove('visible');
                }
            }
        };

        window.__heroScrollHandler = scrollHandler;
        window.__heroScrollBound = true;
        window.lenis.on('scroll', scrollHandler);
    }

    setupHeroScrollInteractions();


    // ─────────────────────────────────────────────
    // Pain Card Selection Toggle
    // ─────────────────────────────────────────────
    const painCards = document.querySelectorAll('.pain-card');
    painCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('selected');
        });
    });

    // Mission submit: send selected pain points via email client
    const missionSubmitBtn = document.querySelector('.mission-submit-trigger');
    const missionEmailField = document.querySelector('.mission-email-field');

    if (missionSubmitBtn) {
        missionSubmitBtn.addEventListener('click', () => {
            const selectedPainCards = Array.from(document.querySelectorAll('.pain-card.selected'));

            if (selectedPainCards.length === 0) {
                alert('Please select at least one situation card before submitting.');
                return;
            }

            const selectedLabels = selectedPainCards
                .map(card => card.querySelector('.pain-label')?.textContent?.trim())
                .filter(Boolean);

            const visitorEmail = missionEmailField?.value?.trim() || '';
            const emailBodyLines = [
                'Hi Olawale,',
                '',
                'I selected these current situations on your website:',
                ...selectedLabels.map(label => `- ${label}`),
                '',
                visitorEmail ? `My email: ${visitorEmail}` : 'My email: (not provided in field)',
                '',
                'Looking forward to discussing this further.'
            ];

            const subject = encodeURIComponent('Website enquiry from mission section');
            const body = encodeURIComponent(emailBodyLines.join('\n'));
            window.location.href = `mailto:olawaleonasanya5@gmail.com?subject=${subject}&body=${body}`;
        });
    }

    // Scroll Reveal Logic using IntersectionObserver
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if (revealElements.length > 0) {
        // Respect user preference for reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!prefersReducedMotion) {
            const revealOptions = {
                threshold: 0.15, // Trigger when 15% of the element is visible
                rootMargin: '0px 0px -50px 0px' // Trigger slightly before the bottom
            };

            const revealObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Add stagger effect based on index to elements entering at the same time
                        setTimeout(() => {
                            entry.target.classList.add('is-revealed');
                        }, index * 100);
                        observer.unobserve(entry.target); // Animate only once
                    }
                });
            }, revealOptions);

            revealElements.forEach(el => {
                revealObserver.observe(el);
            });
        } else {
            // For reduced motion, reveal everything immediately
            revealElements.forEach(el => {
                el.classList.add('is-revealed');
                el.style.transition = 'none';
                el.style.transform = 'none';
                el.style.opacity = '1';
            });
        }
    }

    /* ═══════════════════════════════════════════════
       FAQ ACCORDION TOGGLE
    ═══════════════════════════════════════════════ */

    const faqItems = document.querySelectorAll('.faq-question-row');
    faqItems.forEach(row => {
        row.addEventListener('click', () => {
            const parentItem = row.closest('.faq-item');
            const isActive = parentItem.classList.contains('active');

            // Close all other FAQ items first
            document.querySelectorAll('.faq-item.active').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle clicked item (open if it was closed)
            if (!isActive) {
                parentItem.classList.add('active');
            }
        });
    });

    /* ═══════════════════════════════════════════════
       PROCESS SECTION REVEAL LOGIC (GSAP ACCORDION)
    ═══════════════════════════════════════════════ */
    const processSection = document.querySelector(".process-section");
    const processSteps = gsap.utils.toArray(".process-step-v2");
    const processBodies = gsap.utils.toArray(".process-step-v2__content");

    if (processSection && processSteps.length > 0 && typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Clean up classes
        processSteps.forEach(step => step.classList.remove("process-step-v2--active"));

        // 1. Initial State: Step 1 is bright, others dim. ALL bodies are closed.
        gsap.set(processSteps, { opacity: 0.4 });
        gsap.set(processSteps[0], { opacity: 1 });
        gsap.set(processBodies, { height: 0, opacity: 0 });

        const pinDistance = window.innerHeight * 2;
        const windowHeight = window.innerHeight;

        const processTl = gsap.timeline({
            scrollTrigger: {
                trigger: processSection,
                start: "top top",
                // Extend the pin to stay locked while the Works section covers it
                end: "+=" + (pinDistance + windowHeight),
                pin: true,
                pinSpacing: false, // CRITICAL: allows the native overlap
                scrub: 1,
                invalidateOnRefresh: true
            }
        });

        // CRITICAL: Push the works section down so it arrives at the exact moment the accordion finishes
        gsap.set(".works-section", { marginTop: pinDistance });

        const transitionDuration = 1;

        // 2. First scroll action: Open Step 1's body
        if (processBodies[0]) {
            processTl.to(processBodies[0], {
                height: "auto",
                opacity: 1,
                duration: transitionDuration,
                ease: "power1.inOut"
            });
        }

        // 3. Loop through the remaining steps to crossfade and toggle heights
        processSteps.forEach((step, i) => {
            if (i > 0) {
                const prevStep = processSteps[i - 1];
                const prevBody = processBodies[i - 1];
                const currentBody = processBodies[i];

                // Previous step dims and closes
                processTl.to(prevStep, { opacity: 0.4, duration: transitionDuration, ease: "power1.inOut" }, `transition-${i}`);
                if (prevBody) {
                    processTl.to(prevBody, { height: 0, opacity: 0, duration: transitionDuration, ease: "power1.inOut" }, `transition-${i}`);
                }

                // Current step brightens and opens
                processTl.to(step, { opacity: 1, duration: transitionDuration, ease: "power1.inOut" }, `transition-${i}`);
                if (currentBody) {
                    processTl.to(currentBody, { height: "auto", opacity: 1, duration: transitionDuration, ease: "power1.inOut" }, `transition-${i}`);
                }
            }
        });

        // 4. Dead time: Allows the Works section to natively slide up and cover the screen while Process stays pinned
        processTl.to({}, { duration: 2.5 });
    }

    /* ═══════════════════════════════════════════════
       WORKS SECTION: DARK APERTURE + HORIZONTAL SCROLL
    ═══════════════════════════════════════════════ */
    const worksSectionObj = document.querySelector(".works-section");
    const worksStompWrapper = document.querySelector(".works-stomp-wrapper");
    const worksImageRow = document.querySelector(".works-images-row");

    if (worksSectionObj && worksStompWrapper && worksImageRow && typeof gsap !== 'undefined') {

        // 1. Initial State: Tiny dot, 4x scaled content
        gsap.set(worksSectionObj, { clipPath: "circle(5% at 50% 50%)" });
        gsap.set(worksStompWrapper, { scale: 4 });

        // 2. Wait for the Process section accordion (approx 200vh)
        const processPinDistance = window.innerHeight * 2;
        gsap.set(worksSectionObj, { marginTop: processPinDistance });

        // Calculate horizontal scroll distance
        const getScrollAmount = () => worksImageRow.scrollWidth - window.innerWidth + 150;

        // 3. Create the Master Timeline
        const worksTl = gsap.timeline({
            scrollTrigger: {
                trigger: worksSectionObj,
                start: "top top",
                end: () => `+=${1000 + getScrollAmount()}`,
                pin: true,
                pinSpacing: true,
                scrub: 1,
                invalidateOnRefresh: true
            }
        });

        // PART A: Aperture + Stomp
        worksTl.to(worksSectionObj, {
            clipPath: "circle(150% at 50% 50%)",
            duration: 1,
            ease: "power2.inOut"
        }, 0)
            .to(worksStompWrapper, {
                scale: 1,
                duration: 1,
                ease: "power3.out"
            }, 0);

        // PART B: Horizontal Scroll
        worksTl.to(worksImageRow, {
            x: () => -getScrollAmount(),
            duration: 2,
            ease: "none"
        });

        // PART C: Hover Preview Logic
        const worksImages = document.querySelectorAll(".works-img");
        const worksPreviewContainer = document.querySelector(".works-preview-container");
        const worksPreviewImg = document.querySelector(".works-preview-img");

        if (worksImages.length > 0 && worksPreviewContainer && worksPreviewImg) {
            worksImages.forEach(img => {
                img.addEventListener("mouseenter", () => {
                    worksPreviewImg.src = img.src;
                    worksPreviewContainer.classList.add("is-active");
                });
                img.addEventListener("mouseleave", () => {
                    worksPreviewContainer.classList.remove("is-active");
                });
                
                // Mobile click logic
                img.addEventListener("click", () => {
                    if (window.innerWidth <= 768) {
                        worksPreviewImg.src = img.src;
                        worksPreviewContainer.classList.add("mobile-active");
                        
                        // Automatically remove after 1.5 seconds
                        setTimeout(() => {
                            worksPreviewContainer.classList.remove("mobile-active");
                        }, 1500);
                    }
                });
            });
        }
    }

})



/* ═══════════════════════════════════════════════
   WORKS SECTION CUSTOM CURSOR (standalone, independent)
═══════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
    const worksCursorEl = document.getElementById("works-custom-cursor");
    const worksSect = document.querySelector(".works-section");
    if (!worksCursorEl || !worksSect) return;

    // Position cursor off-screen initially
    let mouseX = -999, mouseY = -999;
    let cursorActive = false;
    let worksIsActive = false;

    // Use ScrollTrigger to know exactly when works section is pinned on screen
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
            trigger: worksSect,
            start: "top top",
            end: "bottom bottom",
            onEnter: () => { worksIsActive = true; },
            onLeave: () => {
                worksIsActive = false;
                hideCursor();
            },
            onEnterBack: () => { worksIsActive = true; },
            onLeaveBack: () => {
                worksIsActive = false;
                hideCursor();
            }
        });
    }

    function showCursor() {
        worksCursorEl.classList.add("is-visible");
        cursorActive = true;
    }

    function hideCursor() {
        worksCursorEl.classList.remove("is-visible");
        cursorActive = false;
    }

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Move cursor to mouse position (CSS transform handles centering)
        worksCursorEl.style.left = mouseX + 'px';
        worksCursorEl.style.top = mouseY + 'px';

        // Fallback: if ScrollTrigger didn't fire, check bounding rect
        let isOver = worksIsActive;
        if (typeof ScrollTrigger === 'undefined') {
            const rect = worksSect.getBoundingClientRect();
            isOver = (mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom);
        }

        if (isOver) showCursor();
        else hideCursor();
    });
});

/* ═══════════════════════════════════════════════
   ABOUT PAGE EDITORIAL SCROLL (Removed per new design)
═══════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════
   ABOUT SOCIALS WORDMARK SCROLL DRIFT (RIGHT -> LEFT)
═══════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
    const socialSection = document.querySelector('.social-section');
    const socialWordmark = document.querySelector('.social-wordmark');

    if (!socialSection || !socialWordmark) {
        return;
    }
    if (window.__socialWordmarkBound) return;
    window.__socialWordmarkBound = true;

    const getMaxShift = () => Math.min(window.innerWidth * 0.28, 300);

    function updateSocialWordmarkPosition() {
        const sectionRect = socialSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrollRange = sectionRect.height + viewportHeight;
        const rawProgress = (viewportHeight - sectionRect.top) / scrollRange;
        const progress = Math.max(0, Math.min(1, rawProgress));
        const maxShift = getMaxShift();

        // progress 0 => +maxShift (right), progress 1 => -maxShift (left)
        const x = maxShift - (progress * 2 * maxShift);
        socialWordmark.style.transform = `translateX(calc(-50% + ${x.toFixed(2)}px))`;
    }

    window.addEventListener('scroll', updateSocialWordmarkPosition, { passive: true });
    window.addEventListener('resize', updateSocialWordmarkPosition);
    updateSocialWordmarkPosition();
});

/* ═══════════════════════════════════════════════
   INTRODUCTION TEXT REVEAL (Opal-Style Word-by-Word Scrub)
═══════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
    const introSection = document.querySelector('.about-introduction-section');
    const introStatement = document.querySelector('.introduction-statement');

    if (introSection && introStatement && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        if (introStatement.dataset.wordsSplit === 'true') return;
        gsap.registerPlugin(ScrollTrigger);

        // 1. Auto-split raw text into individual word spans
        const text = introStatement.textContent.trim();
        const words = text.split(/\s+/);
        introStatement.innerHTML = '';

        words.forEach(word => {
            const span = document.createElement('span');
            span.className = 'word-text';
            span.textContent = word;
            introStatement.appendChild(span);
            introStatement.appendChild(document.createTextNode(' '));
        });

        // 2. Select the newly created word spans
        const wordSpans = introStatement.querySelectorAll('.word-text');
        introStatement.dataset.wordsSplit = 'true';

        // 3. Create the pinning timeline
        const introTl = gsap.timeline({
            scrollTrigger: {
                trigger: introSection,
                start: "top top",
                end: "+=150%",
                pin: true,
                pinSpacing: true,
                scrub: 1,
                invalidateOnRefresh: true
            }
        });

        // 4. Animate color word-by-word as user scrolls
        introTl.to(wordSpans, {
            color: "var(--color-bg-dark)",
            stagger: 0.1,
            duration: 1,
            ease: "none"
        });
    }
});

/* ═══════════════════════════════════════════════
   CUSTOM BUDGET DROPDOWN
═══════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
    const selects = document.querySelectorAll('.custom-select');
    if (window.__customSelectGlobalCloseBound !== true) {
        window.__customSelectGlobalCloseBound = true;
        document.addEventListener('click', () => {
            document.querySelectorAll('.custom-select').forEach(select => {
                select.classList.remove('is-open');
                const trigger = select.querySelector('.custom-select__trigger');
                if (trigger) trigger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    selects.forEach(select => {
        if (select.dataset.bound === 'true') return;
        select.dataset.bound = 'true';
        const trigger = select.querySelector('.custom-select__trigger');
        const valueEl = select.querySelector('.custom-select__value');
        const options = select.querySelectorAll('.custom-select__option');
        // Keep this generic so the select can be reused for other fields besides "budget"
        const hiddenInput = select.parentElement.querySelector('input[type="hidden"]');

        // Toggle open/close on trigger click
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = select.classList.toggle('is-open');
            trigger.setAttribute('aria-expanded', isOpen);
        });

        // Select an option
        options.forEach(option => {
            option.addEventListener('click', () => {
                // Update displayed value
                valueEl.textContent = option.textContent;
                valueEl.classList.add('has-value');
                if (hiddenInput) hiddenInput.value = option.dataset.value || option.textContent.trim();

                // "Others" input handling
                const parentField = select.closest('.form-field');
                if (parentField) {
                    const otherContainer = parentField.querySelector('.other-source-container');
                    const otherInput = parentField.querySelector('.other-source-input');
                    if (otherContainer && otherInput) {
                        if (option.dataset.value === "Others") {
                            otherContainer.style.display = 'block';
                            otherInput.setAttribute('required', 'true');
                            setTimeout(() => otherInput.focus(), 50);
                        } else {
                            otherContainer.style.display = 'none';
                            otherInput.removeAttribute('required');
                            otherInput.value = '';
                        }
                    }
                }

                // Mark selected option
                options.forEach(o => o.classList.remove('is-selected'));
                option.classList.add('is-selected');

                // Close dropdown
                select.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
            });
        });
    });
});

/* ═══════════════════════════════════════════════
   CONTACT FORM SUBMIT (IN-PAGE SUCCESS/ERROR)
═══════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    if (contactForm.dataset.bound === 'true') return;
    contactForm.dataset.bound = 'true';

    const successMessage = document.querySelector('.contact-form-success');
    const errorMessage = document.querySelector('.contact-form-error');
    const submitBtn = contactForm.querySelector('.form-submit-btn');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!contactForm.reportValidity()) return;

        if (successMessage) successMessage.classList.remove('is-visible');
        if (errorMessage) errorMessage.classList.remove('is-visible');

        const formData = new FormData(contactForm);
        // Ensure custom select values are always present (avoid empty submissions)
        if (!formData.get('referral_source')) formData.set('referral_source', 'Not specified');

        try {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.65';
                submitBtn.style.cursor = 'not-allowed';
            }

            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Form submit failed');
            }

            contactForm.reset();

            const selectValues = contactForm.querySelectorAll('.custom-select__value');
            const selectOptions = contactForm.querySelectorAll('.custom-select__option');
            selectValues.forEach(valueEl => {
                valueEl.textContent = 'Select one';
                valueEl.classList.remove('has-value');
            });
            selectOptions.forEach(option => option.classList.remove('is-selected'));

            if (successMessage) successMessage.classList.add('is-visible');
        } catch (error) {
            if (errorMessage) errorMessage.classList.add('is-visible');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '';
                submitBtn.style.cursor = '';
            }
        }
    });
});

/* ═══════════════════════════════════════════════
   MOBILE FULLSCREEN MENU TOGGLE
═══════════════════════════════════════════════ */
(function setupMobileMenuDelegation() {
    if (window.__mobileMenuDelegated) return;
    window.__mobileMenuDelegated = true;

    document.addEventListener('click', (e) => {
        const openBtn = e.target.closest('.mobile-menu-icon');
        const closeBtn = e.target.closest('.mobile-menu-close');
        const clickedNavLink = e.target.closest('.mobile-nav-link');

        if (!openBtn && !closeBtn && !clickedNavLink) return;

        const mobileMenu = document.querySelector('.mobile-fullscreen-menu');
        if (!mobileMenu) return;

        if (openBtn) {
            mobileMenu.classList.add('is-active');
            document.body.style.overflow = 'hidden';
            return;
        }

        if (closeBtn || clickedNavLink) {
            mobileMenu.classList.remove('is-active');
            document.body.style.overflow = '';
        }
    });

    // Tie inner logo rotation to scroll position globally (once)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const innerLogos = document.querySelectorAll('.hero-bottom-badge .inner-logo-img, .hero-badge .inner-logo-img');
        if (innerLogos.length > 0) {
            gsap.to(innerLogos, {
                rotation: 360,
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                }
            });
        }
    }
})();

/* ═══════════════════════════════════════════════
   DIVIDER LINE ANIMATIONS (ScrollTrigger)
═══════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
    // Ensure GSAP plugins are registered
    gsap.registerPlugin(ScrollTrigger);

    // 1. Target all horizontal divider lines in the layout
    const horizontalLines = gsap.utils.toArray('.mission-rule--full, .section-rule--full, .faq-portrait-line');

    horizontalLines.forEach(line => {
        gsap.fromTo(line,
            {
                scaleX: 0,
                transformOrigin: "left center" // Forces the line to grow from the left
            },
            {
                scaleX: 1,
                duration: 1.2,
                ease: "expo.out", // A premium, fast-start-slow-finish easing
                scrollTrigger: {
                    trigger: line,
                    start: "top 90%", // Triggers when the line enters the bottom 10% of the screen
                    toggleActions: "play none none reverse" // Play on scroll down, reverse on scroll up
                }
            }
        );
    });
});

// Show body on load to prevent FOUC
window.addEventListener('load', () => {
    document.body.style.visibility = 'visible';
    revealAboutHeroSection();
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});

if (document.readyState === 'complete') {
    revealAboutHeroSection();
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}

