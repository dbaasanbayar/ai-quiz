"use client";
import { useEffect, useState } from "react";

export function Siderbar() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/history-sidebar");
      const data = await res.json();
      setHistory(data);
      console.log("data from db", data);
    }
    loadData();
  }, []);

  return (
    <div>
      <div className="flex flex-col py-5 px-5">
        {history.map((item) => (
          <p key={item.id}>{item.article}</p>
        ))}
      </div>
    </div>
  );
}

// export function Demo() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     console.log("the count is:", count);

//     return () => {
//       console.log("i am cleaned up!");
//     };
//   }, [count]);

//   return (
//     <div>
//       <h1>Count: {count}</h1>
//       <button className="border-2" onClick={() => setCount(count + 1)}>
//         button
//       </button>
//     </div>
//   );
// }
