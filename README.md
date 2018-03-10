# omitter.js
Omitter.js is a small javascript plugin, it can omit a text content as faster.
this plugin thought about reduce reflow count. so probably this plugin is faster than some plugins that using [Element.innerText](https://developer.mozilla.org/en/docs/Web/API/Node/innerText) or TextNode.data.

## For Example 
```
window.addEventListener("load", function (event){
  var doms = document.querySelectorAll(".omitter-target");
  var omitter = new Omitter(doms, 3); // limit to 3 lines.
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
1. this plugin will support [jQuery](https://jquery.com/) and some popular libraries as input arguments.
2. support a customizable token that show on the last of omitted sentence. it like as "...".
3. I want search a css property that can same as this plugin, after developed this :D

### License 
this plugin released under MIT license.
