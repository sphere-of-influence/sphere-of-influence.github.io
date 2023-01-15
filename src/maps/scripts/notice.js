
const css = `
            .site-notice {
                display: block;
                position: fixed;
                right: 0;
                left: 0;
                top: 0;
                width: 100%;
                text-shadow: 0 0 5px rgb(255 255 255 / 75%);
                padding: 0;
                font-size: 1.2rem;
                text-align: center;
                pointer-events: none;
            }

            .site-notice p {
                margin: 0;
            }
        `;

const head = document.head || document.getElementsByTagName('head')[0];
const style = document.createElement('style');
head.appendChild(style);
style.type = 'text/css';
style.appendChild(document.createTextNode(css));

const box = document.createElement('div');
const sidebar = document.getElementById('sidebar-hook');
box.className = 'site-notice';
box.innerHTML = `<p><b>Notice:</b> in-maintence, some features may be broken!`;

sidebar.insertBefore(box, sidebar.firstChild);
