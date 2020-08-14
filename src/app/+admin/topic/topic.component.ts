import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import * as ClassActions from "../../store/class/class.actions";
import * as TopicActions from "../../store/topic/topic.actions";
import * as ClassWithSubjectActions from "../../store/class-with-subject/class-with-subject.actions";
import { ClassListType } from "src/app/store/class/types/class.type";
import { TopicListType } from "src/app/store/topic/types/topic.type";
import { SubjectListType } from "src/app/store/subject/types/subject.type";
import { ClassWithSubjectListType } from "src/app/store/class-with-subject/types/class-with-subject.type";

@Component({
  selector: "app-topic",
  templateUrl: "./topic.component.html",
  styleUrls: ["./topic.component.css"],
})
export class TopicComponent implements OnInit {
  @ViewChild("slider", { static: false }) slider: ElementRef;
  addTopicForm: FormGroup;
  topicList: TopicListType[];
  classList: ClassListType[];
  subjectList: SubjectListType[];
  isMobile = false;
  isAddClassFormOpen = false;

  classWithSubjectList: ClassWithSubjectListType[];

  constructor(private store: Store<AppState>) {}

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (event.target.innerWidth < 991) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  defaultTouch = { x: 0, y: 0, time: 0 };

  @HostListener("touchstart", ["$event"])
  //@HostListener('touchmove', ['$event'])
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
        if (Math.abs(deltaY) > 40) {
          // delta y is at least 60 pixels
          if (deltaY > 0) {
            this.slider.nativeElement.classList.remove("show");
          } else {
            this.slider.nativeElement.classList.add("show");
          }
        }
      }
    }
  }

  ngOnInit() {
    this.isMobile = window.innerWidth < 991 ? true : false;
    this.fetchTopics();
    this.fetchClassList();
    this.fetchClassWithSubject();
  }

  openAddClassForm() {
    this.isAddClassFormOpen = true;
  }

  fetchTopics(): void {
    this.store.select("topicList").subscribe((response) => {
      if (Object.keys(response).length) {
        this.topicList = response;
      } else {
        this.store.dispatch(new TopicActions.FetchTopic());
      }
    });
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

  fetchClassWithSubject() {
    this.store.select("classWithSubjectList").subscribe((response) => {
      if (Object.keys(response).length) {
        this.classWithSubjectList = response;
      } else {
        this.store.dispatch(
          new ClassWithSubjectActions.FetchClassWithSubject()
        );
      }
    });
  }

  addTopic(topic): void {
    this.store.dispatch(new TopicActions.AddTopic(topic));
  }
  editTopic(editDetails): void {
    this.store.dispatch(
      new TopicActions.EditTopic({
        topicId: editDetails.id,
        topicName: editDetails.updatedName,
      })
    );
  }
  removeTopic(topic_id): void {
    if (confirm("Are You Sure You want to Delete the Topic?")) {
      this.store.dispatch(new TopicActions.DeleteTopic(topic_id));
    }
  }
  getSubjects(classId): void {
    console.log(classId);
  }

  sliderOpen() {
    this.slider.nativeElement.classList.toggle("show");
  }
}
