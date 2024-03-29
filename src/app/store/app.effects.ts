import { AuthEffects } from "./auth/auth.effects";
import { ClassEffects } from "./class/class.effects";
import { StudentEffects } from "./students/student.effects";
import { SubjectEffects } from "./subject/subject.effects";
import { TopicEffects } from "./topic/topic.effects";
import { SamplePaperEffects } from "./sample-paper/sample-paper.effects";
import { SyllabusEffects } from "./syllabus-tranform/syllabus.effects";
import { SamplePaperTransformEffects } from "./sample-paper-transform/sample-paper-transform.effects";
import { NotesEffects } from "./notes/notes.effects";
import { StudentSamplePaperSyllabusEffects } from "./student-sample_paper-syllabus/student-sample_paper-syllabus.effects";
import { VideoEffects } from "./video/video.effects";
import { ContentNotFoundEffects } from "./content-not-found/content-not-found.effects";
import { TeacherEffects } from "./teacher/teacher.effects";

export const AppEffects = [
  ContentNotFoundEffects,
  AuthEffects,
  StudentSamplePaperSyllabusEffects,
  ClassEffects,
  SubjectEffects,
  TopicEffects,
  SamplePaperEffects,
  StudentEffects,
  TeacherEffects,
  SyllabusEffects,
  NotesEffects,
  SamplePaperTransformEffects,
  VideoEffects,
];
