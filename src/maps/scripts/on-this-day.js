async function getDates() {
    let response = await fetch('/maps/scripts/dates.json');
    let data = await response.json();
    return data;
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const d = new Date();
const currentMonth = monthNames[d.getMonth()];
const currentDay = d.getDate();

getDates().then( (dates) =>  {
    dates = dates.filter((date) => {
        return date.day == `${currentDay} ${currentMonth}`;
    });

    if(dates.length > 0) {
        const onThisDay = dates[~~(dates.length * Math.random())];

        const css = `
            .on-this-day {
                display: inline-block;
                position: fixed;
                right: 40px;
                bottom: 40px;
                width: auto;
                max-width: 30%;
                background: rgba(255, 255, 255, 0.75);
                color: rgba(0,0,0,0.75);
                padding: 20px;
                font-size: 1.2rem;
            }

            .on-this-day h2 {
                font-family: "Calistoga", sans-serif;
                font-size: 2rem;
            }

            .on-this-day p {
                margin: 0;
            }
            
            .on-this-day-attr {
                text-align: right;
            }

            .on-this-day-close {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 20px;
                height: 20px;
                opacity: .5;
                cursor: pointer;
            }

            body.loading .on-this-day {
                display: none;
            }

            @media (max-width: 551px) {
                .on-this-day {
                    display: block;
                    position: relative;
                    right: auto;
                    bottom: auto;
                    width: 100%;
                    margin: 0 0 20px;
                }
                .on-this-day-close {
                    display: none;
                }
            }
        `,
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
        head.appendChild(style);
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        
        const box = document.createElement('div');
        const sidebar = document.getElementById('sidebar-hook');
        box.className = 'page-card on-this-day';
        box.innerHTML = `<h2>On this day, ${onThisDay.day} ${onThisDay.year}..</h2>
                         <p>${onThisDay.text}</p>
                         <p class="on-this-day-attr"><small><em>
                         <a href="https://en.wikipedia.org/w/index.php?search=${onThisDay.text.replace('"', '')}" target="_blank">Wikipedia</a>
                         </em></small></p>
                         <a id="on-this-day-close" class="on-this-day-close">
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve">
                            <polygon points="11.387,490 245,255.832 478.613,490 489.439,479.174 255.809,244.996 489.439,10.811 478.613,0 245,234.161 
                                11.387,0 0.561,10.811 234.191,244.996 0.561,479.174 "></polygon>
                            </svg>
                         </a>`;
                         
        sidebar.insertBefore(box, sidebar.firstChild);
        document.getElementById('on-this-day-close').addEventListener('click', () => {
            box.style.display = 'none';
        });
    }
    
});
