import { HttpClient } from '@angular/common/http';
import { Directive, inject } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';

type ControllType = AbstractControl<any, any> | null

@Directive()
export abstract class BaseComponente {
  public form!: FormGroup;
  public fb: FormBuilder = inject(FormBuilder);
  public router: Router = inject(Router);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public loading: boolean = false;
  public http: HttpClient = inject(HttpClient);
  public notification: PoNotificationService = inject(PoNotificationService);
  public _order: string = '';
  public _page: number = 1;
  public _size: number = 10;
  public _currentPage: number = 1;
  public _totalItems: number = 0;

  public redirectTo(route: string, back_route: boolean = false): void {
    if (back_route) {
      window.history.back();
      return;
    }

    this.router.navigate([route]);
  }

  public isErrorRequired(controll_name: string) {
    return this.getControll(controll_name)?.errors?.['required']
  }

  get formControlls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public validateFirstInvalidField() {
    const form = this.form;
    console.log(form)
    for (const field of Object.keys(form.controls)) {
      const control = form.get(field);

      if (control && control.invalid) {
        control.markAsTouched();
        control.updateValueAndValidity();
        break;
      }
    }
  }

  private getControll(control: string): ControllType {
    return this.form.get(control);
  }
}
