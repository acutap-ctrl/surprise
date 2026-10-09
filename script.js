const heartBtn = document.getElementById('heartBtn');
const hint = document.getElementById('hint');
const messageText = document.getElementById('messageText');
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Dito pwedeng palitan ang iyong sweet message!
const fullMessage = "hello beb happy new year thank you sa pag iintindi mo lagi sakin thankyouu for everything beb i loveeee youuuu❤️.";

let isClicked = false;
let particles = [];

// Fireworks Particle Class
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.radius = Math.random() * 3 + 2;
    this.colors = ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff', '#ffccd5', '#ff0054'];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.008;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05; // gravity
    this.alpha -= this.decay;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(this.alpha, 0);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.restore();
  }
}

// Create fireworks burst
function createFireworks(x, y) {
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle(x, y));
  }
}

// Render loop
function animate() {
  ctx.fillStyle = 'rgba(13, 13, 26, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    if (p.alpha > 0) {
      p.update();
      p.draw();
    } else {
      particles.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}
animate();

// Typewriter effect function
function typeWriter(text, index = 0) {
  if (index < text.length) {
    if (text.charAt(index) === '\n') {
      messageText.innerHTML += '<br>';
    } else {
      messageText.innerHTML += text.charAt(index);
    }
    setTimeout(() => typeWriter(text, index + 1), 60);
  }
}

// Click event handler
heartBtn.addEventListener('click', () => {
  const rect = heartBtn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Firework explosions
  createFireworks(centerX, centerY);
  createFireworks(centerX - 150, centerY - 80);
  createFireworks(centerX + 150, centerY - 80);

  if (!isClicked) {
    isClicked = true;
    hint.style.opacity = '0'; // hide hint
    typeWriter(fullMessage);
  }
});