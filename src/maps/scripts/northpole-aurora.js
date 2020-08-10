/* eslint-disable no-mixed-operators */
/* eslint-disable no-tabs */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
const SimplexNoise = require('simplex-noise');

const rayCount = 500;
const rayPropCount = 12;
const rayPropsLength = rayCount * rayPropCount;
const baseLength = 100;
const rangeLength = 120;
const baseSpeed = 0.05;
const rangeSpeed = 0.1;
const baseWidth = 6;
const rangeWidth = 15;
const baseHue = 120;
const rangeHue = 60;
const baseTTL = 50;
const rangeTTL = 100;
const noiseStrength = 100;
const xOff = 0.0015;
const yOff = 0.0015;
const zOff = 0.0015;
const {
  abs, round, random,
} = Math;
const rand = (n) => n * random();
const fadeInOut = (t, m) => {
  let hm = 0.5 * m;
  return abs((t + hm) % m - hm) / (hm);
};

let container;
let canvas;
let ctx;
let center;
let tick;
let simplex;
let rayProps;

function setup() {
  createCanvas();
  resize();
  initRays();
  draw();
}

function initRays() {
  tick = 0;
  simplex = new SimplexNoise();
  rayProps = new Float32Array(rayPropsLength);

  let i;

  for (i = 0; i < rayPropsLength; i += rayPropCount) {
    initRay(i);
  }
}

function initRay(i) {
  let length; let x; let y1; let y2; let n; let life; let ttl; let width; let speed; let
    hue;

  length = baseLength + rand(rangeLength);
  x = rand(canvas.a.width);
  y1 = center[1] + noiseStrength;
  y2 = center[1] + noiseStrength - length;
  n = simplex.noise3D(x * xOff, y1 * yOff, tick * zOff) * noiseStrength;
  y1 += n;
  y2 += n;
  life = 0;
  ttl = baseTTL + rand(rangeTTL);
  width = baseWidth + rand(rangeWidth);
  speed = baseSpeed + rand(rangeSpeed) * (round(rand(1)) ? 1 : -1);
  hue = baseHue + rand(rangeHue);

  rayProps.set([x, y1, y2, life, ttl, width, speed, hue], i);
}

function drawRays() {
  let i;

  for (i = 0; i < rayPropsLength; i += rayPropCount) {
    updateRay(i);
  }
}

function updateRay(i) {
  const i2 = 1 + i; const i3 = 2 + i; const i4 = 3 + i; const i5 = 4 + i; const i6 = 5 + i; const i7 = 6 + i; const
    i8 = 7 + i;
  let x; let y1; let y2; let life; let ttl; let width; let speed; let
    hue;

  x = rayProps[i];
  y1 = rayProps[i2];
  y2 = rayProps[i3];
  life = rayProps[i4];
  ttl = rayProps[i5];
  width = rayProps[i6];
  speed = rayProps[i7];
  hue = rayProps[i8];

  drawRay(x, y1, y2, life, ttl, width, hue);

  x += speed;
  life++;

  rayProps[i] = x;
  rayProps[i4] = life;

  (checkBounds(x) || life > ttl) && initRay(i);
}

function drawRay(x, y1, y2, life, ttl, width, hue) {
  let gradient;

  gradient = ctx.a.createLinearGradient(x, y1, x, y2);
  gradient.addColorStop(0, `hsla(${hue},100%,35%,0)`);
  gradient.addColorStop(0.5, `hsla(${hue},100%,35%,${fadeInOut(life, ttl)})`);
  gradient.addColorStop(1, `hsla(${hue},100%,35%,0)`);

  ctx.a.save();
  ctx.a.beginPath();
  ctx.a.strokeStyle = gradient;
  ctx.a.lineWidth = width;
  ctx.a.moveTo(x, y1);
  ctx.a.lineTo(x, y2);
  ctx.a.stroke();
  ctx.a.closePath();
  ctx.a.restore();
}

function checkBounds(x) {
  return x < 0 || x > canvas.a.width;
}

function createCanvas() {
  container = document.createElement('div');
  document.body.appendChild(container);
  canvas = {
    a: document.createElement('canvas'),
    b: document.createElement('canvas'),
  };
  canvas.b.style = `
		position: fixed;
		top: -40%;
		left: 0;
		width: 100%;
        height: 100%;
        pointer-events: none;
        opacity: 0.33;
        background: linear-gradient(180deg, hsla(220, 60%, 3%) 30%, transparent);
	`;
  container.appendChild(canvas.b);
  ctx = {
    a: canvas.a.getContext('2d'),
    b: canvas.b.getContext('2d'),
  };
  center = [];
}

function resize() {
  const { innerWidth, innerHeight } = window;
  if (typeof canvas !== 'undefined' && canvas) {
    canvas.a.width = innerWidth;
    canvas.a.height = innerHeight;

    ctx.a.drawImage(canvas.b, 0, 0);

    canvas.b.width = innerWidth;
    canvas.b.height = innerHeight;

    ctx.b.drawImage(canvas.a, 0, 0);

    center[0] = 0.5 * canvas.a.width;
    center[1] = 0.5 * canvas.a.height;
  }
}

function render() {
  ctx.b.save();
  ctx.a.globalCompositeOperation = 'lighter';
  ctx.b.drawImage(canvas.a, 0, 0);
  ctx.b.restore();
}

function draw() {
  tick++;
  ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
  ctx.b.clearRect(0, 0, canvas.b.width, canvas.a.height);
  drawRays();
  render();

  window.requestAnimationFrame(draw);
}


if (window.matchMedia('(min-width: 550px)').matches) {
  window.addEventListener('load', setup);
  window.addEventListener('resize', resize);
}
