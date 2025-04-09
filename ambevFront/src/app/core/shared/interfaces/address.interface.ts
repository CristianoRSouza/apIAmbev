import { Geolocation } from './geolocation.interface';

export interface Address {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: Geolocation;
}