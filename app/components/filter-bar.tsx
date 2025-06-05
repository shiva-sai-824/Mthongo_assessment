'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu';
import { useChapterStore } from '@/store/chapter-store';
import { Status } from '@/app/types';
import { SortAscending, SortDescending, XCircle } from '@phosphor-icons/react';

interface FilterBarProps {
  filterOptions: { classes: string[]; units: string[] };
  resultCount: number;
}

export default function FilterBar({ filterOptions, resultCount }: FilterBarProps) {
  // Get all state and actions from the global store
  const {
    selectedClasses, toggleClass,
    selectedUnits, toggleUnit,
    selectedStatus, setStatus,
    showWeakChaptersOnly, toggleWeakChapters,
    sortOrder, toggleSortOrder,
    resetFilters,
    searchQuery,
    setSearchQuery,
  } = useChapterStore();
  
  // Create a local state for the input field to prevent re-rendering on every key press
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Debounce Effect: This runs a timer. When you stop typing for 300ms,
  // it updates the global state, which triggers the actual filtering.
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [localSearch, setSearchQuery]);
  
  // Sync local state if the global state is reset
  useEffect(() => {
      setLocalSearch(searchQuery);
  }, [searchQuery])

  const statuses: Status[] = ["All", "Not Started", "In Progress", "Completed"];
  // Update the condition to show the "Reset" button if a search query is active
  const isAnyFilterActive = selectedClasses.length > 0 || selectedUnits.length > 0 || selectedStatus !== 'All' || showWeakChaptersOnly || searchQuery.length > 0;

  return (
    <div className="py-4 border-t border-b border-gray-200 dark:border-dark-border flex flex-col md:flex-row md:items-center gap-4">
      
      <div className="flex-grow md:flex-grow-0">
        <Input 
            placeholder="Search chapters..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full md:w-48"
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" className="flex-shrink-0">Class {selectedClasses.length > 0 && `(${selectedClasses.length})`}</Button></DropdownMenuTrigger><DropdownMenuContent>{filterOptions.classes.map(c => (<DropdownMenuCheckboxItem key={c} checked={selectedClasses.includes(c)} onCheckedChange={() => toggleClass(c)}>{c}</DropdownMenuCheckboxItem>))}</DropdownMenuContent></DropdownMenu>
        <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" className="flex-shrink-0">Units {selectedUnits.length > 0 && `(${selectedUnits.length})`}</Button></DropdownMenuTrigger><DropdownMenuContent>{filterOptions.units.map(u => (<DropdownMenuCheckboxItem key={u} checked={selectedUnits.includes(u)} onCheckedChange={() => toggleUnit(u)}>{u}</DropdownMenuCheckboxItem>))}</DropdownMenuContent></DropdownMenu>
        <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" className="flex-shrink-0">{selectedStatus === "All" ? "Status" : selectedStatus}</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuRadioGroup value={selectedStatus} onValueChange={(val) => setStatus(val as Status)}>{statuses.map(s => <DropdownMenuRadioItem key={s} value={s}>{s}</DropdownMenuRadioItem>)}</DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu>
        <Button variant={showWeakChaptersOnly ? 'secondary' : 'outline'} onClick={toggleWeakChapters}>Weak Chapters</Button>
      </div>
      
      <div className="flex items-center gap-2 ml-auto">
        <span className="text-sm text-light-text-secondary hidden sm:inline">
          Showing {resultCount} chapters
        </span>
        <Button variant="ghost" size="icon" onClick={toggleSortOrder}>
          {sortOrder === 'asc' ? <SortAscending size={20} /> : <SortDescending size={20} />}
        </Button>
        {isAnyFilterActive && (
          <Button variant="ghost" size="icon" onClick={resetFilters} title="Reset Filters">
            <XCircle size={20} />
          </Button>
        )}
      </div>
    </div>
  );
}