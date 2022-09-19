import { useEffect, useState } from "react";
import Style from "./ScrollToTop.module.scss";
import { ImArrowUp } from "react-icons/im";


export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => { window.scrollTo({ top: 0,  behavior: "smooth" }) };

  useEffect(() => {
    const toggleVisibility = () => { setIsVisible(window.scrollY > 500) };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className={Style.container} onClick={scrollToTop}>
      {isVisible && (
        <div className={Style.icon}>
          <ImArrowUp fill={'#4cb3d4'} size={'20px'}/>
        </div>
      )}
    </div>
  );
}