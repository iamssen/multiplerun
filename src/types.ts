export type Command = { command: string; wait: number; cwd: string };

export type Commands = (Command | Command[])[];

export type ConfigCommand =
  | string
  | { command: string; wait?: number; cwd?: string };

export type ConfigCommands = (ConfigCommand | ConfigCommand[])[];

export type Options = {
  cwd?: string;
};
