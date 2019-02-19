const {exec} = require('child_process');
const Application = require('./Application');

function useDefaultTerminal(layout, basedir) {
  function run(command) {
    if (process.platform === 'darwin') {
      exec(`osascript -e 'tell application "Terminal" to do script "cd ${basedir}; ${command};"'`);
    } else if (process.platform === 'win32') {
      exec(`start cmd /k "cd ${basedir} && ${command}"`);
    }
  }
  
  for (const row of layout) {
    if (Array.isArray(row)) {
      for (const command of row) {
        if (typeof command !== 'string') {
          throw new Error('???');
        }
        run(command);
      }
    } else if (typeof row === 'string') {
      run(row);
    }
  }
}

function useIterm(layout, basedir) {
  const iTerm = Application('iTerm');
  
  iTerm.includeStandardAdditions = true;
  iTerm.activate();
  
  iTerm.createWindowWithDefaultProfile();
  
  const windowId = iTerm.currentWindow().id();
  
  layout.forEach((row, r) => {
    if (r === 0) return;
    iTerm.windows.byId(windowId).currentTab().sessions.at(r - 1).splitVerticallyWithDefaultProfile();
  });
  
  let commandCount = 0;
  
  layout.forEach(row => {
    if (typeof row === 'string') {
      iTerm.windows.byId(windowId).currentTab().sessions.at(commandCount).write({text: `cd ${basedir}; ${row};`});
      commandCount++;
    } else if (Array.isArray(row)) {
      row.forEach((command, c) => {
        if (c < row.length - 1) {
          iTerm.windows.byId(windowId).currentTab().sessions.at(commandCount).splitHorizontallyWithDefaultProfile();
        }
        iTerm.windows.byId(windowId).currentTab().sessions.at(commandCount).write({text: `cd ${basedir}; ${command};`});
        commandCount++;
      });
    }
  });
}

module.exports = function (layout, basedir = process.cwd()) {
  if (process.platform === 'darwin') {
    try {
      useIterm(layout, basedir);
    } catch (error) {
      useDefaultTerminal(layout, basedir);
    }
  } else if (process.platform === 'win32') {
    useDefaultTerminal(layout, basedir);
  } else {
    console.error(`😭 Sorry! Only macOS and Windows are supported yet!`);
  }
};