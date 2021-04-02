async function signupFormHandler(event) {
  event.preventDefault();

  const firstName = document.querySelector('#first-name').value.trim();
  const lastName = document.querySelector('#last-name').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const role = document.querySelector('#role-select').value.trim();

  if (email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        role,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      console.log('success');

      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  console.log(firstName, lastName, email, role);
}

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
