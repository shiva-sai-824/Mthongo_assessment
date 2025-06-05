'use client';
import { Progress } from '@/components/ui/progress';
import { ProcessedChapter } from '@/app/types';
import { ArrowRight } from '@phosphor-icons/react';
import * as PhosphorIcons from "@phosphor-icons/react";

interface ChapterItemProps { chapter: ProcessedChapter; }
export default function ChapterItem({ chapter }: ChapterItemProps) {
  const Icon = (PhosphorIcons as any)[chapter.icon] || PhosphorIcons.Book;
  const { chapter: chapterName, yearRange, totalQuestions, status, progress } = chapter;
  const getStatusColor = () => {
    switch (status) {
      case 'Completed': return 'bg-green-500';
      case 'In Progress': return 'bg-yellow-500';
      default: return 'bg-gray-300 dark:bg-gray-600';
    }
  };
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
      <div className="flex-shrink-0 text-brand-blue"><Icon size={24} weight="duotone" /></div>
      <div className="flex-grow min-w-0">
        <p className="font-semibold text-light-text dark:text-dark-text truncate">{chapterName}</p>
        <div className="flex items-center gap-3 text-xs text-light-text-secondary dark:text-dark-text-secondary"><span>{yearRange}</span><span>•</span><span>{totalQuestions} Qs</span></div>
      </div>
      <div className="w-24 flex-shrink-0 hidden sm:block">
        <Progress value={progress} className="h-1.5" indicatorClassName={getStatusColor()} />
        <p className="text-xs text-right mt-1 text-light-text-secondary dark:text-dark-text-secondary">{chapter.questionSolved}/{totalQuestions} Qs</p>
      </div>
      <div className="flex-shrink-0"><ArrowRight size={16} className="text-light-text-secondary" /></div>
    </div>
  );
}
