// home.js
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-black/80', 'backdrop-blur-md', 'py-3', 'shadow-lg');
        navbar.classList.remove('py-4');
    } else {
        navbar.classList.remove('bg-black/80', 'backdrop-blur-md', 'py-3', 'shadow-lg');
        navbar.classList.add('py-4');
    }
});
