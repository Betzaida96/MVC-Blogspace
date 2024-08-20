document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login-form');
  const signupForm = document.querySelector('.signup-form');

  // Check if the login form exists before adding the event listener
  if (loginForm) {
    loginForm.addEventListener('submit', loginFormHandler);
  }

  // Check if the signup form exists before adding the event listener
  if (signupForm) {
    signupForm.addEventListener('submit', signupFormHandler);
  }
});

// Handler for login form submission
const loginFormHandler = async (event) => {
  event.preventDefault();

  // collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (response.ok) {
      document.location.replace('/');
    } else {
      const responseData = await response.json(); // Parse the JSON response
      console.error('Login failed:', responseData);
      alert(responseData.message || 'Failed to log in. Please try again.');
    }
  }
};

// Handler for signup form submission
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const name = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json'},
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};