const btn = document.querySelector('button.sd-kuder-action');
const aside = document.querySelector('aside.sidebar-kuder');

btn.addEventListener('click', () => {
    if(aside.classList.contains('action')) {
        aside.classList.remove('action');
    }else{
        aside.classList.add('action');
    }
});