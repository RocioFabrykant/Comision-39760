
async function changeRol (element){
    const user = element.closest(".user");
    const idItem = user.querySelector("#user_id").textContent;
    const rol = user.querySelector('#rolSelect').value;
    await fetch(`/api/users/update/rol/${idItem}/${rol}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${document.cookie['coderCookieToken']}`
                },
                body: JSON.stringify({
                    "rol": rol
                })
            }).then(result => {

                if (result.status === 200) {
                    window.alert('Cambio de rol exitoso')
        
                }else if(result.status === 201){
                    window.alert('El usuario ya tiene ese rol')
                }
            });

}
async function deleteUser (element){
    const user = element.closest(".user");
    const idItem = user.querySelector("#user_id").textContent;
    await fetch(`/api/users/delete/${idItem}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `${document.cookie['coderCookieToken']}`
                },
                body: JSON.stringify({
                    "id": idItem
                })
            }).then(result => {

                if (result.status === 200) {
                    window.alert('Usuario eliminado')
        
                }
            });
        }
