const modifiers = {
    sitenavTogglerActive: "site-header__sitenav-toggler--active",
    siteHeaderActive: "site-header--active"
}

const elUrlShortenerForm = document.querySelector('.js-url-shortener-form');
const elUrlShortenerResults = document.querySelector('.url-shortener__results');
const elUrlShortener = document.querySelector('.url-shortener');
const elSiteHeader = document.querySelector('.site-header');
const elSitenavToggler = elSiteHeader.querySelector('.site-header__sitenav-toggler');

let urlList = JSON.parse(localStorage.getItem("urlList")) || [];

if (elSitenavToggler) {
    elSitenavToggler.addEventListener('click', function () {
        elSitenavToggler.classList.toggle(modifiers.sitenavTogglerActive);
        elSiteHeader.classList.toggle(modifiers.siteHeaderActive);
    })
}

if(elUrlShortenerForm) {
    elUrlShortenerForm.addEventListener('submit', function(evt) {
        evt.preventDefault();
        
        const formData = new FormData(evt.target)
        const {url} = Object.fromEntries(formData.entries());
        urlList.unshift({url, shortUrl: 'https://rel.ink/k4lKyk'});
        evt.target.reset();
        if(urlList.length > 3) {
            urlList.pop()
        }
        elUrlShortenerResults.replaceChildren(...renderResultUrl(urlList))
        localStorage.setItem("urlList", JSON.stringify(urlList))
        elUrlShortenerResults.classList.add('url-shortener__results--open')
        setTimeout(() => {
            elUrlShortenerResults.classList.remove('url-shortener__results--open')
        }, 6000);
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

function renderResultUrl(urlList) {
    return urlList.map(({url, shortUrl}) => {
        const div = document.createElement('div')
        div.classList.add('url-shortener__result')
        div.innerHTML = `
        <div class="url-shortener__original-link">${url}</div>
        <a class="url-shortener__short-link" href="#" target="_blank">${shortUrl}</a>
        <button class="url-shortener__copy-button button button--small button--square-small button--green js-copy-short-url-button" type="button">Copy</button>
        `
        return div;
    })
}