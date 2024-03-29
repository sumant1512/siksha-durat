import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedComponent } from "./shared.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { CommonAddComponent } from "./common-add/common-add.component";
import { CommonViewComponent } from "./common-view/common-view.component";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ProfileSkeletonComponent } from "./profile-skeleton/profile-skeleton.component";
import { CommonProfileComponent } from "./common-profile/common-profile.component";
import { CommonSampleSyllabusMobileComponent } from "./common-sample-syllabus-mobile/common-sample-syllabus-mobile.component";
import { ErrorNotificationDialogComponent } from "./error-notification-dialog/error-notification-dialog.component";
import { NotesBoardComponent } from "./notes-board/notes-board.component";
import { VideosPanelComponent } from "./videos-panel/videos-panel.component";
import { AccordionComponent } from "./accordion/accordion.component";
import { CommonSampleSyllabusComponent } from "./common-sample-syllabus/common-sample-syllabus.component";
import { ViewVideosComponent } from "./view-videos/view-videos.component";
import { ContentNotFoundComponent } from "./content-not-found/content-not-found.component";
import { SuccessNotificationComponent } from "./success-notification/success-notification.component";

@NgModule({
  declarations: [
    SharedComponent,
    PrivacyPolicyComponent,
    CommonAddComponent,
    CommonViewComponent,
    ProfileSkeletonComponent,
    CommonProfileComponent,
    CommonSampleSyllabusMobileComponent,
    ErrorNotificationDialogComponent,
    NotesBoardComponent,
    VideosPanelComponent,
    AccordionComponent,
    CommonSampleSyllabusComponent,
    ViewVideosComponent,
    ContentNotFoundComponent,
    SuccessNotificationComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonAddComponent,
    CommonViewComponent,
    CommonProfileComponent,
    CommonSampleSyllabusMobileComponent,
    CommonSampleSyllabusComponent,
    ProfileSkeletonComponent,
    ErrorNotificationDialogComponent,
    NotesBoardComponent,
    VideosPanelComponent,
    AccordionComponent,
    ViewVideosComponent,
    ContentNotFoundComponent,
    SuccessNotificationComponent,
  ],
})
export class SharedModule {}
