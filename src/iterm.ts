import { getApplication } from './jxa';

interface ITermSession {
  splitVerticallyWithDefaultProfile: () => void;
  splitHorizontallyWithDefaultProfile: () => void;
  write: (command: { text: string }) => void;
}

interface ITermSessions {
  at: (sessionId: number) => ITermSession;
}

export interface ITermTab {
  sessions: ITermSessions;
}

export interface ITermWindow {
  id: () => string;
  currentTab: () => ITermTab;
}

export interface ITermWindows {
  byId: (windowId: string) => ITermWindow;
}

export interface ITerm {
  includeStandardAdditions: boolean;
  activate: () => void;
  createWindowWithDefaultProfile: () => void;

  currentWindow: () => ITermWindow;
  windows: ITermWindows;
}

export function iTerm(): ITerm {
  return getApplication<ITerm>('iTerm');
}
