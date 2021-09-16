# anki-app-web
[![CircleCI](https://circleci.com/gh/jun-g-0/anki-app-web/tree/main.svg?style=shield)](https://circleci.com/gh/jun-g-0/anki-app-web/?branch=main)  
ポートフォリオ作品。
React/Redux + Firebase + TypeScript 資格取得に役立つ、クイズアプリエンジン

### 経緯
資格勉強をする際、利用したクイズアプリに良し悪しを感じたので、自分で良し悪しを調整できるアプリを作ってしまおうと思い立ち、作成しました。
現在、問題自体はダミーですが、選択式の問題のインポートをすませば、所定の環境からサービスを提供できるようになっています。

## 利用法

### デモンストレーション
[Firebase hosting](https://anki-dev.firebaseapp.com/) からサービスを体験できます。

*主要機能*
- ユーザ登録
  - ログインをすれば、設定した項目や回答履歴はクラウド上に保存されます。
  - Google や Twitter より最低限の情報のみをお借りするので、ユーザ登録の手間は必要ありません。  

https://user-images.githubusercontent.com/71073481/133543104-65741ef1-5af7-406c-bbb4-e4d61f66a19f.mp4

- セッションデータ保存
  - 回答中の情報はローカルに保存され、ブラウザを閉じても、開けば再度回答を再開できます。  

https://user-images.githubusercontent.com/71073481/133543530-c0769bf5-e072-432a-ac0e-da7e2b830eaa.mp4

- 設定
  - ダークモードや回答時の設定など、好きにカスタマイズできます。  
  - 
https://user-images.githubusercontent.com/71073481/133542910-9bf0acba-3331-4575-b02e-6d8a3b3ad7c6.mp4

### 問題の登録(開発者向け)
ご自身のサイトを立ち上げたい場合は、 `Firebase.ts` に記載されている情報をご更新ください。  
下記の[質問データ](https://github.com/jun-g-0/anki-app-web/wiki/data#questions)を Firestore へアップロードすれば、ご自身のアプリを利用できるようになります。
```
- Question
  - questionId: number;
  - questionText: string;
  - type: 'radio' | 'checkbox' | 'input'; // 現在、 radio のみ対応
  - choices: Choice[];
    - choiceId: number;
    - choiceText: string;
  - answer: number | number[] | string; // 現在、 number(radioの選択肢) のみ対応
  - desc: string;
```
なお、Firestoreにて所定のアカウントに管理者権限を付与すれば、アプリからも問題を編集できます。


## 開発者向け

このアプリは、 React/Redux + Firebase に根ざして作成されています。  
機能やデータ構造、開発にあたっての思想は、[当リポジトリのWiki](https://github.com/jun-g-0/anki-app-web/wiki)に記載しているほか、Backlogは[Issue](https://github.com/jun-g-0/anki-app-web/issues)/[Kanban](https://github.com/jun-g-0/anki-app-web/projects/2)にて管理しています。  
アイディア等のIssueやFork/PRは大歓迎です。
