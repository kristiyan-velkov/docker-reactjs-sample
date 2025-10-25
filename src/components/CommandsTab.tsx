import { CommandCard } from "./CommandCard";
import { DOCKER_COMMANDS } from "../constants/data";

export const CommandsTab = () => {
  return (
    <div className="flex flex-col gap-8">
      {DOCKER_COMMANDS.map((cmd, index) => (
        <CommandCard key={index} command={cmd} />
      ))}
    </div>
  );
};
