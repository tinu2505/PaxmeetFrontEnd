import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from 'gsap/SplitText';
import { AnimatePresence } from 'framer-motion';
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
  const offerRef = useRef(null);               // reference to offer section for scroll animations
  const cardsRef = useRef([]);
  
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
      clearInterval(intervalRef.current); // Clear any existing intervals
      intervalRef.current = setInterval(() => {
        setActiveReason((prev) => (prev + 1) % reasonsData.length);
      }, 4000); // Change interval (e.g., 4 seconds)
    };

    startInterval(); // Start the loop immediately

    // Cleanup function (crucial for setInterval)
    return () => clearInterval(intervalRef.current);
  }, [reasonsData.length]);

  const handlePause = (index) => {
    clearInterval(intervalRef.current); // Stop the auto-switch
    if (index !== undefined) {
      setActiveReason(index); // Manually set the reason if hovering a reason
    }
  };

  const handleResume = () => {
    clearInterval(intervalRef.current); // Clear previous to prevent rapid speed-up
    intervalRef.current = setInterval(() => {
      setActiveReason((prev) => (prev + 1) % reasonsData.length);
    }, 4000); // Resume the loop
  };

  const renderStage = (index) => {
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
          <motion.img 
            src="https://media.paxmeet.com/tag_wobble1.svg" 
            className={`${styles.absTag} ${styles.wobble1}`}
            nimate={activeReason === 1 ? { x: [-8, 8, -8] } : { x: 0 }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          />
          {/* Tag 2: Slower Wobble with Delay */}
          <motion.img 
            src="https://media.paxmeet.com/tag_wobble2.svg" 
            className={`${styles.absTag} ${styles.wobble2}`}
            animate={activeReason === 1 ? { x: [-5, 5, -5] } : { x: 0 }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
          />
        </div>
      );
      
      case 2: // Reason 3: 3x4 Matrix + Upward Scroll
      return (
        <div className={styles.stageThree}>
          <div className={styles.matrixGrid}>
            {[...Array(12)].map((_, i) => (
              <motion.img
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={activeReason === 2 ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: activeReason === 2 ? i * 0.08 : 0, 
                  ease: "easeOut" 
                }}
                src={`https://media.paxmeet.com/matrix${i}.png`}
              />
            ))}
          </div>
          <div className={styles.verticalScrollContainer}>
            <div className={styles.scrollingContent}>
              {/* Duplicate images here for infinite effect */}
              <img src="https://media.paxmeet.com/scroll1.png" alt="" />
              <img src="https://media.paxmeet.com/scroll2.png" alt="" />
              <img src="https://media.paxmeet.com/scroll3.png" alt="" />
              <img src="https://media.paxmeet.com/scroll1.png" alt="" />
              <img src="https://media.paxmeet.com/scroll2.png" alt="" />
              <img src="https://media.paxmeet.com/scroll3.png" alt="" />
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
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }} // Bouncy 'spring' feel
          >
            <img src="https://media.paxmeet.com/circleLeft.png" alt="Left View" />
          </motion.div>
          {/* Right Circular Image: Slides out to the right */}
          <motion.div 
            className={styles.circleContainerSide}
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 110, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <img src="https://media.paxmeet.com/circleRight.png" alt="Right View" />
          </motion.div>
          {/* Central Circular Image: Fades in and stays on top */}
          <motion.div 
            className={styles.circleContainerMain}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src="https://media.paxmeet.com/circleCenter.png" alt="Main View" />
          </motion.div>
        </div>
      );

      case 4: // Reason 5: Single Image + Single Tag
      return (
        <div className={styles.stageFive}>
          <img src="https://media.paxmeet.com/reason5.png" alt="" className={styles.stageMainImg} />
          <motion.img 
            src="https://media.paxmeet.com/tag5.svg" 
            className={styles.floatTag}
            // Only float if this reason is active
            animate={activeReason === 4 ? { y: [0, -12, 0] } : { y: 0 }}
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

    // 2‑3. fade in title and subtitle line‑by‑line instead of typing
    // set the actual text content up front so SplitText can measure lines
    titleRef.current.textContent = ORIGINAL_TITLE;
    subtitleRef.current.textContent = ORIGINAL_SUBTITLE;

    const titleSplit = new SplitText(titleRef.current, { type: "lines" });
    const subtitleSplit = new SplitText(subtitleRef.current, { type: "lines" });

    tl.from(titleSplit.lines, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.25,
      ease: "power2.out",
    }, "-=0.3");

    tl.from(subtitleSplit.lines, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out",
    }, "-=0.1");

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
          end: isMobile ? "bottom top" : "bottom+=100% top", // shorter pin on mobile to reduce hard scrolling
          scrub: isMobile ? 0.5 : 1, // Smoother scrub for mobile CPUs
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
    });

     
    }, sectionRef);
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
      
      <section className={styles.reasonsSection}>
        <div className={styles.reasonsHeader}>
          <h1 className={styles.headline}>Why Choose Paxmeet...!</h1>
        </div>

        <div className={styles.dualContainer}>
          {/* Left: Dynamic Image Container */}
          <div 
            className={styles.dynamicImageColumn}
            onMouseEnter={() => handlePause()} // Pause on image hover
            onMouseLeave={handleResume} // Resume on image leave
          >
            <div className={styles.imageWrapper}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReason}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={styles.stageContainer}
                >
                  {renderStage(activeReason)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Interactive Reasons List */}
          <div className={styles.reasonsListColumn}>
            {reasonsData.map((reason, index) => (
              <div 
                key={reason.id} 
                className={`${styles.reasonCard} ${activeReason === index ? styles.reasonActive : ''}`}
                onMouseEnter={() => handlePause(index)} // Pause & Set on reason hover
                onMouseLeave={handleResume} // Resume on reason leave
              >
                {/* New Icon Container */}
                <div className={styles.reasonIconWrapper}>
                  <img src={reason.icon} alt="icon" className={styles.reasonIcon} />
                </div>

                <div className={styles.reasonTimeline}>
                  <div className={styles.timelineCircle}></div>
                  {index < reasonsData.length - 1 && <div className={styles.timelineLine}></div>}
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
    </div>

  );
}
