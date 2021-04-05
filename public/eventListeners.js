// console.log("hey hey");

async function addArtwork(event) {
    event.preventDefault();

    const title_artwork = document.querySelector('#title-artwork').value.trim();
    const grade_value = document.querySelector('#grade-select').value.trim();

    var form = document.getElementById("add-artwork");
    var formData = new FormData(form);
    const response = await fetch('/api/post/upload', {
        method: 'POST',
        body: formData
    });
    if (response.ok) {
        console.log('success');

        // document.location.replace('/');
    } else {
        alert(response.statusText);
    }

    console.log(title_artwork, grade_value);
}



// function addArtwork(event) {
//     event.preventDefault();
//     const title_artwork = document.querySelector('#title-artwork').value.trim();
//     const grade_value = document.querySelector('#grade-select').value.trim();
//     console.log(title_artwork);
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

document
    .querySelector("#add-artwork")
    .addEventListener("submit", addArtwork);