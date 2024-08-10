/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const ScenesLazyImport = createFileRoute('/scenes')()
const GroupsLazyImport = createFileRoute('/groups')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const ScenesLazyRoute = ScenesLazyImport.update({
  path: '/scenes',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/scenes.lazy').then((d) => d.Route))

const GroupsLazyRoute = GroupsLazyImport.update({
  path: '/groups',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/groups.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/groups': {
      id: '/groups'
      path: '/groups'
      fullPath: '/groups'
      preLoaderRoute: typeof GroupsLazyImport
      parentRoute: typeof rootRoute
    }
    '/scenes': {
      id: '/scenes'
      path: '/scenes'
      fullPath: '/scenes'
      preLoaderRoute: typeof ScenesLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  GroupsLazyRoute,
  ScenesLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/groups",
        "/scenes"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/groups": {
      "filePath": "groups.lazy.tsx"
    },
    "/scenes": {
      "filePath": "scenes.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
