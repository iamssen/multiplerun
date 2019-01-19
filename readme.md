# Run multiple commands on multiple terminals (or iTerm split panes)

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

![iTerm Example](./readme-assets/iTerm.png)

Or those commands will be executed via default terminal app (`cmd.exe` or `Terminal.app`)