const elUrlShortenerForm = document.querySelector('.js-url-shortener-form');
const elUrlShortenerResults = document.querySelector('.url-shortener__results');
const elUrlShortener = document.querySelector('.url-shortener');

if(elUrlShortenerForm) {
    elUrlShortenerForm.addEventListener('submit', function(evt) {
        evt.preventDefault();
    
        elUrlShortenerResults.classList.add('url-shortener__results--open')
    })
}

if (elUrlShortener) {
    elUrlShortener.addEventListener('click', function(evt) {

        if(evt.target.matches('.js-copy-short-url-button')) {
            // Copy text link
            navigator.clipboard.writeText(evt.target.previousElementSibling.textContent);
            
            // Change text button
            evt.target.textContent = 'Copied!';
            
            // Change bgcolor button
            evt.target.classList.add('url-shortener__copy-button--copied');

            // Reset text and class button after 1 second
            setTimeout(function() {
                evt.target.textContent = 'Copy';
                evt.target.classList.remove('url-shortener__copy-button--copied');
            }, 1000);
        };
    });
};