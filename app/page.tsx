import { MainView } from "@/components/main-view";
import { getChaptersData, getTotalStats } from "@/lib/data";

export default function Home() {
  const allChapters = getChaptersData();
  const totalStats = getTotalStats();
  return (
    <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <MainView allChapters={allChapters} totalStats={totalStats} />
    </main>
  );
}
