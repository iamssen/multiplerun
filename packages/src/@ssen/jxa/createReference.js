// ---------------------------------------------
// Copied from https://github.com/eggplanetio/jxa/blob/reference-return/index.js
// ---------------------------------------------

const exec = require('child_process').execSync;

function dereference(path, args) {
  try {
    args = args ? JSON.stringify(args) : '';
    args = args.substr(1, args.length - 2);
    
    const cmd = `osascript -l JavaScript -e '${path}(${args})'`;
    const res = exec(cmd, {stdio: 'pipe'}).toString().trim();
    
    if (res.indexOf('Application') === 0) {
      return createReference(res);
    } else {
      return res;
    }
  } catch (e) {
    // console.log(e);
  }
}

function createInspector(path) {
  return () => `[object JXAReference => ${dereference(path + '.toString')}]`;
}

export function createReference(path) {
  return new Proxy(
    (recv, _, args) => dereference(path, args),
    {
      apply: (target, thisArg, argumentsList) => dereference(path, argumentsList),
      
      get(target, propertyName) {
        return propertyName === 'inspect'
          ? createInspector(path)
          : createReference(`${path}.${propertyName.toString()}`);
      },
      
      set(target, property, value, receiver) {
        return true;
      },
    },
  );
}