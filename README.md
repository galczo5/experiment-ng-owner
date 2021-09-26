# ng-owner - Angular helper that helps you define who is the owner of the module

## Why?
Working in medium and huge companies sometimes is hard. Sometimes is hard to say who is responsible for the module/component/directive/pipe/service.

With `ng-owner` it's easy to define who should care of the quality of the piece of code.

## Installation

```
npm install --save ng-owner
or
yarn add ng-owner
```

## Usage

Usage is quite simple. Just import `ng-owner` into your file and after that, you can add fields `owner` or `owners` in your metadata.

Example:
```angular2html
import { Component } from '@angular/core';

import 'ng-owner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  owner: 'John Doe'
})
export class AppComponent {
  // ...
}
```

## CLI tools
With `ng-owner` package you'll get the access to `ng-owner` CLI command.
It needs only one argument `--tsconfig`, it's the path to your project's` tsconfig.json` file.

Example:
```
> ng-owner --tsconfig ./tsconfig.json
OWNER    MODULE       FILE                                                       
         AppModule    /home/kamil/Dev/ng-owner-extension/src/app/app.module.ts   
John Doe AppComponent /home/kamil/Dev/ng-owner-extension/src/app/app.component.ts
```

There is a second, optional, argument `--json` that allows you to export data as json.

