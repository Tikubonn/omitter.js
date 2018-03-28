# omitter.js
Omitter.jsはJavaScriptで書かれた、テキストを省略表示するプラグインです。
極力Reflowの頻度を減らしているので、TextNode.dataや[Element.innerText](https://developer.mozilla.org/ja/docs/Web/API/Node/innerText)を書き換える方法よりも早く動作すると思います。

## For Example 
```js
window.addEventListener("load", function (event){
  // var doms = $(".omitter-target");
  var doms = document.querySelectorAll(".omitter-target");
  var omitter = new Omitter(doms, 3, "..."); // limit to 3 lines.
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
1. 省略記号が空白文字を無視するか無視しないか考える。
2. やっつけで書いたので、cssのクラス名や変数名などを意味の通る名前に書き直す事。

### License 
this plugin released under MIT license.
