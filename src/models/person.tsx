export default class Persons {
    id?: string;
    first_name: string;
    last_name: string;
    age: number;

    constructor(id: string, first_name: string, last_name: string, age: number) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.age = age;
    }
}