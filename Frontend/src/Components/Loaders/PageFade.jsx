import { useEffect, useState } from "react";

export default function PageFade({ children }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className={`pagefade ${show ? "pagefade-in" : ""}`}>
      {children}
    </div>
  );
}