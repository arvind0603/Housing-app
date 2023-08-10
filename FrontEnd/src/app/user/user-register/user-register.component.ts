import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {


  registrationForm!: FormGroup;
  user: any = {};

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.registrationForm = new FormGroup({
    //   userName: new FormControl('mark', Validators.required),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //   confirmPassword: new FormControl(null, Validators.required),
    //   mobile: new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)])

    // }, this.passwordMatchingValidator);
    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]]
    }, {Validators: this.passwordMatchingValidator})
}

  passwordMatchingValidator(fg: AbstractControl): Validators | null {
    return fg.get('password')?.value === fg.get('confirmPassword')?.value ? null :
    {notmatched: true }

  }

  get userName() {
    return this.registrationForm.get('userName') as FormControl;
  }

  get email() {
    return this.registrationForm.get('email') as FormControl;
  }

  get password() {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get mobile() {
    return this.registrationForm.get('mobile') as FormControl;
  }

  onSubmit() {
    console.log (this.registrationForm);
    this.user = Object.assign(this.user, this.registrationForm.value);
    this.addUser(this.user);
    this.registrationForm.reset();
    }

    addUser(user: any){
      let users = [];
      if(localStorage.getItem('Users')){
        const storedUsers = localStorage.getItem('Users');
        if(storedUsers!==null){
          users = JSON.parse(storedUsers);
        }
        users = [this.user, ...users];
      }else{
        users = [user];
      }
      localStorage.setItem('Users', JSON.stringify(users));
    }

}
