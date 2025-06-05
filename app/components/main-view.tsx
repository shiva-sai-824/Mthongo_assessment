'use client';
import { useMemo } from 'react';
import { ProcessedChapter, Subject } from '@/app/types';
import { useChapterStore } from '@/store/chapter-store';
import { getFilterOptions } from '@/lib/data';
import AppHeader from './header';
import SubjectTabs from './subject-tabs';
import FilterBar from './filter-bar';
import ChapterList from './chapter-list';
import MobileNav from './mobile-nav';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MainViewProps {
  allChapters: ProcessedChapter[];
  totalStats: { yearRange: string; totalChapters: number; totalQuestions: number; };
}
export function MainView({ allChapters, totalStats }: MainViewProps) {
  // ADD `searchQuery` to the destructuring here
  const { activeSubject, setSubject, selectedClasses, selectedUnits, selectedStatus, showWeakChaptersOnly, sortOrder, searchQuery } = useChapterStore();
  
  const filterOptions = useMemo(() => getFilterOptions(activeSubject), [activeSubject]);
  
  // The filtering logic is now updated to include search
  const filteredAndSortedChapters = useMemo(() => {
    let chapters = allChapters
      .filter(c => c.subject === activeSubject)
      .filter(c => selectedClasses.length === 0 || selectedClasses.includes(c.class))
      .filter(c => selectedUnits.length === 0 || selectedUnits.includes(c.unit))
      .filter(c => selectedStatus === 'All' || c.status === selectedStatus)
      .filter(c => !showWeakChaptersOnly || c.isWeakChapter)
      // THIS IS THE NEW FILTER FOR THE SEARCH BAR
      .filter(c => !searchQuery || c.chapter.toLowerCase().includes(searchQuery.toLowerCase()));

    return chapters.sort((a, b) => sortOrder === 'asc' ? a.chapter.localeCompare(b.chapter) : b.chapter.localeCompare(a.chapter));
  // ADD `searchQuery` to the dependency array
  }, [allChapters, activeSubject, selectedClasses, selectedUnits, selectedStatus, showWeakChaptersOnly, sortOrder, searchQuery]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start"><AppHeader totalStats={totalStats} /><div className="md:hidden"><MobileNav /></div></div>
      <div className="bg-white dark:bg-dark-card rounded-xl p-4 md:p-6 shadow-sm">
        <div className="md:hidden mb-4">
          <Tabs value={activeSubject} onValueChange={(value) => setSubject(value as Subject)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-light-bg dark:bg-dark-bg p-1">
              <TabsTrigger value="Physics" className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-card data-[state=active]:shadow-sm">Phy</TabsTrigger>
              <TabsTrigger value="Chemistry" className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-card data-[state=active]:shadow-sm">Chem</TabsTrigger>
              <TabsTrigger value="Mathematics" className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-card data-[state=active]:shadow-sm">Math</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="hidden md:block"><SubjectTabs /></div>
        <FilterBar filterOptions={filterOptions} resultCount={filteredAndSortedChapters.length} />
        <ChapterList chapters={filteredAndSortedChapters} />
      </div>
    </div>
  );
}