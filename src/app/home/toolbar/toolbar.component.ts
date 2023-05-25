import { Component, inject } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  public readonly user = this.auth.currentUser;

  async signOut(event: MouseEvent): Promise<void>{
    const button = event.target as HTMLButtonElement
    try {
      button.disabled = true
      await signOut(this.auth)
      await this.router.navigate(['login'])
    } finally {
      button.disabled = false
    }
    console.log('signOut')
  }
}
