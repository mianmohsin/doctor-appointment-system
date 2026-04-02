import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false, // Matches your module-based setup
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // States
  view: 'login' | 'register' = 'login';
  role: 'doctor' | 'patient' = 'doctor';
  isLoading = false;

  // Form Data (Bound to the HTML [(ngModel)])
  formData = {
    name: '',
    identifier: '', // This is the 'Username' field in the HTML
    password: ''
  };

  constructor(private router: Router) { }

  // This method is called by (submit)="submit()" in the HTML
  submit() {
    if (this.view === 'login') {
      this.performLogin();
    } else {
      this.performRegister();
    }
  }

  private performLogin() {
    this.isLoading = true;

    // Simulate API delay
    setTimeout(() => {
      const authenticatedUser = this.fakeAuthenticate(this.formData.identifier, this.formData.password);

      if (authenticatedUser) {
        // --- NEW SECURITY CHECK ---
        // Check if the user's role matches the tab currently selected in the UI
        if (authenticatedUser.role !== this.role) {
          alert(`Access Denied: This account is registered as a ${authenticatedUser.role}. Please select the correct tab.`);
          this.isLoading = false;
          return; // Stop the login process
        }

        // --- SUCCESSFUL REDIRECT ---
        if (authenticatedUser.role === 'doctor') {
          this.router.navigate(['/doctor/dashboard']);
        } else if (authenticatedUser.role === 'patient') {
          this.router.navigate(['/patient/dashboard']);
        }

      } else {
        alert('Invalid credentials. Please check your username and password.');
      }

      this.isLoading = false;
    }, 1500);
  }

  private performRegister() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      alert('Registration successful! Check your phone/email to set your password.');
      this.view = 'login'; // Switch back to login after "registering"
    }, 1500);
  }

  private fakeAuthenticate(username: string, password: string) {
    const users = [
      { username: 'doctor', password: '123', role: 'doctor' },
      { username: 'patient', password: '123', role: 'patient' },
    ];

    return users.find(u => u.username === username && u.password === password);
  }

  setRole(newRole: 'doctor' | 'patient') {
    this.role = newRole;
    // If we switch to doctor, force the view to login (since doctors can't register)
    if (newRole === 'doctor') {
      this.view = 'login';
    }
  }
}
