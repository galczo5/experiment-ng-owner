import {Component} from '@angular/core';
import 'ng-owner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  owners: ['John Doe', 'Anne']
})
export class AppComponent {
  title = 'ng-owner-extension';
}
