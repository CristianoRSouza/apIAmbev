import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiUrl = 'https://localhost:7181';

  constructor() { }

}
