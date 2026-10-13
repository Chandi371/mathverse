import React from 'react';
import { AreaModelLab } from './AreaModelLab';
import { TrigTriangleLab } from './TrigTriangleLab';
import { ArithmeticProgressionLab } from './ArithmeticProgressionLab';
import { HeronsFormulaLab } from './HeronsFormulaLab';
import { CoordinateGeometryLab } from './CoordinateGeometryLab';
import { QuadraticParabolaLab } from './QuadraticParabolaLab';
import { ProbabilitySimulatorLab } from './ProbabilitySimulatorLab';
import { CircleAreaLab } from './CircleAreaLab';
import { CylinderNetLab } from './CylinderNetLab';
import { LinearEquationsLab } from './LinearEquationsLab';
import { SimilarTrianglesLab } from './SimilarTrianglesLab';
import { StatisticsLab } from './StatisticsLab';

interface LabDispatcherProps {
  labId: string;
}

export const InteractiveLabDispatcher: React.FC<LabDispatcherProps> = ({ labId }) => {
  switch (labId) {
    case 'area-model':
      return <AreaModelLab />;
    case 'trig-triangle':
      return <TrigTriangleLab />;
    case 'arithmetic-progression':
      return <ArithmeticProgressionLab />;
    case 'herons-formula':
      return <HeronsFormulaLab />;
    case 'coordinate-geometry':
      return <CoordinateGeometryLab />;
    case 'quadratic-parabola':
      return <QuadraticParabolaLab />;
    case 'probability-sim':
      return <ProbabilitySimulatorLab />;
    case 'circle-area':
      return <CircleAreaLab />;
    case 'cylinder-net':
      return <CylinderNetLab />;
    case 'linear-equations':
      return <LinearEquationsLab />;
    case 'similar-triangles':
      return <SimilarTrianglesLab />;
    case 'statistics-lab':
      return <StatisticsLab />;
    default:
      return (
        <div className="p-8 text-center text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="font-semibold">Interactive Lab "{labId}" is under active development.</p>
          <p className="text-xs mt-1">Check back shortly as new interactive models are compiled!</p>
        </div>
      );
  }
};
