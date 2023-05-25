import { Component, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithRedirect } from '@angular/fire/auth';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private readonly auth = inject(Auth);

  constructor(private readonly AuthService: AuthService){}

  public login(){
    signInWithRedirect(this.auth, new GoogleAuthProvider());
  }

}
