import { iTerm } from '@ssen/iterm';
import { Command, Commands } from '../types';
import { timeout } from '../utils/timeout';

export function runITerm(commands: Commands) {
  const app = iTerm();

  app.includeStandardAdditions = true;
  app.activate();

  app.createWindowWithDefaultProfile();

  const windowId = app.currentWindow().id();

  commands.forEach((_, i) => {
    if (i === 0) return;
    app.windows
      .byId(windowId)
      .currentTab()
      .sessions.at(i - 1)
      .splitVerticallyWithDefaultProfile();
  });

  let sessionId = 0;

  async function run({ command, cwd, wait }: Command, sessionId: number) {
    if (wait > 0) await timeout(wait);

    app.windows
      .byId(windowId)
      .currentTab()
      .sessions.at(sessionId)
      .write({ text: `cd ${cwd}; ${command};` });
  }

  commands.forEach((column) => {
    if (Array.isArray(column)) {
      column.forEach((c, i) => {
        if (i < column.length - 1) {
          app.windows
            .byId(windowId)
            .currentTab()
            .sessions.at(sessionId)
            .splitHorizontallyWithDefaultProfile();
        }
        run(c, sessionId);
        sessionId++;
      });
    } else {
      run(column, sessionId);
      sessionId++;
    }
  });
}
