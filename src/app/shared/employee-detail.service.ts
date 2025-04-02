import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment.development';
import { EmployeeDetail } from './employee-detail.model';
import { map, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailService {
  url: string = environment.apiBaseUrl+'/employees';
  listEmployees: EmployeeDetail[] = [];
  formData: EmployeeDetail = new EmployeeDetail()
  formSubmitted: Boolean = false;

  constructor(private http: HttpClient) { }

  postEmployeeDetail(){
    const payload = this.transformToPostPayload(this.formData);
      return this.http.post(this.url,payload);  
  }

  putEmployeeDetail(){
    const payload = this.transformToPostPayload(this.formData);
    this.url = this.url + "/" + this.formData.id;
    return this.http.put(this.url,payload);
  }

  deleteEmployeeDetail(id: string){
    return this.http.delete(this.url+"/"+id)
  }

  refreshList() {
    this.getEmployeeDetails().subscribe({
        next: res => {
          this.listEmployees = res;
          //console.log(this.listEmployees)
        },
        error: err => {console.log(err)}
    })
  }

  getEmployeeDetails(): Observable<EmployeeDetail[]> {
    return this.http.get<any[]>(this.url).pipe(
      map(json => this.transformToEmployeeDetail(json))
    );
  }

  private transformToEmployeeDetail(json: any[]): EmployeeDetail[] {
    return json.map(employee => ({
      id: employee.id,
      name: employee.name,
      position: employee.position,
      salary: employee.salary,
      city: employee.address.city,
      state: employee.address.state,
      street: employee.address.street,
      zipCode: employee.address.zipCode,
      departmentId: employee.department.departmentId.toString(), // Convert to string
      departmentName: employee.department.departmentName,
    }));
  }

  private transformToPostPayload(employeeDetail: EmployeeDetail): any {
    if(employeeDetail.id == ""){
      return {
        
        name: employeeDetail.name,
        position: employeeDetail.position,
        salary: employeeDetail.salary,
        department: {
          departmentId: employeeDetail.departmentId,
          departmentName: employeeDetail.departmentName
        },
        address: {
          street: employeeDetail.street,
          city: employeeDetail.city,
          state: employeeDetail.state,
          zipCode: employeeDetail.zipCode
        }
      };
    }
    else{
      return {
        id: employeeDetail.id,
        name: employeeDetail.name,
        position: employeeDetail.position,
        salary: employeeDetail.salary,
        department: {
          departmentId: employeeDetail.departmentId,
          departmentName: employeeDetail.departmentName
        },
        address: {
          street: employeeDetail.street,
          city: employeeDetail.city,
          state: employeeDetail.state,
          zipCode: employeeDetail.zipCode
        }
      };
    }
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.formData = new EmployeeDetail()
  }
}
