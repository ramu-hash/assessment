'use strict';
const pyokoInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て除去する 
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
  while (element.firstChild){
    // 子どもの要素があるかぎり除去
    element.removeChild(element.firstChild);
  }
}

assessmentButton.onclick = () => {
  const pyoko = pyokoInput.value;
  if(pyoko.length === 0){
    //名前が空の時は処理を終了する
    return;
  }
  
  // 診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(pyoko);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

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
  '{pyoko}のいいところは声です。{pyoko}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{pyoko}のいいところはまなざしです。{pyoko}に見つめられた人は、気になって仕方がないでしょう。',
  '{pyoko}のいいところは情熱です。{pyoko}の情熱に周りの人は感化されます。',
  '{pyoko}のいいところは厳しさです。{pyoko}の厳しさがものごとをいつも成功に導きます。',
  '{pyoko}のいいところは知識です。博識な{pyoko}を多くの人が頼りにしています。',
  '{pyoko}のいいところはユニークさです。{pyoko}だけのその特徴が皆を楽しくさせます。',
  '{pyoko}のいいところは用心深さです。{pyoko}の洞察に多くの人が助けられます。',
  '{pyoko}のいいところは見た目です。内側から溢れ出る{pyoko}の良さに皆が気を惹かれます。',
  '{pyoko}のいいところは決断力です。{pyoko}がする決断にいつも助けられる人がいます。',
  '{pyoko}のいいところは思いやりです。{pyoko}に気をかけてもらった多くの人が感謝しています。',
  '{pyoko}のいいところは感受性です。{pyoko}が感じたことを皆が共感し、わかりあうことができます。',
  '{pyoko}のいいところは節度です。強引すぎない{pyoko}の考えに皆が感謝しています。',
  '{pyoko}のいいところは好奇心です。新しいことに向かって{pyoko}の心構えが多くの人に魅力的に映ります。',
  '{pyoko}のいいところは気配りです。{pyoko}の配慮が多くの人を救ってます。',
  '{pyoko}のいいところはその全てです。ありのままの{pyoko}自身がいいところなのです。',
  '{pyoko}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{pyoko}が皆から評価されています。',
];

pyokoInput.onkeydown = event => {
  if (event.key === 'Enter') {
    assessmentButton.onclick();
  }
};

/**
 *  名前の文字列を渡すと診断結果を返す関数
 *  @param {string} pyoko ユーザーの名前
 *  @return {string}　診断結果
 */
function assessment(pyoko) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < pyoko.length; i++) {
    sumOfCharCode = sumOfCharCode + pyoko.charCodeAt(i);
  }

  // 文字コード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replace(/\{pyoko\}/g, pyoko);
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