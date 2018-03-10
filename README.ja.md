# omitter.js
Omitter.jsはJavaScriptで書かれた、テキストを省略表示するプラグインです。
極力Reflowの頻度を減らしているので、TextNode.dataや[Element.innerText](https://developer.mozilla.org/ja/docs/Web/API/Node/innerText)を書き換える方法よりも早く動作すると思います。

## For Example 
```js
window.addEventListener("load", function (event){
  // var doms = $(".omitter-target");
  var doms = document.querySelectorAll(".omitter-target");
  var omitter = new Omitter(doms, 3); // limit to 3 lines.
  omitter.omit();
});
```

もし省略表示をやめさせたい場合には`omitter.unomit();`メソッドを呼び出せば、全表示に戻ります。

## Methods 
| メソッド | 説明文 |
---- | ---- 
| Omitter.omit | 省略表示を有効にし、要素を更新します。 | 
| Omitter.unomit | 省略表示を無効にし、必要であれば要素を更新します。 | 
| Omitter.update | 省略表示が有効であれば要素を更新します。 | 
| Omitter.toggle | 省略表示を切り替えます。 |

### TODO
2. 省略後の三点リーダーのような文字列を、任意で省略後の文字列に追加できるようにしたいです。
3. 開発が終わったら、完全に同じことがcssでできるかどうかを調べてみます。

### License 
this plugin released under MIT license.
