"use client";
import { useEffect, useState } from "react";

type historyType = { id: number; article: string; item: string };

export function Siderbar() {
  const [history, setHistory] = useState<historyType[]>([]);

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/history-sidebar");
      const data = await res.json();
      setHistory(data);
    }
    loadData();
  }, []);

  async function Text() {
    const test = await fetch("/api/hello-postman");
    const render = await test.json();
    console.log(render);
  }

  return (
    <div>
      <div className="flex flex-col py-5 px-5">
        {history.map((item: historyType) => (
          <p key={item.id}>{item.article}</p>
        ))}
      </div>
      <div>
        <button onClick={Text}>button</button>
      </div>
    </div>
  );
}
