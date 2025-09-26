console.log('hallo');


/*
=======================
Button Function
=======================
*/
document.getElementById('pflege-btn').addEventListener('click', function () {
    window.location.hash = 'pflege-section';
});

document.getElementById('pflege-btn2').addEventListener('click', function () {
    window.location.hash = 'pflege-section';
});

//mail button
document.getElementById('mailbtn').addEventListener('click', function () {
    window.location.href = 'mailto:rooted@mail.de?subjecti=Anfrage&body=Hello';
});



/*
=======================
Hero Section Backgorund Switch
=======================
*/
/* backgroundbilder sind nicht animier bar deshalb erzeugen wir pro bild ein 
div.bg-layer (css) und animieren die Opacity */

document.addEventListener('DOMContentLoaded', () => {
    let hero = document.getElementById('hero');
    // array für die Bilder
    let images = [
        'assets/img/back/Rooted_UrbanGarden/assets/img/Back/feey-JsMvb2JtOmI-unsplash.jpg',
        'assets/img/back/back02.jpg',
        'assets/img/back/back03.jpg',
        'assets/img/back/back04.jpg'
    ]


    let INTERVAL_MS = 5000; //Zeit zwischen wechsel
    let TRANSITION_MS = 1200; //muss zur CSS transition passen
    let current = 0;
    let timer = null;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // nur erstes Bild zeigen, kein Autoplay
        const layer = document.createElement('div'); //div für die weitern bilder wird erzeugt
        layer.className = 'bg-layer show';
        layer.style.backgroundImage = `url(${images[0]})`;
        hero.prepend(layer);
        return;
    }

    // 2) Bilder vorladen (verhindert Flackern)- preload
    function preloadImages(urls) {
        return Promise.all(urls.map(url => new Promise(res => {
            const i = new Image();
            i.src = url;
            i.onload = res;
            i.onerror = res; // bei Fehler trotzdem weiter
        })));
    }

    // 3) ein Bild anzeigen (legt neuen bg-layer an und faded ihn ein)
    function showImage(index) {
        const url = images[index];
        const layer = document.createElement('div');
        layer.className = 'bg-layer';
        layer.style.backgroundImage = `url(${url})`;
        // neuen Layer vorne rein, damit er über alten liegt (aber unter .hero-content weil z-index 0)
        hero.prepend(layer);

        // force layout + class hinzufügen damit transition greift
        requestAnimationFrame(() => {
            layer.classList.add('show');
        });

        // ältere Layer nach dem Fade entfernen (aufgeräumt)
        setTimeout(() => {
            const layers = hero.querySelectorAll('.bg-layer');
            layers.forEach(l => {
                if (l !== layer) l.remove();
            });
        }, TRANSITION_MS + 100);
    }

    // 4) nächste Folie
    function nextImage() {
        current = (current + 1) % images.length;
        showImage(current);
    }

    // 5) Slideshow starten
    function startSlideshow() {
        // einmal initial anzeigen
        showImage(current);
        // Timer starten
        timer = setInterval(nextImage, INTERVAL_MS);
    }

    // 6) Pause on hover (optional, aber nett UX)
    hero.addEventListener('mouseenter', () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    });
    hero.addEventListener('mouseleave', () => {
        if (!timer) timer = setInterval(nextImage, INTERVAL_MS);
    });

    // 7) preload und starten
    preloadImages(images).then(startSlideshow);
});



/*
=======================
Hamburger Menü
=======================
*/

// =========== variablen definieren ==========
let mobileMenuBtn = document.querySelector('.mobilemenu');
let mainnavi = document.querySelector('.mainnavi');
let navLinks = document.querySelector('mainnavi a'); // alle links im menü

// ====== Klick auf Burger oder x ===== 
mobileMenuBtn.addEventListener('click', () => {
    //1. Menü ein oder aus blenden
    mainnavi.classList.toggle('mainnavi-expanded'); // classe aus CSS

    //2. Burger/x umschalten
    mobileMenuBtn.classList.toggle('menu-open');
});


// klick auf einen Menüpunkt
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        //Menü wieder schließen
        mainnavi.classList.toggle('mainnavi-expanded');
        mobileMenuBtn.classList.remove('menu-open');

    });
});



/*
=======================
Intro Scroll zoom bild 
=======================
*/

