import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

interface Member {
  id: number;
  displayName: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private http = inject(HttpClient);

  protected title = 'Dating App';

  protected members = signal<Member[]>([]);

  async ngOnInit(): Promise<void> {
    this.members.set(await this.getMembers());
  }

  async getMembers(): Promise<Member[]> {
    try {
      return await lastValueFrom(
        this.http.get<Member[]>('https://localhost:5001/api/members')
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}