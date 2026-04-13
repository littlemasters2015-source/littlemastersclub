# Little Masters Club Website

Website for Little Masters Club. Built with SvelteKit and Sanity.

## Project Structure

- `/app` - SvelteKit application (website and serverless backend)
  - `/src` - Main source code
    - `/lib` - Components, scripts, utilities, and assets
    - `/routes` - SvelteKit pages and layouts
  - `/static` - Static assets
- `/studio` - Sanity Studio (content management backend)
  - `/schemas` - Sanity schemas
- `/test` - Miscellaneous files for testing

## Setup

Run the following commands to prepare both applications, each step should be executed from the **root directory**:

Install dependencies.

```sh
pnpm install
```

Initialize Sanity Studio. When prompted, select the `lmc [60juzmgp]` project and the `production` dataset.

```sh
cd studio
pnpm exec sanity init --env .env
```

Copy the example app `.env` file.

```sh
cp ./app/.env.example ./app/.env
```

Populate these variables in the `.env` file.

```
# Required - The ID of your Sanity project
PUBLIC_SANITY_PROJECT_ID=""
# Required - The dataset of your Sanity project
PUBLIC_SANITY_DATASET=""
# Required - The generated read token, used to fetch data on the server
SANITY_API_READ_TOKEN=""
```

Finally, start the development server.

To run both the website and Sanity Studio, run this in the **root directory**:

```sh
pnpm dev
```

To run only the website, cd into the `/app` directory:

```sh
cd app
pnpm dev
```

To run only the Sanity Studio, cd into the `/studio` directory:

```sh
cd studio
pnpm dev
```

## Deploy Sanity

You'd usually do this after you've made changes to schemas in Studio and want to update the live instance (you don't need to do this if you're just running Studio locally).

```sh
cd studio
pnpm exec sanity deploy
```
 
