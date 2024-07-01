import { useState, useEffect } from 'react';

// Interface for optional scroll behavior customization
interface ScrollToTopProps {
  behavior?: 'smooth' | 'auto'; 
}

const useScrollToTop = (props?: ScrollToTopProps) => {
  const [shouldScrollToTop, setShouldScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset; 
      setShouldScrollToTop(scrollY > 100); 
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const behavior = props?.behavior || 'smooth'; 
    window.scrollTo({ top: 0, behavior });
  };

  return { shouldScrollToTop, scrollToTop };
};

export default useScrollToTop;
