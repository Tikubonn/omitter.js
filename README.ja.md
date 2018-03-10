# omitter.js
Omitter.jsはJavaScriptで書かれた、テキストを省略表示するプラグインです。
極力Reflowの頻度を減らしているので、TextNode.dataや[Element.innerText](https://developer.mozilla.org/ja/docs/Web/API/Node/innerText)を書き換える方法よりも早く動作すると思います。

## For Example 
```
window.addEventListener("load", function (event){
  var doms = document.querySelectorAll(".omitter-target");
  var omitter = new Omitter(doms, 3); // limit to 3 lines.
  omitter.omit();
});
```

もし省略表示をやめさせたい場合には`omitter.unomit();`メソッドを呼び出せば、全表示に戻ります。

### TODO
1. バグの修正が終わったら、[jQuery](https://jquery.com/)等の人気のあるライブラリを引数に使えるようにしたいですん。
2. バグの修正が終わったら、省略後の三点リーダーのような文字列を、任意で省略後の文字列に追加できるようにしたいです。
3. 開発が終わったら、完全に同じことがcssでできるかどうかを調べてみます。

### Known Bug
リサイズのタイミングで実行時、親コンテナの大きさの変化が一定以上大きい場合に、要素がすべて非表示になってしまうバグがあります。現在調査中です。

### License 
this plugin released under GPL3.0
