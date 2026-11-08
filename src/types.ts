export type SubjectId =
  | 'english' | 'german' | 'polish' | 'history' | 'math'
  | 'ukrainian' | 'biology' | 'chemistry' | 'geography';

export interface Subject {
  id: SubjectId;
  label: string;
  flag?: string;
  icon: string;
  accent: string;
}

export interface Topic {
  id: string;
  label: string;
}

export type QuestionKind = 'choice' | 'trueFalse' | 'fillBlank';

export interface Question {
  id: string;
  subject: SubjectId;
  topic: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  kind?: QuestionKind;
}

export type Screen = 'welcome' | 'test' | 'result' | 'error' | 'drowned';

export type Difficulty = 'easy' | 'normal' | 'hard';

export interface TestConfig {
  subject: SubjectId;
  mode: 'topic' | 'sprint';
  topicId?: string;
}
