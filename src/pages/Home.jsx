import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from 'gsap/SplitText';
import styles from './Home.module.css';
import EventCard from "./EventCard";
import { div } from 'framer-motion/client';

gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText);

export default function Home() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null); // Ref for the h1
  const subtitleRef = useRef(null); // Ref for the p
  const phoneRef = useRef(null);
  const overlayRef = useRef(null);
  const offerRef = useRef(null); // reference to offer section for scroll animations
  const reasonsRef = useRef(null);
  const cardsRef = useRef([]);

  // Section 2 — Rolling Sphere
  const section2Ref     = useRef(null);
  const sphereRef       = useRef(null);
  const sphereTextRef   = useRef(null);
  const collageCardsRef = useRef([]);
  const phoneScreensRef = useRef([]);

  const [currentImg, setCurrentImg] = useState(0);
  const [introComplete, setIntroComplete] = useState(false); // track when hero intro finishes

  useEffect(() => {
  const imageUrls = [
    ...reasonsData.map(r => r.image),
    ...reasonsData.map(r => r.icon),
    // Add specific sub-animation images here
    'https://media.paxmeet.com/circleLeft.png',
    'https://media.paxmeet.com/circleRight.png',
    'https://media.paxmeet.com/circleCenter.png'
  ];

  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}, []);

  const offeringImages = [
    "https://media.paxmeet.com/image3.png",
    "https://media.paxmeet.com/image4.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % offeringImages.length);
    }, 3000); // Changes every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const [activeReason, setActiveReason] = useState(0);
  const intervalRef = useRef(null);
  const reasonsInViewRef = useRef(false); // tracks whether the reasons section is visible

  const reasonsData = [
    { 
      id: 0, 
      title: 'Stop Scrolling Turn your vibe into real Moments', 
      text: 'Discover connect Show up.', 
      icon: 'https://media.paxmeet.com/ban.svg'
    },
    { 
      id: 1, 
      title: 'You Deserved Better Plan-Go where the Plan are real', 
      text: 'Discover people in your city. Explore what’s happening around you. No random strangers. Only local, real connections.', 
      icon: 'https://media.paxmeet.com/location.svg'
    },
    { 
      id: 2, 
      title: 'Find  your type- join one that matches your vibe', 
      text: 'Discover people in your city. Explore what’s happening around you. No random strangers. Only local, real connections.', 
      icon: 'https://media.paxmeet.com/flash.svg'
    },
    {
      id: 3,
      title: 'Build Your Circle Turn Moments Into Community',
      text: 'Met amazing people? Start a circle. Stay connected. Grow your own tribe in your own city.',
      icon: 'https://media.paxmeet.com/circles.svg'
    },
    {
      id: 4,
      title: 'Safe & Verified 100% Real. 100% Secure',
      text: 'Because real connections deserve real safety.',
      icon: 'https://media.paxmeet.com/verified.svg'
    }
    // Add more reasons here following the same structure
  ];

  useEffect(() => {
    // Define the main loop
    const startInterval = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActiveReason((prev) => {
          const next = (prev + 1) % reasonsData.length;
          // On mobile: also scroll the strip container to match
          if (stripScrollRef.current && window.innerWidth <= 768) {
            const sw = stripScrollRef.current.offsetWidth * 0.78;
            stripScrollRef.current.scrollTo({ left: next * sw, behavior: 'smooth' });
          }
          return next;
        });
      }, 4000);
    };

    const stopInterval = () => {
      clearInterval(intervalRef.current);
    };

    // Start cycling when either desktop or mobile section enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        reasonsInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startInterval();
        } else {
          stopInterval();
        }
      },
      { threshold: 0.3 }
    );

    // Also observe mobile section
    const mobileSection = document.querySelector('[data-mobile-reasons]');

    if (reasonsRef.current) observer.observe(reasonsRef.current);
    if (mobileSection) observer.observe(mobileSection);

    return () => {
      observer.disconnect();
      clearInterval(intervalRef.current);
    };
  }, [reasonsData.length]);

  // Ref for the mobile strip scroll container
  const stripScrollRef = useRef(null);

  // Ref for the mobile strip scroll container
  // On mobile: sync activeReason when user scrolls the strip
  useEffect(() => {
    const container = stripScrollRef.current;
    if (!container) return;

    let scrollTimer = null;

    const handleStripScroll = () => {
      // Debounce — wait until scrolling settles before snapping index
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const stripWidth = container.offsetWidth * 0.78;
        const index = Math.round(container.scrollLeft / stripWidth);
        const clamped = Math.max(0, Math.min(index, reasonsData.length - 1));
        setActiveReason(clamped);

        // Restart auto-timer that LOOPS back to 0 after last strip
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          setActiveReason(prev => {
            const next = (prev + 1) % reasonsData.length; // ← loops to 0
            const sw = container.offsetWidth * 0.78;
            container.scrollTo({ left: next * sw, behavior: 'smooth' });
            return next;
          });
        }, 4000);
      }, 150);
    };

    container.addEventListener('scroll', handleStripScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleStripScroll);
      clearTimeout(scrollTimer);
    };
  }, [reasonsData.length]);

  const handlePause = (index) => {
    clearInterval(intervalRef.current); // Stop the auto-switch
    if (index !== undefined) {
      setActiveReason(index); // Manually set the reason if hovering a reason
    }
  };

  const handleResume = () => {
    // Only restart the auto-cycle if the section is still visible
    if (!reasonsInViewRef.current) return;
    clearInterval(intervalRef.current); // Clear previous to prevent rapid speed-up
    intervalRef.current = setInterval(() => {
      setActiveReason((prev) => (prev + 1) % reasonsData.length);
    }, 4000); // Resume the loop
  };

  const renderStage = (index, alwaysActive = false) => {
    switch(index) {
      
      case 0: // Reason 1: Static Image + Multiple Tags
      return (
        <div className={styles.stageOne}>
          <img src="https://media.paxmeet.com/reason1.png" alt="" className={styles.stageMainImg} />
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.3, duration: 0.4 }}
            src="https://media.paxmeet.com/reason1tag1.svg" 
            className={styles.absTag1} 
          />
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.4, duration: 0.4 }}
            src="https://media.paxmeet.com/reason1tag2.svg" 
            className={styles.absTag2} 
          />
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.5, duration: 0.4 }}
            src="https://media.paxmeet.com/reason1tag3.svg" 
            className={styles.absTag3} 
          />
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.6, duration: 0.4 }}
            src="https://media.paxmeet.com/reason1tag4.svg" 
            className={styles.absTag4} 
          />
        </div>
      );
      
      case 1: // Reason 2: wobble Tag
      return (
        <div className={styles.stageTwo}>
          <img src="https://media.paxmeet.com/reason2.png" alt="" className={styles.stageMainImg} />
          {/* Tag 1: Fast Wobble */}
          <div className={styles.pinWrapper}>
            <svg width="70" height="50" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Shadow: Stays completely still on the ground */}
              <ellipse cx="26" cy="47" rx="8" ry="3" fill="black" fill-opacity="0.7"/>

              {/* Pin: Wobbles around the bottom origin point */}
              <g className={`${styles.pinWobble} ${activeReason === 1 ? styles.isWobbling : ""}`}>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M28.2523 46.7385C29.4877 47.1025 30.7989 46.7512 31.6868 45.8183C37.2773 39.9443 44.6741 24.7917 41.9952 14.7939C39.0721 3.88459 28.6978 -2.10502 17.7885 0.818111C6.87923 3.74124 0.889617 14.1156 3.81275 25.0248C6.49165 35.0226 20.4738 44.4468 28.2523 46.7385ZM24.8527 27.1822C28.8694 26.1059 31.2531 21.9773 30.1768 17.9606C29.1006 13.9439 24.9719 11.5602 20.9552 12.6365C16.9385 13.7128 14.5549 17.8414 15.6311 21.8581C16.7074 25.8748 20.8361 28.2585 24.8527 27.1822Z"
                  fill="#7332D6"
                />
              </g>
            </svg>
          </div>
          {/* Tag 2: Slower Wobble with Delay */}
          <motion.img 
            src="https://media.paxmeet.com/reason2tag2.svg" 
            className={`${styles.absTag} ${styles.wobble2}`}
            animate={activeReason === 1 ? { x: [-5, 5, -5] } : { x: 0 }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.3, duration: 0.4 }}
            src="https://media.paxmeet.com/reason2tag3.svg" 
            className={styles.Tag2_1} 
          />
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.3, duration: 0.4 }}
            src="https://media.paxmeet.com/ali.svg" 
            className={styles.Tag2_2} 
          />
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.3, duration: 0.4 }}
            src="https://media.paxmeet.com/vedant.svg" 
            className={styles.Tag2_3} 
          />
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.3, duration: 0.4 }}
            src="https://media.paxmeet.com/ron.svg" 
            className={styles.Tag2_4} 
          />
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.3, duration: 0.4 }}
            src="https://media.paxmeet.com/nisha.svg" 
            className={styles.Tag2_5} 
          />
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.3, duration: 0.4 }} 
            className={styles.Tag2_6} 
          >HOST</motion.p>
        </div>
      );
      
      case 2: // Reason 3: 3x3 Matrix + Upward Scroll
      return (
        <div className={styles.stageThree}>
          <div className={styles.matrixGrid}>
            {[...Array(9)].map((_, i) => (
              <motion.img
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={alwaysActive || activeReason === 2 ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: activeReason === 2 ? i * 0.08 : 0, 
                  ease: "easeOut" 
                }}
                src={`https://media.paxmeet.com/reason3${i}.png`}
              />
            ))}
          </div>
          <div className={styles.verticalScrollContainer}>
            <div className={styles.scrollingContent}>
              {/* Duplicate images here for infinite effect */}
              <img src="https://media.paxmeet.com/reason310.png" alt="" />
              <img src="https://media.paxmeet.com/reason311.png" alt="" />
              <img src="https://media.paxmeet.com/reason312.png" alt="" />
              <img src="https://media.paxmeet.com/reason313.png" alt="" />
              <img src="https://media.paxmeet.com/reason314.png" alt="" />
              <img src="https://media.paxmeet.com/reason315.png" alt="" />
              <img src="https://media.paxmeet.com/reason310.png" alt="" />
              <img src="https://media.paxmeet.com/reason311.png" alt="" />
              <img src="https://media.paxmeet.com/reason312.png" alt="" />
              <img src="https://media.paxmeet.com/reason313.png" alt="" />
              <img src="https://media.paxmeet.com/reason314.png" alt="" />
              <img src="https://media.paxmeet.com/reason315.png" alt="" />
            </div>
          </div>
        </div>
      );

      case 3: // Reason 4: Triple Circular Slide-Out
      return (
        <div className={styles.stageFour}>
          {/* Left Circular Image: Slides out to the left */}
          <motion.div 
            className={styles.circleContainerSide}
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: -110, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }} // Bouncy 'spring' feel
          >
            <img src="https://media.paxmeet.com/reason43.png" alt="Left View" />
          </motion.div>
          {/* Right Circular Image: Slides out to the right */}
          <motion.div 
            className={styles.circleContainerSide}
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 110, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <img src="https://media.paxmeet.com/reason42.png" alt="Right View" />
          </motion.div>
          {/* Central Circular Image: Fades in and stays on top */}
          <motion.div 
            className={styles.circleContainerMain}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img src="https://media.paxmeet.com/reason41.png" alt="Main View" />
          </motion.div>
        </div>
      );

      case 4: // Reason 5: Single Image + Single Tag
      return (
        <div className={styles.stageFive}>
          <img src="https://media.paxmeet.com/reason5.png" alt="" className={styles.stageMainImg} />
          <motion.img 
            src="https://media.paxmeet.com/reason5tag1.svg" 
            className={styles.floatTag}
            // Only float if this reason is active
            animate={activeReason === 4 ? { y: [0, 0, 0] } : { y: 0 }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
          />
        </div>
      );
    }
  };

  // hero text constants (used for GSAP typing and preload fallback)
  const ORIGINAL_TITLE = "Turn your plan into a real-world hangout.";
  const ORIGINAL_SUBTITLE = "Looking for people to host & join events? Paxmeet helps you find your vibe & build it together.";

  useEffect(() => {
    const tl = gsap.timeline();
    // reveal page elements only when timeline starts (prevent initial flash)
    tl.call(() => {
      document.body.classList.remove('preload');
      // temporarily lock scrolling until intro animation ends
      document.body.style.overflow = 'hidden';
    }, null, 0);

    // 1. Animate Navbar first (assuming your Navbar has these classes)
    tl.fromTo("#site-navbar", 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );

    tl.fromTo("#navbar-logo", 
      { x: -30, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
    );

    tl.fromTo("#navbar-links",
      { 
        clipPath: "inset(0 100% 0 0)", // Fully hidden on the right
        opacity: 0 
      },
      { 
        clipPath: "inset(0 0% 0 0)",   // Fully revealed
        opacity: 1, 
        duration: 1, 
        ease: "power3.inOut" 
      },
      "-=0.4" // Overlap slightly with the logo
    );

    tl.fromTo("#navbar-links a", 
      { y: 15, opacity: 0, scale: 0.9 }, 
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.5, 
        stagger: 0.12, // This creates the "one-by-one" effect
        ease: "back.out(1.7)" 
      }, 
      "-=0.6" // Starts while the logo is still animating
    );

    tl.fromTo("#navbar-action", 
      { x: 30, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 
      "-=0.5"
    );

    // 2‑3. fade in title and subtitle 
    titleRef.current.textContent = ORIGINAL_TITLE;
    subtitleRef.current.textContent = ORIGINAL_SUBTITLE;

    // Simple fade-in animation for title and subtitle (no SplitText required)
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
      "-=0.3"
    );

    tl.fromTo(subtitleRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
      "-=0.4"
    );

    // we intentionally do not revert SplitText wrappers; keeping the line spans
    // ensures the wrapping used during animation remains exactly the same afterward
    // (avoids words shifting lines when the DOM is rebuilt).
    // tl.call(() => {
    //   titleSplit.revert();
    //   subtitleSplit.revert();
    // }, null, "+=0");

    // 4. Fade in the buttons
    // start after subtitle animation completes so buttons never appear early
    tl.fromTo(`.${styles.ctaGroup}`, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8 }, 
      "+=0"
    );

    tl.fromTo(phoneRef.current,
      {
        y: 300,        // Start 300px below its final position
        opacity: 0,    // Start invisible
        scale: 0.9,  // Start slightly smaller
      },
      {
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 1.5, 
        ease: "power3.out",
      },
      "-=0.6" // overlap slightly with button fade but still start after subtitle
    );

    // when the intro timeline finishes, unlock scrolling and mark complete
    tl.call(() => {
      document.body.style.overflow = '';
      setIntroComplete(true);
    });

    tl.fromTo(`.${styles.phoneScreen}`,
      {y: 20, opacity: 0},
      {y: 0, opacity: 1, duration: 1, ease: "power2.out"},
      "-=0.5"
    );
  }, []);

  useEffect(() => { 
    if (!introComplete) return; // don't create scroll triggers until intro finishes

    const ctx = gsap.context(() => {
      // ensure floating cards are hidden on first render — they'll animate in when hero becomes white
      let mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 768px)",
      isDesktop: "(min-width: 769px)"
    }, (context) => {
      let { isMobile } = context.conditions;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "bottom top" : "bottom top", // shorter pin on mobile to reduce hard scrolling
          scrub: isMobile ? 0.5 : 1, // Smoother scrub for mobile CPUs
          // CRITICAL: Never pin on mobile — GSAP pin breaks position:sticky
          // on the mobileCardStack that follows in the DOM.
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true, // Recalculates if the window is resized
        }
      });

      // Phone Scaling
      tl.to(phoneRef.current, {
        // Reduced scale for mobile so the device doesn't push off-screen
        scale: isMobile ? 1.1 : 1.3, 
        // Adjusted vertical movement for mobile aspect ratios
        y: isMobile ? "-0.5dvh" : "-25vh", 
        transformOrigin: "bottom center",
        ease: "power2.inOut",
        duration: 1,
        force3D: true // Forces GPU acceleration
      }, 0);

      // Hero Text Fade
      tl.to(`.${styles.heroContent}`, {
        opacity: 0,
        y: isMobile ? -30 : -100,
        ease: "power2.in",
        duration: 0.7,
      }, 0);

      // Overlay Transition
      tl.to(overlayRef.current, {
        y: "-100%",
        ease: "power1.inOut",
        duration: 0.9,
      }, 0);

      // Floating Cards (Hidden on mobile if desired, or repositioned)
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        tl.to(card, {
          y: 0,
          opacity: 1, // Hide cards on mobile to keep it clean
          scale: 1,
          ease: "back.out(1.7)",
          force3D: true,
        }, 0.75 + (index * 0.1));
      });

      // fade‑in for offer section elements while user scrolls down
      if (offerRef.current) {
        const offerElems = offerRef.current.querySelectorAll(
          `.${styles.bgTitleWrapper}, .${styles.leftColumn}, .${styles.centerColumn}, .${styles.rightColumn}`
        );
        gsap.fromTo(
          offerElems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: offerRef.current,
              start: "top center",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );
      }

      if (reasonsRef.current) {
        const reasonsElems = reasonsRef.current.querySelectorAll(
          `.${styles.reasonTitle}, .${styles.reasonsImageSide}, .${styles.reasonsTextSide}, .${styles.reasonContent}, .${styles.reasonIconBox}`
        );
        gsap.fromTo(
          reasonsElems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: reasonsRef.current,
              start: "top center",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );
      }
    });

    }, sectionRef);
    return () => ctx.revert();
  }, [introComplete]);

  // ── Section 2: Rolling Sphere ScrollTrigger ────────────────
  useEffect(() => {
    if (!introComplete) return;
    if (!section2Ref.current || !sphereRef.current) return;

    const SPHERE_RADIUS = 375;

    const ctx = gsap.context(() => {
      const vw = window.innerWidth;
      const startX = vw;
      const endX = -SPHERE_RADIUS;
      const totalRotationDeg = ((startX - endX) / SPHERE_RADIUS) * (180 / Math.PI);

      gsap.set(sphereRef.current, { x: startX });
      gsap.set(sphereTextRef.current, { opacity: 0, scale: 0.85 });
      phoneScreensRef.current.slice(1).forEach(s => { if (s) gsap.set(s, { opacity: 0 }); });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: 'top top',
          end: '+=2500',
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Sphere: roll left + rotate
      tl.to(sphereRef.current, {
        x: endX,
        rotation: totalRotationDeg,
        ease: 'none',
        duration: 8,
      }, 0);

      // Text: counter-rotate so it stays upright
      tl.to(sphereTextRef.current, {
        rotation: -totalRotationDeg,
        ease: 'none',
        duration: 8,
      }, 0);

      // Collage cards: stagger in at section start
      const cards = collageCardsRef.current.filter(Boolean);
      if (cards.length > 0) {
        tl.fromTo(
          cards,
          { opacity: 0, y: 55 },
          { opacity: 1, y: 0, stagger: 0.18, duration: 2.2, ease: 'power3.out' },
          0
        );
        // Alternating parallax depth
        cards.forEach((card, i) => {
          tl.to(card, {
            y: i % 2 === 0 ? -22 : 22,
            ease: 'none',
            duration: 7,
          }, 1);
        });
      }

      // CTA text fades in once sphere has settled
      tl.to(sphereTextRef.current, {
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
        duration: 1.2,
      }, 7);

      // Phone screen swaps
      const screens = phoneScreensRef.current;
      if (screens[1]) {
        tl.to(screens[0], { opacity: 0, duration: 0.4 }, 3);
        tl.to(screens[1], { opacity: 1, duration: 0.4 }, 3);
      }
      if (screens[2]) {
        tl.to(screens[1], { opacity: 0, duration: 0.4 }, 5.5);
        tl.to(screens[2], { opacity: 1, duration: 0.4 }, 5.5);
      }
    }, section2Ref);

    return () => ctx.revert();
  }, [introComplete]);

  return (
    <div>
      <div ref={sectionRef} className={styles.heroWrapper}>
        <div className={styles.heroContent}>
          <h1 ref={titleRef} className={styles.heroTitle} data-fallback={ORIGINAL_TITLE}></h1>
          <p ref={subtitleRef} className={styles.heroSubtitle} data-fallback={ORIGINAL_SUBTITLE}></p>
          <div className={styles.ctaGroup}>
            <button className={styles.primaryBtn}>Explore Events</button>
            <button className={styles.secondaryBtn}>Get the App</button>
          </div>
        </div>

        <div ref={overlayRef} className={styles.heroOverlay} aria-hidden="true" />

        {/* Central Phone App Image */}
        <div ref={phoneRef} className={styles.phoneContainer}>
          <img src="https://media.paxmeet.com/phonebase.png" alt="Hand Holding Phone" className={styles.phoneBase} />
          <img src="https://media.paxmeet.com/herophonescreen.png" alt="Paxmeet App Screen" className={styles.phoneScreen} />
        </div>

        {/* Floating Components in Home.jsx */}
        <div ref={el => cardsRef.current[0] = el} className={`${styles.floatCard} ${styles.wildCard}`}>
          <div className={styles.accentOrange} /> {/* Orange accent for Wild Card */}
          <img src="https://media.paxmeet.com/paxmet%20gallery%2010.png" alt="Wild Card" />
          <span className={styles.cardTag}>Wild Card</span>
        </div>

        <div ref={el => cardsRef.current[1] = el} className={`${styles.floatCard} ${styles.nightOutTop}`}>
          <div className={styles.accentGreen} /> {/* Green accent for Night Out */}
          <img src="https://media.paxmeet.com/paxmet%20gallery%204.png" alt="Night Out" />
          <span className={styles.cardTag}>Night Out</span>
        </div>

        <div ref={el => cardsRef.current[2] = el} className={`${styles.floatCard} ${styles.nightOutBottom}`}>
          <div className={styles.accentPink} /> {/* Pink accent for Night Out */}
          <img src="https://media.paxmeet.com/paxmet%20gallery%205.png" alt="Night Out" />
          <span className={styles.cardTag}>Night Out</span>
        </div>

        <div ref={el => cardsRef.current[3] = el} className={`${styles.floatCard} ${styles.fanZone}`}>
          <div className={styles.accentBlue} /> {/* Blue accent for Fan Zone */}
          <img src="https://media.paxmeet.com/paxmet%20gallery%202.png" alt="Fan Zone" />
          <span className={styles.cardTag}>Fan Zone</span>
        </div>
      </div>

      {/* ── Section 2: Rolling Sphere ─────────────────────── */}
      <section ref={section2Ref} className={styles.section2}>
        {/* White background */}
        <div className={styles.s2Bg} />

        {/* Image collage — behind sphere */}
        <div className={styles.collageGrid}>
          {[
            { src: 'https://media.paxmeet.com/paxmet%20gallery%2010.png', label: 'Wild Card' },
            { src: 'https://media.paxmeet.com/paxmet%20gallery%204.png',  label: 'Night Out' },
            { src: 'https://media.paxmeet.com/paxmet%20gallery%205.png',  label: 'Night Out' },
            { src: 'https://media.paxmeet.com/paxmet%20gallery%202.png',  label: 'Fan Zone'  },
          ].map((item, i) => (
            <div
              key={i}
              ref={el => collageCardsRef.current[i] = el}
              className={`${styles.collageCard} ${styles['collageCard' + i]}`}
            >
              <img src={item.src} alt={item.label} />
              <span className={styles.collageLabel}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Glassmorphic rolling sphere */}
        <div ref={sphereRef} className={styles.sphere}>
          {/* CTA text — counter-rotated, fades in once settled */}
          <div ref={sphereTextRef} className={styles.sphereText}>
            <p className={styles.sphereTagline}>Your next adventure awaits</p>
            <a href="#" className={styles.sphereCtaPrimary}>Download App</a>
            <button className={styles.sphereCtaSecondary}>Continue on web →</button>
          </div>
        </div>

        {/* Mobile mockup — right side, screen swaps on scroll */}
        <div className={styles.s2Phone}>
          <img src="https://media.paxmeet.com/phonebase.png" alt="" className={styles.s2PhoneBase} />
          <div className={styles.s2ScreenStack}>
            <img
              ref={el => phoneScreensRef.current[0] = el}
              src="https://media.paxmeet.com/herophonescreen.png"
              alt="App Screen 1"
              className={styles.s2Screen}
            />
            <img
              ref={el => phoneScreensRef.current[1] = el}
              src="https://media.paxmeet.com/herophonescreen.png"
              alt="App Screen 2"
              className={styles.s2Screen}
            />
            <img
              ref={el => phoneScreensRef.current[2] = el}
              src="https://media.paxmeet.com/herophonescreen.png"
              alt="App Screen 3"
              className={styles.s2Screen}
            />
          </div>
        </div>
      </section>

      <section ref={offerRef} className={styles.offerSection}>
        <div className={styles.bgTitleWrapper}>
          <h1 className={styles.bgTitle}>Paxmeet</h1>
        </div>

        <div className={styles.staggeredGrid}>
          {/* Left Side: Copy */}
          <div className={styles.leftColumn}>
            <div className={styles.banIcon}>
              <img src="https://media.paxmeet.com/ban.png" alt="banIcon" />
            </div>
            <hr className={styles.divider} />
            <div className={styles.mainHeadline}>
              <h2 className={styles.headline}>
                Stop Living Online. Chats, Likes, DMs.
              </h2>
            </div>
            <div className={styles.subtext}>
              <p>Thousands of connections on screen — but no one beside you.</p>
            </div>
          </div>

          {/* Center: Image with User Tags */}
          <div className={styles.centerColumn}>
            <div className={styles.imageCard}>
              {offeringImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Offering ${index}`}
                  className={`${styles.offeringImage} ${index === currentImg ? styles.active : ''}`}
                />
              ))}

              {/* floating tags - always in DOM for proper transition sync with images */}
              <div className={`${styles.img1Tag1} ${currentImg === 0 ? styles.activeTag : ''}`}>
                <img src="https://media.paxmeet.com/textmessage.svg" alt="" />
              </div>
              <div className={`${styles.img1Tag2} ${currentImg === 0 ? styles.activeTag : ''}`}>
                <img src="https://media.paxmeet.com/message.svg" alt="message" />
              </div>
              <div className={`${styles.img2Tag1} ${currentImg === 1 ? styles.activeTag : ''}`}>
                {/* Your first tag for image 2 */}
                <img src="https://media.paxmeet.com/nisha.svg" alt="nisha" />
              </div>
              <div className={`${styles.img2Tag2} ${currentImg === 1 ? styles.activeTag : ''}`}>
                {/* Your first tag for image 2 */}
                <img src="https://media.paxmeet.com/ali.svg" alt="ali" />
              </div>
              <div className={`${styles.img2Tag3} ${currentImg === 1 ? styles.activeTag : ''}`}>
                {/* Your first tag for image 2 */}
                <img src="https://media.paxmeet.com/ron.svg" alt="ron" />
              </div>
              <div className={`${styles.img2Tag4} ${currentImg === 1 ? styles.activeTag : ''}`}>
                {/* Your first tag for image 2 */}
                <img src="https://media.paxmeet.com/vedant.svg" alt="vedant" />
              </div>

            </div>
          </div>

          {/* Column 3: Bottom Aligned Message */}
          <div className={styles.rightColumn}>
            <div className={styles.flashIcon}>
              <img src="https://media.paxmeet.com/flash.png" alt="flashIcon" />
            </div>
            <hr className={styles.divider} />
            <div className={styles.mainHeadline}>
              <h2 className={styles.headline}>
                Create & Join Events Make Plans Happen.
              </h2>
            </div>
            <div className={styles.subtext}>
              <p>Create your own event. Or join one that matches your vibe. 
                Discover people in your city. Explore what’s happening around you. 
                No random strangers. Only local, real connections.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Desktop only: two-column reasons layout */}
      <section 
        ref={reasonsRef}
        className={styles.reasonsSection}
      >
        <div className={styles.reasonHeader}>
          <h1 className={styles.reasonTitle}>Why Choose Paxmeet...!</h1>
        </div>
        
        <div className={styles.reasonsMainContainer}>
          {/* Left Column: Animated Stages */}
          <div 
            className={styles.reasonsImageSide}
            onMouseEnter={() => handlePause()}
            onMouseLeave={handleResume}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReason}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className={styles.stageWrapper}
              >
                {renderStage(activeReason)}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Interactive Text List */}
          <div
            className={styles.reasonsTextSide}
            onMouseEnter={() => handlePause()}
            onMouseLeave={handleResume}
          >
            {reasonsData.map((reason, index) => (
              <div
                key={reason.id}
                className={`${styles.reasonCard} ${
                  activeReason === index ? styles.activeReasonCard : ""
                }`}
                onMouseEnter={() => setActiveReason(index)}
              >
                <div className={styles.reasonIconBox}>
                  <img src={reason.icon} alt="" />
                </div>
                <div className={styles.reasonContent}>
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── New Mobile Stacked Layout (YOUM Style) ── */}
      <div className={styles.mobileStackedWrapper}>
        <div className={styles.mobileStackHeader}>
          <h1 className={styles.reasonTitle}>Why Choose Paxmeet...!</h1>
        </div>

        {reasonsData.map((reason, index) => (
          <div key={reason.id} className={styles.mobileFeatureCard}>
            {/* 1. Header Info */}
            <div className={styles.cardHeader}>
              <span className={styles.cardIndex}>0{index + 1}</span>
              <h2 className={styles.cardTitle}>{reason.title}</h2>
              <p className={styles.cardDescription}>{reason.text}</p>
            </div>

            {/* 2. The Visual Stage (Reusing your existing renderStage function) */}
            <div className={styles.cardVisualArea}>
              {renderStage(index, true)}
            </div>
          </div>
        ))}
      </div>

      {/* ── Quiz CTA Section ── */}
<section className={styles.quizSection}>
  <div className={styles.quizCard}>
    <div className={styles.quizContent}>
      <span className={styles.quizBadge}>Discover Your Vibe</span>
      <h2 className={styles.quizTitle}>
        Not sure where you fit in? <br /> 
        <span className={styles.purpleText}>Take the Pax-Quiz.</span>
      </h2>
      <p className={styles.quizDescription}>
        Answer 5 quick questions and we'll tell you if you're a "Wild Card" explorer 
        or a "Night Out" legend.
      </p>
      
      <Link to="/quiz" className={styles.quizBtn}>
        Start the Quiz
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </Link>
    </div>

    {/* Optional: Add a floating decorative element like your other sections */}
    <div className={styles.quizVisual}>
      <motion.img 
        src="https://media.paxmeet.com/flash.png" 
        alt="Quiz Icon"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
    </div>
  </div>
</section>

    </div>

  );
}