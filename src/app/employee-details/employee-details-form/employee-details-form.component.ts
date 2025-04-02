import { Component } from '@angular/core';
import { EmployeeDetailService } from '../../shared/employee-detail.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-employee-details-form',
  imports: [FormsModule],
  templateUrl: './employee-details-form.component.html',
  styleUrl: './employee-details-form.component.css'
})
export class EmployeeDetailsFormComponent {
  constructor(public service: EmployeeDetailService, private toastr: ToastrService){}

  onSubmit(form: NgForm){
    this.service.formSubmitted = true;
    if(form.valid)
    {
      if(this.service.formData.id==""){
        this.insertRecord(form);
      } else{
        this.updateRecord(form);
      } 
    }
  }
  insertRecord(form: NgForm){
    this.service.postEmployeeDetail()
      .subscribe({
        next: res => {
          this.service.resetForm(form);
          this.service.refreshList()
          this.toastr.success("Employee Inserted Successfully!","Employee Details Register")
          
        },
        error: err => { console.log(err) }
      })
  }

  updateRecord(form: NgForm){
    this.service.putEmployeeDetail()
      .subscribe({
        next: res => {
          this.service.refreshList()
          this.service.resetForm(form);
          this.toastr.info("Employee Updated Successfully!","Employee Details Register")
          
        },
        error: err => { console.log(err) }
      })
  }
}
