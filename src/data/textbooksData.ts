export interface TextbookResource {
  id: string;
  title: string;
  subtitle: string;
  classGrade: 9 | 10;
  semester: 1 | 2;
  edition: string;
  publisher: string;
  pageCount: number;
  fileSizeMB: string;
  fileUrl: string;
  downloadFileName: string;
  chapters: string[];
  description: string;
  isBilingual: boolean;
}

export interface BoardExamResource {
  id: string;
  title: string;
  subtitle: string;
  classGrade: 10;
  paperCode: string;
  academicYear: string;
  publisher: string;
  pageCount: number;
  fileSizeMB: string;
  fileUrl: string;
  downloadFileName: string;
  type: 'blueprint' | 'model_paper_1' | 'model_paper_2';
  description: string;
}

export interface ChapterWeightageItem {
  sNo: number;
  chapter: string;
  marksBreakdown: string;
  baseMarks: number;
  choiceMarks: number;
  totalMarksWithChoice: number;
  questionTypes: string;
  domainsTested: string;
}

export interface ExamPatternSection {
  section: string;
  questionRange: string;
  questionType: string;
  count: number;
  marksPerQuestion: number;
  totalMarks: number;
  choice: string;
  estimatedTime: string;
}

// 1. OFFICIAL TEXTBOOKS REGISTRY
export const officialTextbooks: TextbookResource[] = [
  {
    id: 'class-10-maths-sem-1',
    title: 'Class 10 Mathematics — Semester 1',
    subtitle: 'AP SCERT Bilingual Textbook (English & Telugu Medium)',
    classGrade: 10,
    semester: 1,
    edition: '2024-25 Edition',
    publisher: 'Department of School Education, Govt. of Andhra Pradesh & SCERT',
    pageCount: 302,
    fileSizeMB: '17.3 MB',
    fileUrl: '/docs/AP_Class_10_Mathematics_Sem_1_Textbook_2024-25.pdf',
    downloadFileName: 'AP_Class_10_Mathematics_Semester_1_Textbook_2024-25.pdf',
    isBilingual: true,
    description: 'Official Class 10 Semester 1 textbook prescribed by the Government of Andhra Pradesh for SSC public board examination preparation.',
    chapters: [
      'Chapter 1: Real Numbers',
      'Chapter 2: Polynomials',
      'Chapter 3: Pair of Linear Equations in Two Variables',
      'Chapter 4: Quadratic Equations',
      'Chapter 5: Arithmetic Progressions',
      'Chapter 6: Triangles',
      'Chapter 7: Coordinate Geometry',
    ],
  },
  {
    id: 'class-10-maths-sem-2',
    title: 'Class 10 Mathematics — Semester 2',
    subtitle: 'AP SCERT Bilingual Textbook (English & Telugu Medium)',
    classGrade: 10,
    semester: 2,
    edition: '2024-25 Edition',
    publisher: 'Department of School Education, Govt. of Andhra Pradesh & SCERT',
    pageCount: 262,
    fileSizeMB: '13.4 MB',
    fileUrl: '/docs/AP_Class_10_Mathematics_Sem_2_Textbook_2024-25.pdf',
    downloadFileName: 'AP_Class_10_Mathematics_Semester_2_Textbook_2024-25.pdf',
    isBilingual: true,
    description: 'Official Class 10 Semester 2 textbook covering Trigonometry, Geometry, Mensuration, Statistics, and Probability for AP SSC.',
    chapters: [
      'Chapter 8: Introduction to Trigonometry',
      'Chapter 9: Some Applications of Trigonometry',
      'Chapter 10: Circles',
      'Chapter 11: Areas Related to Circles',
      'Chapter 12: Surface Areas and Volumes',
      'Chapter 13: Statistics',
      'Chapter 14: Probability',
    ],
  },
  {
    id: 'class-9-maths-sem-1',
    title: 'Class 9 Mathematics — Semester 1',
    subtitle: 'AP SCERT Bilingual Textbook (English & Telugu Medium)',
    classGrade: 9,
    semester: 1,
    edition: 'SCERT AP Revised Bilingual Edition',
    publisher: 'State Council of Educational Research & Training, Govt. of Andhra Pradesh',
    pageCount: 250,
    fileSizeMB: '21.3 MB',
    fileUrl: '/docs/AP_Class_9_Mathematics_Sem_1_Textbook.pdf',
    downloadFileName: 'AP_Class_9_Mathematics_Semester_1_Textbook.pdf',
    isBilingual: true,
    description: 'Official Class 9 Semester 1 foundation mathematics textbook developed by Samagra Shiksha & SCERT Andhra Pradesh.',
    chapters: [
      'Chapter 1: Number Systems',
      'Chapter 2: Polynomials',
      'Chapter 3: Coordinate Geometry',
      'Chapter 4: Linear Equations in Two Variables',
      'Chapter 5: Introduction to Euclid\'s Geometry',
      'Chapter 6: Lines and Angles',
    ],
  },
  {
    id: 'class-9-maths-sem-2',
    title: 'Class 9 Mathematics — Semester 2',
    subtitle: 'AP SCERT Bilingual Textbook (English & Telugu Medium)',
    classGrade: 9,
    semester: 2,
    edition: 'SCERT AP Revised Bilingual Edition',
    publisher: 'State Council of Educational Research & Training, Govt. of Andhra Pradesh',
    pageCount: 238,
    fileSizeMB: '20.7 MB',
    fileUrl: '/docs/AP_Class_9_Mathematics_Sem_2_Textbook.pdf',
    downloadFileName: 'AP_Class_9_Mathematics_Semester_2_Textbook.pdf',
    isBilingual: true,
    description: 'Official Class 9 Semester 2 textbook completing core foundation geometry, mensuration, and data interpretation for AP secondary curriculum.',
    chapters: [
      'Chapter 7: Triangles',
      'Chapter 8: Quadrilaterals',
      'Chapter 9: Circles',
      'Chapter 10: Heron\'s Formula',
      'Chapter 11: Surface Areas and Volumes',
      'Chapter 12: Statistics',
    ],
  },
];

// 2. OFFICIAL CLASS 10 BOARD EXAM RESOURCES (CLASS 10 ONLY)
export const class10BoardExamResources: BoardExamResource[] = [
  {
    id: 'ssc-c10-maths-blueprint-mp1',
    title: 'SSC Mathematics Blueprint & Model Paper 1',
    subtitle: 'Official Format of Design, Chapter-Wise Weightage & Model Paper 1 (English Version)',
    classGrade: 10,
    paperCode: '15E & 16E',
    academicYear: '2026-27',
    publisher: 'Director of Government Examinations (SSC Board), Andhra Pradesh',
    pageCount: 8,
    fileSizeMB: '1.16 MB',
    fileUrl: '/docs/AP_SSC_Class_10_Maths_Blueprint_Model_Paper_1_2026-27.pdf',
    downloadFileName: 'AP_SSC_Class_10_Mathematics_Blueprint_Model_Paper_1_2026-27.pdf',
    type: 'model_paper_1',
    description: 'Authentic Blueprint and Model Question Paper 1 issued by the SSC Board Directorate for the 2026-27 public examinations. Contains complete marks allocation, PARAKH ability domains, and full 100-mark paper.',
  },
  {
    id: 'ssc-c10-maths-blueprint-mp2',
    title: 'SSC Mathematics Blueprint & Model Paper 2',
    subtitle: 'Official Format of Design, Chapter-Wise Weightage & Model Paper 2 (English Version)',
    classGrade: 10,
    paperCode: '15E & 16E',
    academicYear: '2026-27',
    publisher: 'Director of Government Examinations (SSC Board), Andhra Pradesh',
    pageCount: 8,
    fileSizeMB: '1.16 MB',
    fileUrl: '/docs/AP_SSC_Class_10_Maths_Blueprint_Model_Paper_2_2026-27.pdf',
    downloadFileName: 'AP_SSC_Class_10_Mathematics_Blueprint_Model_Paper_2_2026-27.pdf',
    type: 'model_paper_2',
    description: 'Authentic Blueprint and Model Question Paper 2 issued by the SSC Board Directorate for the 2026-27 public examinations. Includes distinct question formulations and full rubric evaluation guidelines.',
  },
];

// 3. OFFICIAL CHAPTER-WISE MARKS WEIGHTAGE (SOURCE OF TRUTH: OFFICIAL SSC BOARD BLUEPRINT 2026-27)
export const officialChapterWeightage: ChapterWeightageItem[] = [
  {
    sNo: 1,
    chapter: 'Real Numbers',
    marksBreakdown: '1 + 8',
    baseMarks: 9,
    choiceMarks: 0,
    totalMarksWithChoice: 9,
    questionTypes: '1 Objective (1M) + 1 Essay (8M)',
    domainsTested: 'Awareness, Creativity',
  },
  {
    sNo: 2,
    chapter: 'Polynomials',
    marksBreakdown: '1 + 2 + 4',
    baseMarks: 7,
    choiceMarks: 0,
    totalMarksWithChoice: 7,
    questionTypes: '1 Objective (1M) + 1 Very Short (2M) + 1 Short (4M)',
    domainsTested: 'Creativity, Awareness',
  },
  {
    sNo: 3,
    chapter: 'Pair of Linear Equations in Two Variables',
    marksBreakdown: '1 + 2 + 8',
    baseMarks: 11,
    choiceMarks: 0,
    totalMarksWithChoice: 11,
    questionTypes: '1 Objective (1M) + 1 Very Short (2M) + 1 Essay (8M)',
    domainsTested: 'Creativity, Awareness',
  },
  {
    sNo: 4,
    chapter: 'Quadratic Equations',
    marksBreakdown: '1 + 2 + 4',
    baseMarks: 7,
    choiceMarks: 0,
    totalMarksWithChoice: 7,
    questionTypes: '1 Objective (1M) + 1 Very Short (2M) + 1 Short (4M)',
    domainsTested: 'Creativity, Sensitivity, Awareness',
  },
  {
    sNo: 5,
    chapter: 'Arithmetic Progressions',
    marksBreakdown: '1 + 4 + (8)',
    baseMarks: 5,
    choiceMarks: 8,
    totalMarksWithChoice: 13,
    questionTypes: '1 Objective (1M) + 1 Short (4M) + [1 Essay (8M) Choice]',
    domainsTested: 'Sensitivity, Awareness, Creativity',
  },
  {
    sNo: 6,
    chapter: 'Triangles',
    marksBreakdown: '1 + 2 + (8)',
    baseMarks: 3,
    choiceMarks: 8,
    totalMarksWithChoice: 11,
    questionTypes: '1 Objective (1M) + 1 Very Short (2M) + [1 Essay (8M) Choice]',
    domainsTested: 'Awareness',
  },
  {
    sNo: 7,
    chapter: 'Coordinate Geometry',
    marksBreakdown: '2 + 8',
    baseMarks: 10,
    choiceMarks: 0,
    totalMarksWithChoice: 10,
    questionTypes: '1 Very Short (2M) + 1 Essay (8M)',
    domainsTested: 'Sensitivity, Awareness',
  },
  {
    sNo: 8,
    chapter: 'Introduction to Trigonometry',
    marksBreakdown: '1 + 2 + 4',
    baseMarks: 7,
    choiceMarks: 0,
    totalMarksWithChoice: 7,
    questionTypes: '1 Objective (1M) + 1 Very Short (2M) + 1 Short (4M)',
    domainsTested: 'Sensitivity, Awareness',
  },
  {
    sNo: 9,
    chapter: 'Some Applications of Trigonometry',
    marksBreakdown: '1 + 2 + (8)',
    baseMarks: 3,
    choiceMarks: 8,
    totalMarksWithChoice: 11,
    questionTypes: '1 Objective (1M) + 1 Very Short (2M) + [1 Essay (8M) Choice]',
    domainsTested: 'Sensitivity, Creativity, Awareness',
  },
  {
    sNo: 10,
    chapter: 'Circles',
    marksBreakdown: '1 + 2 + 4',
    baseMarks: 7,
    choiceMarks: 0,
    totalMarksWithChoice: 7,
    questionTypes: '1 Objective (1M) + 1 Very Short (2M) + 1 Short (4M)',
    domainsTested: 'Creativity, Awareness, Sensitivity',
  },
  {
    sNo: 11,
    chapter: 'Areas Related to Circles',
    marksBreakdown: '1 + (8)',
    baseMarks: 1,
    choiceMarks: 8,
    totalMarksWithChoice: 9,
    questionTypes: '1 Objective (1M) + [1 Essay (8M) Choice]',
    domainsTested: 'Awareness, Sensitivity',
  },
  {
    sNo: 12,
    chapter: 'Surface Areas and Volumes',
    marksBreakdown: '1 + 4 + (8)',
    baseMarks: 5,
    choiceMarks: 8,
    totalMarksWithChoice: 13,
    questionTypes: '1 Objective (1M) + 1 Short (4M) + [1 Essay (8M) Choice]',
    domainsTested: 'Awareness',
  },
  {
    sNo: 13,
    chapter: 'Statistics',
    marksBreakdown: '4 + 8',
    baseMarks: 12,
    choiceMarks: 0,
    totalMarksWithChoice: 12,
    questionTypes: '1 Short (4M) + 1 Essay (8M)',
    domainsTested: 'Awareness',
  },
  {
    sNo: 14,
    chapter: 'Probability',
    marksBreakdown: '1 + 4 + 8',
    baseMarks: 13,
    choiceMarks: 0,
    totalMarksWithChoice: 13,
    questionTypes: '1 Objective (1M) + 1 Short (4M) + 1 Essay (8M)',
    domainsTested: 'Sensitivity, Creativity, Awareness',
  },
];

// 4. QUESTION PAPER FORMAT & TIME DISTRIBUTION (OFFICIAL BLUEPRINT)
export const examPaperSections: ExamPatternSection[] = [
  {
    section: 'Section I',
    questionRange: 'Q 1 - 12',
    questionType: 'Objective (Very Short / Multiple Choice)',
    count: 12,
    marksPerQuestion: 1,
    totalMarks: 12,
    choice: 'No Choice (All compulsory)',
    estimatedTime: '20 Minutes',
  },
  {
    section: 'Section II',
    questionRange: 'Q 13 - 20',
    questionType: 'Very Short Answer (VSA)',
    count: 8,
    marksPerQuestion: 2,
    totalMarks: 16,
    choice: 'No Choice (All compulsory)',
    estimatedTime: '30 Minutes',
  },
  {
    section: 'Section III',
    questionRange: 'Q 21 - 28',
    questionType: 'Short Answer (SA)',
    count: 8,
    marksPerQuestion: 4,
    totalMarks: 32,
    choice: 'No Choice (All compulsory)',
    estimatedTime: '60 Minutes',
  },
  {
    section: 'Section IV',
    questionRange: 'Q 29 - 33',
    questionType: 'Essay / Long Answer (LA)',
    count: 5,
    marksPerQuestion: 8,
    totalMarks: 40,
    choice: 'Internal Choice: Each question has (a) or (b)',
    estimatedTime: '70 Minutes',
  },
];

// 5. PARAKH COMPETENCY DOMAINS (GOVERNMENT OF ANDHRA PRADESH)
export const parakhCompetencyDomains = [
  {
    name: 'Awareness (Knowledge, Understanding & Direct Application)',
    percentage: 60,
    marks: 60,
    description: 'Knowledge and direct application of core mathematical definitions, theorems, formulas, algorithms, and computational procedures.',
  },
  {
    name: 'Sensitivity (Analytical Problem Solving & Conflict Resolution)',
    percentage: 20,
    marks: 20,
    description: 'Mathematical analysis, open-minded problem solving, interpreting word problems, identifying conditions, and testing constraints.',
  },
  {
    name: 'Creativity (Synthesizing Ideas, Flexibility & Fluency)',
    percentage: 20,
    marks: 20,
    description: 'Combining multiple mathematical concepts, formulating proof approaches, geometric constructions, and higher-order evaluation.',
  },
];
