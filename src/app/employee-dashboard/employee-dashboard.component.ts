import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})

export class EmployeeDashboardComponent implements OnInit {
  formValue !: FormGroup
  showAdd!: boolean;
  showUpdate!: boolean;
  employeeModelObj: EmployeeModel = new EmployeeModel()
  employeeData: any;

  constructor(private formbuider: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuider.group({
      name: [''],
      gender: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    })
    this.getAllEmployeeData()

  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.gender = this.formValue.value.gender;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.api.postEmployee(this.employeeModelObj).subscribe(res => {
      console.log(res);
      alert("Employee added Successfully");
      this.getAllEmployeeData()
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
    },
      err => {
        alert("Something went wrong")
      })
  }
  getAllEmployeeData() {
    this.api.getEmployee().subscribe(res => {
      this.employeeData = res;
    })
  }
  deleteEmployeeData(data: any) {
    this.api.deleteEmployee(data.id).subscribe(res => {
      alert("Employee data deleted")
      this.getAllEmployeeData()
    })
  }
  onEdit(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name)
    this.formValue.controls['gender'].setValue(data.gender)
    this.formValue.controls['email'].setValue(data.email)
    this.formValue.controls['mobile'].setValue(data.mobile)
    this.formValue.controls['salary'].setValue(data.salary)
  }
  
  updateEmployeeDetails() {
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.gender = this.formValue.value.gender;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id).subscribe(res => {
      alert("Update Successfully")
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
      this.getAllEmployeeData()
    })
  }
}
