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

function getResultForSingleOwner(result, properties, decoratorName, sourceFile, stmt, found) {
  const ownerProp = properties.find(prop => prop.name.escapedText === 'owner');
  if (ownerProp) {
    const owners = [ownerProp.initializer.text];
    getResult(result, decoratorName).files = [
      createRecord(sourceFile.getSourceFile().fileName, stmt.name.escapedText, owners),
      ...found
    ];
  }
}

function getResultForMultipleOwners(result, properties, decoratorName, sourceFile, stmt, found) {
  const ownersProp = properties.find(prop => prop.name.escapedText === 'owners');
  if (ownersProp) {
    const owners = ownersProp.initializer.elements.map(e => e.text);
    getResult(result, decoratorName).files = [
      createRecord(sourceFile.getSourceFile().fileName, stmt.name.escapedText, owners),
      ...found
    ];
  }
}

function getResult(result, decorator) {
  return result.find(r => r.name === decorator);
}

function printResults(result, jsonOutput) {
  if (jsonOutput) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    let byOwner = {};

    for (let resultElement of result) {
      for (let file of resultElement.files) {
        for (let owner of file.owners) {
          if (byOwner[owner]) {
            byOwner[owner] = [...byOwner[owner], `${file.file}:${file.module}`];
          } else {
            byOwner[owner] = [`${file.file}:${file.module}`];
          }
        }
      }
    }

    for (let owner in byOwner) {
      console.log('#', owner);
      for (const x of byOwner[owner]) {
        console.log(x);
      }

      console.log();
    }
  }
}

module.exports = {
  createDecoratorResult,
  createRecord,
  getResultForSingleOwner,
  getResultForMultipleOwners,
  getResult,
  printResults
};
