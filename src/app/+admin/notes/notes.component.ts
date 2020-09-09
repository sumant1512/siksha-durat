import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.css"],
})
export class NotesComponent implements OnInit {
  view: boolean;
  constructor(private router: Router, private Activatedroute: ActivatedRoute) {}

  ngOnInit() {
    this.Activatedroute.queryParams.subscribe((params) => {
      this.view = params["view"];
    });
  }
}
