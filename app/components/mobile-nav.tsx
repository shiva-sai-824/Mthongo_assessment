'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { List, X, Sun, Moon } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild><Button variant="ghost" size="icon"><List size={24} /></Button></SheetTrigger>
      <SheetContent className="w-full max-w-xs bg-white dark:bg-dark-card border-none">
        <SheetHeader className="flex flex-row justify-between items-center space-y-0"><SheetTitle>Menu</SheetTitle><Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}><X size={24} /></Button></SheetHeader>
        <div className="py-4">
          <p className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary px-4 mb-2">Theme</p>
          <div className='flex justify-between items-center px-4'>
            <p className="text-sm font-medium">Toggle Mode</p>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme"><Sun size={20} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /><Moon size={20} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /></Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
