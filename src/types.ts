export type SubjectId =
  | 'english' | 'german' | 'polish' | 'history' | 'math'
  | 'ukrainian' | 'biology' | 'chemistry' | 'geography'
  | 'astronomy' | 'physics' | 'robotics' | 'psychology' | 'philosophy'
  | 'programming' | 'ecology' | 'economics' | 'archaeology' | 'criminalistics'
  | 'oceanology' | 'meteorology' | 'drafting' | 'engineering' | 'media-literacy'
  | 'logic' | 'sociology' | 'financial-literacy' | 'art' | 'culinary';

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

export type QuestionKind =
  | 'choice'
  | 'trueFalse'
  | 'fillBlank'
  | 'matching'
  | 'ordering'
  | 'compare'
  | 'classify'
  | 'errorFind'
  | 'calculation'
  | 'analogy';

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

export type Screen = 'welcome' | 'test' | 'result' | 'error' | 'drowned' | 'editor';

export type Difficulty = 'easy' | 'normal' | 'hard';

export interface TestConfig {
  subject: SubjectId;
  mode: 'topic' | 'sprint';
  topicId?: string;
}
