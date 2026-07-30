/**
 * Bilingual content controller.
 * Copy lives in the HTML data-es/data-en attributes to keep one source of truth.
 */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("language-toggle");
  const indicator = document.getElementById("current-language");

  if (!toggle || !indicator) return;

  const supportedLanguages = new Set(["es", "en"]);
  const browserLanguage = (navigator.language || "es").toLowerCase();
  const storedLanguage = localStorage.getItem("preferredLanguage");
  let currentLanguage = supportedLanguages.has(storedLanguage)
    ? storedLanguage
    : browserLanguage.startsWith("es") ? "es" : "en";

  function translateAttributes(language) {
    document.querySelectorAll(`[data-${language}]`).forEach((element) => {
      element.textContent = element.dataset[language];
    });

    document.querySelectorAll(`[data-${language}-placeholder]`).forEach((element) => {
      element.placeholder = element.dataset[`${language}Placeholder`];
    });

    document.querySelectorAll(`[data-${language}-aria-label]`).forEach((element) => {
      element.setAttribute("aria-label", element.dataset[`${language}AriaLabel`]);
    });

    document.querySelectorAll(`[data-${language}-alt]`).forEach((element) => {
      element.alt = element.dataset[`${language}Alt`];
    });

    document.querySelectorAll(`[data-${language}-content]`).forEach((element) => {
      element.setAttribute("content", element.dataset[`${language}Content`]);
    });
  }

  function applyLanguage(language, persist = true) {
    currentLanguage = supportedLanguages.has(language) ? language : "es";
    document.documentElement.lang = currentLanguage;
    translateAttributes(currentLanguage);
    indicator.textContent = currentLanguage.toUpperCase();

    if (persist) localStorage.setItem("preferredLanguage", currentLanguage);

    document.dispatchEvent(new CustomEvent("languageChanged", {
      detail: { language: currentLanguage }
    }));
  }

  toggle.addEventListener("click", () => {
    applyLanguage(currentLanguage === "es" ? "en" : "es");
  });

  applyLanguage(currentLanguage, false);
});
