import { Component, OnInit, ViewChild, Input, ElementRef, Output, EventEmitter } from "@angular/core";
import { Store } from "@ngrx/store";
import { FormGroup } from "@angular/forms";
import { addForm } from "../common.utils";
import { AppState } from "src/app/store/app.state";

import * as TopicActions from "../../store/topic/topic.actions";
import * as SyllabusActions from "../../store/syllabus-tranform/syllabus.actions";
import * as SamplePaperTransformActions from "../../store/sample-paper-transform/sample-paper-transform.actions";
import { SubjectService } from "../../store/subject/api/subject.service";

@Component({
  selector: 'app-common-sample-syllabus-mobile',
  templateUrl: './common-sample-syllabus-mobile.component.html',
  styleUrls: ['./common-sample-syllabus-mobile.component.css']
})
export class CommonSampleSyllabusMobileComponent implements OnInit {
  @ViewChild("slider", { static: false }) slider: ElementRef;
  @ViewChild("ttt", { static: false }) ttt: ElementRef;
  @ViewChild("ic", { static: false }) ic: ElementRef;
  test: boolean;
  addForm: FormGroup;
  @Input() name: string;
  @Output() subjectsOfClassChildEvent = new EventEmitter();
  selectedClassDetails;
  selectedClassName: string;
  selectedClassId: number;
  resultForSyllabus;
  resultForSamperPaper;

  isAddSamplePaperFormOpen = false;
  constructor(
    private store: Store<AppState>,
    private subjectService: SubjectService
  ) {
    this.addForm = addForm();
  }

  ngOnInit(): void {
    if (!this.getStatus()) {
      this.fetchSamplePaperTransform();
    } else {
      this.fetchSyllabusTransform();
    }
  }

  openSamplePaperForm() {
    this.isAddSamplePaperFormOpen = !this.isAddSamplePaperFormOpen;
  }

  getStatus(): boolean {
    return this.name === "Sample Paper" ? false : true;
  }

  selectClass(classId, className) {
    this.selectedClassName = className;
    this.selectedClassId = classId;
    if (this.getStatus() && this.resultForSyllabus !== undefined)
      this.selectedClassDetails = this.resultForSyllabus.filter(
        (data) => data.class_id === classId
      );
    else if (this.resultForSamperPaper !== undefined)
      this.selectedClassDetails = this.resultForSamperPaper.filter(
        (data) => data.class_id === classId
      );
  }

  fetchSyllabusTransform(): void {
    this.store.select("syllabusList").subscribe((response) => {
      if (Object.keys(response).length) {
        this.resultForSyllabus = response;
      } else {
        this.store.dispatch(new SyllabusActions.FetchSyllabus());
      }
    });
  }
  fetchSamplePaperTransform(): void {
    this.store.select("samplePaperTransformList").subscribe((response) => {
      if (Object.keys(response).length) {
        this.resultForSamperPaper = response;
      } else {
        this.store.dispatch(
          new SamplePaperTransformActions.FetchTransformSamplePaper()
        );
      }
    });
  }
  unassignSubject(subjectId) {
    console.log(subjectId, this.selectedClassId);
    this.subjectService
      .unAssignSubjectToClass({ subjectId, classId: this.selectedClassId })
      .subscribe((response) => {
        if (response["status"]) {
          alert(response["message"]);
        } else {
          alert(response["message"]);
        }
      });
  }
  removeTopic(topic_id) {
    console.log(topic_id);
    if (confirm("Are You Sure You want to Delete the Topic?")) {
      this.store.dispatch(new TopicActions.DeleteTopic(topic_id));
    }
  }
  close() {
    setTimeout(() => {
      this.slider.nativeElement.classList.remove("show");
    }, 1000);
   
    this.ttt.nativeElement.classList.remove("ttgt");
    setTimeout(() => {
      this.test = !this.test;
    }, 1000);
    this.ic.nativeElement.classList.remove("showbtn");
  }
  slide() {
    this.ic.nativeElement.classList.remove("showbtn");
    this.slider.nativeElement.classList.toggle("show");
    setTimeout(() => {
      this.ttt.nativeElement.classList.toggle("ttgt");
      this.test = !this.test;
    }, 1000);

    if (this.slider.nativeElement.classList.contains("show")) {
      setTimeout(() => {
        this.ic.nativeElement.classList.add("showbtn");
      }, 1000);
    }
  }

}