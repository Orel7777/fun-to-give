'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean; // kept for backward compatibility; not used in this component
  children?: ReactNode;
  // When top of media crosses this viewport height fraction, start capture (e.g., 0.7 => 70% of viewport)
  activationTopVH?: number;
  // While top of media above this viewport height fraction, keep capture (e.g., 0.85)
  retentionTopVH?: number;
  // Sticky header height compensation in pixels
  headerOffsetPx?: number;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  children,
  activationTopVH = 0.7,
  retentionTopVH = 0.85,
  headerOffsetPx = 80,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Wait for video to be ready to play
  const ensureCanPlay = async (v: HTMLVideoElement): Promise<void> => {
    if (v.readyState >= 2) return; // HAVE_CURRENT_DATA
    await new Promise<void>((resolve) => {
      const onCanPlay = () => {
        v.removeEventListener('canplay', onCanPlay);
        resolve();
      };
      v.addEventListener('canplay', onCanPlay, { once: true });
      // safety timeout
      setTimeout(() => {
        v.removeEventListener('canplay', onCanPlay);
        resolve();
      }, 1500);
    });
  };

  // Try to play with audio enabled under a user gesture
  const playWithAudio = async (v: HTMLVideoElement): Promise<boolean> => {
    try {
      // Ensure ready
      if (v.readyState === 0) {
        try { v.load(); } catch {}
      }
      await ensureCanPlay(v);
      v.muted = false;
      v.volume = 1.0;
      await v.play();
      setIsMuted(false);
      setIsPlaying(true);
      return true;
    } catch {
      // NotAllowedError or other block
      return false;
    }
  };

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
    // Try to start muted autoplay on mount
    const v = videoRef.current;
    if (v) {
      try {
        v.muted = true;
        const p = v.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } catch {}
    }
  }, [mediaType]);

  useEffect(() => {
    // Media center helpers + hysteresis bands
    const getMediaCenter = () => {
      const el = mediaRef.current;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const mediaCenter = rect.top + rect.height / 2;
      return { mediaCenter, vh };
    };

    const inActivationBand = () => {
      const data = getMediaCenter();
      if (!data) return false;
      const { vh } = data;
      const el = mediaRef.current!;
      const rect = el.getBoundingClientRect();
      const headerOffset = headerOffsetPx; // px
      // Start when top of media reaches activationTopVH of viewport height (below center), with header offset
      const threshold = vh * activationTopVH + headerOffset;
      return rect.top <= threshold && rect.bottom >= vh * 0.2;
    };

    const inRetentionBand = () => {
      const data = getMediaCenter();
      if (!data) return false;
      const { vh } = data;
      const el = mediaRef.current!;
      const rect = el.getBoundingClientRect();
      const headerOffset = headerOffsetPx; // px
      // Keep capturing while media stays mostly on screen (top < retentionTopVH*vh and bottom > 10% vh)
      return rect.top <= vh * retentionTopVH + headerOffset && rect.bottom >= vh * 0.10;
    };

    const handleWheel = (e: WheelEvent) => {
      // Establish capture exactly when hitting the center zone
      let capturing = isCapturing;
      if (!capturing) {
        if (!inActivationBand()) return; // not yet in zone -> allow normal scroll
        setIsCapturing(true);
        capturing = true; // treat this event as capturing too
        // Try to ensure muted autoplay when capture starts
        const v = videoRef.current;
        if (v && v.paused) {
          try {
            v.muted = true;
            const p = v.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
          } catch {}
        }
      } else {
        // If left the retention zone and progress is at start, release
        if (!inRetentionBand() && scrollProgress <= 0) {
          setIsCapturing(false);
          return;
        }
      }

      if (mediaFullyExpanded) {
        if (e.deltaY < 0 && window.scrollY <= 5) {
          // collapse when scrolling up near top
          setMediaFullyExpanded(false);
          e.preventDefault();
        }
        // scrolling down when expanded -> let page scroll naturally
        return;
      }

      // Not expanded yet and capturing -> drive progress
      e.preventDefault();
      const scrollDelta = e.deltaY * 0.0009;
      const newProgress = Math.min(
        Math.max(scrollProgress + scrollDelta, 0),
        1
      );
      setScrollProgress(newProgress);

      if (newProgress >= 1) {
        setMediaFullyExpanded(true);
        setShowContent(true);
        setIsCapturing(false);
      } else if (newProgress < 0.75) {
        setShowContent(false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      let capturing = isCapturing;
      if (!capturing) {
        if (!inActivationBand()) return;
        setIsCapturing(true);
        capturing = true;
        // Try to ensure muted autoplay when capture starts
        const v = videoRef.current;
        if (v && v.paused) {
          try {
            v.muted = true;
            const p = v.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
          } catch {}
        }
      } else {
        if (!inRetentionBand() && scrollProgress <= 0) {
          setIsCapturing(false);
          return;
        }
      }

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded) {
        if (deltaY < -20 && window.scrollY <= 5) {
          setMediaFullyExpanded(false);
          e.preventDefault();
        }
        return; // allow normal scroll otherwise
      }

      e.preventDefault();
      // Increase sensitivity for mobile, especially when scrolling back
      const scrollFactor = deltaY < 0 ? 0.008 : 0.005; // Higher sensitivity for scrolling back
      const scrollDelta = deltaY * scrollFactor;
      const newProgress = Math.min(
        Math.max(scrollProgress + scrollDelta, 0),
        1
      );
      setScrollProgress(newProgress);

      if (newProgress >= 1) {
        setMediaFullyExpanded(true);
        setShowContent(true);
        setIsCapturing(false);
      } else if (newProgress < 0.75) {
        setShowContent(false);
      }

      setTouchStartY(touchY);
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener(
      'touchstart',
      handleTouchStart as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener(
      'touchmove',
      handleTouchMove as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener(
        'wheel',
        handleWheel as unknown as EventListener
      );
      window.removeEventListener(
        'touchstart',
        handleTouchStart as unknown as EventListener
      );

      window.removeEventListener(
        'touchmove',
        handleTouchMove as unknown as EventListener
      );
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY, isCapturing, activationTopVH, retentionTopVH, headerOffsetPx]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);
  // Keep gradients symmetric above and below the video
  const gradientHeight = isMobileState ? '14vh' : '16vh';

  // Title overlay removed; not splitting title into words

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          <motion.div
            className='absolute inset-0 z-0 h-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            {bgImageSrc.startsWith('/') ? (
              <Image
                src={bgImageSrc}
                alt='Background'
                width={1920}
                height={1080}
                className='w-screen h-screen'
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                priority
              />
            ) : (
              <div 
                className='w-screen h-screen'
                style={{
                  background: bgImageSrc.startsWith('gradient') 
                    ? bgImageSrc 
                    : `url(${bgImageSrc})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            )}
            <div className='absolute inset-0 bg-black/10' />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '92vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
                ref={mediaRef}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className='relative w-full h-full pointer-events-none'>
                      <iframe
                        width='100%'
                        height='100%'
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc +
                              (mediaSrc.includes('?') ? '&' : '?') +
                              'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                            : mediaSrc.replace('watch?v=', 'embed/') +
                              '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                              mediaSrc.split('v=')[1]
                        }
                        className='w-full h-full rounded-xl'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                      <div
                        className='absolute inset-0 z-10'
                        style={{ pointerEvents: 'none' }}
                      ></div>

                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div
                      className='relative w-full h-full pointer-events-auto rounded-xl overflow-visible'
                      style={{
                        padding: '6px',
                        background: 'linear-gradient(135deg, #98c5b1, #eb9c7d, #dac8b4)',
                        borderRadius: '0.75rem'
                      }}
                    >
                      {/* Top gradient positioned ABOVE the video box (outside) - full page width, blurred */}
                      <div
                        aria-hidden
                        className='pointer-events-none absolute blur-lg'
                        style={{
                          bottom: '100%',
                          height: gradientHeight,
                          width: '100vw',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          zIndex: 5,
                          background: 'linear-gradient(180deg, #98c5b1 0%, rgba(152,197,177,0) 80%)',
                        }}
                      />
                      <video
                        ref={videoRef}
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted={isMuted}
                        loop
                        playsInline
                        preload='auto'
                        className='w-full h-full object-cover lg:object-contain rounded-xl'
                        onClick={async (e) => {
                          e.stopPropagation();
                          const v = videoRef.current;
                          if (!v) return;
                          if (isPlaying) {
                            if (isMuted) {
                              try { v.muted = false; setIsMuted(false); await ensureCanPlay(v); await v.play(); } catch {}
                            } else {
                              try { v.muted = true; setIsMuted(true); } catch {}
                            }
                          }
                        }}
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      {/* overlay gradient */}
                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl pointer-events-none'
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                      {/* Lusion-style big text overlay when not playing - split words with center gap for button */}
                      {!isPlaying && (
                        <div className='absolute inset-0 z-40 flex items-center justify-center pointer-events-none'>
                          <div className='flex items-center justify-center gap-6'>
                            <span className='[color:#dac8b4] font-bold uppercase tracking-widest text-5xl md:text-7xl lg:text-8xl select-none'>
                              REEL
                            </span>
                            {/* Spacer width equal to play button to keep words on sides */}
                            <div className='w-14 h-14' />
                            <span className='[color:#dac8b4] font-bold uppercase tracking-widest text-5xl md:text-7xl lg:text-8xl select-none'>
                              PLAY
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Controls overlay */}
                      <div
                        className='absolute inset-0 flex items-center justify-center z-50 gap-4 pointer-events-auto'
                        onClick={async (e) => {
                          // Clicking anywhere on the overlay when playing -> mute audio (keep playing)
                          e.stopPropagation();
                          const v = videoRef.current;
                          if (!v) return;
                          if (isPlaying) {
                            if (isMuted) {
                              try { v.muted = false; setIsMuted(false); await ensureCanPlay(v); await v.play(); } catch {}
                            } else {
                              try { v.muted = true; setIsMuted(true); } catch {}
                            }
                          }
                        }}
                      >
                        {!isPlaying && (
                          <button
                            aria-label='Play'
                            onPointerDown={(e) => { e.stopPropagation(); }}
                            onClick={async (e) => {
                              e.stopPropagation();
                              const v = videoRef.current;
                              if (!v) return;
                              // First try with audio (user gesture)
                              const ok = await playWithAudio(v);
                              if (!ok) {
                                // Fallback to muted playback, show Unmute button for user
                                try {
                                  v.muted = true;
                                  setIsMuted(true);
                                  await ensureCanPlay(v);
                                  await v.play();
                                  setIsPlaying(true);
                                } catch {}
                              }
                            }}
                            className='w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition pointer-events-auto z-[60]'
                            style={{ backgroundColor: '#eb9c7d' }}
                            onMouseEnter={(e) => { const el=e.currentTarget as HTMLButtonElement; el.style.transform='scale(1.07)'; el.style.backgroundColor='#98c5b1'; }}
                            onMouseLeave={(e) => { const el=e.currentTarget as HTMLButtonElement; el.style.transform='scale(1)'; el.style.backgroundColor='#eb9c7d'; }}
                            onMouseDown={(e) => { const el=e.currentTarget as HTMLButtonElement; el.style.transform='scale(0.95)'; el.style.backgroundColor='#98c5b1'; }}
                            onMouseUp={(e) => { const el=e.currentTarget as HTMLButtonElement; el.style.transform='scale(1.03)'; el.style.backgroundColor='#98c5b1'; }}
                          >
                            {/* Play icon */}
                            <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor' className='text-white'>
                              <path d='M8 5v14l11-7z' />
                            </svg>
                          </button>
                        )}

                        {isPlaying && isMuted && (
                          <button
                            aria-label='Unmute'
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={async (e) => {
                              e.stopPropagation();
                              const v = videoRef.current;
                              if (!v) return;
                              try {
                                v.muted = false;
                                setIsMuted(false);
                                await ensureCanPlay(v);
                                await v.play();
                              } catch {}
                            }}
                            className='w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition pointer-events-auto z-[60]'
                            style={{ backgroundColor: '#eb9c7d' }}
                            onMouseEnter={(e) => { const el=e.currentTarget as HTMLButtonElement; el.style.transform='scale(1.07)'; el.style.backgroundColor='#98c5b1'; }}
                            onMouseLeave={(e) => { const el=e.currentTarget as HTMLButtonElement; el.style.transform='scale(1)'; el.style.backgroundColor='#eb9c7d'; }}
                            onMouseDown={(e) => { const el=e.currentTarget as HTMLButtonElement; el.style.transform='scale(0.95)'; el.style.backgroundColor='#98c5b1'; }}
                            onMouseUp={(e) => { const el=e.currentTarget as HTMLButtonElement; el.style.transform='scale(1.03)'; el.style.backgroundColor='#98c5b1'; }}
                          >
                            {/* Speaker icon */}
                            <svg width='22' height='22' viewBox='0 0 24 24' fill='currentColor' className='text-white'>
                              <path d='M3 10v4h4l5 5V5L7 10H3z'></path>
                              <path d='M16 7c1.5 1.5 1.5 8.5 0 10' fill='none' stroke='currentColor' strokeWidth='2' />
                              <path d='M19 4c3 3 3 14 0 17' fill='none' stroke='currentColor' strokeWidth='2' />
                            </svg>
                          </button>
                        )}

                        {/* Stop button removed per request */
                        }

                        {/* Bottom gradient positioned BELOW the video box (outside) - full page width, blurred */}
                        <div
                          aria-hidden
                          className='pointer-events-none absolute blur-lg'
                          style={{
                            top: '100%',
                            height: gradientHeight,
                            width: '100vw',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 5,
                            background: 'linear-gradient(0deg, #eb9c7d 0%, rgba(235,156,125,0) 80%)',
                          }}
                        />
                      </div>
                    </div>
                  )
                ) : (
                  <div className='relative w-full h-full'>
                    <Image
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      width={1280}
                      height={720}
                      className='w-full h-full object-cover rounded-xl'
                    />

                    <motion.div
                      className='absolute inset-0 bg-black/50 rounded-xl'
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                {(date || scrollToExpand) && (
                  <div className='flex flex-col items-center text-center relative z-10 mt-4 transition-none pointer-events-none'>
                    {date && (
                      <p
                        className='text-2xl text-blue-200'
                        style={{ transform: `translateX(-${textTranslateX}vw)` }}
                      >
                        {date}
                      </p>
                    )}
                    {scrollToExpand && (
                      <p
                        className='text-blue-200 font-medium text-center'
                        style={{ transform: `translateX(${textTranslateX}vw)` }}
                      >
                        {scrollToExpand}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Title overlay removed per request */}
            </div>

            <motion.section
              className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;