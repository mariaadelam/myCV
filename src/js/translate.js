// Function to fetch language data
async function fetchLanguageData(lang) {
    const response = await fetch(`lang/${lang}.json`); 
    return response.json();
}

// Function to set the language preference
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    //location.reload();
}

// Function to update content based on selected language
function updateContent(langData) {
    document.querySelectorAll('[data-tr]').forEach(element => {
        const key = element.getAttribute('data-tr');
        element.textContent = langData[key];
    });
    document.querySelectorAll('[data-typed-tr]').forEach(element => {
        const key = element.getAttribute('data-typed-tr');
        element.setAttribute('data-typed-items', langData[key]);
    });
}

// Function to change language
// !!!To make it accessible in the HTML file, we declare it with window
window.changeLanguage = function (lang) {
    console.log('chosen language', lang);
    setLanguagePreference(lang);

    const langData = fetchLanguageData(lang);
    updateContent(langData);
}

// Call updateContent() on page load
window.addEventListener('DOMContentLoaded', async () => { //async because we need to wait for the fetchLanguageData to complete before updating the content
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    console.log('chosen language2', userPreferredLanguage);
    document.documentElement.setAttribute('lang', userPreferredLanguage);
    document.querySelector('[data-id= "' + userPreferredLanguage + '"]').classList.add('active');
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);

});

