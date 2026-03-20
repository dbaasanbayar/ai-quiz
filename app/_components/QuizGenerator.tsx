"use client";

import { useEffect, useState } from "react";
import { IconStar } from "@/app/icons/icon_star";
import { Button } from "@/app/_components/button";
import { HistoryItem } from "./HomeClient";

type QuizQuestion = {
  question: string;
  options: string[];    
  answer: number;
};

type Props = {
  selectedRecord: HistoryItem | null;
  onSaved: () => void;
};

export const QuizGenerator = ({ selectedRecord, onSaved }: Props) => {
  const [articleValue, setArticleValue] = useState("Frank Ocean");
  const [contentValue, setContentValue] = useState("Frank Ocean is an American singer-songwriter and rapper. His accolades include two Grammy Awards and a Brit Award.");
  const [step, setStep] = useState<"input" | "summary" | "quiz" | "result">("input");
  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0)

  async function clickHandler() {
    try {
    //  const aiResponse = await fetch("/api/generate-summary", {
    //     method: "POST",
    //     body: JSON.stringify({ contentValue }),
    //     headers: { "Content-Type": "application/json" },
    //   });

    const mockAiData = {
      summary: "This is a mock summary of the article for testing purposes.",
      quiz: [
        { question: "What is Frank Ocean's birth name?", options: ["Frank Edwin Breaux", "Christopher Ocean", "Christopher Edwin Breaux", "Christopher Breaux Ocean"], answer: 3 },
        { question: "In what year was Frank Ocean born?", options: ["1986", "1987", "1988", "1989"], answer: 1 },
        { question: "How many Grammy Awards has Frank Ocean won?", options: ["Three", "One", "Two", "Four"], answer: 2 },
        { question: "How many Brit Awards has Frank Ocean won?", options: ["Zero", "One", "Two", "Three"], answer: 1 },
        { question: "Frank Ocean is recognized by critics as a pioneer in which music genre?", options: ["Pop", "Classical", "Hip-Hop", "Alternative R&B"], answer: 3 },
      ]
    };
    setSummary(mockAiData.summary)
    setQuiz(mockAiData.quiz)

    const response = await fetch("/api/save-records", {
        method: "POST",
        body: JSON.stringify({ 
          articleValue,
          contentValue, 
          summary: mockAiData.summary,
          quiz: mockAiData.quiz
         }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server says:", errorData);
        throw new Error("Failed to save")
      }
      setSummary(mockAiData.summary)
      setQuiz(mockAiData.quiz)
      setStep("summary")
      setArticleValue("");
      setContentValue("");
      onSaved();
    } catch (error) {
      console.error("ERROR", error);
      alert("Something went wrong. Check the console.");
    }
  }
  useEffect(() => {
    if (selectedRecord) {
      setSummary(selectedRecord.summary ?? "");
      setQuiz(selectedRecord.quizzes ? JSON.parse(selectedRecord.quizzes) : null);
      setStep("summary");
      setScore(0);
      setCurrentIndex(0);
      setSelected(null);
    }
  }, [selectedRecord]);

return ( <div className="w-[full] h-[442px] px-[50px] justify-center flex flex-col mt-14 bg-white gap-4">
    
    {step === "input" && (
      <>
        <div className="flex items-center gap-2">
          <IconStar />
          <h1 className="text-[24px] font-semibold">Article Quiz Generator</h1>
        </div>
        <p className="text-[#71717A]">
          Paste your article below to generate a summarize and quiz question. Your
          articles will saved in the sidebar for future reference.
        </p>
        <div className="flex flex-col gap-5 text-[#71717A]">
          <div className="flex flex-col">
            <label>Article title</label>
            <input
              className="border rounded-md border-black w-full h-10 py-2 px-2"
              value={articleValue}
              onChange={(e: any) => setArticleValue(e.target.value)}
              type="text"
              placeholder="Enter a title for your article..."
            />
          </div>
          <div className="flex flex-col">
            <label>Content</label>
            <textarea
            className="border rounded-md border-black w-full h-32 py-2 px-2 resize-none"
            value={contentValue}
            onChange={(e: any) => setContentValue(e.target.value)}
            placeholder="Paste your article content here..."
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            clickHandler={clickHandler}
            text="Generate summary"
            variant={true}
            ready={true}
          />
        </div>
      </>
    )}

    {step === "summary" && (
      <>
        <div className="flex items-center gap-2">
          <IconStar />
          <h1 className="text-[24px] font-semibold">Summary</h1>
        </div>
        <p className="text-[#71717A] border rounded-md p-4 bg-gray-50">
          {summary}
        </p>
        <div className="flex justify-end">
          <Button
            clickHandler={() => setStep("quiz")}
            text="Start Quiz"
            variant={true}
            ready={true}
          />
        </div>
      </>
    )}
      {step === "quiz" && quiz && (
    <>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <IconStar />
        <h1 className="text-[24px] font-semibold">Quiz</h1>
      </div>
      <span className="text-[#71717A] text-sm">
        {currentIndex + 1} / {quiz.length}
      </span>
    </div>

    <p className="font-medium text-[18px]">
      {quiz[currentIndex].question}
    </p>

    <div className="flex flex-col gap-3">
      {quiz[currentIndex].options.map((option, i) => (
        <button
          key={i}
          onClick={() => setSelected(i)}
          className={`border rounded-md px-4 py-2 text-left transition-colors
            ${selected === i 
              ? "border-black bg-black text-white"  
              : "border-gray-300 hover:border-black"
            }
          `}
        >
          {option}
        </button>
      ))}
    </div>

    <div className="flex justify-end">
      <Button
        clickHandler={() => {
          if (selected === quiz[currentIndex].answer) {
            setScore(score + 1);
          }
          if (currentIndex + 1 < quiz.length) {
            setCurrentIndex(currentIndex + 1);
            setSelected(null); 
          } else {
            setStep("result"); 
          }
        }}
        text={currentIndex + 1 === quiz.length ? "Finish" : "Next Question"}
        variant={true}
        ready={selected !== null} 
      />
    </div>
  </>
)}

{step === "result" && (
  <>
    <div className="flex items-center gap-2">
      <IconStar />
      <h1 className="text-[24px] font-semibold">Result</h1>
    </div>

    <div className="flex flex-col items-center justify-center gap-3 py-6">
      <span className="text-[64px] font-bold">
        {score}/{quiz?.length}
      </span>
      <p className="text-[#71717A] text-center">
        {score === quiz?.length
          ? "🎉 Perfect score! Amazing job!"
          : score >= (quiz?.length ?? 0) / 2
          ? "👏 Good job! Keep practicing!"
          : "💪 Keep studying, you'll do better next time!"}
      </p>
    </div>

    <div className="flex justify-end">
     <Button
        clickHandler={() => {
          setStep("input");
          setScore(0);
          setCurrentIndex(0); 
          setSelected(null);
          setQuiz([]);
          setSummary("");
        }}
        text="Try Again"
        variant={true}
        ready={true}
      />
    </div>
  </>
)}
  </div>
)};
