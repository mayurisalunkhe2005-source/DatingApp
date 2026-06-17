import { Component, signal, Input } from '@angular/core';
import { Register } from '../account/register/register';

interface User {
  id: number;
  displayName: string;
}

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected registerMode = signal(false);

  showRegister(value : boolean) {
    this.registerMode.set(value);
  }
}