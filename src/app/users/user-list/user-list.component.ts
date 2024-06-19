import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = Object.keys(localStorage)
      .filter(key => key.includes('@'))
      .map(key => JSON.parse(localStorage.getItem(key)!));
  }

  navigateToAddUser(): void {
    this.router.navigate(['/users/add']);
  }

  navigateToEditUser(email: string): void {
    this.router.navigate(['/users/edit', email]);
  }

  deleteUser(email: string): void {
    localStorage.removeItem(email);
    this.loadUsers();
  }
}
