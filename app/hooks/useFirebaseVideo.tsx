import { useState, useEffect } from 'react';
import { storage } from '../lib/firebase.config';
import { ref, getDownloadURL } from 'firebase/storage';
import { useVideo } from '../contexts/VideoContext';

export const useFirebaseVideo = (videoPath: string) => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { mainVideo, videos } = useVideo();

  useEffect(() => {
    let cancelled = false;

    const resolveFromPreloadOrFetch = async () => {
      try {
        setLoading(true);

        // 1) בדוק אם נטען מראש ב-VideoContext
        // התאמה לוידאו הראשי
        if (mainVideo.isReady && videoPath === videoPath) {
          // אם ה-mainVideo שייך לנתיב הזה, נשתמש בו. אין לנו את ה-path של mainVideo, לכן נבדוק גם במפה.
        }

        const preloaded = videos[videoPath];
        if (preloaded?.isReady && preloaded.videoUrl) {
          console.log('🔗 משתמש ב-blob שנטען מראש מתוך VideoContext:', videoPath);
          if (!cancelled) {
            setVideoUrl(preloaded.videoUrl);
            setError(null);
            setLoading(false);
          }
          return;
        }

        // 2) אם לא נטען מראש, שלוף מ-Firebase
        console.log('🔥 טוען וידאו מ-Firebase Storage:', videoPath);
        const videoRef = ref(storage, videoPath);
        const url = await getDownloadURL(videoRef);
        console.log('✅ וידאו נטען בהצלחה מ-Firebase Storage:', url);
        if (!cancelled) {
          setVideoUrl(url);
          setError(null);
        }
      } catch (err) {
        console.error('Error getting video URL from Firebase Storage:', err);
        const errorMessage = err instanceof Error ? err.message : 'שגיאה לא ידועה';
        if (!cancelled) {
          setError(`לא ניתן לטעון וידאו מ-Firebase Storage: ${errorMessage}`);
          setVideoUrl('');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (videoPath) {
      resolveFromPreloadOrFetch();
    }

    return () => {
      cancelled = true;
    };
  }, [videoPath, videos, mainVideo.isReady]);

  return { videoUrl, loading, error };
};