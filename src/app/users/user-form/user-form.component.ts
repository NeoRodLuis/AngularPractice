import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: any = { name: '', email: '', password: '', role: 'Recepcionista', createdAt: new Date().toISOString() };
  confirmPassword: string = '';
  isEditMode: boolean = false;
  successMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      this.isEditMode = true;
      const userData = localStorage.getItem(email);
      if (userData) {
        this.user = JSON.parse(userData);
        this.user.password = '';
      }
    }
  }

  onSubmit(): void {
    if (this.user.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log(this.user.name);
    this.user.createdAt = this.user.createdAt || new Date().toISOString();
    localStorage.setItem(this.user.email, JSON.stringify(this.user));
    this.successMessage = this.isEditMode ? 'Usuario actualizado correctamente' : 'Usuario agregado correctamente';
    setTimeout(() => this.router.navigate(['/users']), 2000);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.user.profileImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
