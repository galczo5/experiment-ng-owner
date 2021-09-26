/*
 * Public API Surface of ng-owner
 */

import { Component, NgModule, Directive, Pipe, Injectable, InjectableProvider } from "@angular/core";

declare module '@angular/core' {
  interface Component {
    owner?: string;
    owners?: Array<string>;
  }

  interface NgModule {
    owner?: string;
    owners?: Array<string>;
  }

  interface Directive {
    owner?: string;
    owners?: Array<string>;
  }

  interface Pipe {
    owner?: string;
    owners?: Array<string>;
  }

  interface ConstructorSansProvider {
    owner?: string;
    owners?: Array<string>;
  }
}

export const Noop = {};
