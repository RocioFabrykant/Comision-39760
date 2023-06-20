const form = document.getElementById('loginForm');



form.addEventListener('submit', async e => {

    e.preventDefault();

    const data = new FormData(form);

    const obj = {};

    data.forEach((value, key) => obj[key] = value);
    fetch('/api/auth/login', {

        method: 'POST',

        body: JSON.stringify(obj),

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }

    }).then(result => {

        if (result.status === 200) {

            window.location.replace('/api/auth/current');
            window.alert('Login exitoso')

        }else if(result.status === 401){
            window.alert('Login invalido')
        }

    })

})