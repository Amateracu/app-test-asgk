import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AUTH_ROUTE } from 'src/app/shared/constants/routing.const';
import { IAuth } from 'src/app/shared/interfaces/auth.interface';
import { AuthService } from 'src/app/shared/services/api/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent {
  public form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    const user: IAuth = {
      login: this.form.value.login,
      password: this.form.value.password,
    };
    this.authService
      .login(user)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe(() => {
        this.form.reset();
        this.router.navigate(['/main', AUTH_ROUTE.path]);
      });
  }
}
