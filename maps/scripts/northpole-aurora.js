!function(t){var r={};function e(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,r){if(1&r&&(t=e(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var a in t)e.d(n,a,function(r){return t[r]}.bind(null,a));return n},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},e.p="/",e(e.s=93)}({93:function(t,r,e){t.exports=e(94)},94:function(t,r,e){var n,a,o,i,l,f,u,d=e(95),c=12,s=500*c,h=100,v=120,p=.05,b=.1,m=6,g=15,w=120,y=60,M=50,x=100,S=100,C=.0015,A=.0015,O=.0015,P="hsla(220,60%,3%,0)",j=Math.abs,_=Math.round,q=Math.random,E=function(t){return t*q()},T=function(t,r){var e=.5*r;return j((t+e)%r-e)/e};function D(t){var r,e,n,o,d,c,s,P,j;r=h+E(v),e=E(a.a.width),n=i[1]+S,o=i[1]+S-r,n+=d=f.noise3D(e*C,n*A,l*O)*S,o+=d,c=M+E(x),s=m+E(g),P=p+E(b)*(_(E(1))?1:-1),j=w+E(y),u.set([e,n,o,0,c,s,P,j],t)}function F(t){var r,e,n,i,l,f,d,c=1+t,s=2+t,h=3+t,v=4+t,p=5+t,b=6+t,m=7+t;r=u[t],e=u[c],n=u[s],i=u[h],l=u[v],f=u[p],d=u[b],function(t,r,e,n,a,i,l){var f;(f=o.a.createLinearGradient(t,r,t,e)).addColorStop(0,"hsla(".concat(l,",100%,35%,0)")),f.addColorStop(.5,"hsla(".concat(l,",100%,35%,").concat(T(n,a),")")),f.addColorStop(1,"hsla(".concat(l,",100%,35%,0)")),o.a.save(),o.a.beginPath(),o.a.strokeStyle=f,o.a.lineWidth=i,o.a.moveTo(t,r),o.a.lineTo(t,e),o.a.stroke(),o.a.closePath(),o.a.restore()}(r,e,n,i,l,f,u[m]),r+=d,i++,u[t]=r,u[h]=i,(function(t){return t<0||t>a.a.width}(r)||i>l)&&D(t)}function k(){var t=window,r=t.innerWidth,e=t.innerHeight;a.a.width=r,a.a.height=e,o.a.drawImage(a.b,0,0),a.b.width=r,a.b.height=e,o.b.drawImage(a.a,0,0),i[0]=.5*a.a.width,i[1]=.5*a.a.height}function I(){l++,o.a.clearRect(0,0,a.a.width,a.a.height),o.b.fillStyle=P,o.b.clearRect(0,0,a.b.width,a.a.height),o.b.fillRect(0,0,a.b.width,a.a.height),function(){var t;for(t=0;t<s;t+=c)F(t)}(),o.b.save(),o.b.filter="blur(12px)",o.a.globalCompositeOperation="lighter",o.b.drawImage(a.a,0,0),o.b.restore(),window.requestAnimationFrame(I)}window.addEventListener("load",(function(){n=document.createElement("div"),document.body.appendChild(n),(a={a:document.createElement("canvas"),b:document.createElement("canvas")}).b.style="\n\t\tposition: fixed;\n\t\ttop: -40%;\n\t\tleft: 0;\n\t\twidth: 100%;\n        height: 100%;\n        pointer-events: none;\n        opacity: 0.33;\n        background: linear-gradient(180deg, hsla(220, 60%, 3%) 30%, transparent);\n\t",n.appendChild(a.b),o={a:a.a.getContext("2d"),b:a.b.getContext("2d")},i=[],k(),function(){var t;for(l=0,f=new d,u=new Float32Array(s),t=0;t<s;t+=c)D(t)}(),I()})),window.addEventListener("resize",k)},95:function(t,r,e){var n;!function(){"use strict";var a=.5*(Math.sqrt(3)-1),o=(3-Math.sqrt(3))/6,i=1/6,l=(Math.sqrt(5)-1)/4,f=(5-Math.sqrt(5))/20;function u(t){var r;r="function"==typeof t?t:t?function(){var t=0,r=0,e=0,n=1,a=(o=4022871197,function(t){t=t.toString();for(var r=0;r<t.length;r++){var e=.02519603282416938*(o+=t.charCodeAt(r));e-=o=e>>>0,o=(e*=o)>>>0,o+=4294967296*(e-=o)}return 2.3283064365386963e-10*(o>>>0)});var o;t=a(" "),r=a(" "),e=a(" ");for(var i=0;i<arguments.length;i++)(t-=a(arguments[i]))<0&&(t+=1),(r-=a(arguments[i]))<0&&(r+=1),(e-=a(arguments[i]))<0&&(e+=1);return a=null,function(){var a=2091639*t+2.3283064365386963e-10*n;return t=r,r=e,e=a-(n=0|a)}}(t):Math.random,this.p=d(r),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(var e=0;e<512;e++)this.perm[e]=this.p[255&e],this.permMod12[e]=this.perm[e]%12}function d(t){var r,e=new Uint8Array(256);for(r=0;r<256;r++)e[r]=r;for(r=0;r<255;r++){var n=r+~~(t()*(256-r)),a=e[r];e[r]=e[n],e[n]=a}return e}u.prototype={grad3:new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),grad4:new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]),noise2D:function(t,r){var e,n,i=this.permMod12,l=this.perm,f=this.grad3,u=0,d=0,c=0,s=(t+r)*a,h=Math.floor(t+s),v=Math.floor(r+s),p=(h+v)*o,b=t-(h-p),m=r-(v-p);b>m?(e=1,n=0):(e=0,n=1);var g=b-e+o,w=m-n+o,y=b-1+2*o,M=m-1+2*o,x=255&h,S=255&v,C=.5-b*b-m*m;if(C>=0){var A=3*i[x+l[S]];u=(C*=C)*C*(f[A]*b+f[A+1]*m)}var O=.5-g*g-w*w;if(O>=0){var P=3*i[x+e+l[S+n]];d=(O*=O)*O*(f[P]*g+f[P+1]*w)}var j=.5-y*y-M*M;if(j>=0){var _=3*i[x+1+l[S+1]];c=(j*=j)*j*(f[_]*y+f[_+1]*M)}return 70*(u+d+c)},noise3D:function(t,r,e){var n,a,o,l,f,u,d,c,s,h,v=this.permMod12,p=this.perm,b=this.grad3,m=(t+r+e)*(1/3),g=Math.floor(t+m),w=Math.floor(r+m),y=Math.floor(e+m),M=(g+w+y)*i,x=t-(g-M),S=r-(w-M),C=e-(y-M);x>=S?S>=C?(f=1,u=0,d=0,c=1,s=1,h=0):x>=C?(f=1,u=0,d=0,c=1,s=0,h=1):(f=0,u=0,d=1,c=1,s=0,h=1):S<C?(f=0,u=0,d=1,c=0,s=1,h=1):x<C?(f=0,u=1,d=0,c=0,s=1,h=1):(f=0,u=1,d=0,c=1,s=1,h=0);var A=x-f+i,O=S-u+i,P=C-d+i,j=x-c+2*i,_=S-s+2*i,q=C-h+2*i,E=x-1+.5,T=S-1+.5,D=C-1+.5,F=255&g,k=255&w,I=255&y,L=.6-x*x-S*S-C*C;if(L<0)n=0;else{var R=3*v[F+p[k+p[I]]];n=(L*=L)*L*(b[R]*x+b[R+1]*S+b[R+2]*C)}var U=.6-A*A-O*O-P*P;if(U<0)a=0;else{var W=3*v[F+f+p[k+u+p[I+d]]];a=(U*=U)*U*(b[W]*A+b[W+1]*O+b[W+2]*P)}var z=.6-j*j-_*_-q*q;if(z<0)o=0;else{var G=3*v[F+c+p[k+s+p[I+h]]];o=(z*=z)*z*(b[G]*j+b[G+1]*_+b[G+2]*q)}var H=.6-E*E-T*T-D*D;if(H<0)l=0;else{var N=3*v[F+1+p[k+1+p[I+1]]];l=(H*=H)*H*(b[N]*E+b[N+1]*T+b[N+2]*D)}return 32*(n+a+o+l)},noise4D:function(t,r,e,n){var a,o,i,u,d,c,s,h,v,p,b,m,g,w,y,M,x,S=this.perm,C=this.grad4,A=(t+r+e+n)*l,O=Math.floor(t+A),P=Math.floor(r+A),j=Math.floor(e+A),_=Math.floor(n+A),q=(O+P+j+_)*f,E=t-(O-q),T=r-(P-q),D=e-(j-q),F=n-(_-q),k=0,I=0,L=0,R=0;E>T?k++:I++,E>D?k++:L++,E>F?k++:R++,T>D?I++:L++,T>F?I++:R++,D>F?L++:R++;var U=E-(c=k>=3?1:0)+f,W=T-(s=I>=3?1:0)+f,z=D-(h=L>=3?1:0)+f,G=F-(v=R>=3?1:0)+f,H=E-(p=k>=2?1:0)+2*f,N=T-(b=I>=2?1:0)+2*f,B=D-(m=L>=2?1:0)+2*f,J=F-(g=R>=2?1:0)+2*f,K=E-(w=k>=1?1:0)+3*f,Q=T-(y=I>=1?1:0)+3*f,V=D-(M=L>=1?1:0)+3*f,X=F-(x=R>=1?1:0)+3*f,Y=E-1+4*f,Z=T-1+4*f,$=D-1+4*f,tt=F-1+4*f,rt=255&O,et=255&P,nt=255&j,at=255&_,ot=.6-E*E-T*T-D*D-F*F;if(ot<0)a=0;else{var it=S[rt+S[et+S[nt+S[at]]]]%32*4;a=(ot*=ot)*ot*(C[it]*E+C[it+1]*T+C[it+2]*D+C[it+3]*F)}var lt=.6-U*U-W*W-z*z-G*G;if(lt<0)o=0;else{var ft=S[rt+c+S[et+s+S[nt+h+S[at+v]]]]%32*4;o=(lt*=lt)*lt*(C[ft]*U+C[ft+1]*W+C[ft+2]*z+C[ft+3]*G)}var ut=.6-H*H-N*N-B*B-J*J;if(ut<0)i=0;else{var dt=S[rt+p+S[et+b+S[nt+m+S[at+g]]]]%32*4;i=(ut*=ut)*ut*(C[dt]*H+C[dt+1]*N+C[dt+2]*B+C[dt+3]*J)}var ct=.6-K*K-Q*Q-V*V-X*X;if(ct<0)u=0;else{var st=S[rt+w+S[et+y+S[nt+M+S[at+x]]]]%32*4;u=(ct*=ct)*ct*(C[st]*K+C[st+1]*Q+C[st+2]*V+C[st+3]*X)}var ht=.6-Y*Y-Z*Z-$*$-tt*tt;if(ht<0)d=0;else{var vt=S[rt+1+S[et+1+S[nt+1+S[at+1]]]]%32*4;d=(ht*=ht)*ht*(C[vt]*Y+C[vt+1]*Z+C[vt+2]*$+C[vt+3]*tt)}return 27*(a+o+i+u+d)}},u._buildPermutationTable=d,void 0===(n=function(){return u}.call(r,e,r,t))||(t.exports=n),r.SimplexNoise=u,t.exports=u}()}});