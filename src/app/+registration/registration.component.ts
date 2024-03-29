import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { schoolRegisterForm } from "./registration.utils";
import { RegistrationService } from "../store/services/registration.service";
import { CommonService } from "../store/common/common.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent implements OnInit {
  schoolRegisterForm: FormGroup;

  constructor(
    private router: Router,
    private registationService: RegistrationService,
    private commonService: CommonService
  ) {
    (this.schoolRegisterForm = schoolRegisterForm()),
      {
        validator: this.MustMatch("password", "confirmPassword"),
      };
  }

  ngOnInit(): void {}

  get f() {
    return this.schoolRegisterForm.controls;
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (schoolRegisterForm: FormGroup) => {
      const control = schoolRegisterForm.controls[controlName];
      const matchingControl = schoolRegisterForm.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  registerSchool(): void {
    let password = this.commonService.encrypt(
      this.schoolRegisterForm.value.password
    );
    let confirmPassword = this.commonService.encrypt(
      this.schoolRegisterForm.value.confirmPassword
    );
    const schoolRegistrationDetails = {
      schoolName: this.schoolRegisterForm.value.schoolName,
      adminName: this.schoolRegisterForm.value.adminName,
      schoolType: this.schoolRegisterForm.value.schoolType,
      adminAdhar: this.schoolRegisterForm.value.adminAdhar,
      schoolRegistrationNo: this.schoolRegisterForm.value.schoolRegistrationNo,
      email: this.schoolRegisterForm.value.email,
      adminContactNo: this.schoolRegisterForm.value.adminContactNo,
      schoolContactNo: this.schoolRegisterForm.value.schoolContactNo,
      password: password,
      confirmPassword: confirmPassword,
    };
    this.registationService
      .schoolRegistration(schoolRegistrationDetails)
      .subscribe((response) => {
        if (response["status"]) {
          alert(response["message"]);
          this.router.navigate(["/verification"], {
            queryParams: {
              email: this.schoolRegisterForm.value.email,
            },
          });
        } else {
          alert(response["message"]);
        }
      });
  }

  navigateToVerification() {
    this.router.navigate(["verification"]);
  }
}
