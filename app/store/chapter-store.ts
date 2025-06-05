import { create } from 'zustand';
import { Subject, Status, SortOrder } from '@/app/types';

interface FilterState {
  activeSubject: Subject;
  selectedClasses: string[];
  selectedUnits: string[];
  selectedStatus: Status;
  showWeakChaptersOnly: boolean;
  sortOrder: SortOrder;
  searchQuery: string; // <-- ADDED
}

interface FilterActions {
  setSubject: (subject: Subject) => void;
  toggleClass: (className: string) => void;
  toggleUnit: (unit: string) => void;
  setStatus: (status: Status) => void;
  toggleWeakChapters: () => void;
  toggleSortOrder: () => void;
  resetFilters: () => void;
  setSearchQuery: (query: string) => void; // <-- ADDED
}

// This contains the default state for all filters.
const initialState: Omit<FilterState, 'activeSubject'> = {
  selectedClasses: [],
  selectedUnits: [],
  selectedStatus: 'All',
  showWeakChaptersOnly: false,
  sortOrder: 'asc',
  searchQuery: '', // <-- ADDED
};

export const useChapterStore = create<FilterState & FilterActions>((set) => ({
  activeSubject: 'Physics',
  ...initialState,
  
  // Actions
  setSubject: (subject) => set({ 
    activeSubject: subject, 
    ...initialState // Reset all other filters on subject change
  }),
  toggleClass: (className) => set((state) => ({ 
    selectedClasses: state.selectedClasses.includes(className)
      ? state.selectedClasses.filter((c) => c !== className)
      : [...state.selectedClasses, className],
  })),
  toggleUnit: (unit) => set((state) => ({ 
    selectedUnits: state.selectedUnits.includes(unit)
      ? state.selectedUnits.filter((u) => u !== unit)
      : [...state.selectedUnits, unit],
  })),
  setStatus: (status) => set({ selectedStatus: status }),
  toggleWeakChapters: () => set((state) => ({ showWeakChaptersOnly: !state.showWeakChaptersOnly })),
  toggleSortOrder: () => set((state) => ({ sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc' })),
  resetFilters: () => set((state) => ({ 
    ...initialState, 
    activeSubject: state.activeSubject // Keep the subject, reset everything else
  })),
  setSearchQuery: (query) => set({ searchQuery: query }), // <-- ADDED
}));