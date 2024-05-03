# Lorcana Learner

## What is this project?

This is an Express server for generating randomised Lorcana booster packs, for the purposes of simulating the deck building experience.

When getting into Lorcana as a beginner to competitive TCGs, there are large barriers to entry in terms of price when trying to get an authentic deck building experience.

This encourages people to either continue with weak "kitchen" starter decks or engage in the competitive community and jump straight into building meta decks for high prices.

Instead, this tool allows learners to start learning cards and synergies more organically, by simulating the opening of booster packs and allowing them to swap cards in and out of their existing decks.

## Building the project

### Installing npm and typescript

The main requirement of this project is to have `npm` and `typescript` installed locally.

To install `npm` you can [visit the website](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and follow the instructions.

Once you've done that, you can run `npm install typescript` to install typescript to the directory or `npm install typescript -g` to install it globally on your machine.

### Installing dependencies

Once you've got `npm` and `ts` installed, you can install project dependencies:

`npm install`

### Building and running the project

Since the project is built in typescript it must be transpiled to javascript before it can be run.

`npm run build`

Then you can start the server.

`node dist/server.js`