export type YearWiseQuestionCount = { [year: string]: number; };
export type Chapter = {
  subject: "Physics" | "Chemistry" | "Mathematics";
  chapter: string;
  class: string;
  unit: string;
  yearWiseQuestionCount: YearWiseQuestionCount;
  questionSolved: number;
  status: "Not Started" | "In Progress" | "Completed";
  isWeakChapter: boolean;
};
export type ProcessedChapter = Chapter & {
  id: string;
  totalQuestions: number;
  yearRange: string;
  icon: string;
  progress: number;
};
export type Subject = "Physics" | "Chemistry" | "Mathematics";
export type Status = "All" | "Not Started" | "In Progress" | "Completed";
export type SortOrder = "asc" | "desc";
