import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { allFormulasData } from '../data/formulasData';
import { chaptersData } from '../data/curriculumData';

describe('KaTeX Syntax and Mathematical Notation Audit', () => {
  it('all global formulas have valid KaTeX syntax without throwing', () => {
    const invalidFormulas: { id: string; name: string; latex: string; error: string }[] = [];

    allFormulasData.forEach((f) => {
      try {
        katex.renderToString(f.latex, { throwOnError: true, displayMode: true });
      } catch (err: any) {
        invalidFormulas.push({
          id: f.id,
          name: f.name,
          latex: f.latex,
          error: err.message,
        });
      }
    });

    if (invalidFormulas.length > 0) {
      console.error('Invalid KaTeX Formulas found:', JSON.stringify(invalidFormulas, null, 2));
    }
    expect(invalidFormulas).toEqual([]);
  });

  it('all chapter key formulas, derivations, and examples render validly', () => {
    const invalidItems: { chapterId: string; type: string; latex: string; error: string }[] = [];

    chaptersData.forEach((ch) => {
      // Key formulas
      ch.keyFormulas?.forEach((kf) => {
        try {
          katex.renderToString(kf.latex, { throwOnError: true, displayMode: true });
        } catch (err: any) {
          invalidItems.push({
            chapterId: ch.id,
            type: `keyFormula: ${kf.name}`,
            latex: kf.latex,
            error: err.message,
          });
        }
      });

      // Derivation target and steps
      if (ch.derivation) {
        if (ch.derivation.targetFormula) {
          try {
            katex.renderToString(ch.derivation.targetFormula, { throwOnError: true, displayMode: true });
          } catch (err: any) {
            invalidItems.push({
              chapterId: ch.id,
              type: 'derivation.targetFormula',
              latex: ch.derivation.targetFormula,
              error: err.message,
            });
          }
        }

        ch.derivation.steps?.forEach((step: any, idx: number) => {
          if (step.latex) {
            try {
              katex.renderToString(step.latex, { throwOnError: true, displayMode: false });
            } catch (err: any) {
              invalidItems.push({
                chapterId: ch.id,
                type: `derivation.step[${idx}]`,
                latex: step.latex,
                error: err.message,
              });
            }
          }
        });
      }

      // Worked examples steps
      ch.workedExamples?.forEach((ex, exIdx) => {
        ex.steps?.forEach((st: any, stIdx: number) => {
          if (st.math) {
            try {
              katex.renderToString(st.math, { throwOnError: true, displayMode: false });
            } catch (err: any) {
              invalidItems.push({
                chapterId: ch.id,
                type: `workedExample[${exIdx}].step[${stIdx}]`,
                latex: st.math,
                error: err.message,
              });
            }
          }
        });
      });
    });

    if (invalidItems.length > 0) {
      console.error('Invalid LaTeX items found in curriculum:', JSON.stringify(invalidItems, null, 2));
    }
    expect(invalidItems).toEqual([]);
  });
});
