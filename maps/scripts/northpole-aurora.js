!function(t){var r={};function e(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,r){if(1&r&&(t=e(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var a in t)e.d(n,a,function(r){return t[r]}.bind(null,a));return n},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},e.p="/",e(e.s=93)}({93:function(t,r,e){t.exports=e(94)},94:function(t,r,e){var n,a,o,i,f,u,d,l=e(95),c=12,s=500*c,h=100,v=120,p=.05,m=.1,b=6,g=15,w=120,M=60,y=50,x=100,S=100,C=.0015,A=.0015,O=.0015,P=Math.abs,j=Math.round,_=Math.random,q=function(t){return t*_()},E=function(t,r){var e=.5*r;return P((t+e)%r-e)/e};function T(t){var r,e,n,o,l,c,s,P,_;r=h+q(v),e=q(a.a.width),n=i[1]+S,o=i[1]+S-r,n+=l=u.noise3D(e*C,n*A,f*O)*S,o+=l,c=y+q(x),s=b+q(g),P=p+q(m)*(j(q(1))?1:-1),_=w+q(M),d.set([e,n,o,0,c,s,P,_],t)}function D(t){var r,e,n,i,f,u,l,c=1+t,s=2+t,h=3+t,v=4+t,p=5+t,m=6+t,b=7+t;r=d[t],e=d[c],n=d[s],i=d[h],f=d[v],u=d[p],l=d[m],function(t,r,e,n,a,i,f){var u;(u=o.a.createLinearGradient(t,r,t,e)).addColorStop(0,"hsla(".concat(f,",100%,35%,0)")),u.addColorStop(.5,"hsla(".concat(f,",100%,35%,").concat(E(n,a),")")),u.addColorStop(1,"hsla(".concat(f,",100%,35%,0)")),o.a.save(),o.a.beginPath(),o.a.strokeStyle=u,o.a.lineWidth=i,o.a.moveTo(t,r),o.a.lineTo(t,e),o.a.stroke(),o.a.closePath(),o.a.restore()}(r,e,n,i,f,u,d[b]),r+=l,i++,d[t]=r,d[h]=i,(function(t){return t<0||t>a.a.width}(r)||i>f)&&T(t)}function F(){var t=window,r=t.innerWidth,e=t.innerHeight;a.a.width=r,a.a.height=e,o.a.drawImage(a.b,0,0),a.b.width=r,a.b.height=e,o.b.drawImage(a.a,0,0),i[0]=.5*a.a.width,i[1]=.5*a.a.height}function k(){f++,o.a.clearRect(0,0,a.a.width,a.a.height),o.b.clearRect(0,0,a.b.width,a.a.height),function(){var t;for(t=0;t<s;t+=c)D(t)}(),o.b.save(),o.a.globalCompositeOperation="lighter",o.b.drawImage(a.a,0,0),o.b.restore(),window.requestAnimationFrame(k)}window.matchMedia("(min-width: 550px)").matches&&(window.addEventListener("load",(function(){n=document.createElement("div"),document.body.appendChild(n),(a={a:document.createElement("canvas"),b:document.createElement("canvas")}).b.style="\n\t\tposition: fixed;\n\t\ttop: -40%;\n\t\tleft: 0;\n\t\twidth: 100%;\n        height: 100%;\n        pointer-events: none;\n        opacity: 0.33;\n        background: linear-gradient(180deg, hsla(220, 60%, 3%) 30%, transparent);\n\t",n.appendChild(a.b),o={a:a.a.getContext("2d"),b:a.b.getContext("2d")},i=[],F(),function(){var t;for(f=0,u=new l,d=new Float32Array(s),t=0;t<s;t+=c)T(t)}(),k()})),window.addEventListener("resize",F))},95:function(t,r,e){var n;!function(){"use strict";var a=.5*(Math.sqrt(3)-1),o=(3-Math.sqrt(3))/6,i=1/6,f=(Math.sqrt(5)-1)/4,u=(5-Math.sqrt(5))/20;function d(t){var r;r="function"==typeof t?t:t?function(){var t=0,r=0,e=0,n=1,a=(o=4022871197,function(t){t=t.toString();for(var r=0;r<t.length;r++){var e=.02519603282416938*(o+=t.charCodeAt(r));e-=o=e>>>0,o=(e*=o)>>>0,o+=4294967296*(e-=o)}return 2.3283064365386963e-10*(o>>>0)});var o;t=a(" "),r=a(" "),e=a(" ");for(var i=0;i<arguments.length;i++)(t-=a(arguments[i]))<0&&(t+=1),(r-=a(arguments[i]))<0&&(r+=1),(e-=a(arguments[i]))<0&&(e+=1);return a=null,function(){var a=2091639*t+2.3283064365386963e-10*n;return t=r,r=e,e=a-(n=0|a)}}(t):Math.random,this.p=l(r),this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(var e=0;e<512;e++)this.perm[e]=this.p[255&e],this.permMod12[e]=this.perm[e]%12}function l(t){var r,e=new Uint8Array(256);for(r=0;r<256;r++)e[r]=r;for(r=0;r<255;r++){var n=r+~~(t()*(256-r)),a=e[r];e[r]=e[n],e[n]=a}return e}d.prototype={grad3:new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),grad4:new Float32Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]),noise2D:function(t,r){var e,n,i=this.permMod12,f=this.perm,u=this.grad3,d=0,l=0,c=0,s=(t+r)*a,h=Math.floor(t+s),v=Math.floor(r+s),p=(h+v)*o,m=t-(h-p),b=r-(v-p);m>b?(e=1,n=0):(e=0,n=1);var g=m-e+o,w=b-n+o,M=m-1+2*o,y=b-1+2*o,x=255&h,S=255&v,C=.5-m*m-b*b;if(C>=0){var A=3*i[x+f[S]];d=(C*=C)*C*(u[A]*m+u[A+1]*b)}var O=.5-g*g-w*w;if(O>=0){var P=3*i[x+e+f[S+n]];l=(O*=O)*O*(u[P]*g+u[P+1]*w)}var j=.5-M*M-y*y;if(j>=0){var _=3*i[x+1+f[S+1]];c=(j*=j)*j*(u[_]*M+u[_+1]*y)}return 70*(d+l+c)},noise3D:function(t,r,e){var n,a,o,f,u,d,l,c,s,h,v=this.permMod12,p=this.perm,m=this.grad3,b=(t+r+e)*(1/3),g=Math.floor(t+b),w=Math.floor(r+b),M=Math.floor(e+b),y=(g+w+M)*i,x=t-(g-y),S=r-(w-y),C=e-(M-y);x>=S?S>=C?(u=1,d=0,l=0,c=1,s=1,h=0):x>=C?(u=1,d=0,l=0,c=1,s=0,h=1):(u=0,d=0,l=1,c=1,s=0,h=1):S<C?(u=0,d=0,l=1,c=0,s=1,h=1):x<C?(u=0,d=1,l=0,c=0,s=1,h=1):(u=0,d=1,l=0,c=1,s=1,h=0);var A=x-u+i,O=S-d+i,P=C-l+i,j=x-c+2*i,_=S-s+2*i,q=C-h+2*i,E=x-1+.5,T=S-1+.5,D=C-1+.5,F=255&g,k=255&w,I=255&M,L=.6-x*x-S*S-C*C;if(L<0)n=0;else{var U=3*v[F+p[k+p[I]]];n=(L*=L)*L*(m[U]*x+m[U+1]*S+m[U+2]*C)}var R=.6-A*A-O*O-P*P;if(R<0)a=0;else{var W=3*v[F+u+p[k+d+p[I+l]]];a=(R*=R)*R*(m[W]*A+m[W+1]*O+m[W+2]*P)}var z=.6-j*j-_*_-q*q;if(z<0)o=0;else{var G=3*v[F+c+p[k+s+p[I+h]]];o=(z*=z)*z*(m[G]*j+m[G+1]*_+m[G+2]*q)}var H=.6-E*E-T*T-D*D;if(H<0)f=0;else{var N=3*v[F+1+p[k+1+p[I+1]]];f=(H*=H)*H*(m[N]*E+m[N+1]*T+m[N+2]*D)}return 32*(n+a+o+f)},noise4D:function(t,r,e,n){var a,o,i,d,l,c,s,h,v,p,m,b,g,w,M,y,x,S=this.perm,C=this.grad4,A=(t+r+e+n)*f,O=Math.floor(t+A),P=Math.floor(r+A),j=Math.floor(e+A),_=Math.floor(n+A),q=(O+P+j+_)*u,E=t-(O-q),T=r-(P-q),D=e-(j-q),F=n-(_-q),k=0,I=0,L=0,U=0;E>T?k++:I++,E>D?k++:L++,E>F?k++:U++,T>D?I++:L++,T>F?I++:U++,D>F?L++:U++;var R=E-(c=k>=3?1:0)+u,W=T-(s=I>=3?1:0)+u,z=D-(h=L>=3?1:0)+u,G=F-(v=U>=3?1:0)+u,H=E-(p=k>=2?1:0)+2*u,N=T-(m=I>=2?1:0)+2*u,B=D-(b=L>=2?1:0)+2*u,J=F-(g=U>=2?1:0)+2*u,K=E-(w=k>=1?1:0)+3*u,Q=T-(M=I>=1?1:0)+3*u,V=D-(y=L>=1?1:0)+3*u,X=F-(x=U>=1?1:0)+3*u,Y=E-1+4*u,Z=T-1+4*u,$=D-1+4*u,tt=F-1+4*u,rt=255&O,et=255&P,nt=255&j,at=255&_,ot=.6-E*E-T*T-D*D-F*F;if(ot<0)a=0;else{var it=S[rt+S[et+S[nt+S[at]]]]%32*4;a=(ot*=ot)*ot*(C[it]*E+C[it+1]*T+C[it+2]*D+C[it+3]*F)}var ft=.6-R*R-W*W-z*z-G*G;if(ft<0)o=0;else{var ut=S[rt+c+S[et+s+S[nt+h+S[at+v]]]]%32*4;o=(ft*=ft)*ft*(C[ut]*R+C[ut+1]*W+C[ut+2]*z+C[ut+3]*G)}var dt=.6-H*H-N*N-B*B-J*J;if(dt<0)i=0;else{var lt=S[rt+p+S[et+m+S[nt+b+S[at+g]]]]%32*4;i=(dt*=dt)*dt*(C[lt]*H+C[lt+1]*N+C[lt+2]*B+C[lt+3]*J)}var ct=.6-K*K-Q*Q-V*V-X*X;if(ct<0)d=0;else{var st=S[rt+w+S[et+M+S[nt+y+S[at+x]]]]%32*4;d=(ct*=ct)*ct*(C[st]*K+C[st+1]*Q+C[st+2]*V+C[st+3]*X)}var ht=.6-Y*Y-Z*Z-$*$-tt*tt;if(ht<0)l=0;else{var vt=S[rt+1+S[et+1+S[nt+1+S[at+1]]]]%32*4;l=(ht*=ht)*ht*(C[vt]*Y+C[vt+1]*Z+C[vt+2]*$+C[vt+3]*tt)}return 27*(a+o+i+d+l)}},d._buildPermutationTable=l,void 0===(n=function(){return d}.call(r,e,r,t))||(t.exports=n),r.SimplexNoise=d,t.exports=d}()}});