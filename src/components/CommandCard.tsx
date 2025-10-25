import type { DockerCommand } from "../types";

interface CommandCardProps {
  command: DockerCommand;
}

export const CommandCard = ({ command }: CommandCardProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(command.command);
  };

  return (
    <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-green-500">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{command.title}</h3>
      <p className="text-gray-600 mb-4">{command.description}</p>
      <div className="bg-gray-800 p-6 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <code className="text-[#4facfe] font-mono text-lg flex-1 break-all">
          {command.command}
        </code>
        <button
          onClick={handleCopy}
          className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 text-xl"
          title="Copy to clipboard"
          aria-label="Copy command to clipboard"
        >
          📋
        </button>
      </div>
    </div>
  );
};

