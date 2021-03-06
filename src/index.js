console.log('init');

/**
 * define functions
 * 
 */

const $song = document.querySelector('.song');

const bindEvents = () => {
    const $figures = document.querySelectorAll('.article__figure');

    const addFigureEvent = ($figure) => {
        $figure.addEventListener('click', () => {
            toggleText($figure);
        });
    };

    for (let i = 0; i < $figures.length; i++) {
        const $figure = $figures[i];
        addFigureEvent($figure);
    }

    const $play = document.querySelector('.play');
    if($play) {
        $play.addEventListener('click', () => {
            document.querySelector('.play-overlay').style.display = 'none';
            if ($song.paused) {
                $song.play();
            }
        });
    }
};

const toggleText = ($element) => {
    const $article = $element.closest('.main__article');

    if ($article) {
        $article.classList.toggle('main__article--open');
    }
};

const splitText = () => {
    const $text = document.querySelector('.header__greeting');
    const text = $text.textContent.trim();
    const letters = text.split('');
    let newMarkup = '';
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i] === ' ' ? '&nbsp;' : letters[i];
        const wrapperLetter = `<span>${letter}</span>`;
        newMarkup = newMarkup + wrapperLetter;
    }

    $text.innerHTML = newMarkup;
};


/**
 * start js
 * 
 */
bindEvents();
// splitText();
// if ($song) {
//     $song.play();
// }