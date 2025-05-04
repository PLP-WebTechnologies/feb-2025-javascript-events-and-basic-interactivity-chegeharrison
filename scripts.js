// script.js
let score = 0;
const alien = document.getElementById('alien');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('startBtn');
const themeBtn = document.getElementById('themeBtn');
const accordionBtn = document.querySelector('.accordion-btn');
const accordionContent = document.querySelector('.accordion-content');
const form = document.getElementById('signupForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const formFeedback = document.getElementById('formFeedback');
let gameInterval;

function randomPosition() {
  const gameArea = document.querySelector('.game-area');
  const maxX = gameArea.clientWidth - 60;
  const maxY = gameArea.clientHeight - 60;
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);
  alien.style.left = `${x}px`;
  alien.style.top = `${y}px`;
}

alien.addEventListener('click', () => {
  score++;
  scoreDisplay.textContent = score;
});

alien.addEventListener('dblclick', () => {
  score += 5;
  scoreDisplay.textContent = score;
});

alien.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  alert('👽 Secret right-click action!');
});

startBtn.addEventListener('click', () => {
  clearInterval(gameInterval);
  gameInterval = setInterval(randomPosition, 1500);
  randomPosition();
  score = 0;
  scoreDisplay.textContent = score;
});

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

accordionBtn.addEventListener('click', () => {
  accordionContent.style.display = accordionContent.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') alien.style.top = `${alien.offsetTop - 20}px`;
  if (e.key === 'ArrowDown') alien.style.top = `${alien.offsetTop + 20}px`;
  if (e.key === 'ArrowLeft') alien.style.left = `${alien.offsetLeft - 20}px`;
  if (e.key === 'ArrowRight') alien.style.left = `${alien.offsetLeft + 20}px`;
});

form.addEventListener('input', () => {
  if (password.value.length < 8) {
    formFeedback.textContent = 'Password must be at least 8 characters';
  } else {
    formFeedback.textContent = '';
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!username.value || !email.value || !password.value) {
    formFeedback.textContent = 'Please fill in all fields';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    formFeedback.textContent = 'Invalid email format';
    return;
  }

  if (password.value.length < 8) {
    formFeedback.textContent = 'Password too short';
    return;
  }

  formFeedback.style.color = 'green';
  formFeedback.textContent = 'Success! 🎉';
});
