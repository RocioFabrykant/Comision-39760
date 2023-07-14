export default class UserDto{
//mostrar info no sensible
    constructor(user){
        this.name = `${user.first_name} ${user.last_name}`
        this.age = `${user.age}`
        this.role = `${user.role}`
        this.email = `${user.email}`
    }
}