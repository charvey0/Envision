async function commentFormHandler(event) {
  event.preventDefault();

  //CHANGE SELECTORS IF NAMED DIFFERENTLY OR NOT USING FORM INPUTS
  const comment_text = document
    .querySelector('input[name="comment-body"]')
    .value.trim();

  const artwork_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (comment_text) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        artwork_id,
        comment_text,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
      document.querySelector('#comment-form').style.display = 'block';
    }
  }
}

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);
