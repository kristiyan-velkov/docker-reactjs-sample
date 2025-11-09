import { DOCKER_COMMANDS } from "../constants/data";
import { CommandCard } from "./CommandCard";

export const CommandsTab = () => {
  return (
    <div className="flex flex-col gap-8">
      {DOCKER_COMMANDS.map((cmd, index) => (
        <CommandCard key={index} command={cmd} />
      ))}
    </div>
  );
};
