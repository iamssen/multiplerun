# Run multiple commands on multiple terminals (or iTerm split panes)

[![DeepScan grade](https://deepscan.io/api/teams/3270/projects/4817/branches/38453/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3270&pid=4817&bid=38453)

Install

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
    "test": [
      "echo multiplerun!",
      [
        "echo hello",
        "echo world"
      ]
    ]
  }
}
```

```sh
npm run multiplerun-test
```

If you have installed [iTerm.app](https://www.iterm2.com/) on your Mac. You can see like this

![iTerm Example](https://raw.githubusercontent.com/iamssen/multiplerun/master/readme-assets/iTerm.png)

Or those commands will be executed via default terminal app (`cmd.exe` or `Terminal.app`)

# Run in script

```js
const multiplerun = require('multiplerun');

multiplerun([
  'echo multiplerun!',
  [
    'echo hello',
    'echo world'
  ]
]);
```

API

- `multiplerun(layout, [basedir = process.cwd()])`