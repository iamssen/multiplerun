import type {
  Command,
  Commands,
  ConfigCommand,
  ConfigCommands,
  Options,
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
    cmds: ConfigCommand | ConfigCommand[],
  ): Command | Command[] {
    return Array.isArray(cmds) ? cmds.map(map) : map(cmds);
  }

  return commands.map(mapArray);
}
