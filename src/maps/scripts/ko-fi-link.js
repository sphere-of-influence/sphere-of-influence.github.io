function makeKoFiLink() {
  if (document.body.classList.contains('loading')) {
    setTimeout(makeKoFiLink, 1000);
    return;
  }

  const css = `
  .ko-fi-link {
      padding-top: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid rgba(34, 34, 34, 0.05);
  }

  .ko-fi-link .link {
    background: white;
    border: 1px solid #e1e8ed;
    border-radius: 5px;
    max-width: 500px;
    display: block;
  }

  .ko-fi-link span {
    padding: 10px 20px;
    display: block;
    color: black;
    transition: color .33s;
  }

  .ko-fi-link:hover span {
    color: inherit;
  }

  .ko-fi-link img {
      width: 100%;
      border-radius: 5px;
  }
`;
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  head.appendChild(style);
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));

  const box = document.createElement('div');
  box.className = 'ko-fi-link';
  box.innerHTML = `<!-- KO-FI-LINK -->
                    <a class="story link" target="_blank" href="https://ko-fi.com/sphereofinfluence">
                        <img src="https://pbs.twimg.com/media/C9x5h8KWsAE9iUF?format=jpg&name=small" alt="" />
                        <span>
                            Support the project, buy us a coffee or visit the accounts we follow,
                            many of them sell merch! ☕️👕
                        </span>
                    </a>`;
  const sidebar = document.getElementById('sidebar-stories');
  const hook = document.querySelector('.story.link:nth-child(4)');
  sidebar.insertBefore(box, hook);
}

setTimeout(makeKoFiLink, 1000);
