import { Faculty } from './faculty';

export class User {
    userId: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    faculty: Faculty;
    role: string;

    constructor( userId: number,
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        faculty: Faculty,
        role: string) {
            this.userId = userId;
            this.email = email;
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
            this.faculty = faculty;
            this.role = role;
        }
}
