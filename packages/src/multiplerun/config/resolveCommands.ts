import {
  ConfigCommands,
  Options,
  Command,
  Commands,
  ConfigCommand,
} from '../types';

export function resolveCommands(
  commands: ConfigCommands,
  { cwd = process.cwd() }: Options,
): Commands {
  function map(c: ConfigCommand): Command {
    return typeof c === 'string'
      ? { command: c, wait: 0, cwd }
      : {
          command: c.command,
          wait: c.wait ?? 0,
          cwd: c.cwd ?? cwd,
        };
  }

  function mapArray(
    commands: ConfigCommand | ConfigCommand[],
  ): Command | Command[] {
    return Array.isArray(commands) ? commands.map(map) : map(commands);
  }

  return commands.map(mapArray);
}
