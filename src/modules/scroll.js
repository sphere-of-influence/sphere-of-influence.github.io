
window.onscroll = function onscroll() {
  const scrollTop = Math.max(window.pageYOffset,
    document.documentElement.scrollTop,
    document.body.scrollTop);
  const subHeader = document.getElementById('sub-header');

  if (scrollTop === 0) {
    const star = document.getElementById('star');
    const newStar = star.cloneNode(true);
    star.parentNode.replaceChild(newStar, star);

    subHeader.classList.remove('visible');
  }

  if ((scrollTop > 50) && !subHeader.classList.contains('visible')) {
    const star = document.getElementById('sub-star');
    const newStar = star.cloneNode(true);
    star.parentNode.replaceChild(newStar, star);

    subHeader.classList.add('visible');
  }
};
