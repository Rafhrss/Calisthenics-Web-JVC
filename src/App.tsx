/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Code2, 
  Dumbbell, 
  Timer, 
  Terminal,
  ChevronRight,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types for our routine data
interface Routine {
  title: string;
  exercises: string[];
  description: string;
}

const ROUTINE_DATA: Record<number, Routine> = {
  1: {
    title: "Quick Micro-Break",
    exercises: ["10 Bodyweight Squats", "20 Sec Neck Stretch", "Deep Breathing"],
    description: "Perfect for a quick AI model initialization."
  },
  5: {
    title: "Arch Body Holds & Core",
    exercises: ["45s Arch Body Hold", "30s Hollow Body Hold", "15 Leg Raises", "Repeat x2"],
    description: "Strengthen your posterior chain while waiting for npm install."
  },
  10: {
    title: "Ring Chest Flys & Push-ups",
    exercises: ["12 Ring Chest Flys (or Wide Push-ups)", "15 Diamond Push-ups", "20 Sec Plank", "Repeat x3"],
    description: "Focus on horizontal pushing power during container builds."
  },
  15: {
    title: "Pull-up Foundations",
    exercises: ["10 Scapula Shrugs", "8 Clean Pull-ups", "12 Australian Rows", "Repeat x3"],
    description: "Build a solid back while the CI/CD pipeline runs."
  },
  20: {
    title: "Handstand & Front Levers",
    exercises: ["2 Min Handstand Wall Practice", "10 Tuck Front Lever Pulls", "15 Pike Push-ups", "Repeat x4"],
    description: "Advanced skill training for complex AI refactors."
  },
  30: {
    title: "Muscle-Up Progressions",
    exercises: ["5 High Pull-ups", "8 Straight Bar Dips", "10 Explosive Pull-ups", "12 Knee to Elbows", "Repeat x5"],
    description: "Elite volume for deep learning model training sessions."
  }
};

export default function App() {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [currentRoutine, setCurrentRoutine] = useState<Routine | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // Timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setShowSuccess(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const handleGenerateRoutine = () => {
    if (selectedDuration && ROUTINE_DATA[selectedDuration]) {
      setCurrentRoutine(ROUTINE_DATA[selectedDuration]);
      setTimeLeft(selectedDuration * 60);
      setIsActive(false);
      setShowSuccess(false);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    if (selectedDuration) {
      setTimeLeft(selectedDuration * 60);
    }
    setShowSuccess(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const markAsDone = () => {
    setIsActive(false);
    setTimeLeft(0);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-emerald-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <header className="mb-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <div className="p-2 bg-emerald-500 rounded-lg shadow-lg shadow-emerald-500/20">
              <Code2 className="w-8 h-8 text-slate-950" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Cali<span className="text-emerald-400 text-shadow-glow">Code</span>
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-medium"
          >
            Senior Calisthenics Protocol for Software Engineers
          </motion.p>
        </header>

        {/* Configuration Section */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 mb-8 backdrop-blur-sm shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <Timer className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-semibold text-slate-100">Select AI Wait Time</h2>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
            {[1, 5, 10, 15, 20, 30].map((min) => (
              <button
                key={min}
                onClick={() => setSelectedDuration(min)}
                className={`
                  py-3 rounded-xl font-mono text-sm transition-all duration-200 border
                  ${selectedDuration === min 
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-slate-800'
                  }
                `}
              >
                {min}m
              </button>
            ))}
          </div>

          <button
            onClick={handleGenerateRoutine}
            disabled={!selectedDuration}
            className={`
              w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold transition-all
              ${selectedDuration 
                ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 cursor-pointer shadow-lg shadow-emerald-500/10' 
                : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700'
              }
            `}
          >
            <Zap className="w-5 h-5" />
            GENERATE ROUTINE
          </button>
        </section>

        {/* Routine Display & Timer Area */}
        <AnimatePresence mode="wait">
          {currentRoutine && (
            <motion.div
              key={currentRoutine.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {/* Timer UI */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 flex flex-col items-center shadow-2xl relative overflow-hidden">
                {/* Progress bar background */}
                <div className="absolute bottom-0 left-0 h-1 bg-slate-800 w-full" />
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-emerald-500"
                  initial={{ width: '100%' }}
                  animate={{ width: `${(timeLeft / (selectedDuration! * 60)) * 100}%` }}
                />

                <div className="text-8xl font-mono font-bold tracking-tighter mb-8 text-white tabular-nums drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  {formatTime(timeLeft)}
                </div>

                <div className="flex flex-col items-center gap-6 w-full max-w-xs">
                  <div className="flex gap-4">
                    <button
                      onClick={toggleTimer}
                      className="p-4 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors border border-slate-700 group shadow-lg shadow-black/20"
                    >
                      {isActive ? (
                        <Pause className="w-8 h-8 text-emerald-400 group-active:scale-95" />
                      ) : (
                        <Play className="w-8 h-8 text-emerald-400 group-active:scale-95 translate-x-0.5" />
                      )}
                    </button>
                    <button
                      onClick={resetTimer}
                      className="p-4 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors border border-slate-700 group shadow-lg shadow-black/20"
                    >
                      <RotateCcw className="w-8 h-8 text-slate-400 group-active:rotate-[-45deg] transition-transform" />
                    </button>
                  </div>
                  
                  <button
                    onClick={markAsDone}
                    className="w-full py-3 px-6 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-400 font-bold transition-all active:scale-95 text-sm tracking-wide"
                  >
                    MARK AS DONE
                  </button>
                </div>
              </div>

              {/* Workout Details */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-md">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-emerald-500 text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                       <Terminal className="w-3 h-3" /> Execute Protocol
                    </div>
                    <h3 className="text-2xl font-bold text-white">{currentRoutine.title}</h3>
                  </div>
                  <Dumbbell className="w-8 h-8 text-slate-700" />
                </div>
                
                <p className="text-slate-400 text-sm mb-6 italic">
                  &gt; {currentRoutine.description}
                </p>

                <ul className="space-y-4">
                  {currentRoutine.exercises.map((ex, idx) => (
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      key={idx} 
                      className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-xl border border-slate-800 group hover:border-emerald-500/30 transition-colors"
                    >
                      <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-xs font-mono text-emerald-500 group-hover:bg-emerald-500/20">
                        {idx + 1}
                      </div>
                      <span className="text-slate-200 group-hover:text-emerald-500 transition-colors font-medium">
                        {ex}
                      </span>
                      <ChevronRight className="w-4 h-4 ml-auto text-slate-800 group-hover:text-emerald-500/50" />
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Modal Overlay */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-slate-900 border border-emerald-500/50 p-10 rounded-3xl max-w-sm w-full text-center shadow-[0_0_50px_rgba(16,185,129,0.2)]"
              >
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10 text-slate-950" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Protocol Complete!</h2>
                <p className="text-slate-400 mb-8 font-mono text-sm">
                  System updated. Strength +1. <br /> Back to the code, Athlete.
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all"
                >
                  CONTINUE CODING
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="mt-16 text-center text-slate-600 text-xs font-mono">
          <p>// Designed for the modern software athlete</p>
          <p className="mt-1">© 2026 CaliCode v1.0.4.stable</p>
        </footer>
      </div>
    </div>
  );
}
