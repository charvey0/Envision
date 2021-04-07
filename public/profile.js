const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#artwork-name').value.trim();
  const description = document.querySelector('#artwork-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/artwork`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create artwork');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete artwork');
    }
  }
};

document
  .querySelector('.new-artwork-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.artwork-list')
  .addEventListener('click', delButtonHandler);
