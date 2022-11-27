# react-spring-boot-example

## npmとMavenで動かす

### UI

```sh
cd example-ui
```

```sh
npm install
```

```sh
npm start
```

### API

```sh
cd example-api
```

```sh
mvn spring-boot:run
```

## 実行可能JARで動かす

### ビルド

```sh
mvn -Pbundle-ui -f example-api package
```

### 実行

```sh
java -jar example-api/target/example-api-0.0.1-SNAPSHOT.jar
```

## 動作確認

Webブラウザで http://localhost:8080 を開く。
(npmとMavenで動かしている場合は http://localhost:3000 )

次のユーザーでログインできる。

|ユーザー名|パスワード|
|---|---|
|`demo`|`secret`|

## TODO

- ログイン前のセッションタイムアウト対策
  - CSRFトークンが無効になって403 Forbidden
- 複数のHTTPセッションが作成されてしまう問題への対応
  - おそらくCSRFトークン取得やユーザー情報取得のリクエストが同時に送信されるため

