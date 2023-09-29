import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators,  } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

import * as alertyfy from 'alertifyjs'
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm: FormGroup;
  user:User;
  userSubmittted:boolean;;
  constructor(private fb:FormBuilder,
              private userService:UserService,
              private alertyfy:AlertyfyService) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)])
    }, this.passwordMatchingValidator)
    // this.createRegisterationForm();
  }
  
  // createRegisterationForm(){
  //   this.registrationForm = this.fb.group({
  //     userName:  [null, Validators.required],
  //     email: [null,[Validators.required, Validators.email]],
  //     password:[null,[Validators.required,Validators.minLength(8)]],
  //     confirmPassword:[null, [Validators.required]],
  //     mobile: [null, [Validators.required, Validators.maxLength(10)]]
  //   },{Validators:  this.passwordMatchingValidator});
  

  passwordMatchingValidator(fg: AbstractControl): ValidationErrors | null {
    return fg.get('password')?.value === fg.get('confirmPassword')?.value ? null :
      { notmatched: true }
  };

  onSubmit(){

    console.log(this.registrationForm.value);
    this.userSubmittted  = true;
    if(this.registrationForm.valid){
      // this.user = Object.assign(this.user, this.registrationForm.value);
      this.userService.addUser(this.userData());
      this.registrationForm.reset();
      this.userSubmittted = false;
      this.alertyfy.success("Congrats,You are successfully registered")
    }else{
      this.alertyfy.error("Kindly provide the required fields")
    }
  
  }

  userData(): User {
    return this.user ={
      userName: this.userName.value,
      email:this.email.value,
      password:this.password.value,
      mobile:this.mobile.value
    }
  }
  // getter method for all form controls
  get userName(){
    return this.registrationForm.get('userName') as FormControl
  }

  get email(){
    return this.registrationForm.get('email') as FormControl
  }
  get password(){
    return this.registrationForm.get('password') as FormControl
  }
  get confirmPassword(){
    return this.registrationForm.get('confirmPassword') as FormControl
  }
  get mobile(){
    return this.registrationForm.get('mobile') as FormControl
  }

 

 
}
