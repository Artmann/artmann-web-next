---
title: Image uploads with Ember.js
blurb: Allowing your users to upload images to your application is not an unusual feature but I had to pull some of my hair before I found an approach I liked when trying to do it with Ember.
imageUrl: /images/covers/image-upload.png
publishedAt: 2016-02-04
status: Published
tags: Ember, Javascript
---

Allowing your users to upload images to your application is not an unusual feature but I had to pull some of my hair before I found an approach I liked when trying to do it with Ember.

At first we need a component for the file-input as there is no built-in view for this yet.

```js
App.InputFileComponent = Ember.Component.extend({
  attributeBindings: ['multiple', 'type'],
  tagName: 'input',
  type: 'file',
  multiple: true,
  files: null,
});
```

Then can use it in our template like this

```js
{{input-file files=files}}
```

And files is the property we are going to use to store our files.
Then we want something to happen when the user chooses which files to upload. We can do this by listening to the change event and populate our array with the files uploaded

```js
change: function(event) {
  var files = event.target.files;
  for (var i = 0; i < files.length; i++) {
    var file = files.item(i);
    this.get('files').pushObject(file);
  }
}
```

We can now render our files on the page.

```js
<ul>
{{#each file in files}}
  {{file.name}}
{{/each}}
</ul>

{{input-file files=files}}
```

But displaying just the filename is a bit boring, is it not? As luck would have it, thanks to components it won’t be too hard to show a preview of the image next to the name. If we remove the list item from our template and replace it with a component. We can do something like this.

```js
<ul>
{{#each file in files}}
  {{image-preview file=file}}
{{/each}}
</ul>
{{input-file files=files}}
```

By creating a image preview component we can use the FileReader class to read our image data and bind it to a img-tag

```js
App.ImagePreviewComponent = Ember.Component.extend({
  tagName: 'li',
  file: null,

   didInsertElement: function () {
     var self = this;
     var file = this.get('file');
     var reader = new FileReader();
     reader.onload = function(e) {
       var data = e.target.result;
       self.$("img.preview").attr("src", data);
     };
     reader.readAsDataURL(file);
   },
});
```
