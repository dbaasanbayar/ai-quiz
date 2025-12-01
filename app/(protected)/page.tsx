import { Siderbar } from "@/app/_components/app_sidebar";
import { QuizGenerator } from "@/app/_components/text_generating";

export default function Home() {
  return (
    <div className="w-full h-[968px] flex">
      <div className="w-[25%] bg-red-300">
        <Siderbar />
      </div>
      <div className="w-[75%] flex justify-center bg-gray-50">
        <QuizGenerator />
      </div>
    </div>
  );
}
