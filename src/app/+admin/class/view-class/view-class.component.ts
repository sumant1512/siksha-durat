import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import * as ClassActions from "../../../store/class/class.actions";
import { addClassForm } from "../add-class.utils";

@Component({
  selector: "app-view-class",
  templateUrl: "./view-class.component.html",
  styleUrls: ["./view-class.component.css"],
})
export class ViewClassComponent implements OnInit {
  editClassForm: FormGroup;
  loader: boolean;
  oldClassName: string;
  newClassName: string = "";
  selectClassId: number;

  classes = [];

  constructor(private store: Store<AppState>) {
    this.editClassForm = addClassForm();
  }

  ngOnInit(): void {
    this.fetchClasses();
  }

  fetchClasses(): void {
    this.store.select("classList").subscribe((response) => {
      if (Object.keys(response).length) {
        this.classes = response;
      } else {
        this.store.dispatch(new ClassActions.FetchClass());
      }
    });
  }

  editClass(): void {
    this.store.dispatch(
      new ClassActions.EditClass({
        class_id: this.selectClassId,
        className: this.editClassForm.value.className,
      })
    );
  }

  removeClass(class_id): void {
    if (confirm("Are You Sure You want to Delete the Class?")) {
      this.store.dispatch(new ClassActions.DeleteClass(class_id));
    }
  }
  selectedClass(value, id): void {
    this.oldClassName = value;
    this.selectClassId = id;
  }
}
