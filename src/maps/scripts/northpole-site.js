console.log('Protect what you have.');

document.querySelectorAll('.star').forEach((star) => {
  const container = star.parentElement;
  const life = document.createElement('span');
  life.innerText = 'ᛉ';
  life.className = 'life';
  life.style.lineHeight = `${star.getAttribute('width')}px`;
  life.style.fontSize = `${star.getAttribute('width')}px`;
  life.style.color = 'var(--color)';
  container.appendChild(life);
  // eslint-disable-next-line no-param-reassign
  star.style.display = 'none';
});
