import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Quiz.module.css';
import { text } from 'framer-motion/client';

const questions = [
    {
        id: 1,
        question: "How do you feel about hanging out with strangers?",
        subtext: "Be honest, we won’t judge… unless you say 'only if they bring snacks' 😂",
        type: "choice",
        options: [
            { text: "I love meeting new people! Bring it on", vibe: "Wild Card" },
            { text: "I’m cautious but curious", vibe: "Zen" },
            { text: "Only if it’s someone’s friend-of-a-friend", vibe: "Night Out" },
            { text: "Strangers? No way! Unless there's food, drinks, or a good playlist", vibe: "Fan Zone" }
        ]
    },
    {
        id: 2,
        question: "What’s your perfect group size?",
        subtext: "Some of us love crowds, others hide in corners.",
        type: "choice",
        options: [
            { text: "2–5 (close friends, deep talks)", vibe: "Zen" },
            { text: "6–15 (fun but manageable)", vibe: "Night Out" },
            { text: "16–50 (let’s get loud!)", vibe: "Wild Card" },
            { text: "50+ (I want to be famous now)", vibe: "Fan Zone" }
        ]
    },
    {
        id: 3,
        question: "Do you prefer planned events or spontaneous hangouts?",
        subtext: "Choose wisely… or don’t, we’re not your parents.",
        type: "choice",
        options: [
            { text: "Planned events - give me structure", vibe: "Fan Zone" },
            { text: "Spontaneous hangouts - surprise me!", vibe: "Wild Card" },
            { text: "Depends on my mood… and the weather", vibe: "Zen" },
            { text: "I’ll show up wherever the vibe is strongest", vibe: "Night Out" }
        ]
    },
    {
        id: 4,
        question: "What’s your go-to reaction when someone invites you to an event?",
        subtext: "We want to know if you’re an over-enthusiast or a “maybe…” type.",
        type: "choice",
        options: [
            {text: "Say yes instantly and mark my calendar", vibe: "Wild Card"},
            {text: "Ask who’s going before deciding", vibe: "Night Out"},
            {text: "Pretend I’m busy but sneak out anyway", vibe: "Wild Card"},
            {text: "Politely decline and binge-watch something else", vibe: "Zen"},
        ]
    },
    {
        id: 5,
        question: "If you had to describe your weekend mood, what would it be?",
        subtext: "Let’s decode your vibe.",
        type: "choice",
        options: [
            {text: "Chill, Netflix, and naps all weekend", vibe: "Zen"},
            {text: "Party till the sun comes up", vibe: "Night Out"},
            {text: "Exploring something new", vibe: "Wild Card"},
            {text: "Hanging out with friends or making new ones", vibe: "Fan Zone"},
            {text: "Other (spill the mood!)",},
        ]
    },
    {
        id: 6,
        question: "What’s your spirit snack when you’re out with people?",
        subtext: "We want to know if you’re all about gourmet cheese or chips straight from the packet.",
        type: "choice",
        options: [
            {text: "Fancy finger foods and artisanal treats", vibe: "Night Out"},
            {text: "Pizza, always pizza", vibe: "Fan Zone"},
            {text: "Whatever’s near me, I’m not picky", vibe: "Wild Card"},
            {text: "Just drinks, please", vibe: "Night Out"},
            {text: "I bring my own snacks - deal with it", vibe: "Zen"},
        ]
    },
    {
        id: 7,
        question: "What makes an event unforgettable for you?",
        subtext: "Give us the magic ingredients!",
        type: "short",
        placeholder: "Tell us the magic recipe..."
    },
    {
        id: 8,
        question: "What’s the perfect post-event ritual for you?",
        subtext: "Because wrapping up matters just as much as showing up.",
        type: "choice",
        options: [
            {text: "A deep recap with friends", vibe: "Fan Zone"},
            {text: "Posting a story/photo ASAP", vibe: "Night Out"},
            {text: "Quietly decompressing alone", vibe: "Zen"},
            {text: "Planning the next event!", vibe: "Wild Card"}
        ]
    },
]

export default function Quiz() {
  const [phase, setPhase] = useState('intro'); // 'intro', 'details', 'quiz', 'result'
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({});
  const [userData, setUserData] = useState({ fullName: '', email: '', phone: '', age: '', location: '', vibeDescription: '' });

  // HANDLERS
  const handleStartDetails = () => setPhase('details');
  
  const handleStartQuiz = (e) => {
    e.preventDefault();
    setPhase('quiz');
    setCurrentStep(0); // Reset step just in case
  };

  const handleAnswerSelection = (vibe) => {
    // 1. Update Score
    if (vibe) {
      setScores(prev => ({ ...prev, [vibe]: (prev[vibe] || 0) + 1 }));
    }

    // 2. Move to next question or end quiz
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setPhase('result');
    }
  };

  const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Pune"];

  const getFinalVibe = () => {
  if (Object.keys(scores).length === 0) return "Wild Card"; // Fallback

  // Find the vibe with the highest count
  return Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
};

const personaData = {
  "Wild Card": {
    title: "The Wild Card",
    desc: "You're spontaneous, adventurous, and the life of any unexpected plan. You don't just join the vibe; you are the vibe.",
    color: "#FF8A00"
  },
  "Night Out": {
    title: "The Night Owl",
    desc: "You live for the energy of the city. From 6-15 people or a massive crowd, you're there for the stories and the music.",
    color: "#7332D6"
  },
  "Zen": {
    title: "The Zen Master",
    desc: "You value deep connections and quality over quantity. Small groups and meaningful conversations are your superpower.",
    color: "#2ECC71"
  },
  "Fan Zone": {
    title: "The Community Hero",
    desc: "You're the glue that holds the circle together. You love structure, safety, and making sure everyone feels included.",
    color: "#3498DB"
  }
};

  return (
    <div className={styles.quizContainer}>
      <AnimatePresence mode="wait">
        
        {/* PHASE 1: INTRO */}
        {phase === 'intro' && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.introCard}>
            <h1 className={styles.welcomeTitle}>Welcome to <span className={styles.purpleText}>Paxmeet!</span></h1>
            <p className={styles.introText}>Tired of boring weekendsand flaky group chats? It’s time to flip the script.</p>
            <button onClick={handleStartDetails} className={styles.primaryBtn}>Fill out the form & get in</button>
          </motion.div>
        )}

        {/* PHASE 2: DETAILS */}
        {phase === 'details' && (
          <motion.div key="details" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className={styles.formCard}>
             <h2 className={styles.formTitle}>Join the <span className={styles.purpleText}>Crew</span></h2>
             <form onSubmit={handleStartQuiz} className={styles.formGrid}>
               <input type="text" placeholder="Full Name" required onChange={e => setUserData({...userData, fullName: e.target.value})} />
              <input type="email" placeholder="Email Address" required onChange={e => setUserData({...userData, email: e.target.value})} />
              <input type="tel" placeholder="Phone Number" required onChange={e => setUserData({...userData, phone: e.target.value})} />
              <div className={styles.ageSection}>
                <p>Your Age</p>
                <div className={styles.ageChips}>
                  {['Below 18', '18-24', '25-34', '35-44', '45+'].map(range => (
                    <button type="button" key={range} 
                      className={userData.age === range ? styles.activeChip : styles.chip}
                      onClick={() => setUserData({...userData, age: range})}>
                      {range}
                    </button>
                  ))}
                </div>
                </div>
               <select required onChange={e => setUserData({...userData, location: e.target.value})}>
                <option value="">Select your City</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <textarea placeholder="Your vibe? Describe yourself..." onChange={e => setUserData({...userData, vibeDescription: e.target.value})} />
               <button type="submit" className={styles.primaryBtn}>Take the Vibe Quiz</button>
             </form>
          </motion.div>
        )}

        {/* PHASE 3: THE QUIZ */}
        {phase === 'quiz' && questions[currentStep] && (
          <motion.div key="quiz-main" className={styles.quizCard} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Progress Bar */}
            <div className={styles.progressBar}>
              <motion.div 
                className={styles.progressFill}
                animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>

            <h3 className={styles.questionTitle}>{questions[currentStep].question}</h3>
            <p className={styles.questionSubtext}>{questions[currentStep].subtext}</p>

            <div className={styles.optionsContainer}>
              {questions[currentStep].type === "choice" ? (
                questions[currentStep].options.map((opt, i) => (
                  <button 
                    key={i} 
                    className={styles.optionButton}
                    onClick={() => handleAnswerSelection(opt.vibe)}
                  >
                    {opt.text}
                  </button>
                ))
              ) : (
                <div className={styles.shortAnswerGroup}>
                  <textarea placeholder={questions[currentStep].placeholder} className={styles.quizTextArea} />
                  <button className={styles.primaryBtn} onClick={() => handleAnswerSelection(null)}>
                    Next Question
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {phase === 'result' && (
  <motion.div key="result" className={styles.resultCard} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
    <h1 className={styles.resultTitle} style={{ color: personaData[getFinalVibe()].color }}>
      {personaData[getFinalVibe()].title}
    </h1>
    <p className={styles.resultDesc}>{personaData[getFinalVibe()].desc}</p>
    
    <div className={styles.resultMeta}>
      <p>Hey <strong>{userData.fullName}</strong>, we found some events in <strong>{userData.location}</strong> that match your vibe!</p>
    </div>

    {/* --- NEW SECTION START --- */}
    <div className={styles.socialFollowSection}>
      <p className={styles.followText}>Follow us for updates, stories, and invites to events around you.</p>
      <p className={styles.readyText}>Ready to turn vibes into real connections?</p>
      
      <div className={styles.socialIcons}>
        <a href="https://instagram.com/paxmeet" target="_blank" rel="noreferrer"><img src="https://media.paxmeet.com/insta.svg" alt="Insta" /></a>
        <a href="https://facebook.com/paxmeet" target="_blank" rel="noreferrer"><img src="https://media.paxmeet.com/fb.svg" alt="FB" /></a>
        <a href="https://twitter.com/paxmeet" target="_blank" rel="noreferrer"><img src="https://media.paxmeet.com/x.svg" alt="Twitter" /></a>
      </div>
    </div>

    <div className={styles.resultActions}>
      <button onClick={() => window.location.href='/download'} className={styles.primaryBtn}>
        Download App
      </button>
      <button onClick={() => window.location.href='/events'} className={styles.secondaryBtn}>
        Explore {userData.location} Events
      </button>
    </div>
    {/* --- NEW SECTION END --- */}
  </motion.div>
)}
      </AnimatePresence>
    </div>
  );
}