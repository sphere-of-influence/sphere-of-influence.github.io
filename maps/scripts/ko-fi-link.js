!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t(t.s=90)}({90:function(e,n,t){e.exports=t(91)},91:function(e,n){setTimeout((function e(){if(document.body.classList.contains("loading"))setTimeout(e,1e3);else{var n=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");n.appendChild(t),t.type="text/css",t.appendChild(document.createTextNode("\n  .ko-fi-link {\n      padding-top: 15px;\n      padding-bottom: 15px;\n      border-bottom: 1px solid rgba(34, 34, 34, 0.05);\n  }\n\n  .ko-fi-link .link {\n    background: white;\n    border: 1px solid #e1e8ed;\n    border-radius: 5px;\n    max-width: 500px;\n    display: block;\n  }\n\n  .ko-fi-link span {\n    padding: 10px 20px;\n    display: block;\n    color: black;\n    transition: color .33s;\n  }\n\n  .ko-fi-link:hover span {\n    color: inherit;\n  }\n\n  .ko-fi-link img {\n      width: 100%;\n      border-radius: 5px;\n  }\n"));var o=document.createElement("div");o.className="ko-fi-link",o.innerHTML='\x3c!-- KO-FI-LINK --\x3e\n                    <a class="story link" target="_blank" href="https://ko-fi.com/sphereofinfluence">\n                        <img src="https://pbs.twimg.com/media/C9x5h8KWsAE9iUF?format=jpg&name=small" alt="" />\n                        <span>\n                            Support the project, buy us a coffee or visit the accounts we follow,\n                            many of them sell merch! ☕️👕\n                        </span>\n                    </a>';var r=document.getElementById("sidebar-stories"),i=document.querySelector(".story.link:nth-child(4)");r.insertBefore(o,i)}}),1e3)}});