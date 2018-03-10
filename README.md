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

### TODO
1. this plugin want support [jQuery](https://jquery.com/) and some popular libraries as input arguments, after bug fixed.
2. support a customizable token that show on the last of omitted sentence. it like as "...".
3. I want search a css property that can same as this plugin, after developed this :D

### Known Bug
if a container was resized to too larger, text content is gone. now Im investigating about it.

### License 
this plugin released under GPL3.0
