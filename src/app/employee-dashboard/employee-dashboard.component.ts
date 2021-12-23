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
  employeeModelObj:EmployeeModel=new EmployeeModel()
  employeeData:any;

  constructor(private formbuider: FormBuilder,private api: ApiService) { }

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
  postEmployeeDetails(){
    this.employeeModelObj.name=this.formValue.value.name;
    this.employeeModelObj.gender=this.formValue.value.gender;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;
    this.api.postEmployee(this.employeeModelObj).subscribe(res=>{
      console.log(res);
      alert("Employee added Successfully")
      let ref=document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
    },
    err=>{
      alert("Something went wrong")
    })
  }
  getAllEmployeeData(){
    this.api. getEmployee().subscribe(res=>{
      this.employeeData=res;
    })
  }
}
