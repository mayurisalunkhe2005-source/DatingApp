import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { AccountService } from './account-service';
import { Home } from "./features/home/home";

interface User {
  id: number;
  displayName: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accountService = inject(AccountService);

  private http = inject(HttpClient);

  protected title = 'Dating App';

  protected members = signal<User[]>([]);

  async ngOnInit(): Promise<void> {
    this.setCurrentUser();
    this.members.set(await this.getMembers());
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
    }
  
  async getMembers(): Promise<User[]> {
    try {
      return await lastValueFrom(
        this.http.get<User[]>('https://localhost:5001/api/members')
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}