import { iTerm } from '../iterm';
import type { Command, Commands } from '../types';
import { timeout } from '../utils/timeout';

export function runITerm(commands: Commands) {
  const app = iTerm();

  app.includeStandardAdditions = true;
  app.activate();

  app.createWindowWithDefaultProfile();

  const windowId = app.currentWindow().id();

  for (const [i] of commands.entries()) {
    if (i === 0) continue;
    app.windows
      .byId(windowId)
      .currentTab()
      .sessions.at(i - 1)
      .splitVerticallyWithDefaultProfile();
  }

  let sessionId = 0;

  async function run({ command, cwd, wait }: Command, sessionId2: number) {
    if (wait > 0) await timeout(wait);

    app.windows
      .byId(windowId)
      .currentTab()
      .sessions.at(sessionId2)
      .write({ text: `cd ${cwd}; ${command};` });
  }

  for (const column of commands) {
    if (Array.isArray(column)) {
      for (const [i, c] of column.entries()) {
        if (i < column.length - 1) {
          app.windows
            .byId(windowId)
            .currentTab()
            .sessions.at(sessionId)
            .splitHorizontallyWithDefaultProfile();
        }
        run(c, sessionId);
        sessionId++;
      }
    } else {
      run(column, sessionId);
      sessionId++;
    }
  }
}
