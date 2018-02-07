# Memory Game

## Overview

A two-card matching game with lobby and game views.

## Installation and Dependencies

This program requires [nodejs](https://nodejs.org/en/download/) and a package manager, either npm (bundled with node) or [yarn](https://yarnpkg.com/lang/en/docs/install/).

Unzip this folder, navigate to it, and run the following code:
````
npm i / yarn install
npm start
````

### Organization

All my work is done in the **src** folder. 

The components are structured like so:

        Game Manager
    Game        Lobby
    Grid
    Card

All state is managed by the Redux store. 

## Outside Resources

**Boilerplate**: [create-react-app](https://github.com/facebook/create-react-app). Supplies comprehensive webpack configuration, hot reloading, webpack dev server (no need to build out skeleton server). 

**Card Flip CSS**: Logic largely from this [codepen](https://codepen.io/hermantnet/pen/KgmLzy) and this fellow's [article](https://davidwalsh.name/css-flip).

Shuffle algo from Stack Overflow.

Book covers from respective publishers, color scheme from Homer. 

## Known Bugs and Future Additions

Clicking two cards and quickly exiting and re-entering the game will cause the clicked cards to reflip as you enter and become unactionable. Refreshing the lobby again remedies this. There's probably a more ironclad approach to throttling than setTimeout.

Card flips don't 'overlap' their animations cleanly on certain resolutions. A bit more tweaking to the keyframe animations should help.

The reducer is somewhat large at eight actions. With future additions, it would be good to subdivide it. 

If more art were added, it would be good to randomize what's pulled from the bookCover array on every game reload so fresh images appear.


