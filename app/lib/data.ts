import rawData from '@/data/all_subjects_chapter_data.json';
import { Chapter, ProcessedChapter, Subject } from '@/app/types';

const ICON_NAMES: string[] = [ "Atom", "Flask", "FunctionSquare", "Book", "Calculator", "Lightbulb", "TestTube", "Brain", "ChartLine", "Ruler", "Compass", "Target", "RocketLaunch", "Gear", "Circuitry", "Magnet", "WaveSine", "Thermometer", "Infinity", "Sigma", "Pi", "NumberSquareOne", "NumberSquareTwo", "Planet", "Robot", "FirstAidKit" ];

function getDeterministicIconName(chapterName: string): string {
    let hash = 0;
    for (let i = 0; i < chapterName.length; i++) {
        hash = (hash << 5) - hash + chapterName.charCodeAt(i);
        hash |= 0;
    }
    const index = Math.abs(hash) % ICON_NAMES.length;
    return ICON_NAMES[index];
}

const chapters: ProcessedChapter[] = (rawData as Chapter[]).map((chapter, index) => {
  const years = Object.keys(chapter.yearWiseQuestionCount).map(Number).filter(y => !isNaN(y));
  const totalQuestions = Object.values(chapter.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0);
  const progress = totalQuestions > 0 ? Math.round((chapter.questionSolved / totalQuestions) * 100) : 0;
  return {
    ...chapter,
    id: `${chapter.subject}-${index}`,
    totalQuestions,
    yearRange: years.length > 0 ? `${Math.min(...years)} - ${Math.max(...years)}` : 'N/A',
    icon: getDeterministicIconName(chapter.chapter),
    progress: chapter.status === "Completed" ? 100 : progress,
  };
});

export const getChaptersData = (): ProcessedChapter[] => chapters;

export const getFilterOptions = (subject: Subject) => {
  const subjectChapters = chapters.filter(c => c.subject === subject);
  const classes = [...new Set(subjectChapters.map(c => c.class))].sort();
  const units = [...new Set(subjectChapters.map(c => c.unit))].sort();
  return { classes, units };
};

export const getTotalStats = () => {
  const totalQuestions = chapters.reduce((sum, chapter) => sum + chapter.totalQuestions, 0);
  const allYears = chapters.flatMap(c => Object.keys(c.yearWiseQuestionCount).map(Number).filter(y => !isNaN(y)));
  return {
    yearRange: allYears.length > 0 ? `${Math.min(...allYears)} - ${Math.max(...allYears)}` : "N/A",
    totalChapters: rawData.length,
    totalQuestions
  }
}
