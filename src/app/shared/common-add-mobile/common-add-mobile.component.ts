import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { addForm } from "../common.utils";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import * as ClassActions from "../../store/class/class.actions";
import { TopicService } from "src/app/store/topic/api/topic.service";
import { SubjectListType } from "src/app/store/subject/types/subject.type";
import { ClassListType } from "src/app/store/class/types/class.type";

@Component({
  selector: "app-common-add-mobile",
  templateUrl: "./common-add-mobile.component.html",
  styleUrls: ["./common-add-mobile.component.css"],
})
export class CommonAddMobileComponent implements OnInit {
  classList: ClassListType[];
  @Input() subjectsOfClass: any;
  @Input() name: string;
  @Output() childEvent = new EventEmitter();
  @Output() subjectsOfClassChildEvent = new EventEmitter();
  @Output() touchEvent = new EventEmitter();
  addForm: FormGroup;
  loader = false;
  selectedClassId: number;
  selectedSubjectId: number;
  subjectList: SubjectListType[];

  constructor(
    private store: Store<AppState>,
    private topicService: TopicService
  ) {
    this.addForm = addForm();
  }

  defaultTouch = { x: 0, y: 0, time: 0 };

  @HostListener("touchstart", ["$event"])
  @HostListener("touchend", ["$event"])
  @HostListener("touchcancel", ["$event"])
  handleTouch(event) {
    let touch = event.touches[0] || event.changedTouches[0];

    // check the events
    if (event.type === "touchstart") {
      this.defaultTouch.y = touch.pageY;
      this.defaultTouch.time = event.timeStamp;
    } else if (event.type === "touchend") {
      let deltaY = touch.pageY - this.defaultTouch.y;
      let deltaTime = event.timeStamp - this.defaultTouch.time;

      // simulte a swipe -> less than 500 ms and more than 60 px
      if (deltaTime < 500) {
        if (Math.abs(deltaY) > 60) {
          // delta y is at least 60 pixels
          if (deltaY > 0) {
            this.touchEvent.emit("open");
          } else {
            this.touchEvent.emit("close");
          }
        }
      }
    }
  }

  ngOnInit() {
    this.fetchClassList();
    this.reviewStatus();
  }

  fetchClassList(): void {
    this.store.select("classList").subscribe((response) => {
      if (Object.keys(response).length) {
        this.classList = response;
      } else {
        this.store.dispatch(new ClassActions.FetchClass());
      }
    });
  }

  getClassForSubject(classId) {
    this.topicService.getSubjectsOfClass({ classId }).subscribe((response) => {
      if (response.length) {
        this.subjectList = response;
      }
    });
  }

  reviewStatus(): boolean {
    if ("Topic" === this.name) return false;
    return true;
  }

  add() {
    this.loader = true;
    if ("Topic" === this.name)
      this.childEvent.emit({
        topicName: this.addForm.value.itemName,
        classId: this.selectedClassId,
        subjectId: this.selectedSubjectId,
      });
    else this.childEvent.emit(this.addForm.value.itemName);
  }

  selectedClass(id) {
    this.selectedClassId = id;
    this.subjectsOfClassChildEvent.emit(id);
    this.getClassForSubject(id);
  }

  selectedSubject(id) {
    this.selectedSubjectId = id;
  }
}
