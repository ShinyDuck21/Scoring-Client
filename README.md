# Cyber Patriot Scoring System

this is a scoring system similar to the one used in the [Cyber Patriot Competition](https://www.uscyberpatriot.org/)

This has a linux client and a windows client as well as a scoring server

## Scoring Server: Javascript
The scoring server is written in next.js. It is intended to be ran on a host computer for scoring. If you are creating your own scenarios then you have to create your own answer keys for this scoring server

Scoring Setup
1. Make sure npm is installed
1. Git clone this repository
1. Run ```npm install``` and install the dependencies
1. Lastly run ```npm run dev``` to start the server

## Linux Client: Python
If you are creating your own scenarios then you will have to create the answer key for this.

This is setup so that your scenarios will run startup.py first to setup the teams and have them be able to be scored.

## Windows Client: C++
TBD