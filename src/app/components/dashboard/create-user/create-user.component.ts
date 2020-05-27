import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  @Input() CurrentUserData: {
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: ''
    Status: ''
  };
  @Output() messageToEmit = new EventEmitter<string>();
  @ViewChild('CloseModal', { static: false }) CloseModal: ElementRef;
  @Input() toUpdate = 'false';
  public showSucessMessage: boolean;
  public serverErrorMessages: string;
  public SignUpForm: FormGroup;
  public FirstName: FormControl;
  public LastName: FormControl;
  public Email: FormControl;
  public Phone: FormControl;
  public Status: FormControl;
  constructor(public userService: UserService, protected router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    console.log(this.CurrentUserData.Status);
  }

  createFormControls(data = this.CurrentUserData) {
    this.FirstName = new FormControl(data.FirstName, [Validators.required, Validators.pattern('[a-zA-z ]+')]);
    this.LastName = new FormControl(data.LastName, [Validators.required, Validators.pattern('[a-zA-z ]+')]);
    this.Email = new FormControl(data.Email, [Validators.required, Validators.pattern('[A-Za-z0-9]{3,}(?!.*([._%+-])\\1)([a-zA-Z0-9._%+-]*[a-zA-Z0-9])@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]);
    this.Phone = new FormControl(data.Phone, [Validators.required, Validators.pattern('[6-9]{1}[0-9]{9}')]);
    this.Status = new FormControl(data.Status, [Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.minLength(6), Validators.maxLength(8)]);
  }

  createForm() {
    this.SignUpForm = this.fb.group({
      FirstName: this.FirstName,
      LastName: this.LastName,
      Email: this.Email,
      Phone: this.Phone,
      Status: this.Status
    });
  }

  onSubmit() {
    if (this.SignUpForm.valid) {
      if (this.toUpdate === 'true') {
        this.updateUserDetails();
      } else {
        this.createUser();
      }
    }
  }

  updateUserDetails() {
    const data = {
      ...this.CurrentUserData,
      Email: this.Email.value,
      FirstName: this.FirstName.value,
      LastName: this.LastName.value,
      Phone: this.Phone.value,
      Status: this.Status.value
    };

    this.userService.UpdateUserDetails(data).subscribe((res) => {
      this.resetForm('Updated');
    });
  }


  createUser() {
    const data = {
      ...this.SignUpForm.value,
      id: `EH-${this.randomIdGenerator()}`
    };
    this.userService.createUser(data).subscribe((res) => {
      this.resetForm('Created');
    });
  }

  randomIdGenerator() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  resetForm(args) {
    this.userService.refreshData();
    alert(`User ${args} successfully`);
    this.SignUpForm.reset();
    this.SignUpForm.markAsUntouched();
    this.serverErrorMessages = '';
    this.CloseModal.nativeElement.click();
  }

  CloseUserModal() {
    this.messageToEmit.emit('close');
  }

}
