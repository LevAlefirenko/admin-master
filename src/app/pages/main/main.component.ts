import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LINKS } from './main.constants';
import { AuthService } from '../../core/auth/auth.service';
import { AdminService } from '../../admin/admin.service';
import { Observable } from 'rxjs';
import { Admin } from '../../models';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
    public linksData = LINKS;

    public admin$: Observable<Admin>;

    constructor(private auth: AuthService, private adminService: AdminService) {
        this.admin$ = this.adminService.admin$;
    }

    logout() {
        this.auth.logout();
    }
}
