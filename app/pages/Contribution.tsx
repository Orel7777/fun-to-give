'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Heart, Star, Users, Sparkles, Crown, Zap, Diamond } from 'lucide-react';

interface ContributionProps {
  className?: string;
}

interface ContributionOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  hoverGradient: string;
  bgGradient: string;
  iconBg: string;
  particles: string[];
  amount: string;
}

const contributionOptions: ContributionOption[] = [
  {
    id: 'monthly',
    title: 'תרומה חודשית',
    description: 'תרומה קבועה כל חודש לתמיכה מתמשכת במשפחות נזקקות ויצירת שינוי מתמשך בקהילה',
    icon: <Heart className="w-12 h-12" />,
    gradient: 'from-rose-400 via-pink-500 to-purple-600',
    hoverGradient: 'from-rose-500 via-pink-600 to-purple-700',
    bgGradient: 'from-rose-50 via-pink-50 to-purple-50',
    iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600',
    particles: ['💖', '❤️', '💕', '💗', '🌹'],
    amount: '₪50-500'
  },
  {
    id: 'basket',
    title: 'סל קהילתי',
    description: 'יוזמה קהילתית לאיסוף תרומות ממספר תורמים למטרה משותפת ויצירת רשת תמיכה חזקה',
    icon: <Users className="w-12 h-12" />,
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    hoverGradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    bgGradient: 'from-emerald-50 via-teal-50 to-cyan-50',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    particles: ['🤝', '👥', '🌟', '💫', '🌈'],
    amount: '₪100-1000'
  },
  {
    id: 'oneTime',
    title: 'תרומה מיוחדת',
    description: 'תרומה יוקרתית חד פעמית עם השפעה מיידית ומשמעותית על חיי המשפחות הנזקקות',
    icon: <Diamond className="w-12 h-12" />,
    gradient: 'from-violet-400 via-purple-500 to-indigo-600',
    hoverGradient: 'from-violet-500 via-purple-600 to-indigo-700',
    bgGradient: 'from-violet-50 via-purple-50 to-indigo-50',
    iconBg: 'bg-gradient-to-br from-violet-500 to-purple-600',
    particles: ['💎', '✨', '🌟', '⭐', '👑'],
    amount: '₪200-2000'
  }
];

const Contribution: React.FC<ContributionProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeParticles, setActiveParticles] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    const particleTimer = setTimeout(() => setActiveParticles(true), 1000);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(particleTimer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleDonationClick = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
    window.open('https://www.matara.pro/nedarimplus/online/?mosad=7014073', '_blank');
      setShowSuccessModal(false);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.15,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 80, 
      scale: 0.9,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      rotateY: -15,
      scale: 0.85
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    },
    hover: {
      y: -15,
      rotateY: 8,
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section 
      ref={containerRef}
      className={`overflow-hidden relative py-32 min-h-screen bg-gradient-to-br via-purple-900 from-slate-900 to-slate-900 ${className}`}
      style={{ y, opacity, scale }}
    >
      {/* Dynamic Background with Advanced Particles */}
      <div className="absolute inset-0">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,119,198,0.3),transparent_50%),radial-gradient(circle_at_40%_40%,rgba(120,200,255,0.2),transparent_50%)]" />
        
        {/* Animated Gradient Orbs */}
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r rounded-full blur-3xl from-purple-500/20 to-pink-500/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute right-20 bottom-20 w-80 h-80 bg-gradient-to-r rounded-full blur-3xl from-blue-500/20 to-cyan-500/20"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Advanced Floating Particles */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={activeParticles ? {
              y: [0, -200, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 360, 720]
            } : {}}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          >
            <div className={`w-3 h-3 ${i % 3 === 0 ? 'bg-purple-400' : i % 3 === 1 ? 'bg-pink-400' : 'bg-blue-400'} rounded-full blur-sm`} />
          </motion.div>
        ))}

        {/* Interactive Mouse Trail */}
        <motion.div
          className="absolute z-50 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg pointer-events-none"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div 
        className="container relative z-10 px-6 mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Revolutionary Header Section */}
        <motion.div 
          ref={titleRef}
          className="mb-20 text-center"
          variants={titleVariants}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
        >
          {/* Floating Icons Around Title */}
          <div className="inline-block relative">
            <motion.div
              className="absolute -top-16 -left-16"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Star className="w-8 h-8 text-yellow-400" />
            </motion.div>
            <motion.div
              className="absolute -right-12 -top-20"
              animate={{
                rotate: -360,
                scale: [1.2, 1, 1.2]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Sparkles className="w-10 h-10 text-purple-400" />
            </motion.div>
            <motion.div
              className="absolute -bottom-12 -left-20"
              animate={{
                rotate: 180,
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Crown className="w-12 h-12 text-yellow-500" />
            </motion.div>

            {/* Main Title with 3D Effect */}
            <motion.h1 
              className="text-8xl md:text-9xl lg:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 font-staff mb-8 leading-none"
              style={{
                textShadow: '0 0 100px rgba(168, 85, 247, 0.5)',
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
              }}
              animate={{
                backgroundPosition: ['0%', '100%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              תרומה
            </motion.h1>

            {/* Animated Underline */}
            <motion.div 
              className="mx-auto h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "300px" }}
              transition={{ duration: 2, delay: 1 }}
            />
          </div>

          <motion.p 
            className="mx-auto mt-12 max-w-5xl text-3xl font-light leading-relaxed text-gray-200 md:text-4xl"
            variants={itemVariants}
          >
            בואו נשנה עולמות יחד ונעזור למאות משפחות במצוקה
          </motion.p>

          {/* Enhanced Important Notice with Glass Effect */}
          <motion.div 
            className="relative p-8 mx-auto mt-16 max-w-6xl rounded-3xl border backdrop-blur-xl bg-white/10 border-white/20"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(168, 85, 247, 0.2)"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <motion.div 
                className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-2xl"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            
            <div className="flex justify-center items-center mb-6">
              <motion.div 
                className="flex justify-center items-center mr-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.5)",
                    "0 0 40px rgba(168, 85, 247, 0.8)",
                    "0 0 20px rgba(168, 85, 247, 0.5)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-2xl font-bold text-white">!</span>
              </motion.div>
              <h3 className="text-4xl font-bold text-white font-staff">הודעה חשובה</h3>
            </div>
            
            <p className="text-2xl font-semibold leading-relaxed text-gray-200 font-staff">
              אין חובה למלא את כל הפרטים - מספיקים רק שם ושם משפחה
            </p>
            
            {/* Floating Elements */}
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i}
                className={`absolute w-4 h-4 rounded-full ${
                  i % 3 === 0 ? 'bg-purple-400' : i % 3 === 1 ? 'bg-pink-400' : 'bg-blue-400'
                }`}
                style={{
                  top: `${20 + (i * 15)}%`,
                  left: `${10 + (i * 15)}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Revolutionary Donation Cards */}
        <motion.div 
          className="grid grid-cols-1 gap-12 mb-20 md:grid-cols-2 lg:grid-cols-3"
          variants={itemVariants}
        >
          {contributionOptions.map((option, index) => (
            <motion.div
              key={option.id}
              className="relative group perspective-1000"
              variants={cardVariants}
              whileHover="hover"
              onMouseEnter={() => setHoveredCard(option.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Container with Glass Effect */}
              <div className="relative p-1 bg-gradient-to-r rounded-3xl from-purple-500/50 via-pink-500/50 to-blue-500/50">
                <div className="p-10 h-full rounded-3xl border backdrop-blur-xl transform-gpu bg-white/10 border-white/20">
                  {/* Floating Amount Badge */}
                  <motion.div 
                    className="absolute -top-4 -right-4 px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
                  >
                    {option.amount}
                  </motion.div>

                  {/* Enhanced Icon with 3D Effect */}
                  <div className="mb-8 text-center">
                    <motion.div 
                      className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl ${option.iconBg} shadow-2xl mb-6`}
                      whileHover={{ 
                        scale: 1.3, 
                        rotate: 15,
                        boxShadow: "0 25px 50px rgba(0,0,0,0.25)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-white">
                      {option.icon}
                    </div>
                    </motion.div>

                    {/* Particle Explosion on Hover */}
                    <AnimatePresence>
                      {hoveredCard === option.id && (
                        <div className="absolute inset-0 pointer-events-none">
                          {option.particles.map((particle, i) => (
                            <motion.div
                              key={i}
                              className="absolute text-2xl"
                              style={{
                                left: `${50 + (Math.random() - 0.5) * 200}%`,
                                top: `${50 + (Math.random() - 0.5) * 200}%`,
                              }}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ 
                                scale: [0, 1.5, 0],
                                opacity: [0, 1, 0],
                                y: [0, -100],
                                rotate: [0, 360]
                              }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ 
                                duration: 2,
                                delay: i * 0.1,
                                ease: "easeOut"
                              }}
                            >
                              {particle}
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Enhanced Content */}
                  <div className="text-center">
                    <h3 className="mb-6 text-3xl font-bold leading-tight text-white font-staff">
                      {option.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-300 font-staff">
                      {option.description}
                    </p>
                  </div>

                  {/* Dynamic Hover Overlay */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 rounded-3xl`}
                    animate={{ opacity: hoveredCard === option.id ? 0.15 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Glowing Border Effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl border-2 border-transparent opacity-0"
                    animate={{ opacity: hoveredCard === option.id ? 0.6 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ 
                      background: 'linear-gradient(45deg, transparent, transparent) padding-box, linear-gradient(45deg, #a855f7, #ec4899, #3b82f6) border-box',
                    }}
                  />
                </div>
              </div>

              {/* Advanced Floating Elements */}
              <AnimatePresence>
              {hoveredCard === option.id && (
                  <motion.div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className={`absolute w-3 h-3 rounded-full ${
                          i % 3 === 0 ? 'bg-purple-400' : i % 3 === 1 ? 'bg-pink-400' : 'bg-blue-400'
                        }`}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: [0, 1, 0],
                          opacity: [0, 0.8, 0],
                          rotate: [0, 360]
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ 
                          duration: 1.5,
                          delay: i * 0.1,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Revolutionary CTA Button */}
        <motion.div 
          className="mb-20 text-center"
          variants={itemVariants}
        >
          <motion.button
            onClick={handleDonationClick}
            className="inline-flex overflow-hidden relative justify-center items-center px-16 py-8 text-3xl font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full shadow-2xl group font-staff"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 25px 50px rgba(168, 85, 247, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated Background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              animate={{ 
                backgroundPosition: ['0%', '100%'],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Button Content */}
            <div className="flex relative z-10 items-center">
              <motion.div
                className="mr-6"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-10 h-10" />
              </motion.div>
              <span>לחצו כאן לתרומה</span>
              <motion.div
                className="ml-6"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Zap className="w-10 h-10" />
              </motion.div>
            </div>

            {/* Advanced Particle System */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${20 + (i * 7)}%`,
                    top: `${20 + (i * 5)}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [0, -80, -160],
                    x: [0, Math.random() * 40 - 20],
                    scale: [0, 1.5, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut"
                  }}
                >
                  <div className="text-2xl">
                    {['💖', '✨', '🌟', '💫'][i % 4]}
                </div>
                </motion.div>
              ))}
            </div>
          </motion.button>

          <motion.p 
            className="mt-8 text-xl text-gray-300 font-staff"
            variants={itemVariants}
          >
            התרומה מתבצעת באתר מאובטח ובטוח עם הגנה מלאה על הפרטים
          </motion.p>
        </motion.div>

        {/* Final Decorative Section */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <motion.div 
            className="inline-block relative"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="text-9xl filter drop-shadow-2xl cursor-pointer"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
                filter: [
                  'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))',
                  'drop-shadow(0 0 40px rgba(236, 72, 153, 0.5))',
                  'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))',
                  'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))'
                ]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              🤲
            </motion.div>
          </motion.div>
          <motion.p 
            className="mt-8 text-3xl font-semibold text-gray-200 font-staff"
            variants={itemVariants}
          >
            תודה על תרומתכם החשובה והמשמעותית 🙏
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="flex fixed inset-0 z-50 justify-center items-center backdrop-blur-sm bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="p-12 mx-4 max-w-md text-center bg-gradient-to-br rounded-3xl border backdrop-blur-xl from-purple-900/90 to-pink-900/90 border-white/20"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              <motion.div
                className="mb-6 text-8xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💖
              </motion.div>
              <h3 className="mb-4 text-3xl font-bold text-white">תודה רבה!</h3>
              <p className="text-xl text-gray-200">מעביר אתכם לעמוד התרומה...</p>
              
              {/* Loading Animation */}
              <motion.div className="flex justify-center mt-6">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="mx-1 w-3 h-3 bg-pink-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(2deg); }
          50% { transform: translateY(-40px) rotate(0deg); }
          75% { transform: translateY(-20px) rotate(-2deg); }
        }

        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 30px rgba(168, 85, 247, 0.5);
          }
          50% { 
            box-shadow: 0 0 60px rgba(168, 85, 247, 0.8), 0 0 90px rgba(236, 72, 153, 0.6);
          }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes pulse3d {
          0%, 100% { 
            transform: scale3d(1, 1, 1);
            filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.3));
          }
          50% { 
            transform: scale3d(1.05, 1.05, 1.05);
            filter: drop-shadow(0 0 40px rgba(168, 85, 247, 0.6)) 
                    drop-shadow(0 0 60px rgba(236, 72, 153, 0.4));
          }
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .group:hover .group-hover\\:glow {
          animation: glow 3s ease-in-out infinite;
        }

        .group:hover .group-hover\\:float {
          animation: float 6s ease-in-out infinite;
        }

        .shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        /* Glass morphism effect */
        .glass {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        /* Advanced 3D Card Effect */
        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.320, 1);
        }

        .card-3d:hover {
          transform: rotateY(15deg) rotateX(10deg) translateZ(20px);
        }

        /* Holographic effect */
        .holographic {
          background: linear-gradient(
            45deg,
            #ff6b6b,
            #4ecdc4,
            #45b7d1,
            #96ceb4,
            #ffeaa7,
            #dda0dd,
            #98d8c8
          );
          background-size: 400% 400%;
          animation: holographic 8s ease infinite;
        }

        @keyframes holographic {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Particle trail effect */
        .particle-trail::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          animation: particleTrail 3s ease-out infinite;
        }

        @keyframes particleTrail {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2);
          }
        }

        /* Text gradient animation */
        .text-gradient {
          background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 6s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.section>
  );
};

export default Contribution;