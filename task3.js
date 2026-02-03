// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function PortfolioPage() {
//     const [language, setLanguage] = useState("en");
//     const [content, setContent] = useState({
//         en: {
//             portfolio: "Portfolio",
//             about: "About",
//             description:
//                 "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis ut dignissimos.",
//             download: "Download",
//         },
//         ar: {},
//     });

//     const translateText = async (text, targetLang) => {
//         const res = await axios.post("https://libretranslate.com/translate", {
//             q: text,
//             source: "en",
//             target: targetLang,
//             format: "text",
//         });
//         return res.data.translatedText;
//     };

//     useEffect(() => {
//         const fetchTranslations = async () => {
//             const translations = {};
//             for (const [key, value] of Object.entries(content.en)) {
//                 translations[key] = await translateText(value, "ar");
//             }
//             setContent((prevContent) => ({ ...prevContent, ar: translations }));
//         };

//         fetchTranslations();
//     }, []);

//     const currentContent = content[language];

//     return (
//         <div>
//             <header>
//                 <h1>Bootstrap</h1>
//                 <nav>
//                     <button onClick={() => setLanguage("en")}>English</button>
//                     <button onClick={() => setLanguage("ar")}>العربية</button>
//                 </nav>
//             </header>
//             <main>
//                 <section>
//                     <h2>{currentContent.portfolio}</h2>
//                     {/* الصور هنا */}
//                 </section>
//                 <section>
//                     <h2>{currentContent.about}</h2>
//                     <p>{currentContent.description}</p>
//                     <button>{currentContent.download}</button>
//                 </section>
//             </main>
//         </div>
//     );
// }

// export default PortfolioPage;


// Define content in English as default
const content = {
    en: {
      title: "Portfolio",
    //   portfolioTitle: "Portfolio",
    //   portfolioDescription: "A collection of beautiful projects.",
      aboutTitle: "About",
      aboutDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      downloadButton: "Download",
    },
    ar: {}, // Arabic content will be filled dynamically
  };

  // Function to call LibreTranslate API
  async function translateText(text, targetLang) {
    const response = await axios.post("https://libretranslate.com/translate", {
      q: text,
      source: "en",
      target: targetLang,
      format: "text",
    });
    return response.data.translatedText;
  }

  // Translate all content to Arabic (if not already translated)
  async function fetchArabicTranslations() {
    if (!content.ar.title) {
      for (const [key, value] of Object.entries(content.en)) {
        content.ar[key] = await translateText(value, "ar");
      }
    }
  }

  // Function to change language
  async function changeLanguage(lang) {
    if (lang === "ar") {
      // Fetch Arabic translations if they don't exist
      await fetchArabicTranslations();
    }
    // Update the page content dynamically
    document.getElementById("title").textContent = content[lang].title;
    document.getElementById("portfolio-title").textContent = content[lang].portfolioTitle;
    document.getElementById("portfolio-description").textContent = content[lang].portfolioDescription;
    document.getElementById("about-title").textContent = content[lang].aboutTitle;
    document.getElementById("about-description").textContent = content[lang].aboutDescription;
    document.getElementById("download-button").textContent = content[lang].downloadButton;
  }