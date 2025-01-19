# Welcome to my Tanstack-Meetup-Demo

## Development

From your terminal:


```sh

pnpm install

pnpm dev

```  

This starts your app in development mode, rebuilding assets on file changes.

## 

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

On their website are also a lot of examples how you can use each and everyone of the components in different cases. All of the different `input`'s have an form example. 

There are also community blocks that enable you to copy paste complete pages for auth ui, email clients, or recently added different compositions of the sidebar component.

### DB

The `db` folder contains the [`schema`](./app/db/schema.ts) and the  [`database client`](./app/db/index.ts). Since im using the [Drizzle ORM](https://orm.drizzle.team/) I don't need to write sql to create my database tables but rather can just use javascript. [Drizzle](https://orm.drizzle.team/) also provides different databases (postgress, SQLite, etc.) adapters, which makes it easy to switch from one to the other, if you for example just want to create your application quickly with a locale database and move it to an remote database ([supabase](https://supabase.com/)) provider later.

#### Drizzle

On that note, the drizzle folder contains the needed meta data, like migration and snapshot files, which allow drizzle to propt what changed in the schema, before pushing it into your database.

### hooks

### lib

### routes

### styles

### utils
