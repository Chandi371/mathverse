import { chaptersData } from '../src/data/curriculumData';
import { allFormulasData } from '../src/data/formulasData';
import { questionRegistry } from '../src/data/questionRegistry';

console.log('=== MATHVERSE CONTENT INVENTORY AUDIT ===');
console.log('Total Chapters:', chaptersData.length);
console.log('Total Formulas in FormulasData:', allFormulasData.length);
console.log('Total Questions in QuestionRegistry:', questionRegistry.length);

let totalLibFormulas = 0;
let totalKeyFormulas = 0;
let totalExamples = 0;
let totalQuestions = 0;

chaptersData.forEach((ch) => {
  const fLib = allFormulasData.filter((f) => f.chapterId === ch.id);
  const fKey = ch.keyFormulas || [];
  const qList = questionRegistry.filter((q) => q.chapterId === ch.id);
  const exList = ch.workedExamples || [];
  const hasDeriv = Boolean(ch.derivation);
  const memList = ch.memoryLab || [];
  const vocabList = ch.vocabulary || [];
  const strategies = ch.problemSolvingStrategies || [];

  totalLibFormulas += fLib.length;
  totalKeyFormulas += fKey.length;
  totalExamples += exList.length;
  totalQuestions += qList.length;

  console.log(
    `[${ch.id.padEnd(14)}] C${ch.classGrade} S${ch.semester} Ch${String(ch.chapterNumber).padStart(2)}: ` +
    `F_lib=${fLib.length}, F_key=${fKey.length}, Qs=${qList.length}, Ex=${exList.length}, ` +
    `Deriv=${hasDeriv ? 'Y' : 'N'}, Mem=${memList.length}, Vocab=${vocabList.length}, Strat=${strategies.length} | ` +
    `${ch.title}`
  );
});

console.log('\n--- AGGREGATE TOTALS ---');
console.log('Total Chapter Key Formulas:', totalKeyFormulas);
console.log('Total Library Formulas:', totalLibFormulas);
console.log('Total Worked Examples:', totalExamples);
console.log('Total Registry Questions:', totalQuestions);
