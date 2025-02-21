"use client";

import { useEffect, useRef } from "react";

export default function Comment() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scriptElem = document.createElement("script");
    scriptElem.src = "https://giscus.app/client.js";
    scriptElem.async = true;
    scriptElem.crossOrigin = "anonymous";

    scriptElem.setAttribute("data-repo", "wdvsh/wdvsh.github.io");
    scriptElem.setAttribute("data-repo-id", "R_kgDONrv8GA");
    scriptElem.setAttribute("data-category", "Blog Comments");
    scriptElem.setAttribute("data-category-id", "DIC_kwDONrv8GM4CmJ5D");
    scriptElem.setAttribute("data-mapping", "pathname");
    scriptElem.setAttribute("data-strict", "1");
    scriptElem.setAttribute("data-reactions-enabled", "1");
    scriptElem.setAttribute("data-emit-metadata", "0");
    scriptElem.setAttribute("data-input-position", "top");
    scriptElem.setAttribute("data-theme", "light");
    scriptElem.setAttribute("data-lang", "en");

    ref.current?.appendChild(scriptElem);
  }, []);

  return <section ref={ref} className="pt-24" />;
}
