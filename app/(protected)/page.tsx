// import { Siderbar } from "@/app/_components/Sidebar";
// import { QuizGenerator } from "@/app/_components/QuizGenerator";

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
//         <Siderbar />
//       <main className="flex-1 flex justify-center items-start p-6">
//         <div className="w-full max-w-4xl">
//           <QuizGenerator />
//         </div>
//       </main>
//     </div>
//   );
// }

import { Siderbar } from "@/app/_components/Sidebar"
import { QuizGenerator } from "@/app/_components/QuizGenerator"

export default function Home() {
  return (
      <div className="min-h-screen bg-gray-50 flex">
      <div className="hidden md:block">
        <Siderbar />
      </div>
      <main className="flex-1 flex justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl">
          <QuizGenerator />
        </div>
      </main>
    </div>
  )
}