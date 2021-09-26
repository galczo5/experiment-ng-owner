const { getParsedCommandLineOfConfigFile, sys, createProgram } = require('typescript');


const parsed = getParsedCommandLineOfConfigFile(process.argv[2], undefined, sys);
const program = createProgram({
  rootNames: parsed.fileNames,
  options: parsed.options,
});

for (let sourceFile of program.getSourceFiles()) {

  if (parsed.fileNames.includes(sourceFile.path) && sourceFile.path.includes('component')) {

    for (const stmt of sourceFile.statements) {
      if (stmt.decorators) {
        for (const decorator of stmt.decorators) {
          console.log(decorator.expression.arguments[0].properties);
        }
      }
    }
  }
}
