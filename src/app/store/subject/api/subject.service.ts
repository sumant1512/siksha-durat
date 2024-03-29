import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../../auth/api/auth.service";
import { HOST } from "config.constants";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SubjectService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  addSubject(subjectDetails) {
    return this.http.post<any>(HOST + "addSubject", subjectDetails, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN"),
      }),
    });
  }

  getSubjects(): Observable<any[]> {
    return this.http.get<any[]>(HOST + "getSubjects", {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN"),
      }),
    });
  }

  editSubjectName(subjectDetails) {
    return this.http.post<any>(HOST + "editSubjectName", subjectDetails, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN"),
      }),
    });
  }

  removeSubject(id: number) {
    return this.http.delete<any>(HOST + `removeSubject/${id}`, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN"),
      }),
    });
  }

  private handleError(error: HttpErrorResponse) {
    alert(error.error.message);
    return throwError(error.error.message);
  }

  assignSubjectToClass(details) {
    return this.http.post<any>(HOST + "assignSubjectToClass", details, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN"),
      }),
    });
  }

  getClassesOfUnassignedSubjects(subject_id) {
    return this.http.post<any>(
      HOST + "getClassesOfUnassignedSubjects",
      subject_id,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN"),
        }),
      }
    );
  }

  unAssignSubjectToClass(details) {
    return this.http.post<any>(HOST + "unassignSubjectToClass", details, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN"),
      }),
    });
  }
}
