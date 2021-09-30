'use strict';
const doraemonInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て除去する 
 * @param{HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
  while (element.firstChild){
    //子どもの要素があるかぎり除去
    element.removeChild(element.firstChild);
  }
}

assessmentButton.onclick = () => {
  const doraemon = doraemonInput.value;
  if(doraemon.length === 0){
    //名前が空の時は処理を終了する
    return;
  }
  
  // 診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(doraemon);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  doraemonInput.onkeydown = event => {
    if (event.key === 'Enter') {
      assessmentButton.onclick();
    }
  };

  // ツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsr%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';
  tweetDivided.appendChild(anchor);
  
  // widgets.jsの設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
}; 

const answers = [
  '{doraemon}のいいところは声です。{doraemon}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{doraemon}のいいところはまなざしです。{doraemon}に見つめられた人は、気になって仕方がないでしょう。',
  '{doraemon}のいいところは情熱です。{doraemon}の情熱に周りの人は感化されます。',
  '{doraemon}のいいところは厳しさです。{doraemon}の厳しさがものごとをいつも成功に導きます。',
  '{doraemon}のいいところは知識です。博識な{doraemon}を多くの人が頼りにしています。',
  '{doraemon}のいいところはユニークさです。{doraemon}だけのその特徴が皆を楽しくさせます。',
  '{doraemon}のいいところは用心深さです。{doraemon}の洞察に多くの人が助けられます。',
  '{doraemon}のいいところは見た目です。内側から溢れ出る{doraemon}の良さに皆が気を惹かれます。',
  '{doraemon}のいいところは決断力です。{doraemon}がする決断にいつも助けられる人がいます。',
  '{doraemon}のいいところは思いやりです。{doraemon}に気をかけてもらった多くの人が感謝しています。',
  '{doraemon}のいいところは感受性です。{doraemon}が感じたことを皆が共感し、わかりあうことができます。',
  '{doraemon}のいいところは節度です。強引すぎない{doraemon}の考えに皆が感謝しています。',
  '{doraemon}のいいところは好奇心です。新しいことに向かって{doraemon}の心構えが多くの人に魅力的に映ります。',
  '{doraemon}のいいところは気配りです。{doraemon}の配慮が多くの人を救ってます。',
  '{doraemon}のいいところはその全てです。ありのままの{doraemon}自身がいいところなのです。',
  '{doraemon}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{doraemon}が皆から評価されています。',
];

/**
 *  名前の文字列を渡すと診断結果を返す関数
 *  @param{string} doraemon ユーザーの名前
 *  @return{string}　診断結果
 */
function assessment(doraemon) {
  //全文字のコード番号を取得してそれを足し合わせる
  let sum0fCharCode = 0;
  for (let i = 0; i < doraemon.length; i++) {
    sum0fCharCode = sum0fCharCode + doraemon.charCodeAt(i);
  }

  // 文字コード番号の合計を回答の数で割って添字の数値を求める
  const index = sum0fCharCode % answers.length;
  let result = answers[index];

  result = result.replace(/\{doraemon\}/g, doraemon);
  return result;
}

//テストコード
console.assert(
  assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );
