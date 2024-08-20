document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login-form');
  const signupForm = document.querySelector('.signup-form');

  // Check if the login form exists before adding the event listener
  if (loginForm) {
    loginForm.addEventListener('submit', loginFormHandler);
  }

  // Check if the signup form exists before adding the event listener
  if (signupForm) {
    signupForm.addEventListener('sibmit', signupFormHandler);
  }
});

// Handler for login form submission
const loginFormHandler = async (event) => {
  event.preventDefault();

  // collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

// Handler for signup form submission
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json'},
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};