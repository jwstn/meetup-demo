# Welcome to my Tanstack-Meetup-Demo

## Development

From your terminal:


```sh

pnpm install

pnpm dev

```  

This starts your app in development mode, rebuilding assets on file changes.

## Content

Besides some config files on the root level, the import code is located sin the `app` folder.  

- [components](#components)
- [db](#db)
- [drizzle](#drizzle)
- [hooks](#hooks)
- [lib](#lib)
- [routes](#routes)
- [styles](#styles)
- [utils](#utils)
- [api-client.ts](#api-client.ts)
- [api.ts](#api.ts)
- [auth.ts](#auth.ts)
- [client.tsx](#client.tsx)
- [router.tsx](#router.tsx)
- [routeTree.gen.ts](#routeTree.gen.ts)
- [ssr.tsx](#ssr.tsx)
- [types.ts](#types.ts)


### Components

The components folder contains all of my re-suable components. On the root-level of the folder are my custom components that I created myself. The [`ui`](./app/components/ui) folder contains generated files that I can adjust freely from the [shadcn ui lib](https://ui.shadcn.com). The concept of this component library is that you don't import styles or even just unstyled components from a library but rather install the code via a config and registry right into your project. The needed dependencies are all installed automatically. It uses tailwind for styles and also uses a easy to understand design-system. 

