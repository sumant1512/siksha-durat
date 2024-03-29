import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Subscription } from "rxjs";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { AppState } from "src/app/store/app.state";
import { select, Store } from "@ngrx/store";
import { AuthService } from "src/app/store/auth/api/auth.service";
import { userType } from "src/app/store/auth/auth.selectors";
import { ProfileType } from "../../store/auth/types/profile.type";
import * as AuthActions from "../../store/auth/auth.actions";
import * as StudentSamplePaperSyllabusActions from "../../store/student-sample_paper-syllabus/student-sample_paper-syllabus.actions";
import { SubjectWithTopicAndSamplePaperType } from "../../store/student-sample_paper-syllabus/types/student-sample_paper-syllabus.types";
import { CONSTANTS } from "src/app/+admin/admin-profile/profile.constants";
import { ImageType } from "./types/common-profile.type";

@Component({
  selector: "app-common-profile",
  templateUrl: "./common-profile.component.html",
  styleUrls: ["./common-profile.component.css"],
})
export class CommonProfileComponent implements OnInit, OnDestroy {
  userProfile: ProfileType;
  @Input("userProfile") set setUserProfile(data: ProfileType) {
    if (data) {
      this.loaded = true;
      this.userProfile = data;
      this.userImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.setProfileImage()
      );
      this.schoolImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.setCoverImage()
      );
    }
  }
  @Output() onImageSelect = new EventEmitter<ImageType>();
  @Output() onSaveImage = new EventEmitter<string>();
  subscription: Subscription = new Subscription();
  loaded: boolean;
  isAdmin: boolean;
  isStudent: boolean;
  toggle: boolean = true;
  uploadBtnControl: boolean = true;
  isSchoolImageBtnDisable: boolean;
  btnLabel: string = "Sample Paper";
  resultForSyllabusAndSamplePaper: SubjectWithTopicAndSamplePaperType[];
  selectedSubjectDetails: SubjectWithTopicAndSamplePaperType[];
  selectedSubjectId: number;
  selectedImageDetails: Object;
  userImageUrl: SafeUrl;
  schoolImageUrl: SafeUrl;
  isMobile: boolean = false;
  constructor(
    private store: Store<AppState>,
    private sanitizer: DomSanitizer
  ) {}
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (event.target.innerWidth < 991) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 991 ? true : false;
    this.getUserType();
  }

  setProfileImage(): string {
    let userImage = CONSTANTS.USER_IMAGE;
    if (this.userProfile.userDetails.admin_profile_picture) {
      userImage =
        "data:image/png;base64," +
        this.userProfile.userDetails.admin_profile_picture;
    } else if (this.userProfile.userDetails.student_profile_picture) {
      userImage =
        "data:image/png;base64," +
        this.userProfile.userDetails.student_profile_picture;
    } else {
      userImage = CONSTANTS.USER_IMAGE;
    }
    return userImage;
  }

  setCoverImage(): string {
    return (
      "data:image/png;base64," + this.userProfile.userDetails.school_cover_image
    );
  }

  selectImage(event: any, userType: string): void {
    let imageData: ImageType;
    if (event.target.files && event.target.files[0]) {
      var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.exec(event.target.files[0].name)) {
        alert("Invalid file type");
        event.target.value = "";
      } else {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          switch (userType) {
            case "user":
              this.userImageUrl = event.target.result;
              imageData = {
                imageType: this.isAdmin ? "admin" : "student",
                image: event.target.result,
              };
              this.uploadBtnControl = false;
              this.onImageSelect.emit(imageData);
              break;
            case "school_image":
              this.schoolImageUrl = event.target.result;
              imageData = {
                imageType: userType,
                image: event.target.result,
              };
              this.isSchoolImageBtnDisable = true;
              this.onImageSelect.emit(imageData);
              break;
          }
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

  saveImage(): void {
    this.onSaveImage.emit("save");
    this.uploadBtnControl = true;
  }

  getUserType(): void {
    this.subscription.add(
      this.store.pipe(select(userType)).subscribe((response) => {
        if (response === "Admin") {
          this.isAdmin = true;
          this.isStudent = false;
        } else if (response === "Student") {
          this.isStudent = true;
          this.isAdmin = false;
        }
      })
    );
  }

  // fetchStudentSamplePaperSyllabusData(res): void {
  //   this.store
  //     .select("studentSamplePaperSyllabusList")
  //     .subscribe((response) => {
  //       if (Object.keys(response).length) {
  //         this.resultForSyllabusAndSamplePaper = response;
  //         this.selectSubject(response[0].subject_id);
  //       } else {
  //         this.store.dispatch(
  //           new StudentSamplePaperSyllabusActions.FetchStudentSamplePaperSyllabus(
  //             {
  //               schoolId: res.user_id,
  //               classId: res.class_id,
  //             }
  //           )
  //         );
  //       }
  //     });
  // }

  // selectSubject(subjectId): void {
  //   this.selectedSubjectId = subjectId;
  //   this.selectedSubjectDetails = this.resultForSyllabusAndSamplePaper.filter(
  //     (data) => data.subject_id == subjectId
  //   );
  // }

  // toggleLabelAndIconOnButton(): void {
  //   this.toggle = !this.toggle;
  //   let icon = document.getElementById("icon");
  //   if (this.toggle) {
  //     this.btnLabel = "Sample Paper";
  //     icon.classList.remove("fa-book");
  //     icon.classList.add("fa-file-text");
  //   } else {
  //     this.btnLabel = " Syllabus";
  //     icon.classList.remove("fa-file-text");
  //     icon.classList.add("fa-book");
  //   }
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
