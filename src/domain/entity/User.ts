export default class User {

    constructor(private id: string,
                private name: string) {
    }

}

export const newUser = (user: IUser): User => {
    return new User(user.id, user.name);
}

export interface IUser {
    id: string,
    name: string
}