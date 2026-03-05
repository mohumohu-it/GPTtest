# Mini Spire (Text Prototype)

スレイザスパイア風の**テキストベース・ローグライクデッキ構築**をブラウザで遊べる試作です。

## 起動方法

### そのまま起動
- `index.html` をブラウザで開く

### ローカルサーバーで起動（推奨）
```bash
python3 -m http.server 8000
```
ブラウザで `http://localhost:8000/index.html` を開く。

## 実装済み（今回）

- 敵名の日本語化
- 敵/プレイヤーのステータス表示を分離
- HPバー表示
- 敵の行動予告
- 戦闘後に確率で焚き火/ショップが出現（任意利用）
- ショップ5択 + カードごとの価格表示
- レリックと永続効果
- 簡易セーブ/ロード（localStorage）
- 焚き火で回復/カード削除/カード強化

## コンフリクトでPR承認できないとき（最短手順）

> いまの変更を残したままマージしたい場合の手順です。

1. GitHub の PR 画面で **base ブランチ**（通常 `main`）と **compare ブランチ** を確認する。
2. ローカルで最新の base を取り込み、作業ブランチに反映する。
3. コンフリクト箇所（`<<<<<<<`, `=======`, `>>>>>>>`）を解消してコミットする。
4. ブランチを push し直すと、PR のコンフリクト表示が消える。

### コマンド例

```bash
# 1) 変更したい作業ブランチへ
git checkout <your-feature-branch>

# 2) base 側の最新を取得
git fetch origin

# 3) rebase か merge のどちらかで取り込む（どちらか一方）
# 推奨: 履歴をきれいに保つなら rebase
git rebase origin/main
# もしくは
# git merge origin/main

# 4) 衝突ファイルを編集して解消後
git add <resolved-files>

# rebase のとき
git rebase --continue
# merge のとき
# git commit

# 5) リモート更新
# rebase を使った場合は --force-with-lease が必要
git push --force-with-lease
# merge の場合は通常 push
# git push
```

### 迷ったときの判断

- **rebase**: PR を1本のきれいな履歴で保ちたいとき。
- **merge**: 履歴改変を避けたいとき（チームで安全）。

### GitHub 上だけで直す方法

PR に **Resolve conflicts** ボタンが出る場合は、Web エディタ上で解消してコミットしてもOKです。

## 使用技術

- HTML
- JavaScript（フレームワークなし）
- Sass（`styles.scss`） + 生成済み `styles.css`
