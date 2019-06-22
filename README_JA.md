# swagger-scraper [![Build Status](https://travis-ci.org/segurvita/swagger-scraper.svg?branch=master)](https://travis-ci.org/segurvita/swagger-scraper)
<div style="text-align:right">Language: <a href="README.md">English</a> | <i>日本語</i></div>
swaggerファイルを圧縮するnpmモジュールを作りました。 `scraper` というのは削り取るというニュアンスの言葉です。



# 目的

Amazon API GatewayにSwaggerファイルをインポートしたところ、容量制限のエラーが発生しました。このエラーを回避することが目的です。



# 使用方法

本ライブラリの仕様にはNode.jsが必要です。

Node.jsがインストール済みであれば、以下のコマンドでインストールできます。

```bash
npm install swagger-scraper
```

サンプルコードは以下の通りです。

```javascript
// ライブラリを追加
const fs = require('fs');
const scraper = require('swagger-scraper');

// YAMLファイルを読み込み
const inputSwagger = fs.readFileSync('./swagger.yaml', 'utf8');

// exampleを削除し、descriptionを空にし、deprecatedの親を削除する
const outputSwagger = scraper(inputSwagger)
  .deleteTarget('example')
  .emptyTarget('description')
  .deleteParent('deprecated')
  .toString();

// 結果を表示
console.log(outputSwagger);
```



# API

### scraper(inputSwagger)

`inputSwagger` をYAML形式として解析します。 最初にこの関数を呼んでから、以下のメソッドチェーンを繋いでください。

### deleteTarget(scrapTarget)

keyが `scrapTarget` の項目を削除します。メソッドチェーンに使えます。

### emptyTarget(scrapTarget)

keyが `scrapTarget` のvalueを `''` に置換します。メソッドチェーンに使えます。

### deleteParent(scrapTarget)

子にkeyが `scrapTarget` の項目を持つ要素を削除します。メソッドチェーンに使えます。

### toString()

現在の加工データをもとにYAML形式の文字列を生成し、返却します。



# 開発環境構築

本プロジェクトを編集した場合、リポジトリから本プロジェクトをクローンし、以下のコマンドで開発環境を構築できます。

```bash
# 必要なパッケージの導入
npm install

# テスト実行
npm test
```

