const langSelector = document.lang_switch.lang;
const spans = document.querySelectorAll('span');

console.log(langSelector);


const defaultLang = () => {
    const stored = sessionStorage.getItem('key');
    console.log(stored);
    const langSelect = document.lang_switch.lang.value;
    
    if(stored === null) {
        if(langSelect === 'ja') {
            spans.forEach(span => {
                const language = span.lang
                if(language === 'ja') {
                    span.classList.add('display');
                }
            });
        } else if(langSelect === 'en') {
            spans.forEach(span => {
                const language = span.lang
                if(language === 'en') {
                    span.classList.add('display'); 
                }
            });
        }
    } else if(stored === 'ja') {
        spans.forEach(span => {
            const language = span.lang
            if(language === 'ja') {
                span.classList.add('display'); 
            }
        });
    } else if(stored === 'en') {
        spans.forEach(span => {
            const language = span.lang
            if(language === 'en') {
                span.classList.add('display'); 
            }
        });
    }
}

// const defaultLang = () => {
//     const langSelect = document.lang_switch.lang.value;
    
//     if(langSelect === 'ja') {
//         spans.forEach(span => {
//             const language = span.lang
//             if(language === 'ja') {
//                 span.classList.add('display'); 
//             }
//         });
//     } else if(langSelect === 'en') {
//         spans.forEach(span => {
//             const language = span.lang
//             if(language === 'en') {
//                 span.classList.add('display'); 
//             }
//         });
//     }
// }

const switchLang = () => {
    const langSelect = document.lang_switch.lang.value;

    if(langSelect === 'en') {
        sessionStorage.setItem('key', 'en');
        spans.forEach(span => {
            const language = span.lang
            if(language === 'en') {
                span.classList.add('display'); 
            } else {
                span.classList.remove('display');
            }
        });
    } else if(langSelect === 'ja') {
        sessionStorage.setItem('key', 'ja');
        spans.forEach(span => {
            const language = span.lang
            if(language === 'ja') {
                span.classList.add('display'); 
            } else {
                span.classList.remove('display');
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', defaultLang);

window.addEventListener('change', switchLang);