'use client';
import { ProcessedChapter } from '@/app/types';
import ChapterItem from './chapter-item';
import { Info } from '@phosphor-icons/react';

interface ChapterListProps { chapters: ProcessedChapter[]; }
export default function ChapterList({ chapters }: ChapterListProps) {
  if (chapters.length === 0) {
    return (
      <div className="text-center py-10 flex flex-col items-center gap-4 text-light-text-secondary dark:text-dark-text-secondary">
        <Info size={48} /><p className="text-lg font-medium">No Chapters Found</p><p>Try adjusting your filters to find what you're looking for.</p>
      </div>
    );
  }
  return ( <div className="space-y-2 py-4">{chapters.map(chapter => ( <ChapterItem key={chapter.id} chapter={chapter} /> ))}</div> );
}
