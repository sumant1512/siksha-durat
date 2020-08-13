import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { ProfileComponent } from "./profile/profile.component";
import { AdminHeaderComponent } from "./admin-header/admin-header.component";
import { AdminFooterComponent } from "./admin-footer/admin-footer.component";
import { AddStudentComponent } from "./student/add-student.component";
import { AddTeacherComponent } from "./teacher/add-teacher.component";
import { ViewStudentComponent } from "./student/view-student/view-student.component";
import { ViewTeacherComponent } from "./teacher/view-teacher/view-teacher.component";
import { AddClassComponent } from "./class/add-class/add-class.component";
import { ViewSamplePaperComponent } from "./sample-paper/view-sample-paper/view-sample-paper.component";
import { ViewClassComponent } from "./class/view-class/view-class.component";
import { ViewSubjectComponent } from "./subject/view-subject/view-subject.component";
import { ViewSyllabusComponent } from "./view-syllabus/view-syllabus.component";
import { AdminSettingsComponent } from "./admin-settings/admin-settings.component";
import { AdminLandingPageComponent } from "./admin-landing-page/admin-landing-page.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ClassComponent } from "./class/class.component";
import { AddClassMobileComponent } from "./class/add-class-mobile/add-class-mobile.component";
import { TopicComponent } from "./topic/topic.component";
import { AddTopicMobileComponent } from "./topic/add-topic-mobile/add-topic-mobile.component";
import { ViewTopicComponent } from "./topic/view-topic/view-topic.component";
import { SamplePaperComponent } from "./sample-paper/sample-paper.component";
import { AddSamplePaperMobileComponent } from "./sample-paper/add-sample-paper-mobile/add-sample-paper-mobile.component";
import { AddSamplePaperComponent } from "./sample-paper/add-sample-paper/add-sample-paper.component";
import { AddTopicComponent } from "./topic/add-topic/add-topic.component";
import { SubjectComponent } from "./subject/subject.component";
import { AddSubjectMobileComponent } from "./subject/add-subject-mobile/add-subject-mobile.component";
import { AddSubjectComponent } from "./subject/add-subject/add-subject.component";

@NgModule({
  declarations: [
    AdminComponent,
    ProfileComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AddStudentComponent,
    AddTeacherComponent,
    ViewStudentComponent,
    ViewTeacherComponent,
    AddClassComponent,
    ClassComponent,
    ViewSamplePaperComponent,
    ViewClassComponent,
    ViewSubjectComponent,
    ViewSyllabusComponent,
    AdminSettingsComponent,
    AdminLandingPageComponent,
    AddClassMobileComponent,
    TopicComponent,
    AddTopicComponent,
    AddTopicMobileComponent,
    ViewTopicComponent,
    SamplePaperComponent,
    AddSamplePaperComponent,
    AddSamplePaperMobileComponent,
    SubjectComponent,
    AddSubjectComponent,
    AddSubjectMobileComponent,
    ViewSubjectComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
  ],
})
export class AdminModule {}
