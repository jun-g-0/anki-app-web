# anki-app-web
[![CircleCI](https://circleci.com/gh/jun-g-0/anki-app-web/tree/main.svg?style=shield)](https://circleci.com/gh/jun-g-0/anki-app-web/?branch=main)  
ブラウザで使える、カスタマイズ性が高い暗記アプリ(仮)

## Usage

### Just take a look.
You can try [this app now](https://web-anki.herokuapp.com/).  
There are a few sample questions and you can answer them, change settings, sign-in, reload, and so on.  
It is a cold start server, so please wait for a while. If an error occurs, reload it.  

*Features*
- Sign-in (and upload settings and answer log.)
- Saved session data
- Answer log and list of questions to review
(mp4 will uploaded when upload function was created.)

### Setup with your own questions and answers.
If you want to setup your own website, you should create a Firebase account and change settings in `Firebase.ts`.  
The questions base on [the below structure](https://github.com/jun-g-0/anki-app-web/wiki/data#questions) should be uploaded to your firestore.
```
- Question[]
  - questionId: number;
  - questionText: string;
  - type: string;
  - choices: Choice[];
    - choiceId: number;
    - choiceText: string;
  - answer: number | number[] | string;
  - desc: string;
```
(Uploading to Firebase function is in construction.)

## How to develop

This App is mainly base on React/Redux + Firebase.  
The components and data structures are described on [this repo's wiki](https://github.com/jun-g-0/anki-app-web/wiki).  
You can add your own functions in your fork/clone, and if you wish, PRs to this repo is welcomed.
