import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policy-list',
  standalone: false,
  templateUrl: './policy-list.component.html',
  styleUrl: './policy-list.component.css'
})

export class PolicyListComponent {

  constructor(public router: Router){}

  bookpolicy(){
    this.router.navigate(['/admin/insurance/policies/create-policy']);
  }

  policydetail(){
    this.router.navigate(['/admin/insurance/policies/policy-detail']);
  }

}
