"use client";
import { useState } from "react";
import { IconStar } from "@/app/icons/icon_star";
import { Button } from "@/app/_components/button";
export const QuizGenerator = ({ onNewRecord, onGenerated }: any) => {
  const [articleValue, setArticleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  async function clickHandler() {
    //1. save to DB
    const save = await fetch("/api/saveRecord", {
      method: "POST",
      body: JSON.stringify({ articleValue, contentValue }),
    });
    const savedItem = await save.json();
    // onNewRecord(savedItem);

    //2. Generate summary/quiz
    // const aiRes = await fetch("/api/generateQuiz", {
    //   method: "POST",
    //   body: JSON.stringify({ articleValue, contentValue }),
    // });
    // const aiData = await aiRes.json();
    // onGenerated(aiData.result);
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
            className={"border rounded-md border-black w-full h-10 py-2 px-2"}
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
