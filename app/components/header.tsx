'use client';
import { useTheme } from 'next-themes';
import { Sun, Moon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

interface AppHeaderProps { totalStats: { yearRange: string; totalChapters: number; totalQuestions: number; }; }
export default function AppHeader({ totalStats }: AppHeaderProps) {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">JEE Main</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-x-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
          <span>{totalStats.yearRange}</span><span className="h-1 w-1 rounded-full bg-gray-400 hidden md:inline-block"></span>
          <span>{totalStats.totalChapters} Chapters</span><span className="h-1 w-1 rounded-full bg-gray-400 hidden md:inline-block"></span>
          <span>{totalStats.totalQuestions} Questions</span>
        </div>
      </div>
      <div className='hidden md:block'><Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme"><Sun size={20} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /><Moon size={20} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /></Button></div>
    </div>
  );
}
