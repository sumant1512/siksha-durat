import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { editForm, assignSubjectForm } from "../common.utils";
import { ClassListType } from "src/app/store/class/types/class.type";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import * as ClassActions from "../../store/class/class.actions";
import { SubjectService } from "src/app/store/subject/api/subject.service";

@Component({
  selector: "app-common-view",
  templateUrl: "./common-view.component.html",
  styleUrls: ["./common-view.component.css"],
})
export class CommonViewComponent implements OnInit {
  editForm: FormGroup;
  assignSubjectForm: FormGroup;
  classList: ClassListType[];
  @Input() viewList: any;
  @Input() name: string;
  @Output() childEvent = new EventEmitter();
  @Output() editChildEvent = new EventEmitter();
  @Output() assignClassChildEvent = new EventEmitter();
  oldName: string;
  editId: number;
  selectedSubject: number;
  constructor(
    private store: Store<AppState>,
    private subejctService: SubjectService
  ) {
    this.editForm = editForm();
    this.assignSubjectForm = assignSubjectForm();
  }

  ngOnInit() {
    this.checkStatus();
    this.fetchClassList();
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
  checkStatus(): boolean {
    if ("Subject" === this.name) return false;
    return true;
  }
  remove(id) {
    this.childEvent.emit(id);
  }
  selectedItem(name, id) {
    this.oldName = name;
    this.editId = id;
  }
  selectSubject(subjectId) {
    this.selectSubject = subjectId;
  }
  assignSubject() {
    let assignDetails = {
      subjectId: this.selectSubject,
      classId: [this.assignSubjectForm.value.classId],
    };
    console.log(assignDetails);
    this.subejctService
      .assignSubjectToClass(assignDetails)
      .subscribe((response) => {
        if (response["status"]) {
          alert("subject assinged");
        } else {
          alert("Error");
        }
      });
  }
  edit() {
    this.editChildEvent.emit({
      newName: this.editForm.value.newitemName,
      id: this.editId,
    });
  }
}
