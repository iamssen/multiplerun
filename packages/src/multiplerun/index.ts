import { resolveCommands } from './config/resolveCommands';
import { runITerm } from './run/runITerm';
import { runMerge } from './run/runMerge';
import { runTerminal } from './run/runTerminal';
import { ConfigCommands, Options } from './types';

export default function multiplerun(
  configCommands: ConfigCommands,
  options: Options = {},
) {
  const commands = resolveCommands(configCommands, options);

  if (process.env.CI) {
    runMerge(commands);
  } else if (process.platform === 'darwin') {
    try {
      runITerm(commands);
    } catch (e) {
      console.error(e);
      runTerminal(commands);
    }
  } else if (process.platform === 'win32') {
    runTerminal(commands);
  } else {
    console.log(`Sorry! Only macOS and Windows are supported yet!`);
    runMerge(commands);
  }
}
