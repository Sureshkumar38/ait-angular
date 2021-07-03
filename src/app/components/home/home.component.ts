import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ItemsArray: any;
  profileForm: FormGroup | any;
  inputFirstName: any;
  inputEmail: any;
  inputImageUrl: any;
  inputId: any;
  inputLastName: any;
  isedit = false;
  isDelete = false;
  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.profileForm = new FormGroup({
      Id: new FormControl(''),
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      Email: new FormControl('', Validators.required),
      ImageUrl: new FormControl('', Validators.required)
    });

  }

  ngOnInit() {
    this.userService.getUserLists().subscribe((data) => {
      this.ItemsArray = data.data;
    })
  }

  edit(item) {
    this.inputId = item.id;
    this.inputFirstName = item.first_name;
    this.inputLastName = item.last_name;
    this.inputEmail = item.email;
    this.inputImageUrl = item.avatar;
    this.isedit = true;
  }

  delete(item) {
    this.inputId = item.id;
    this.inputFirstName = item.first_name;
    this.inputLastName = item.last_name;
    this.inputEmail = item.email;
    this.inputImageUrl = item.avatar;
    this.isDelete = true;
    this.userService.deleteUserLists(item);
    window.alert('Data delete Successfully!');
    this.profileForm.reset();
  }

  submitbtn() {    
    if (this.profileForm.valid) {
      if (this.isedit) {
        const data = this.profileForm.value;
        this.userService.updateUserLists(data);
        this.isedit = false;
        window.alert('Data Edit Successfully!');
        this.profileForm.reset();
      }
      else {
        const data = this.profileForm.value;
        this.userService.createUser(data);
        this.isedit = false;
        window.alert('Data Saved Successfully!');
        this.profileForm.reset();
      }
    }
    else{
      window.alert('Check the given value');
    }
  }

}
