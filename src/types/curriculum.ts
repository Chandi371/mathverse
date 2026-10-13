export type ClassGrade = 9 | 10;
export type Semester = 1 | 2;

export interface FormulaItem {
  id: string;
  name: string;
  latex: string;
  description: string;
  variables: { symbol: string; meaning: string }[];
  chapterId: string;
  classGrade: ClassGrade;
  category: 'Algebra' | 'Geometry' | 'Coordinate Geometry' | 'Mensuration' | 'Trigonometry' | 'Statistics & Probability' | 'Number Systems';
  labId?: string;
  derivationSummary?: string;
}

export interface PracticeQuestion {
  id: string;
  type: 'mcq' | 'numerical' | 'missing-step' | 'spot-error';
  prompt: string;
  latexPrompt?: string;
  options?: string[]; // for mcq or missing-step
  correctAnswer: string | number;
  tolerance?: number; // for numerical
  hints: string[];
  explanation: string;
  difficulty: 'Foundation' | 'Standard' | 'Challenge';
}

export interface WorkedExample {
  id: string;
  title: string;
  problemStatement: string;
  latexStatement?: string;
  given: string[];
  toFind: string;
  strategy: string;
  steps: { stepNumber: number; title: string; latex?: string; explanation: string }[];
  commonMistake: string;
  sanityCheck: string;
}

export interface MemoryTrick {
  title: string;
  mnemonic: string;
  meaning: string;
  boardExamTip: string;
}

export interface Chapter {
  id: string;
  classGrade: ClassGrade;
  semester: Semester;
  chapterNumber: number;
  title: string;
  shortDescription: string;
  whyItMatters: string;
  priorKnowledge: string[];
  vocabulary: { term: string; definition: string }[];
  keyFormulas: FormulaItem[];
  labId?: string;
  labTitle?: string;
  derivation?: {
    title: string;
    targetFormula: string;
    objective: string;
    startingObservation: string;
    steps: {
      stepNumber: number;
      statement: string;
      latex?: string;
      justification: string;
    }[];
    finalFormulaLatex: string;
    conclusion: string;
  };
  memoryLab?: MemoryTrick[];
  workedExamples: WorkedExample[];
  problemSolvingStrategies: string[];
  practiceQuestions: PracticeQuestion[];
  revisionSummary: {
    corePoints: string[];
    commonTraps: string[];
  };
}
