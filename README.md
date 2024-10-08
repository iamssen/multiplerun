# Run multiple terminals (or iTerm split panes) at once

If you have installed [iTerm.app](https://www.iterm2.com/) on your Mac. Your iTerm will opened like this.

<img src="https://raw.githubusercontent.com/iamssen/multiplerun/master/readme-assets/iTerm.png" width="700" alt="iTerm example"/>

If you don't have iTerm, those commands will be executed via default terminal app (`cmd.exe` or `Terminal.app`)

## Usage

And add config

```yaml
test:
  - echo multiplerun!
  - - echo hello
    - echo world
```

```sh
npx multiplerun test
```

## Usage on `package.json`

```sh
npm install multiplerun --save-dev
```

And add config to your `package.json`

```json
{
  "name": "some-package",
  "scripts": {
    "multiplerun-test": "multiplerun test"
  },
  "multiplerun": {
    "test": ["echo multiplerun!", ["echo hello", "echo world"]]
  }
}
```

```sh
npm run multiplerun-test
```

# Run in script

```js
import multiplerun from 'multiplerun';

multiplerun(['echo multiplerun!', ['echo hello', 'echo world']]);
```

API

```ts
export type Command = { command: string; wait: number; cwd: string };

export type Commands = (Command | Command[])[];

export type ConfigCommand =
  | string
  | { command: string; wait?: number; cwd?: string };

export type ConfigCommands = (ConfigCommand | ConfigCommand[])[];

export type Options = {
  cwd?: string;
};
```

```ts
function multiplerun(commands: ConfigCommands, options?: Options);
```
