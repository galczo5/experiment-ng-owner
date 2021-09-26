const columnify = require('columnify');

function createDecoratorResult(name) {
  return {
    name: name,
    files: []
  }
}

function createRecord(file, module, owners) {
  return {
    file: file,
    module: module,
    owners: owners
  }
}

function getResultForOwner(result, properties, decoratorName, sourceFile, stmt, found) {
  const ownerProp = properties.find(prop => prop.name.escapedText === 'owner');
  const ownersProp = properties.find(prop => prop.name.escapedText === 'owners');
  const owners = [];

  if (ownerProp) {
    owners.push(ownerProp.initializer.text);
  } else if (ownersProp) {
    owners.push(...ownersProp.initializer.elements.map(e => e.text));
  } else {
    owners.push('');
  }

  getResult(result, decoratorName).files = [
    createRecord(sourceFile.getSourceFile().fileName, stmt.name.escapedText, owners),
    ...found
  ];
}

function getResult(result, decorator) {
  return result.find(r => r.name === decorator);
}

function printResults(result, jsonOutput) {
  if (jsonOutput) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    let byOwner = [];

    for (let resultElement of result) {
      for (let file of resultElement.files) {
        for (let owner of file.owners) {
         byOwner.push({
           owner: owner,
           module: file.module,
           file: file.file
         });
        }
      }
    }

    byOwner.sort((a, b) => a.owner > b.owner ? 1 : -1);

    console.log(columnify(byOwner));
  }
}

module.exports = {
  createDecoratorResult,
  createRecord,
  getResultForOwner,
  getResult,
  printResults
};
