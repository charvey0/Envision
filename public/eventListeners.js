// console.log("hey hey");

async function addArtwork(event) {
    event.preventDefault();

    const artwork_title = document.querySelector('#artwork-title').value.trim();
    const grade_value = document.querySelector('#grade-value').value.trim();
    const artwork_links = document.querySelector('#artwork-links').value.trim();
    const description_artwork = document.querySelector('#description-artwork').value.trim();

    // var form = document.getElementById("add-artwork");
    // var formData = new FormData(form);

    const response = await fetch('/api/post/submit', {
        method: 'POST',
        body: JSON.stringify({
            artwork_title,
            grade_value,
            artwork_links,
            description_artwork
        }),
        // formData,
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        console.log('success');
        // Relocate to artworks
        // document.location.replace('/');
    } else {
        alert(response.statusText);
    }
    console.log(`${artwork_title}\n${grade_value}\n${artwork_links}\n${description_artwork}`);
}

document
    .querySelector("#add-artwork")
    .addEventListener("submit", addArtwork);





// async function addArtwork(event) {
//     event.preventDefault();
//     const artwork_title = document.querySelector('#artwork-title').value.trim();
//     const grade_value = document.querySelector('#grade-value').value.trim();
//     var form = document.getElementById("add-artwork");
//     var formData = new FormData(form);
//     const response = await fetch('/api/post/upload', {
//         method: 'POST',
//         body:
//             // {
//             formData,
//         // artwork_title,
//         // grade_value
//         // },
//         // headers: { 'Content-Type': 'application/json' },
//     });
//     if (response.ok) {
//         console.log('success');
//         // document.location.replace('/');
//     } else {
//         alert(response.statusText);
//     }
//     console.log(artwork_title, grade_value);
// }



// function addArtwork(event) {
//     event.preventDefault();
//     const artwork_title = document.querySelector('#artwork-title').value.trim();
//     const grade_value = document.querySelector('#grade-value').value.trim();
//     console.log(artwork_title);
// }
// async function addArtwork(event) {
//     event.preventDefault();
//     console.log("hey");
//     const file = document.getElementById('#uploadFile').files[0];
//     const upload = await fetch(`/api/post`, {
//         method: "POST",
//         body: file
//     })
//     if (upload.ok) {
//         document.location.replace("/");
//     } else {
//         alert(upload.statusText);
//     }
// }

// document
//     .querySelector("#add-artwork")
//     .addEventListener("submit", addArtwork);