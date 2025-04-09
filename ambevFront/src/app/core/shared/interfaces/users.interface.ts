import { Role } from "../enum/role.enum";
import { Status } from "../enum/status.enum";
import { Address } from "./address.interface";

interface Name {
    firstname: string;
    lastname: string;
}

export interface User {
    id: string;
    email: string;
    username: string;
    password: string;
    name: Name;
    address: Address;
    phone: string;
    status: Status;
    role: Role;
}
