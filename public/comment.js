const commentFormHandler = async (event) => {
  event.preventDefault();
  console.log('tell me it listened');
  // if (event.target.hasAttribute('data-id')) {
  const artwork_id = event.target.getAttribute('data-id');
  const comment_text = document.querySelector('.textarea').value.trim();
  // const artwork_id = 1;
  console.log(artwork_id);
  console.log(comment_text);

  const response = await fetch(`/api/artwork/post/comment/${artwork_id}`, {
    method: 'POST',
    body: JSON.stringify({
      artwork_id,
      comment_text,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log('hey, look');
    document.location.replace(`/api/artwork/${artwork_id}`);
  } else {
    console.log(response);
    alert('Failed to post a comment');

  }
  // }
}

document
  .querySelector('.post-comment-btn')
  .addEventListener('click', commentFormHandler);

//CHANGE SELECTORS IF NAMED DIFFERENTLY OR NOT USING FORM INPUTS
// const comment_text = document.querySelector('.textarea').value.trim();

// const artwork_id = window.location.toString().split('/')[
//   window.location.toString().split('/').length - 1
// ];

// if (comment_text) {
//   const response = await fetch('/api/comment/post', {
//     method: 'POST',
//     body: JSON.stringify({
//       artwork_id,
//       comment_text,
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   if (response.ok) {
//     document.location.reload();
//   } else {
//     alert(response.statusText);
//     document.querySelector('#comment-form').style.display = 'block';
//   }
// }