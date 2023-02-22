# Vidtranscript

Generate automatic transcripts and subtitles for your videos with the help of the neural network-based.
(Only english language is supported for now)

## Installation

```bash
npm install
```

## Requirements

Requires [Vercel CLI](https://vercel.com/download) to use Vercel Edge Functions to generate transcripts and subtitles for your videos.

```bash
vercel login
```

## Development

```bash
vercel dev
```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

Note: You can get the values for the following variables from your [Cloudinary dashboard](https://cloudinary.com/console).

```bash
# .env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_PRESET=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET=
CLOUDINARY_URL=
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
