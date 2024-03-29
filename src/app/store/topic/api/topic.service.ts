import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HOST } from "config.constants";

@Injectable({
  providedIn: "root",
})
export class TopicService {
  constructor(private http: HttpClient) {}

  addTopic(topicDetails) {
    return this.http.post<any>(HOST + "addTopic", topicDetails, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN"),
      }),
    });
  }

  getAllTopics(): Observable<any[]> {
    return this.http.get<any[]>(HOST + "getTopics", {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN"),
      }),
    });
  }

  editTopicName(topicDetails) {
    return this.http.post<any>(HOST + "editTopicName", topicDetails, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN"),
      }),
    });
  }

  removeTopic(id: number) {
    return this.http.delete<any>(HOST + `removeTopic/${id}`, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN"),
      }),
    });
  }
}
