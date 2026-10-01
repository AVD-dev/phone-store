import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function ScrollTop() {
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const main = document.querySelector(".app__main");

    const previousPath = previousPathname.current;

    const previousBasePath = previousPath.split("/")[1];
    const currentBasePath = pathname.split("/")[1];

    const isSameRoute = previousBasePath === currentBasePath;

    main?.scrollTo({
      top: 0,
      left: 0,
      behavior: isSameRoute ? "smooth" : "instant",
    });

    previousPathname.current = pathname;
  }, [pathname]);

  return null;
}
