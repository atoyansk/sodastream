import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  faEnvelope = faEnvelope;
  faKey = faKey;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
