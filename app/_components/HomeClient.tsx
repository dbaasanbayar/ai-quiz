"use client";
import { useState } from "react";
import { Siderbar } from "@/app/_components/Sidebar";
import { QuizGenerator } from "@/app/_components/QuizGenerator";

export type HistoryItem = {
  id: number;
  title: string | null;
  summary: string | null;
  quizzes: string | null; 
  createdat: string | null;
};

export function HomeClient() {
  const [selectedRecord, setSelectedRecord] = useState<HistoryItem | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Called by sidebar when user clicks a history item
  function handleSelectRecord(record: HistoryItem) {
    setSelectedRecord(record);
  }

  // Called by QuizGenerator after saving — forces sidebar to refresh
  function handleSaved() {
    setRefreshKey(prev => prev + 1);
    setSelectedRecord(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="hidden md:block">
        <Siderbar
          onSelectRecord={handleSelectRecord}
          refreshKey={refreshKey}
        />
      </div>
      <main className="flex-1 flex justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl">
          <QuizGenerator
            selectedRecord={selectedRecord}
            onSaved={handleSaved}
          />
        </div>
      </main>
    </div>
  );
}