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
  conditions?: string;
  whenToUse?: string;
  workedExample?: {
    problem: string;
    latexProblem?: string;
    solution: string;
    latexSolution?: string;
  };
  mnemonic?: string;
  labId?: string;
  derivationSummary?: string;
  derivationSteps?: {
    stepNumber: number;
    statement: string;
    latex?: string;
    reason: string;
  }[];
}

export type QuestionDifficulty = 'Foundation' | 'Standard' | 'Advanced' | 'Challenge';

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
  difficulty: QuestionDifficulty;
  chapterId?: string;
  classGrade?: ClassGrade;
  semester?: Semester;
  methodRationale?: string;
  verificationCheck?: string;
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
