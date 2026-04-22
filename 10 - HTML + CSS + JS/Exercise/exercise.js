console.log(document.querySelector('.js-button').classList.contains('js-button'));
function gaming(className) {
    const button = document.querySelector(className);
    if (!button.classList.contains('toggle-on')) {
        if (document.querySelector('.toggle-on'))
            document.querySelector('.toggle-on').classList.remove('toggle-on');
        button.classList.add('toggle-on');
    }
    else
        button.classList.remove('toggle-on');
}