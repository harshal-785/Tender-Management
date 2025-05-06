import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent} from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, NavbarComponent, SidebarComponent],
  standalone: true
})
export class AppComponent {
  title = 'tender-dashboard';
}