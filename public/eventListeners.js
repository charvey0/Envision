

function addArtwork(event) {
    event.preventDefault();
    const title_artwork = document.querySelector('#title-artwork').value.trim();
    const grade_value = document.querySelector('#grade-select').value.trim();
    console.log(title_artwork);
}
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
console.log("hey hey");
document
    .querySelector("#add-artwork")
    .addEventListener("submit", addArtwork);