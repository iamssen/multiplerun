//@ts-ignore
import { createReference } from './createReference';

/** const iTerm = getApplication('iTerm') */
export function getApplication<T = any>(handle: string): T {
  return createReference(`Application("${handle}")`);
}
