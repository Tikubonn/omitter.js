# omitter.js
Omitter.js is a small javascript plugin, it can omit a text content faster.
this plugin thought about reduce reflow count. so probably this plugin is faster than some plugins that using [Element.innerText](https://developer.mozilla.org/en/docs/Web/API/Node/innerText) or TextNode.data.

## For Example 
```js
window.addEventListener("load", function (event){
  // var doms = $(".omitter-target");
  var doms = document.querySelectorAll(".omitter-target");
  var omitter = new Omitter(doms, 3, "..."); // limit to 3 lines.
  omitter.omit();
});
```

if you want disable omission, you can use `omitter.unomit();` method.
it show all sentences.

## Methods 
| Method | Description |
---- | ---- 
| Omitter.omit | enable omission mode and update nodes. | 
| Omitter.unomit | disable omission mode and update nodes if necessary. | 
| Omitter.update | update nodes if omission mode is enabled. | 
| Omitter.toggle | toggle omission mode and update nodes. |

### TODO
1. I should think whitespace character. the ellipsis ignore whitespace or not?
2. rename some members and css classes to right words.

### License 
this plugin released under MIT license.
