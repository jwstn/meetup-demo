/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as SignUpImport } from "./routes/sign-up";
import { Route as LoginImport } from "./routes/login";
import { Route as AuthenticatedImport } from "./routes/_authenticated";
import { Route as AuthenticatedIndexImport } from "./routes/_authenticated/index";
import { Route as AuthenticatedContactsNewImport } from "./routes/_authenticated/contacts.new";
import { Route as AuthenticatedContactsContactsIdImport } from "./routes/_authenticated/contacts.$contactsId";

// Create/Update Routes

const SignUpRoute = SignUpImport.update({
  id: "/sign-up",
  path: "/sign-up",
  getParentRoute: () => rootRoute,
} as any);

const LoginRoute = LoginImport.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => rootRoute,
} as any);

const AuthenticatedRoute = AuthenticatedImport.update({
  id: "/_authenticated",
  getParentRoute: () => rootRoute,
} as any);

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedRoute,
} as any);

const AuthenticatedContactsNewRoute = AuthenticatedContactsNewImport.update({
  id: "/contacts/new",
  path: "/contacts/new",
  getParentRoute: () => AuthenticatedRoute,
} as any);

const AuthenticatedContactsContactsIdRoute =
  AuthenticatedContactsContactsIdImport.update({
    id: "/contacts/$contactsId",
    path: "/contacts/$contactsId",
    getParentRoute: () => AuthenticatedRoute,
  } as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/_authenticated": {
      id: "/_authenticated";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof AuthenticatedImport;
      parentRoute: typeof rootRoute;
    };
    "/login": {
      id: "/login";
      path: "/login";
      fullPath: "/login";
      preLoaderRoute: typeof LoginImport;
      parentRoute: typeof rootRoute;
    };
    "/sign-up": {
      id: "/sign-up";
      path: "/sign-up";
      fullPath: "/sign-up";
      preLoaderRoute: typeof SignUpImport;
      parentRoute: typeof rootRoute;
    };
    "/_authenticated/": {
      id: "/_authenticated/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof AuthenticatedIndexImport;
      parentRoute: typeof AuthenticatedImport;
    };
    "/_authenticated/contacts/$contactsId": {
      id: "/_authenticated/contacts/$contactsId";
      path: "/contacts/$contactsId";
      fullPath: "/contacts/$contactsId";
      preLoaderRoute: typeof AuthenticatedContactsContactsIdImport;
      parentRoute: typeof AuthenticatedImport;
    };
    "/_authenticated/contacts/new": {
      id: "/_authenticated/contacts/new";
      path: "/contacts/new";
      fullPath: "/contacts/new";
      preLoaderRoute: typeof AuthenticatedContactsNewImport;
      parentRoute: typeof AuthenticatedImport;
    };
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedIndexRoute: typeof AuthenticatedIndexRoute;
  AuthenticatedContactsContactsIdRoute: typeof AuthenticatedContactsContactsIdRoute;
  AuthenticatedContactsNewRoute: typeof AuthenticatedContactsNewRoute;
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedIndexRoute: AuthenticatedIndexRoute,
  AuthenticatedContactsContactsIdRoute: AuthenticatedContactsContactsIdRoute,
  AuthenticatedContactsNewRoute: AuthenticatedContactsNewRoute,
};

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
);

export interface FileRoutesByFullPath {
  "": typeof AuthenticatedRouteWithChildren;
  "/login": typeof LoginRoute;
  "/sign-up": typeof SignUpRoute;
  "/": typeof AuthenticatedIndexRoute;
  "/contacts/$contactsId": typeof AuthenticatedContactsContactsIdRoute;
  "/contacts/new": typeof AuthenticatedContactsNewRoute;
}

export interface FileRoutesByTo {
  "/login": typeof LoginRoute;
  "/sign-up": typeof SignUpRoute;
  "/": typeof AuthenticatedIndexRoute;
  "/contacts/$contactsId": typeof AuthenticatedContactsContactsIdRoute;
  "/contacts/new": typeof AuthenticatedContactsNewRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/_authenticated": typeof AuthenticatedRouteWithChildren;
  "/login": typeof LoginRoute;
  "/sign-up": typeof SignUpRoute;
  "/_authenticated/": typeof AuthenticatedIndexRoute;
  "/_authenticated/contacts/$contactsId": typeof AuthenticatedContactsContactsIdRoute;
  "/_authenticated/contacts/new": typeof AuthenticatedContactsNewRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | ""
    | "/login"
    | "/sign-up"
    | "/"
    | "/contacts/$contactsId"
    | "/contacts/new";
  fileRoutesByTo: FileRoutesByTo;
  to: "/login" | "/sign-up" | "/" | "/contacts/$contactsId" | "/contacts/new";
  id:
    | "__root__"
    | "/_authenticated"
    | "/login"
    | "/sign-up"
    | "/_authenticated/"
    | "/_authenticated/contacts/$contactsId"
    | "/_authenticated/contacts/new";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren;
  LoginRoute: typeof LoginRoute;
  SignUpRoute: typeof SignUpRoute;
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  LoginRoute: LoginRoute,
  SignUpRoute: SignUpRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated",
        "/login",
        "/sign-up"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/",
        "/_authenticated/contacts/$contactsId",
        "/_authenticated/contacts/new"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/sign-up": {
      "filePath": "sign-up.tsx"
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/contacts/$contactsId": {
      "filePath": "_authenticated/contacts.$contactsId.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/contacts/new": {
      "filePath": "_authenticated/contacts.new.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
