let CACHE_VERSIONS = {
    'css': 1,
    'fonts': 2,
    'img': 1,
    'js': 1,
    'search': 0,
    'students': 1,
    'html': 1
};

let CURRENT_CACHES = {};

let addrs = {
    css: ['css/index.css'],
    fonts: ['fonts/Bangers-Regular.ttf', 'fonts/CutiveMono-Regular.ttf', 'fonts/DancingScript-VariableFont_wght.ttf', 'fonts/RobotoMono-Regular.ttf', 'fonts/Satisfy-Regular.ttf'],
    img: ['public/img/back_to_top2.png', 'public/img/profile_blank.png', 'public/img/male.png', 'public/img/female.png', 'public/img/kyi_logo_2.png'],
    js: ['js/element-listeners.js', 'js/elements.js', 'js/global-listeners.js', 'js/globals.js', 'js/results-ul.js', 'js/search.js', 'js/utils.js'],
    search: [],
    students: [],
    html: ['index.html']
};

let props = Object.keys(CACHE_VERSIONS);
props.forEach(val => {
    CURRENT_CACHES[val] = `${val}-v${CACHE_VERSIONS[val]}`;
});
self.addEventListener('install', (event) => {
    event.waitUntil(
        props.forEach(prop => {
            caches
                .open(CURRENT_CACHES[prop])
                .then(cache => {
                    addrs[prop].forEach(addr => {
                        cache.add(addr);
                    });
                })
                .catch(e => console.log("Cache not created. Why?", e))
        })
    );
});

self.addEventListener('fetch', function (event) {
    let preTypes = [/\/students\//, /\/js\//, /\/css\//, /\/img\//, /\/fonts\//, /\/search/];

    let index = preTypes.findIndex(preType => {
        if (event.request.url.match(preType))
            return true;
        else return false;
    });

    let prop = 'css';

    if (index !== -1)
        prop = event.request.url.match(preTypes[index])[0].replace(/\//g, "");
    else prop = 'html'

    event.respondWith(
        caches.open(CURRENT_CACHES[prop]).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request.clone()).then(function (response) {
                    if (response.status < 400 &&
                        response.url &&
                        response.url.match(new RegExp(prop, 'i'))) {
                        cache.put(event.request, response.clone());
                    }
                    return response;
                }).catch(e =>  console.log("Why not?", e));
            }).catch(function (error) {
                throw error;
            });
        })
    );
});