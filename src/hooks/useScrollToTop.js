import { useEffect } from "react";

const useScrollToTop = (dependency) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.querySelector(".main-content")?.scrollTo(0, 0);
  }, [dependency]); // Dependency array - pass in your activeSection or route
};

export default useScrollToTop;
