import React, { useState } from 'react';
import { RefreshCw, Layers, Box, Eye } from 'lucide-react';
import { cylinderMetrics } from '../../utils/mathUtils';

export const CylinderNetLab: React.FC = () => {
  const [radius, setRadius] = useState<number>(3);
  const [height, setHeight] = useState<number>(7);
  const [viewMode, setViewMode] = useState<'net' | 'cylinder'>('net');

  const { baseArea, csa, tsa, volume } = cylinderMetrics(radius, height);
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
            Interactive Mensuration Lab
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            Cylinder 2D Net Unfolding &amp; Surface Formulas
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'net' ? 'cylinder' : 'net')}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center gap-1.5"
          >
            {viewMode === 'net' ? <Box className="w-3.5 h-3.5 text-orange-600" /> : <Layers className="w-3.5 h-3.5 text-orange-600" />}
            <span>View: {viewMode === 'net' ? '3D Solid' : '2D Unfolded Net'}</span>
          </button>
          <button
            onClick={() => {
              setRadius(3);
              setHeight(7);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            title="Reset"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        Adjust radius <span className="font-mono font-bold text-orange-600">r</span> and height <span className="font-mono font-bold text-blue-600">h</span>. Unrolling the curved cylindrical face unfolds it into a flat rectangle of length <span className="font-mono font-bold text-orange-600">2πr</span> and height <span className="font-mono font-bold text-blue-600">h</span>!
      </p>

      <div className="flex flex-col md:grid md:grid-cols-12 gap-5 md:gap-6 items-center">
        {/* Controls Column (order-2 on mobile, order-1 on desktop) */}
        <div className="w-full order-2 md:order-1 md:col-span-5 space-y-3.5 sm:space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>Radius (r)</span>
                <span className="font-mono font-bold text-orange-600 dark:text-orange-400">{radius} cm</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="1"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full accent-orange-600 h-2 cursor-pointer bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>Height (h)</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{height} cm</span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                step="1"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 cursor-pointer bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="bg-orange-50/70 dark:bg-orange-950/40 p-4 rounded-xl border border-orange-200 dark:border-orange-900/60 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-orange-900 dark:text-orange-200 uppercase tracking-wider text-[11px]">
              <Layers className="w-4 h-4 text-orange-600" />
              Formula Decompositions:
            </div>
            <div className="space-y-1.5 text-slate-700 dark:text-slate-300">
              <div className="flex justify-between items-center">
                <span>Circumference of Base (2πr):</span>
                <span className="font-mono">{circumference.toFixed(2)} cm</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Curved Surface Area (CSA = 2πrh):</span>
                <span className="font-mono font-bold text-orange-700 dark:text-orange-300">{csa.toFixed(2)} cm²</span>
              </div>
              <div className="flex justify-between items-center">
                <span>2 Circular End-Caps (2 × πr²):</span>
                <span className="font-mono">{(2 * baseArea).toFixed(2)} cm²</span>
              </div>
              <div className="border-t border-orange-200 dark:border-orange-800 pt-1 flex justify-between items-center font-bold text-orange-950 dark:text-orange-100">
                <span>Total Surface Area (TSA):</span>
                <span className="font-mono">{tsa.toFixed(2)} cm²</span>
              </div>
              <div className="border-t border-orange-200 dark:border-orange-800 pt-1 flex justify-between items-center font-bold text-blue-900 dark:text-blue-200">
                <span>Volume (V = πr²h):</span>
                <span className="font-mono">{volume.toFixed(2)} cm³</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Net / 3D Canvas Column (order-1 on mobile, order-2 on desktop) */}
        <div className="w-full order-1 md:order-2 md:col-span-7 flex flex-col items-center justify-center">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center w-full max-w-sm sm:max-w-md">
            {viewMode === 'net' ? (
              /* 2D Unfolded Net */
              <svg width="300" height="220" viewBox="0 0 300 220" className="max-w-full h-auto select-none overflow-visible">
                {(() => {
                  const circleRadiusPx = 10 + radius * 3.5;
                  const rectHPx = 35 + height * 5;
                  const rectWPx = 180;
                  const centerX = 150;
                  const rectTopY = 110 - rectHPx / 2;

                  return (
                    <>
                      {/* Top Circle */}
                      <circle
                        cx={centerX}
                        cy={rectTopY - circleRadiusPx - 4}
                        r={circleRadiusPx}
                        className="fill-orange-400/25 stroke-orange-500"
                        strokeWidth="2"
                      />
                      <text
                        x={centerX}
                        y={rectTopY - circleRadiusPx - 4}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="fill-orange-800 dark:fill-orange-200 text-[10px] font-bold"
                      >
                        Top: πr²
                      </text>

                      {/* Unrolled Rectangle (CSA) */}
                      <rect
                        x={centerX - rectWPx / 2}
                        y={rectTopY}
                        width={rectWPx}
                        height={rectHPx}
                        className="fill-orange-500/20 stroke-orange-600"
                        strokeWidth="2"
                        rx="3"
                      />
                      <text
                        x={centerX}
                        y={rectTopY - 7}
                        textAnchor="middle"
                        className="fill-orange-700 dark:fill-orange-300 font-mono text-[10px] font-bold"
                      >
                        Length = 2πr ({circumference.toFixed(1)} cm)
                      </text>
                      <text
                        x={centerX}
                        y={110}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="fill-orange-950 dark:fill-orange-100 font-bold text-xs"
                      >
                        Curved Surface = 2πrh ({csa.toFixed(1)} cm²)
                      </text>
                      <text
                        x={centerX + rectWPx / 2 + 8}
                        y={110}
                        textAnchor="start"
                        dominantBaseline="central"
                        className="fill-blue-600 dark:fill-blue-400 font-mono text-[10px] font-bold"
                      >
                        h = {height} cm
                      </text>

                      {/* Bottom Circle */}
                      <circle
                        cx={centerX}
                        cy={rectTopY + rectHPx + circleRadiusPx + 4}
                        r={circleRadiusPx}
                        className="fill-orange-400/25 stroke-orange-500"
                        strokeWidth="2"
                      />
                      <text
                        x={centerX}
                        y={rectTopY + rectHPx + circleRadiusPx + 4}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="fill-orange-800 dark:fill-orange-200 text-[10px] font-bold"
                      >
                        Base: πr²
                      </text>
                    </>
                  );
                })()}
              </svg>
            ) : (
              /* 3D Solid Cylinder */
              <svg width="260" height="200" viewBox="0 0 260 200" className="max-w-full h-auto select-none">
                {(() => {
                  const rx = 20 + radius * 5;
                  const ry = rx * 0.35;
                  const cylH = 40 + height * 8;
                  const cx = 130;
                  const topY = 100 - cylH / 2;
                  const bottomY = topY + cylH;

                  return (
                    <g>
                      {/* Body sides & bottom half ellipse */}
                      <path
                        d={`M ${cx - rx} ${topY} L ${cx - rx} ${bottomY} A ${rx} ${ry} 0 0 0 ${cx + rx} ${bottomY} L ${cx + rx} ${topY} Z`}
                        className="fill-orange-500/25 stroke-orange-600"
                        strokeWidth="2"
                      />
                      {/* Bottom ellipse hidden dashed curve */}
                      <path
                        d={`M ${cx - rx} ${bottomY} A ${rx} ${ry} 0 0 1 ${cx + rx} ${bottomY}`}
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                      {/* Top ellipse full */}
                      <ellipse
                        cx={cx}
                        cy={topY}
                        rx={rx}
                        ry={ry}
                        className="fill-orange-400/35 stroke-orange-600"
                        strokeWidth="2"
                      />
                      {/* Radius line on top */}
                      <line x1={cx} y1={topY} x2={cx + rx} y2={topY} stroke="#ea580c" strokeWidth="2" />
                      <circle cx={cx} cy={topY} r="3" fill="#ea580c" />
                      <text x={cx + rx / 2} y={topY - 6} textAnchor="middle" className="fill-orange-700 dark:fill-orange-300 font-mono text-[10px] font-bold">
                        r = {radius}
                      </text>

                      {/* Height label on left */}
                      <line x1={cx - rx - 10} y1={topY} x2={cx - rx - 10} y2={bottomY} stroke="#2563eb" strokeWidth="1.5" />
                      <text x={cx - rx - 16} y={(topY + bottomY) / 2} textAnchor="end" dominantBaseline="central" className="fill-blue-600 dark:fill-blue-400 font-mono text-[10px] font-bold">
                        h = {height}
                      </text>
                    </g>
                  );
                })()}
              </svg>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
            <Eye className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span>
              <strong>Key Derivation:</strong> Total Surface Area is simply Curved Rectangle (2πrh) + Two Flat Circular Lids (2 × πr²) = 2πr(r + h).
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
