const form = document.getElementById('registerForm');

 

form.addEventListener('submit',async e => {

    e.preventDefault();

    const data = new FormData(form);

    const obj = {};

    data.forEach((value, key) => obj[key] = value);

    fetch('/api/auth/register', {

        method: 'POST',

        body: JSON.stringify(obj),

        headers: {
            'Content-Type': 'application/json'

        }

    }).then(result => {

        if (result.status === 200) {
            window.alert('Registro exitoso')

        }else if(result.status === 400){
            window.alert('Registro invalido. Complete los campos requeridos')
        }else if(result.status === 401){
            window.alert('Usuario existente')}        
    });

    
 

})