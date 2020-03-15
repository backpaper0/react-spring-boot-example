# react-spring-boot-example

## SpringのProfile

WIP

`default`プロファイルでデバッグログが出るようにしている。

ステージングや本番ではプロファイルを変える。

## frontend-maven-plugin

WIP

APIのみのJARを作るProfile(SpringではなくMaven)の用意している。

## TODO

- ログイン前のセッションタイムアウト対策
  - CSRFトークンが無効になって403 Forbidden
- 複数のHTTPセッションが作成されてしまう問題への対応
  - おそらくCSRFトークン取得やユーザー情報取得のリクエストが同時に送信されるため

