// Function to fetch language data
async function fetchLanguageData(lang) {
    const response = await fetch(`lang/${lang}.json`);
    return response.json();
}
// Function to set the language preference
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);

    // Save scroll position
    const scrollY = window.scrollY;
    localStorage.setItem('scrollPosition', scrollY);

    //location.reload();
}
// Function to update content based on selected language
function updateContent(langData) {
    if (Object.keys(langData).length > 0) {
        document.querySelectorAll('[data-tr]').forEach(element => {
            const key = element.getAttribute('data-tr');
            if (key && langData[key]) {
                element.innerHTML = langData[key]; // ✅ allows HTML (ex: <br>, <a>)
            }
        });

        document.querySelectorAll('[data-attr-tr]').forEach(element => {
            const key = element.getAttribute('data-attr-tr');
            if (key && langData[key]) {
                if (element.hasAttribute('data-typed-items')) {
                    element.setAttribute('data-typed-items', langData[key]);
                }
                if (element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', langData[key]);
                }
            }
        });
    } else {
        console.log("Obiectul este gol!");
    }
}


// Function to change language
// !!!to use in the HTML file, it must be declared with window
window.changeLanguage = function (lang) {
    //console.log('language selected', lang);
    setLanguagePreference(lang);

    const langData = fetchLanguageData(lang);
    updateContent(langData);


}
// Call updateContent() on page load
window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    //console.log('language2 selected', userPreferredLanguage);
    document.documentElement.setAttribute('lang', userPreferredLanguage);
    document.querySelector('[data-id= "' + userPreferredLanguage + '"]').classList.add('active');
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);

    setTimeout(() => {
        const savedPosition = localStorage.getItem("scrollPosition");
        if (savedPosition !== null) {
            window.scrollTo({
                top: parseInt(savedPosition),
                behavior: "smooth"
            });
        }
    }, 100); // Wait 100ms before repositioning

});
