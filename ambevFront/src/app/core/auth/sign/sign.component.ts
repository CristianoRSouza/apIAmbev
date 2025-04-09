import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PoLanguage, PoModule, PoNotificationService } from '@po-ui/ng-components';
import { AuthService } from '../auth.service';
import { PoPageLoginLiterals, PoTemplatesModule } from '@po-ui/ng-templates';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css'],
  imports: [PoModule, PoTemplatesModule],
})
export class SignComponent {
  languages: PoLanguage[] = [
    {
      language: 'pt-BR',
      description: 'Português'
    }
  ];

  literals: PoPageLoginLiterals = {
    welcome: 'Ambev Front'
  };
  router: Router = inject(Router);
  http: HttpClient = inject(HttpClient);
  authService: AuthService = inject(AuthService);
  notification: PoNotificationService = inject(PoNotificationService);
  loading = false;

  submit(event: { login: string; password: string }) {
    this.onLoginSubmit({ email: event.login, password: event.password });
  }

  onLoginSubmit(data: { email: string; password: string }) {
    this.loading = true;
    this.authService.login(data).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      complete: () => this.loading = false
    });
  }

}
