import { Component, OnInit } from '@angular/core';
import { FirebaseLoginService } from '../../services/firebase-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public fire : FirebaseLoginService) { }

  ngOnInit(): void {
  }

}
