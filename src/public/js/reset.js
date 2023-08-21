const form = document.getElementById('resetForm');



form.addEventListener('submit', async e => {

    e.preventDefault();

    const data = new FormData(form);

    const obj = {};

    data.forEach((value, key) => obj[key] = value);
    fetch('/api/users/password-link', {

        method: 'POST',

        body: JSON.stringify(obj),

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }

    }).then(result => {

        if (result.status === 200) {
            window.alert('Correo enviado')

        }else {
            window.alert('Error')
        }

    })

})