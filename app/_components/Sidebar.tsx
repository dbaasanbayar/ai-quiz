"use client";
import { useEffect, useState } from "react";
import { HistoryItem } from "./HomeClient";

type Props = {
  onSelectRecord: (record: HistoryItem) => void;
  refreshKey: number;
};

export function Siderbar({ onSelectRecord, refreshKey }: Props) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/get-records");
        const data = await res.json();
        setHistory(data);
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [refreshKey]);

  async function handleDelete(e: React.MouseEvent, id: number) {
    e.stopPropagation();
    await fetch("/api/delete-record", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    setHistory(prev => prev.filter(item => item.id !== id));
  }

  return (
    <div className="flex h-full">
      <div className="w-[300px] bg-pink-100 shrink-0 border-r border-gray-200 flex flex-col h-full">
       
        <div className="border-b border-gray-200 px-4 py-3">
          <h2 className="text-lg font-semibold text-gray-900">History</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-3 py-4">

            {loading && (
              <p className="text-sm text-gray-400 px-2 py-1">Loading...</p>
            )}

            {!loading && history.length === 0 && (
              <p className="text-sm text-gray-400 px-2 py-1">No quizzes yet</p>
            )}

            {!loading && history.length > 0 && (
              <div className="space-y-0.5">
                {history.map((item) => (
                  <div
                  key={item.id}
                  onClick={() => onSelectRecord(item)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  role="button"         
                  tabIndex={0}           
                  className={`
                    group w-full flex items-center justify-between 
                    px-3 py-2 text-left rounded-md
                    hover:bg-gray-100 transition-colors
                    focus:outline-none focus:bg-gray-100
                    cursor-pointer         
                  `}
                >
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium text-sm text-gray-900 truncate">
                      {item.title ?? 'Untitled'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.createdat
                        ? new Date(item.createdat).toLocaleDateString()
                        : '—'}
                    </span>
                  </div>
                
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className={`
                      text-gray-300 hover:text-red-600 
                      text-sm font-medium px-1.5
                      transition-opacity
                      ${hoveredId === item.id ? 'opacity-100' : 'opacity-0'}
                    `}
                  >
                    ✕
                  </button>
                </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}