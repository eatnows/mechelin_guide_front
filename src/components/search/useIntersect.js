import { useState, useEffect, useCallback } from "react";

const useIntersect = (onIntersect, option) => {
  const [ref, setRef] = useState(null);
  const baseOption = {
    root: null,
    threshold: 1.0,
    rootMargin: "0",
  };
  const checkIntersect = useCallback(([entry], observer) => {
    if (entry.isIntersecting) {
      onIntersect(entry, observer);
    }
  }, []);
  useEffect(() => {
    let observer;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, {
        ...baseOption,
        ...option,
      });
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);
  return [ref, setRef];
};

export default useIntersect;
