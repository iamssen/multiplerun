import fs from 'node:fs';
import yaml from 'js-yaml';
import os from 'node:os';
import path from 'node:path';
import type { ConfigCommands, Options } from '../types';

function readYaml(file: string): object | undefined {
  if (!fs.existsSync(file)) {
    return undefined;
  }

  const source: string = fs.readFileSync(file, { encoding: 'utf8' });

  const content = yaml.load(source) as
    | object
    | number
    | string
    | null
    | undefined;

  if (!content || typeof content === 'string' || typeof content === 'number') {
    throw new Error(`unspecified config: ${file}`);
  }

  return content;
}

function readJson(file: string): object | undefined {
  if (!fs.existsSync(file)) {
    return undefined;
  }

  const source: string = fs.readFileSync(file, { encoding: 'utf8' });

  const content = JSON.parse(source);

  if (!content || typeof content === 'string' || typeof content === 'number') {
    throw new Error(`unspecified config: ${file}`);
  }

  return content;
}

function readPackageJson(file: string): object | undefined {
  if (!fs.existsSync(file)) {
    return undefined;
  }

  const source: string = fs.readFileSync(file, { encoding: 'utf8' });

  const { multiplerun } = JSON.parse(source);

  return multiplerun;
}

export async function readConfigFile({ cwd }: { cwd: string }) {
  const config =
    readYaml(path.resolve(cwd, 'multiplerun.yaml')) ??
    readYaml(path.resolve(cwd, 'multiplerun.yml')) ??
    readJson(path.resolve(cwd, 'multiplerun.json')) ??
    readPackageJson(path.resolve(cwd, 'package.json')) ??
    readYaml(path.resolve(os.homedir(), 'multiplerun.yaml')) ??
    readYaml(path.resolve(os.homedir(), 'multiplerun.yml')) ??
    readJson(path.resolve(os.homedir(), 'multiplerun.json'));

  if (!config) {
    throw new Error(`undefined multiplerun config!`);
  }

  const { _options = {}, ...commands } = config as any;

  return [_options, commands] as [Options, Record<string, ConfigCommands>];
}

export async function readSpecificConfigFile(file: string) {
  const config =
    file.endsWith('.yaml') || file.endsWith('.yml')
      ? readYaml(file)
      : file.endsWith('.json')
        ? readJson(file)
        : undefined;

  if (!config) {
    throw new Error(`undefined multiplerun config!`);
  }

  const { _options = {}, ...commands } = config as any;

  return [_options, commands] as [Options, Record<string, ConfigCommands>];
}
