import { useState } from "react";
import { CommandsTab } from "./CommandsTab";
import { OverviewTab } from "./OverviewTab";
import type { TabType } from "../types";

export const QuickStart = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  return (
    <section className="py-24 px-8 bg-white max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-12">
        Quick Start
      </h2>

      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
            activeTab === "overview"
              ? "bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white shadow-xl"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("commands")}
          className={`px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
            activeTab === "commands"
              ? "bg-linear-to-br from-[#667eea] to-[#764ba2] text-white shadow-xl"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Docker Commands
        </button>
      </div>

      <div className="animate-[fadeIn_0.5s_ease]">
        {activeTab === "overview" ? <OverviewTab /> : <CommandsTab />}
      </div>
    </section>
  );
};
