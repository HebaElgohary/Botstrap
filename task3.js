const content = {
  en: {
    title: "Portfolio",
    aboutTitle: "About",
    aboutDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    downloadButton: "Download",
  },
  ar: {},
};

let currentLang = "en";

// LibreTranslate API
async function translateText(text, targetLang) {
  try {
    const response = await axios.post("https://libretranslate.com/translate", {
      q: text,
      source: "en",
      target: targetLang,
      format: "text",
    });
    return response.data.translatedText;
  } catch (error) {
    console.error("Translation failed:", error);
    return text; // fallback
  }
}

// Translate once and cache
async function fetchArabicTranslations() {
  if (Object.keys(content.ar).length > 0) return;

  for (const key in content.en) {
    content.ar[key] = await translateText(content.en[key], "ar");
  }
}

// Update DOM safely
function updateText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Change language
async function changeLanguage(lang) {
  if (lang === "ar") {
    await fetchArabicTranslations();
    document.body.style.direction = "rtl";
    document.body.style.textAlign = "right";
  } else {
    document.body.style.direction = "ltr";
    document.body.style.textAlign = "left";
  }

  currentLang = lang;
  const data = content[lang];

  updateText("title", data.title);
  updateText("about-title", data.aboutTitle);
  updateText("about-description", data.aboutDescription);
  updateText("download-button", data.downloadButton);
}
