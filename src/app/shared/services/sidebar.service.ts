// sidebar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  // Use a BehaviorSubject to hold the state
  private isOpenSubject = new BehaviorSubject<boolean>(false);

  // Expose it as an Observable
  isOpen$ = this.isOpenSubject.asObservable();

  toggle() {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  close() {
    this.isOpenSubject.next(false);
  }
}
