import GLightbox from 'glightbox';
/**
     * Initiate portfolio lightbox 
     */
const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
});

//  Add an event listener for opening the lightbox and translating the content
portfolioLightbox.on('open', async () => {
    console.log('Lightbox deschis!');
    const lang2 = localStorage.getItem('language') || 'en';
    const langData2 = await fetchLanguageDataGLightbox(lang2);
    updateContentGLightbox(langData2);
});
async function fetchLanguageDataGLightbox(lang) {
    const response = await fetch(`lang/${lang}.json`);
    return response.json();
}
function updateContentGLightbox(langData) {
    if (Object.keys(langData).length > 0) {
        document.querySelectorAll('[data-tr]').forEach(element => {
            const key = element.getAttribute('data-tr');
            if (key && langData[key]) {
                element.innerHTML = langData[key]; // keep the links and tags
            }
        });
    } else {
        console.log("Obiectul este gol!");
    }



}