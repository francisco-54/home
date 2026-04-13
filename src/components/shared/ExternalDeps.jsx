import { useEffect } from "react";
import "../../styles/global.css";

const LINKS = [
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
  "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap",
];

export default function ExternalDeps() {
  useEffect(() => {
    LINKS.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const el = document.createElement("link");
        el.rel = "stylesheet"; el.href = href;
        document.head.appendChild(el);
      }
    });
  }, []);
  return null;
}
