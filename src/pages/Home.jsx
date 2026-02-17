import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import styles from './Home.module.css';
import EventCard from "./EventCard";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Home() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null); // Ref for the h1
  const subtitleRef = useRef(null); // Ref for the p
  const phoneRef = useRef(null);
  const overlayRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();

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

    // 2. "Write down" the Title
    // Note: Start with an empty string in the JSX or clear it here
    const originalTitle = "Turn your plan into a real-world hangout.";
    tl.to(titleRef.current, {
      duration: 1.5,
      text: originalTitle,
      ease: "none",
    }, "-=0.3"); // Start slightly before navbar finishes

    // 3. "Write down" the Subtitle
    const originalSubtitle = "Looking for people to host & join events? Paxmeet helps you find your vibe & build it together.";
    tl.to(subtitleRef.current, {
      duration: 2.5,
      text: originalSubtitle,
      ease: "none",
    }, "-=0.5");

    // 4. Fade in the buttons
    tl.fromTo(`.${styles.ctaGroup}`, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8 }, 
      "-=1"
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
      "-=0.8" // Start at the same time as the buttons
    );

    tl.fromTo(`.${styles.phoneScreen}`,
      {y: 20, opacity: 0},
      {y: 0, opacity: 1, duration: 1, ease: "power2.out"},
      "-=0.5"
    );
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ensure floating cards are hidden on first render — they'll animate in when hero becomes white
      gsap.set(cardsRef.current, { y: 40, opacity: 0, scale: 0.95 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%", // Longer scroll for smoother transition
          scrub: 1,      // Adds a slight "catch-up" delay for smoothness
          pin: true,
        }
      });

      tl.to(phoneRef.current, {
        scale: 1.7,
        y: "-5vh",         // Slight upward movement
        transformOrigin: "bottom center",
        ease: "power2.inOut",
        duration: 1
      }, 0);

      tl.to(`.${styles.heroContent}`, {
        opacity: 0,
        y: -100,
        ease: "power2.in",
        duration: 0.7,
      }, 0);

      // fade white overlay in behind the phone while text fades out
      tl.to(overlayRef.current, {
        y: "-100%",
        ease: "power1.inOut",
        duration: 0.9,
      }, 0); // start with phone/text animation

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        tl.to(card, {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "back.out(1.7)",
        }, 0.75 + (index * 0.1));
      });

      // NAVBAR: slide it away while the hero is active, then restore it (with a solid background)
      const navEl = document.getElementById('site-navbar');
      let navHideTween;
      let navScrollTrigger;

      if (navEl) {
        // hide navbar progressively while hero is visible (scrubs as you scroll)
        navHideTween = gsap.to(navEl, {
          y: -120,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });

        // when the hero fully leaves / re-enters the viewport, toggle the 'scrolled' state
        navScrollTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'bottom top',
          onEnter: () => {
            // hero left the viewport -> show navbar (scrolled state)
            navEl.setAttribute('data-scrolled', 'true');
            gsap.to(navEl, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
          },
          onEnterBack: () => {
            // user scrolled back up into the hero/top -> restore hero state and ensure navbar is visible again
            navEl.removeAttribute('data-scrolled');
            gsap.to(navEl, { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
          }
        });

        // Extra: while inside the hero, show navbar immediately when the user scrolls UP
        // (fixes cases where a small upward scroll didn't visibly restore the navbar)
        const navShowOnUp = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          onUpdate: (self) => {
            if (self.direction < 0) { // scrolling up
              navEl.removeAttribute('data-scrolled');
              gsap.to(navEl, { y: 0, opacity: 1, duration: 0.20, ease: 'power2.out', overwrite: 'auto' });
            }
          }
        });
      
        // store for cleanup
        navScrollTrigger._navShowOnUp = navShowOnUp;
      }

      // cleanup for any nav tweens/ScrollTriggers so navbar isn't left hidden after leaving Home
      return () => {
        if (navHideTween) {
          navHideTween.scrollTrigger && navHideTween.scrollTrigger.kill();
          navHideTween.kill();
        }
        if (navScrollTrigger) {
          // also kill the helper trigger created for 'show on up' when present
          if (navScrollTrigger._navShowOnUp) navScrollTrigger._navShowOnUp.kill();
          navScrollTrigger.kill();
        }
        if (navEl) {
          // clear inline styles GSAP may have applied so other pages see the navbar normally
          navEl.style.transform = '';
          navEl.style.opacity = '';
          navEl.removeAttribute('data-scrolled');
        }
      };
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className={styles.heroWrapper}>
      <div className={styles.heroContent}>
        <h1 ref={titleRef} className={styles.heroTitle}></h1>
        <p ref={subtitleRef} className={styles.heroSubtitle}></p>
        <div className={styles.ctaGroup}>
          <button className={styles.primaryBtn}>Explore Events</button>
          <button className={styles.secondaryBtn}>Get the App</button>
        </div>
      </div>

      <div ref={overlayRef} className={styles.whiteOverlay} aria-hidden="true" />

      {/* Central Phone App Image */}
      <div ref={phoneRef} className={styles.phoneContainer}>
        <img src="src/assets/images/herophone.png" alt="Hand Holding Phone" className={styles.phoneBase} />
        <img src="src/assets/images/herophonescreen.png" alt="Paxmeet App Screen" className={styles.phoneScreen} />
      </div>

      {/* Floating Components in Home.jsx */}
      <div ref={el => cardsRef.current[0] = el} className={`${styles.floatCard} ${styles.wildCard}`}>
        <div className={styles.accentOrange} /> {/* Orange accent for Wild Card */}
        <img src="src/assets/images/paxmet gallery 10.png" alt="Wild Card" />
        <span className={styles.cardTag}>Wild Card</span>
      </div>

      <div ref={el => cardsRef.current[1] = el} className={`${styles.floatCard} ${styles.nightOutTop}`}>
        <div className={styles.accentGreen} /> {/* Green accent for Night Out */}
        <img src="src/assets/images/paxmet gallery 4.png" alt="Night Out" />
        <span className={styles.cardTag}>Night Out</span>
      </div>

      <div ref={el => cardsRef.current[2] = el} className={`${styles.floatCard} ${styles.nightOutBottom}`}>
        <div className={styles.accentPink} /> {/* Pink accent for Night Out */}
        <img src="src/assets/images/paxmet gallery 5.png" alt="Night Out" />
        <span className={styles.cardTag}>Night Out</span>
      </div>

      <div ref={el => cardsRef.current[3] = el} className={`${styles.floatCard} ${styles.fanZone}`}>
        <div className={styles.accentBlue} /> {/* Blue accent for Fan Zone */}
        <img src="src/assets/images/paxmet gallery 2.png" alt="Fan Zone" />
        <span className={styles.cardTag}>Fan Zone</span>
      </div>
    </div>
  );
}
