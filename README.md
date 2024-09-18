# bioagents-github-editor

bioagents-github-editor is a prototype interface to demonstrate the edition of a bio-agents description directly in a github repository, using a graphical web UI.
Parts of the UI code have been reused from the current public version of the bio.agents registry repository (see [https://github.com/bio-agents/bioagentsRegistry](https://github.com/bio-agents/bioagentsRegistry))

For more information about the GitHub API used in this code, see https://developer.github.com/v3/

### Motivation

- Enable the maintenance of bio.agents agent description directly from the source
- Provide an editing interface to facilitate the creation and update of an entry

### Architecture

The user interface code reuses the 'frontend' part code of bioagentsRegistry, with a few modifications to the following files:
- js/controller.js 
- index.html
- partials/agentEdit.html
- package.json 
- gulpfile.js

---

## Install

`git clone https://github.com/bio-agents/bioagents-github-editor.git`

`cd bioagents-github-editor/frontend`

`npm install`

## Run

`gulp browser-sync`

=> http://localhost:3000 

## Build

`gulp`

---

## Notice *[temporary]*

You will need a CORS manager to Allow-Control-Allow-Origin, otherwise the Github OAuth will no work with your local Parcel servor

Example for firefox: [https://addons.mozilla.org/fr/firefox/addon/cors-everywhere/](https://addons.mozilla.org/fr/firefox/addon/cors-everywhere/)


