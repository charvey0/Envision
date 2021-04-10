// console.log("hey hey");

async function changePicture(event) {
    event.preventDefault();
    console.log("started");
    if (event.target.hasAttribute('data-id')) {
        const user_id = event.target.getAttribute('data-id');
        console.log(user_id);
        const formData = new FormData();
        formData.append('file', document.querySelector('#uploadImg').files[0]);

        if (!formData) {
            console.log("bad happened");
        } else {
            console.log(formData);
        }
        const response = await fetch(`/api/users/profile-img-upload/${user_id}`, {
            method: 'PUT',
            body:
                formData,
        });
        if (response.ok) {
            console.log('success, img uploaded');
            // Relocate to artworks
            document.location.replace('/api/users/profile-img');
            // succesSubmited()
        } else {
            alert(response.statusText);

        }
    } else {
        console.log("attribute doesn't have a value");
    }


}




document
    .querySelector("#add-artwork")
    .addEventListener("submit", changePicture);
