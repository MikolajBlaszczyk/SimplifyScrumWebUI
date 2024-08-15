
export class User {
    Username: string = "";
    Password: string = "";
    Email: string = "";
    Nickname: string = "";
    Role: number = 0;


    constructor(username: string, password: string, email: string = "", nickname: string = "", role: number = 0) {
        this.Username = username
        this.Password = password
        this.Email = email
        this.Nickname = nickname
        this.Role = role
    }
}
