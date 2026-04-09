import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-create-policy',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-policy.component.html'
})
export class CreatePolicyComponent implements OnInit {
  policyForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.policyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      policy_no: ['', Validators.required],
      type: ['Auto', Validators.required],
      status: ['ACTIVE', Validators.required],
      limit: ['', [Validators.required, Validators.min(0)]],
      deductible: ['', [Validators.required, Validators.min(0)]],
      premium: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.policyForm.valid) {
      console.log('New Policy Data:', this.policyForm.value);
      // Here you would call your Laravel API
      // this.api.post('/policies', this.policyForm.value)...

      // Redirect after success
      this.router.navigate(['/admin/insurance/policies/policy-list']);
    } else {
      // Mark all as touched to show errors
      this.policyForm.markAllAsTouched();
    }
  }
}
