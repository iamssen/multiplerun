import path from 'node:path';
import yargs from 'yargs';
import {
  readConfigFile,
  readSpecificConfigFile,
} from './config/readConfigFile';
import multiplerun from './main';

export async function run() {
  const { _, cwd = process.cwd() } = await yargs(process.argv.slice(2))
    .usage('Usage: $0 [file] <command>')
    .option('cwd', { type: 'string' }).argv;

  const [options, commands] =
    _.length === 1
      ? await readConfigFile({ cwd })
      : await readSpecificConfigFile(path.resolve(cwd, _[0].toString()));

  const command = _.length === 1 ? _[0] : _[1];

  if (command in commands) {
    multiplerun(commands[command], options);
  } else {
    throw new Error(`Undefined command "${command}"`);
  }
}

//eslint-disable-next-line unicorn/prefer-top-level-await
run();
