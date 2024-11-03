document.addEventListener('DOMContentLoaded', () => {
  // Confirm password warning
  const pw = document.getElementById('signupPassword');
  const pwCon = document.getElementById('signupConfirmPassword');
  const warning = document.getElementById('confirmPasswordWarning');
  const signupForm = document.getElementById('signupForm');
  let isError = false;

  pwCon.addEventListener('input', e => {
    if (e.target.value !== pw.value) {
      warning.classList.remove('d-none');
      pwCon.classList.add('border-danger');
      isError = true;
    } else {
      warning.classList.add('d-none');
      pwCon.classList.remove('border-danger');
      isError = false;
    }
  });
  signupForm.addEventListener('submit', e => {
    if (isError) {
      e.preventDefault();
      alert('Password did not match!');
    }
  });

  // Change form message on tab click
  const message = document.getElementById('welcomeMessage');
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  loginBtn.addEventListener('click', () => {
    message.innerText = 'Welcome back';
  });
  signupBtn.addEventListener('click', () => {
    message.innerText = 'Register new account';
  });

  // Load active pane based on pathname
  const signupTab = document.getElementById('signup');
  const loginTab = document.getElementById('login');
  const path = window.location.pathname;
  if (path === '/signup') {
    loginBtn.classList.remove('active');
    signupBtn.classList.add('active');
    loginTab.classList.remove('show', 'active');
    signupTab.classList.add('show', 'active');
    message.innerText = 'Register new account';
  }
});
