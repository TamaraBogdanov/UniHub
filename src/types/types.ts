// types.ts
export interface CourseModule {
  id: number;
  title: string;
  completed: boolean;
  resources: ModuleResource[];
  activities: ModuleActivity[];
  deadline?: string;
  description?: string;
}

export interface ModuleResource {
  id: number;
  title: string;
  type: "pdf" | "video" | "link" | "document";
  url: string;
  downloaded?: boolean;
}

export interface ModuleActivity {
  id: number;
  title: string;
  type: "quiz" | "assignment" | "reading" | "discussion";
  completed: boolean;
  dueDate?: string;
}

export interface Assignment {
  id: number;
  title: string;
  dueDate: string;
  submitted: boolean;
  description?: string;
  attachments?: string[];
  grade?: number;
  feedback?: string;
  submissionType: "file" | "text" | "both";
  maxScore: number;
}

export interface Grade {
  id: number;
  title: string;
  grade: number;
  weight: number;
  feedback?: string;
  submittedDate?: string;
  category: "assignment" | "quiz" | "exam" | "project";
}
