# AIコーディングテスト

## サービス概要
AIコーディングテストはコーディングテストの対策が出来るサービスです。
使用するプログラミング言語とエンジニア歴を選択するだけで、AIがユーザーのレベルに合った問題を出題してくれます。
また、全ての問題がアーカイブされるため、様々な問題に触れてプログラミングの知識を深めることが出来ます。

## 想定されるユーザー層
* 転職活動中のWebエンジニア
* コーディング面接の担当者

## このサービスへの思い・作りたい理由
未経験からのWebエンジニア転職に向けて準備を進める中で、コーディングテストへの対策方法がわからず不安を感じていました。
参考になりそうな模擬テストを受けられるサイトをいくつか調べてみましたが、有料であったり、日本語対応していなかったり、競技プログラミングのような高度なアルゴリズムに関する問題に偏っていたりと、なかなか手軽にWebエンジニア向けの問題に触れられるサイトがないことに気づき、AIを活用して自分で作ろうと思いました。

## サービスコンセプト
* 各言語のメソッド、フレームワーク、様々な機能の実装方法などに関する問題/解答をAIがユーザーのレベルに合わせて柔軟に作成します。
* ユーザーは(1)言語、(2)エンジニアレベル(初級、中級、上級の３種類でエンジニア歴に基づく)、(3)オプション(問題に含めてほしいメソッドや機能等を自由に記述)の3項目を入力するだけで、AIが作成した問題/解答を見ることができます。
* 問題/解答は作成と同時にアーカイブ化・公開されるため、他のユーザーが作成した問題にも挑戦でき、様々な角度からコーディングテストの対策ができます。
* 問題/回答は全てAIが作成するため20種類以上の言語/フレームワークに対応し、ユーザーの利用数に応じて多数の問題が蓄積され、よりコーディングテスト対策に有用なサービスになります。
* 全ての解答にコメント欄があり、AIが作成した解答の誤りを指摘したり、ベストプラクティスを共有したり、エンジニア同士が意見交換できるようにします。

## 実装を予定している機能
### MVP
* 新規問題/解答の作成(OpenAIのAPIを利用)
* 全ての問題/解答の閲覧
* 言語別/レベル別のソート機能
* コメント機能

### その後の機能
* ログイン機能
* ブックマーク機能
* いいね機能

## 画面遷移図
Figma: https://www.figma.com/file/QlqXZk3uSk4qko4IQvdpce/Figma-basics?type=design&node-id=506%3A9&mode=design&t=Dgcatm97EjLhb29E-1

## ER図
drawio: https://drive.google.com/file/d/1E6VSVfevH-phz0dFNINlqrQcpRiemufI/view?usp=sharing
