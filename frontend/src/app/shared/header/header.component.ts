import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    private router = inject(Router);
    private userService = inject(UserService);

    user$ = this.userService.returnUser();

    redirectHome() {
        this.router.navigate(['/']);
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['/']);
    }
}
