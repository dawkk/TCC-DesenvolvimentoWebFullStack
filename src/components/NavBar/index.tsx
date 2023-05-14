import { useEffect, useState } from "react";
import NavbarDesktop from "./NavbarDesktop";
import NavbarTablet from "./NavbarTablet";




const NavBar = () => {
  const [screenSize, setScreenSize] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let size = '';

      if (width >= 1201) {
        size = 'desktop';
      } else if (width <= 1200) {
        size = 'tablet';
      } else {
        size = 'mobile';
      }

      setScreenSize(size);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <>
    {screenSize === 'desktop' && <NavbarDesktop />}
    {screenSize === 'tablet' && <NavbarTablet />}
  {/*   {screenSize === 'mobile' && <NavbarMobile />} */}
  </>
  )
}

export default NavBar;
