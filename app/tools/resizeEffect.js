// useResizeEffect.js
import { useState, useEffect } from 'react';

const useResizeEffect = (callback, initialWidth = window.innerWidth) => {
  const [width, setWidth] = useState(initialWidth);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      if (callback) {
        callback(newWidth);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [callback]);

  return width;
};

export default useResizeEffect;
