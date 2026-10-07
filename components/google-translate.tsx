
"use client";

import { Languages } from "lucide-react";
import { useEffect, useId } from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
          },
          elementId: string,
        ) => void;
      };
    };
  }
}

let translateScriptLoaded = false;

export function GoogleTranslate() {
  const reactId = useId();
  const elementId = `google-translate-${reactId.replace(/:/g, "")}`;

  useEffect(() => {
    const initializeTranslate = () => {
      const TranslateElement = window.google?.translate?.TranslateElement;
      if (!TranslateElement) return;

      document
        .querySelectorAll<HTMLElement>(".google-translate-element")
        .forEach((element) => {
          if (element.dataset.initialized === "true") return;

          new TranslateElement(
            {
              pageLanguage: "bn",
              includedLanguages: "bn,en",
              autoDisplay: false,
            },
            element.id,
          );

          element.dataset.initialized = "true";
        });
    };

    window.googleTranslateElementInit = initializeTranslate;

    if (!translateScriptLoaded) {
      const existingScript = document.getElementById(
        "google-translate-script",
      );

      if (!existingScript) {
        const script = document.createElement("script");

        script.id = "google-translate-script";
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;

        document.body.appendChild(script);
      }

      translateScriptLoaded = true;
    } else {
      initializeTranslate();
    }

    // Google script can finish loading after this component mounts.
    const timer = window.setTimeout(initializeTranslate, 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="google-translate">
      <div
        className="
          relative flex h-9 items-center
          rounded-xl
          border border-slate-200/80
          bg-white/70
          shadow-sm
          backdrop-blur-md
          transition-all duration-200
          hover:border-emerald-300
          hover:bg-emerald-50/70
          hover:shadow-emerald-500/10
          dark:border-white/10
          dark:bg-white/[0.04]
          dark:hover:border-emerald-500/40
          dark:hover:bg-emerald-500/10
        "
      >
        {/* Language Icon */}
        <Languages
          className="
            pointer-events-none
            absolute left-2.5
            z-10
            size-4
            text-emerald-600
            dark:text-emerald-400
          "
          strokeWidth={2}
        />

        {/* Google Translate */}
        <div
          id={elementId}
          className="google-translate-element"
        />
      </div>
    </div>
  );
}

