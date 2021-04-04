async function deleteArtworkHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/Artwork/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      artwork_id: id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/profile/');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.delete-artwork-btn')
  .addEventListener('click', deleteArtworkHandler);
