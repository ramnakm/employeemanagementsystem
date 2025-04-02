import { Component,OnInit } from '@angular/core';
import { EmployeeDetailsFormComponent } from "./employee-details-form/employee-details-form.component";
import { NgFor } from '@angular/common';
import { EmployeeDetailService } from '../shared/employee-detail.service';
import { EmployeeDetail } from '../shared/employee-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-details',
  imports: [EmployeeDetailsFormComponent, NgFor],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {
  constructor(public service: EmployeeDetailService, private toastr: ToastrService){}
  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: EmployeeDetail){
    this.service.formData = Object.assign({},selectedRecord);
  }

  onDelete(id: string){
    this.service.deleteEmployeeDetail(id).subscribe({
      next: res => {
        this.service.refreshList();
        this.toastr.success("Employee Deleted Successfully", "Employee Details Register")
      },
      error: err => {console.log(err)}
    })
  }
}
