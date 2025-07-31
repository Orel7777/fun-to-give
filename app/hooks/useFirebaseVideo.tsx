import { useState, useEffect } from 'react';
import { storage } from '../lib/firebase.config';
import { ref, getDownloadURL } from 'firebase/storage';

export const useFirebaseVideo = (videoPath: string) => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getVideoUrl = async () => {
      try {
        setLoading(true);
        console.log('🔥 טוען וידאו מ-Firebase Storage:', videoPath);
        
        const videoRef = ref(storage, videoPath);
        const url = await getDownloadURL(videoRef);
        
        console.log('✅ וידאו נטען בהצלחה מ-Firebase Storage:', url);
        setVideoUrl(url);
        setError(null);
      } catch (err) {
        console.error('Error getting video URL from Firebase Storage:', err);
        const errorMessage = err instanceof Error ? err.message : 'שגיאה לא ידועה';
        setError(`לא ניתן לטעון וידאו מ-Firebase Storage: ${errorMessage}`);
        // הוידאו נטען רק מ-Firebase Storage
        setVideoUrl('');
      } finally {
        setLoading(false);
      }
    };

    if (videoPath) {
      getVideoUrl();
    }
  }, [videoPath]);

  return { videoUrl, loading, error };
};