import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, Trash2, Edit3, Check, Scale, Ruler, Info } from 'lucide-react';

interface WeightRecord {
  id: string;
  date: string;
  weight: number;
}

const getBmiCategory = (value: number) => {
  if (value < 18.5) {
    return { label: 'Underweight', color: 'bg-amber-50 text-amber-700 border-amber-200/50', desc: 'Slightly underweight. Consider increasing your healthy calorie and nutrient intake.' };
  } else if (value < 25.0) {
    return { label: 'Normal', color: 'bg-emerald-50 text-emerald-700 border-emerald-200/50', desc: 'Ideal body weight! Keep maintaining your workouts and balanced food habits.' };
  } else if (value < 30.0) {
    return { label: 'Overweight', color: 'bg-orange-50 text-orange-700 border-orange-200/50', desc: 'Slightly above healthy range. Regular active workouts and healthy diet can assist.' };
  } else {
    return { label: 'Obese', color: 'bg-rose-50 text-rose-700 border-rose-200/50', desc: 'Above healthy range. We recommend active lifestyle steps and checking workout models.' };
  }
};

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

export default function Dashboard({ username, onLogout }: DashboardProps) {
  // BMI height state (Default 172 cm)
  const [height, setHeight] = useState<number>(() => {
    const saved = localStorage.getItem(`health_height_${username}`);
    return saved ? parseFloat(saved) : 172;
  });
  const [isEditingHeight, setIsEditingHeight] = useState(false);
  const [tempHeight, setTempHeight] = useState(height.toString());

  // 1. Target Weight State (Default 81.2 Kg as shown in screenshot)
  const [targetWeight, setTargetWeight] = useState<number>(() => {
    const saved = localStorage.getItem(`health_target_${username}`);
    return saved ? parseFloat(saved) : 81.2;
  });

  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [tempTarget, setTempTarget] = useState(targetWeight.toString());

  // 2. Weights List State starting with exact pre-populated logs from the screenshot
  const [weights, setWeights] = useState<WeightRecord[]>(() => {
    const saved = localStorage.getItem(`health_weights_${username}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Pre-populate with exact records from screenshot layout
    return [
      { id: '1', date: '21 Jun 2026', weight: 80.7 },
      { id: '2', date: '19 Jun 2026', weight: 81.0 },
      { id: '3', date: '17 Jun 2026', weight: 80.7 },
      { id: '4', date: '15 Jun 2026', weight: 80.8 },
      { id: '5', date: '12 Jun 2026', weight: 83.2 },
      { id: '6', date: '08 Jun 2026', weight: 75.0 },
      { id: '7', date: '01 Jun 2026', weight: 69.0 }
    ];
  });

  // Current weight log input (Keypad controlled)
  const [inputWeight, setInputWeight] = useState('81.2');

  // Persistence hooks
  useEffect(() => {
    localStorage.setItem(`health_weights_${username}`, JSON.stringify(weights));
  }, [weights, username]);

  useEffect(() => {
    localStorage.setItem(`health_target_${username}`, targetWeight.toString());
  }, [targetWeight, username]);

  useEffect(() => {
    localStorage.setItem(`health_height_${username}`, height.toString());
  }, [height, username]);

  // Keypad click handler
  const handleKeypadPress = (val: string) => {
    if (val === '⌫') {
      setInputWeight(prev => {
        if (prev.length <= 1) return '0';
        return prev.slice(0, -1);
      });
    } else if (val === '.') {
      setInputWeight(prev => {
        if (prev.includes('.')) return prev;
        return prev + '.';
      });
    } else {
      setInputWeight(prev => {
        if (prev === '0') return val;
        // Limit digit lengths for safety
        if (prev.replace('.', '').length >= 5) return prev;
        return prev + val;
      });
    }
  };

  // Save/Submit Weight Form
  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalWeight = parseFloat(inputWeight);
    if (isNaN(finalWeight) || finalWeight <= 0) {
      alert("Please enter a valid weight!");
      return;
    }

    // Determine clean date formatted as "21 Jun 2026"
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const d = new Date();
    const formattedDate = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;

    const newRecord: WeightRecord = {
      id: Date.now().toString(),
      date: formattedDate,
      weight: finalWeight
    };

    // Add at top of the array
    setWeights(prev => [newRecord, ...prev]);
    // Optional sensory feedback
  };

  // Delete weight handler
  const handleDelete = (id: string) => {
    if (window.confirm("Batal atau hapus catatan timbangan ini?")) {
      setWeights(prev => prev.filter(w => w.id !== id));
    }
  };

  // Convert target update
  const handleTargetSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(tempTarget);
    if (!isNaN(parsed) && parsed > 0) {
      setTargetWeight(parsed);
      setIsEditingTarget(false);
    }
  };

  const latestWeight = weights.length > 0 ? weights[0].weight : parseFloat(inputWeight) || 81.2;
  const bmiValue = parseFloat((latestWeight / Math.pow(height / 100, 2)).toFixed(1));
  const bmiCategory = getBmiCategory(bmiValue);

  // Render SVG points based on weights history per day / date
  const graphPoints = [
    { label: '01 Jun', weight: 69.0 },
    { label: '08 Jun', weight: 75.0 },
    { label: '12 Jun', weight: 83.2 },
    { label: '17 Jun', weight: 80.7 },
    { label: '21 Jun', weight: 80.7 },
  ];

  // If there are custom user weights, we can inject/replace latest points dynamically or plot them beautifully!
  // To keep graph incredibly robust and matching the graphic:
  // Let's reverse list of latest logged weights to show standard progress progression chronologically from left to right
  const maxLabelCount = 6;
  const plottedRecords = weights.slice(0, maxLabelCount).reverse();
  
  // Fill in points with mock graph history if user cleared it, so it remains perfectly populated
  const displayPoints = plottedRecords.length >= 3 
    ? plottedRecords.map(w => {
        const parts = w.date.split(' ');
        const dayAndMonth = parts.length >= 2 ? `${parts[0]} ${parts[1]}` : w.date;
        return {
          label: dayAndMonth,
          weight: w.weight
        };
      })
    : graphPoints;

  // Render variables for clean responsive chart coordinates
  const chartHeight = 180;
  const chartWidth = 500;
  const paddingX = 40;
  const paddingY = 20;

  const weightsListForMinMax = displayPoints.map(p => p.weight).concat([targetWeight]);
  const minW = Math.min(...weightsListForMinMax) - 2;
  const maxW = Math.max(...weightsListForMinMax) + 2;
  const weightRange = maxW - minW || 10;

  const pointsFormatted = displayPoints.map((pt, index) => {
    const x = paddingX + (index / (displayPoints.length - 1)) * (chartWidth - paddingX * 2);
    // Inverse height (SVG 0 is top)
    const y = chartHeight - paddingY - ((pt.weight - minW) / weightRange) * (chartHeight - paddingY * 2);
    return { x, y, label: pt.label, weight: pt.weight };
  });

  // Target red line coordinate
  const targetY = chartHeight - paddingY - ((targetWeight - minW) / weightRange) * (chartHeight - paddingY * 2);

  // Generate smooth cubic bezier SVG path string
  let linePath = "";
  let areaPath = "";
  if (pointsFormatted.length > 0) {
    linePath = `M ${pointsFormatted[0].x} ${pointsFormatted[0].y}`;
    for (let i = 0; i < pointsFormatted.length - 1; i++) {
      const p0 = pointsFormatted[i];
      const p1 = pointsFormatted[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 3.0;
      const cpY1 = p0.y;
      const cpX2 = p0.x + 2 * (p1.x - p0.x) / 3.0;
      const cpY2 = p1.y;
      linePath += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    
    // Smooth closed path for gradient background
    areaPath = `${linePath} L ${pointsFormatted[pointsFormatted.length - 1].x} ${chartHeight - paddingY} L ${pointsFormatted[0].x} ${chartHeight - paddingY} Z`;
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-[#1e293b] font-sans antialiased pb-12 flex flex-col items-center">
      
      {/* Container matching mobile mockup widths & premium app density */}
      <div className="w-full max-w-[480px] px-4 pt-6 space-y-5">
        
        {/* 1. APPMOBILE HEADER */}
        <header className="flex items-center justify-between py-1">
          <div className="flex items-center gap-3">
            {/* High-fidelity Vector Avatar directly matching the picture */}
            <div className="w-13 h-13 rounded-full overflow-hidden shrink-0 border border-gray-100 shadow-sm">
              <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Blue circular profile background */}
                <circle cx="60" cy="60" r="60" fill="#75abd2" />
                {/* Neck */}
                <rect x="52" y="70" width="16" height="20" fill="#efb19b" />
                {/* Hair back */}
                <circle cx="60" cy="50" r="30" fill="#2d3330" />
                {/* Collar */}
                <path d="M46 90 L74 90 L60 102 Z" fill="#2d3330" />
                {/* Face */}
                <circle cx="60" cy="56" r="23" fill="#ffd0be" />
                {/* Ears */}
                <circle cx="37" cy="58" r="5" fill="#ffd0be" />
                <circle cx="83" cy="58" r="5" fill="#ffd0be" />
                {/* Front Hair */}
                <path d="M37 50 C37 30, 83 30, 83 50 C76 43, 68 44, 60 41 C52 44, 44 43, 37 50 Z" fill="#2d3330" />
                <path d="M37 50 L41 57 L46 51 Z" fill="#2d3330" />
                <path d="M83 50 L79 57 L74 51 Z" fill="#2d3330" />
                {/* Human Shoulders / Dark Blue Shirt */}
                <path d="M18 112 C26 95, 42 86, 60 86 C78 86, 94 95, 102 112 Z" fill="#4B6071" />
              </svg>
            </div>
            
            {/* Greetings Hello, Rizki */}
            <div>
              <p className="text-[#8e9aa6] text-sm leading-tight font-normal">Hello,</p>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">
                {username.charAt(0).toUpperCase() + username.slice(1)}
              </h1>
            </div>
          </div>

          {/* Simple Logout pill button */}
          <button
            id="app-logout-btn"
            onClick={onLogout}
            className="px-5 py-1.5 bg-white border border-gray-200/90 hover:border-gray-400 text-slate-800 font-medium rounded-xl text-[14px] transition-all cursor-pointer shadow-2xs"
          >
            Logout
          </button>
        </header>

        {/* 2. LOG WEIGHT CARD WITH KEYPAD CONTAINER */}
        <section className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-3xs">
          <h2 className="text-[19px] font-bold text-slate-900 mb-4">Log Weight</h2>
          
          <div className="grid grid-cols-12 gap-4 items-center">
            {/* Big weight display box */}
            <div className="col-span-8">
              <div 
                id="weight-input-container" 
                className="w-full h-[62px] border border-gray-200/90 rounded-2xl flex items-center px-4 bg-white select-none shadow-3xs"
              >
                <span className="text-[26px] font-medium text-slate-900 tracking-tight">
                  {inputWeight} <span className="text-slate-900 font-normal">Kg</span>
                </span>
                {/* Blinking input cursor directly mimicking screenshot */}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-[1.8px] h-7 bg-blue-600 ml-1 inline-block"
                />
              </div>
            </div>

            {/* Micro Keypad container to the right */}
            <div className="col-span-4 pl-1">
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map((key) => (
                  <button
                    key={key}
                    id={`keypad-${key === '⌫' ? 'back' : key === '.' ? 'dot' : key}`}
                    type="button"
                    onClick={() => handleKeypadPress(key)}
                    className="w-full h-8 flex items-center justify-center border border-gray-200/80 hover:bg-slate-50 text-[13px] font-semibold text-slate-700 bg-white rounded-lg transition-colors cursor-pointer select-none shadow-3xs active:scale-95"
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Full-width Azure Save weight button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            id="weight-save-button"
            onClick={() => handleSave()}
            className="w-full mt-4 py-3.5 bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-semibold rounded-2xl text-[16px] transition-all cursor-pointer shadow-xs border-none flex items-center justify-center gap-1.5"
          >
            Save
          </motion.button>
        </section>

        {/* BMI CALCULATOR CARD */}
        <section className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-3xs space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-[19px] font-bold text-slate-900">BMI Status</h2>
            
            {/* Height configuration with soft inline edit trigger */}
            <div className="flex items-center gap-1.5">
              {isEditingHeight ? (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="100"
                    max="250"
                    value={tempHeight}
                    onChange={(e) => setTempHeight(e.target.value)}
                    className="w-16 px-2 py-1 bg-slate-50 border border-gray-200 rounded text-xs font-semibold focus:outline-none focus:border-blue-500"
                    autoFocus
                  />
                  <span className="text-xs text-slate-400 font-medium font-sans">cm</span>
                  <button 
                    id="save-height-btn"
                    onClick={(e) => {
                      const hVal = parseFloat(tempHeight);
                      if (!isNaN(hVal) && hVal >= 100 && hVal <= 250) {
                        setHeight(hVal);
                        setIsEditingHeight(false);
                      }
                    }} 
                    className="p-1 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  id="edit-height-trigger"
                  type="button"
                  onClick={() => {
                    setTempHeight(height.toString());
                    setIsEditingHeight(true);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 bg-slate-50 border border-slate-100 hover:border-slate-300 rounded-lg text-xs text-slate-600 font-semibold transition"
                  title="Click to edit height"
                >
                  <Ruler className="w-3 h-3 text-[#8e9aa6]" /> H: {height} cm
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 bg-slate-50/50 p-4 rounded-2xl border border-gray-100/50">
            <div>
              <span className="text-[10px] font-bold text-[#8e9aa6] uppercase tracking-wide block">Current BMI Score</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold text-slate-900 tracking-tight">{bmiValue}</span>
                <span className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full border ${bmiCategory.color}`}>
                  {bmiCategory.label}
                </span>
              </div>
            </div>
            
            {/* Soft indicator of calculated values */}
            <div className="text-right text-[11px] text-[#8e9aa6] leading-tight-12 shrink-0">
              <span className="block font-medium">Beban: {latestWeight.toFixed(1)} Kg</span>
              <span className="block font-medium mt-0.5">Tinggi: {height} cm</span>
            </div>
          </div>

          {/* Elegant Gauge Track / Slider range representer */}
          <div className="space-y-1 pt-1">
            <div className="relative w-full h-2.5 bg-slate-100 rounded-full flex overflow-hidden">
              <div className="h-full bg-amber-300 w-[18.5%]" title="Underweight < 18.5" />
              <div className="h-full bg-emerald-400 w-[32.5%]" title="Normal 18.5 - 25.0" />
              <div className="h-full bg-orange-300 w-[24%]" title="Overweight 25.0 - 30.0" />
              <div className="h-full bg-rose-400 w-[25%]" title="Obese >= 30.0" />

              {/* Dynamic Absolute marker representing current BMI value */}
              {/* Scale mathematically: 15 to 35 covers the slider beautifully */}
              {(() => {
                const minScale = 15;
                const maxScale = 35;
                const pct = Math.min(100, Math.max(0, ((bmiValue - minScale) / (maxScale - minScale)) * 100));
                return (
                  <div 
                    style={{ left: `${pct}%` }}
                    className="absolute top-1/2 -translate-y-1/2 -ml-2.5 w-5 h-5 bg-white border-[3px] border-slate-900 rounded-full shadow-md transition-all duration-300 pointer-events-none"
                  />
                );
              })()}
            </div>
            
            <div className="flex justify-between text-[10px] font-bold text-[#8e9aa6] px-1 pt-0.5">
              <span>15.0</span>
              <span>18.5</span>
              <span>25.0</span>
              <span>30.0</span>
              <span>35.0</span>
            </div>
          </div>

          {/* Interactive health insight feedback description */}
          <div className="flex gap-2.5 items-start bg-[#2563eb]/5 p-3 rounded-xl border border-[#2563eb]/10">
            <Info className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
              {bmiCategory.desc}
            </p>
          </div>
        </section>

        {/* 3. PROGRESS HISTORY CARD WITH SVG GRAPH */}
        <section className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-3xs">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-[19px] font-bold text-slate-900">Progress History</h2>
            
            {/* Target interactive click to instantly edit dotted red line on graph */}
            <div className="flex items-center gap-2">
              {isEditingTarget ? (
                <form onSubmit={handleTargetSave} className="flex items-center gap-1">
                  <input
                    type="number"
                    step="0.1"
                    value={tempTarget}
                    onChange={(e) => setTempTarget(e.target.value)}
                    className="w-14 px-1.5 py-0.5 border border-gray-300 rounded text-xs"
                    autoFocus
                  />
                  <button type="submit" className="p-1 text-emerald-600 hover:bg-emerald-50 rounded">
                    <Check className="w-3 h-3" />
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setTempTarget(targetWeight.toString());
                    setIsEditingTarget(true);
                  }}
                  className="flex items-center gap-1 text-[11px] text-[#8e9aa6] hover:text-black font-semibold transition"
                  title="Click to edit target weight"
                >
                  <Edit3 className="w-3 h-3" /> Set Target
                </button>
              )}
            </div>
          </div>

          {/* Legends: Current Weight & Target */}
          <div className="flex items-center justify-center gap-5 text-xs text-slate-700 font-medium mb-4">
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-0.5 bg-blue-500 inline-block" />
              <span>Current Weight</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-6 border-b border-dashed border-red-500 inline-block" />
              <span>Target</span>
            </div>
          </div>

          {/* Clean High-Contrast Line Chart matching mockup screenshot */}
          <div className="w-full overflow-hidden bg-white pt-2 relative">
            <svg 
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Mockup Soft Blue Gradient under the Line */}
                <linearGradient id="chartAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.00" />
                </linearGradient>
              </defs>

              {/* Horizontal horizontal mesh grids mapping (68, 70, 76, 82, 86) */}
              {[68, 70, 76, 82, 86].map((tick) => {
                const tickY = chartHeight - paddingY - ((tick - minW) / weightRange) * (chartHeight - paddingY * 2);
                return (
                  <g key={tick}>
                    <line 
                      x1={paddingX} 
                      y1={tickY} 
                      x2={chartWidth - paddingX} 
                      y2={tickY} 
                      stroke="#f1f5f9" 
                      strokeWidth="1.2" 
                    />
                    <text 
                      x={paddingX - 10} 
                      y={tickY + 4} 
                      fill="#94a3b8" 
                      fontSize="11" 
                      fontFamily="sans-serif" 
                      textAnchor="end"
                    >
                      {tick}
                    </text>
                  </g>
                );
              })}

              {/* Target Red Dotted horizontal line matching screenshot */}
              <line 
                x1={paddingX} 
                y1={targetY} 
                x2={chartWidth - paddingX} 
                y2={targetY} 
                stroke="#ef4444" 
                strokeWidth="2.5" 
                strokeDasharray="4 4" 
              />

              {/* Render Smooth Area Fill */}
              {areaPath && (
                <path d={areaPath} fill="url(#chartAreaGrad)" />
              )}

              {/* Render Primary Blue Line representing weights */}
              {linePath && (
                <path 
                  d={linePath} 
                  stroke="#2563eb" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              )}

              {/* Circular interactive points and nodes on line */}
              {pointsFormatted.map((pt, index) => (
                <g key={index} className="group cursor-pointer">
                  {/* Tooltip background on hover */}
                  <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <rect 
                      x={pt.x - 20} 
                      y={pt.y - 28} 
                      width="40" 
                      height="18" 
                      rx="4" 
                      fill="#1e293b" 
                    />
                    <text 
                      x={pt.x} 
                      y={pt.y - 16} 
                      fill="white" 
                      fontSize="9" 
                      fontWeight="bold" 
                      textAnchor="middle" 
                    >
                      {pt.weight}
                    </text>
                  </g>

                  {/* Circular Node representation */}
                  <circle 
                    cx={pt.x} 
                    cy={pt.y} 
                    r="6.5" 
                    fill="white" 
                    stroke="#2563eb" 
                    strokeWidth="3" 
                  />
                </g>
              ))}

              {/* X Axis Labels: Months (e.g. May, Jun, May, Jun, Jul) */}
              {pointsFormatted.map((pt, index) => (
                <text
                  key={index}
                  x={pt.x}
                  y={chartHeight - 3}
                  fill="#64748b"
                  fontSize="12"
                  fontWeight="500"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              ))}
            </svg>
          </div>
        </section>

        {/* 4. RECENT HISTORY TABLE CARD */}
        <section className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-3xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[19px] font-bold text-slate-900">Recent History</h2>
            {weights.length > 5 && (
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                {weights.length} Entries
              </span>
            )}
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100">
            <table className="w-full border-collapse text-left text-xs text-slate-800">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-100 font-bold text-slate-500 uppercase tracking-wide text-[11px]">
                  <th className="py-3 px-4 font-bold text-left">Tanggal</th>
                  <th className="py-3 px-4 font-bold text-right pr-6">Berat (Kg)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {weights.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="py-8 text-center text-gray-400">
                      Tak ada riwayat timbangan. Mulai isi di atas!
                    </td>
                  </tr>
                ) : (
                  weights.map((record) => (
                    <tr 
                      key={record.id} 
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      {/* Date details */}
                      <td className="py-3.5 px-4 font-semibold text-slate-800 text-[13px]">
                        {record.date}
                      </td>
                      
                      {/* Weight value & fast delete key */}
                      <td className="py-3.5 px-4 text-right pr-6 text-[13.5px] font-bold text-blue-600 flex items-center justify-end gap-3">
                        <span>{record.weight.toFixed(1)} Kg</span>
                        
                        {/* Interactive trash component, stays subtle */}
                        <button
                          type="button"
                          onClick={() => handleDelete(record.id)}
                          className="text-gray-300 hover:text-red-500 p-1 rounded transition-colors"
                          title="Hapus baris timbangan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
