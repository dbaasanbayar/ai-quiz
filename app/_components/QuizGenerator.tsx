"use client";

import { useState } from "react";
import { IconStar } from "@/app/icons/icon_star";
import { Button } from "@/app/_components/button";

export const QuizGenerator = ({}: any) => {
  const [articleValue, setArticleValue] = useState("Frank Ocean");
  const [contentValue, setContentValue] = useState("Frank Ocean is an American singer-songwriter and rapper. His accolades include two Grammy Awards and a Brit Award.");
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

    const response = await fetch("/api/save-record", {
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
      setArticleValue("");
      setContentValue("");

      alert("Success! Input cleared")
    } catch (error) {
      console.error("ERROR", error);
      alert("Something went wrong. Check the console.");
    }
  }
  return (
    <div className="w-[full] h-[442px] px-[50px] justify-center flex flex-col  mt-14 bg-white gap-4">
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
            className={"border rounded-md border-black w-full h-10 py-2 px-2"}
            value={articleValue}
            onChange={(e: any) => setArticleValue(e.target.value)}
            type="text"
            placeholder={"Enter a title for your article..."}
          />
        </div>
        <div className="flex flex-col">
          <label>Content title</label>
          <input
            className={
              "border flex rounded-md border-black w-full h-10 py-2 px-2"
            }
            value={contentValue}
            onChange={(e: any) => setContentValue(e.target.value)}
            type="text"
            placeholder={"Enter a title for your article..."}
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
    </div>
  );
};
