# swagger-scraper
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
const inputFile = "./swagger.yaml";
const inputStr = fs.readFileSync(inputFile, 'utf8');

// 文字列からexampleを削除
const outputStr = scraper.deleteTarget(inputStr, 'example', 'string');

// 結果を表示
console.log(outputStr);
```



# 開発環境構築

本プロジェクトを編集した場合、リポジトリから本プロジェクトをクローンし、以下のコマンドで開発環境を構築できます。

```bash
# 必要なパッケージの導入
npm install

# テスト実行
npm test
```

