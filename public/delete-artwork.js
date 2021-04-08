// async function deleteArtworkHandler(event) {
//   event.preventDefault();

//   // const id = window.location.toString().split('/')[
//   //   window.location.toString().split('/').length - 1
//   // ];
//   console.log('hello');
//   console.log(id);

//   // const response = await fetch(`/api/post/${id}`, {
//   //   method: 'DELETE',
//   //   body: JSON.stringify({
//   //     artwork_id: id,
//   //   }),
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //   },
//   // });

//   if (response.ok) {
//     document.location.replace('/api/users/artworks');
//   } else {
//     alert(response.statusText);
//   }
// }

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log('hello');
    console.log(id);
    const response = await fetch(`/api/post-artwork/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/api/users/my-artworks');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.artwork-list')
  .addEventListener('click', delButtonHandler);

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/post/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/');
//     } else {
//       alert('Failed to delete artwork');
//     }
//   }
// };

// document
//   .querySelector('#delete-btn')
//   .addEventListener('click', delButtonHandler);
