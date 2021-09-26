const {program} = require('commander');

const {
  getParsedCommandLineOfConfigFile,
  sys,
  createProgram
} = require('typescript');

const {createDecoratorResult, getResultForMultipleOwners, getResultForSingleOwner, getResult, printResults} = require("./helpers");
const {ownableDecorators} = require("./consts");

program
  .description('ng-owner - cli analyser')
  .requiredOption('--tsconfig [path]', 'path to tsconfig.json file')
  .option('--json')
  .parse(process.argv);

function main(tsConfigPath, jsonOutput) {
  const result = ownableDecorators.map(createDecoratorResult);
  const parsed = getParsedCommandLineOfConfigFile(tsConfigPath, undefined, sys);

  if (!parsed) {
    throw new Error('tsconfig file not exist');
  }

  const tsProgram = createProgram({rootNames: parsed.fileNames, options: parsed.options});

  for (let sourceFile of tsProgram.getSourceFiles()) {

    if (!parsed.fileNames.includes(sourceFile.getSourceFile().fileName)) {
      continue;
    }

    const statementsWithDecorators = sourceFile.statements.filter(s => !!s.decorators);
    for (const stmt of statementsWithDecorators) {

      const validDecorators = stmt.decorators.filter(d => {
        const decoratorName = d.expression.expression.escapedText;
        return ownableDecorators.includes(decoratorName);
      });

      for (const decorator of validDecorators) {
        const decoratorName = decorator.expression.expression.escapedText;

        const found = getResult(result, decoratorName).files;
        const properties = decorator.expression.arguments[0].properties;

        getResultForSingleOwner(result, properties, decoratorName, sourceFile, stmt, found);
        getResultForMultipleOwners(result, properties, decoratorName, sourceFile, stmt, found);
      }
    }
  }

  printResults(result, jsonOutput);
}

main(program.opts()['tsconfig'], program.opts()['json'])
