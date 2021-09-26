/*
 * Public API Surface of ng-owner
 */

import { Component, NgModule, Directive, Pipe, Injectable, InjectableProvider } from "@angular/core";

declare module '@angular/core' {
  interface Component {
    owner?: string;
  }

  interface NgModule {
    owner?: string;
  }

  interface Directive {
    owner?: string;
  }

  interface Pipe {
    owner?: string;
  }

  interface ConstructorSansProvider {
    owner?: string;
  }
}

export const Noop = {};
