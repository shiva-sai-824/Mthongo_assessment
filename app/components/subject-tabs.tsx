'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useChapterStore } from '@/store/chapter-store';
import { Subject } from '@/app/types';

export default function SubjectTabs() {
  const { activeSubject, setSubject } = useChapterStore();
  return (
    <Tabs value={activeSubject} onValueChange={(value) => setSubject(value as Subject)}>
      <TabsList className="bg-light-bg dark:bg-dark-bg p-1">
        <TabsTrigger value="Physics" className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-card data-[state=active]:shadow-sm">Physics PYQs</TabsTrigger>
        <TabsTrigger value="Chemistry" className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-card data-[state=active]:shadow-sm">Chemistry PYQs</TabsTrigger>
        <TabsTrigger value="Mathematics" className="data-[state=active]:bg-white dark:data-[state=active]:bg-dark-card data-[state=active]:shadow-sm">Mathematics PYQs</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
