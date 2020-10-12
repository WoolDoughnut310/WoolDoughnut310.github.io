var page_facts = {
    DEFAULT: [
        "Looks like there aren't any facts for this page"
    ],
    "Rationing": [
        "Poland also had food rationing that took place after WW1."
    ],
    "The Battle of the Somme": [
        "The Battle of the Somme was also known as the Somme Offensive.",
        "Troops on both sides of the battle were living in squalied, extreme conditions.",
        "In total there were over a million casualties.",
        `Many of the shells thrown by the Allied forces in the preliminary battle were duds
        and failed to explode or went off but missed the target completely`,
        "The furthest advance of any allied force during the battle was just 5 miles.",
        `The average British fighter carried at least 30kg of equipment with him while
        going over the trenches in the initial phases of the battle`,
        `The British War Office made a film "The Battle of the Somme" and was released by 10
        August 2016, it was watched by 20 million people - nearly half of the British population`
    ]
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.site-view-button').forEach(element => {
        element.addEventListener('click', () => load_site());  
    })

    document.querySelectorAll('.home-view-button').forEach(element => {
        element.addEventListener('click', () => load_home());  
    })

    $(function() {
        document.querySelectorAll('#site-home .row .col').forEach(element => {
            let image = element.querySelector('img');
            let overlay = element.querySelector('span');
    
            overlay.classList.add('has-pointer');
            overlay.style.width = image.offsetWidth + "px";
            overlay.style.height = image.offsetHeight + "px";
            overlay.dataset.name = image.alt;
            overlay.innerText = overlay.dataset.name;
            overlay.style.display = 'none';

            image.onmouseover = () => {
                overlay.style.removeProperty('display');
                overlay.style.border = "10px solid #007bff";
            }

            overlay.onmouseleave = () => {
                overlay.style.display = 'none';
                overlay.style.removeProperty('border');
            }

            overlay.onclick = () => {
                load_content(overlay.dataset.name)
            }
        })
    })

    document.onclick = event => {
        if (event.target.classList.contains('nav-link')) {
            if (event.target.parentElement.classList.contains('nav-item')) {
                document.querySelectorAll('.nav-item.active').forEach(el => el.classList.remove('active'))
                event.target.parentElement.classList.add('active');
            }
        }
    }

    document.querySelectorAll('.content-link').forEach(link => {
        link.addEventListener('click', (event) => {
            load_content(link.dataset.name);
        })
    })
    hide_pages();
    load_home();
})

function hide_pages() {
    document.querySelectorAll('.content-page').forEach(page => {
        page.style.display = 'none';
    })
}

function setTitle(name="") {
    if (name !== "") {
        document.title = "J.N.'s WW1 | ".concat(name);
    } else {
        document.title = "J.N.'s WW1";
    }
}

function load_home() {
    setTitle();
    document.querySelector('#home-view').style.removeProperty('display');
    document.querySelector('#site-view').style.display = 'none';
}

function resize_handler() {
    document.querySelectorAll('#site-home .row .col').forEach(element => {
        let image = element.querySelector('img');
        let overlay = element.querySelector('span');

        if (image.style.display === 'none') {
            return false;
        }

        overlay.style.width = image.offsetWidth + "px";
        overlay.style.height = image.offsetHeight + "px";
    });1
}

window.onresize = resize_handler;

function load_site_home() {
    setTitle('Home');
    document.querySelector('#content').style.display = 'none';
    document.querySelector('#site-home').style.removeProperty('display');

    document.querySelectorAll('#site-home .row .col').forEach(element => {
        let image = element.querySelector('img');
        let overlay = element.querySelector('span');

        overlay.classList.add('has-pointer');
        overlay.style.width = image.offsetWidth + "px";
        overlay.style.height = image.offsetHeight + "px";
        overlay.dataset.name = image.alt;
        overlay.innerText = overlay.dataset.name;
        overlay.style.display = 'none';

        image.onmouseover = () => {
            overlay.style.removeProperty('display');
            overlay.style.border = "10px solid #007bff";
        }

        overlay.onmouseleave = () => {
            overlay.style.display = 'none';
            overlay.style.removeProperty('border');
        }

        overlay.onclick = () => {
            load_content(overlay.dataset.name)
        }
    })
}

function load_site() {
    document.querySelector('#home-view').style.display = 'none';
    document.querySelector('#site-view').style.removeProperty('display');
    document.querySelectorAll('.nav-item.active').forEach(el => el.classList.remove('active'))
    
    document.body.style.minHeight = window.innerHeight  + 'px';
    load_site_home();
}

function load_content(name) {
    setTitle(name);
    hide_pages();

    document.querySelector('#site-home').style.display = 'none';
    document.querySelector('#content').style.removeProperty('display');

    let element = document.querySelector(`.content-page[data-name="${name}"]`);
    if (element === null) {
        return false;
    }
    element.style.removeProperty('display');

    let section = document.querySelector('#facts-section .card-text');
    section.innerHTML = '';

    let facts;

    if (page_facts.hasOwnProperty(name)) {
        facts = page_facts[name];

        if (facts.length === 0) {
            facts = page_facts["DEFAULT"];
        }
    } else {
        facts = page_facts["DEFAULT"];
    }

    for (index = 0; index < facts.length; index++) {
        let element = document.createElement('div');
        element.classList.add('fact');
        element.innerText = facts[index];
        section.append(element);
    }
}
