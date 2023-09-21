const form = document.getElementById('newPassForm');



form.addEventListener('submit', async e => {

    e.preventDefault();

    const data = new FormData(form);

    const obj = {};

    data.forEach((value, key) => obj[key] = value);
    fetch('/api/users/reset-password', {

        method: 'POST',

        body: JSON.stringify(obj),

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

    }).then(result => {

        if (result.status === 200) {

            window.alert('Contraseña modificada')


        } else if (result.status === 403) {
            window.alert('El link ha expirado')
            window.location.replace('/api/users/link-password');
        } else if (result.status === 401) {
            window.alert('Debe seleccionar una nueva contraseña')
        }

    })

})