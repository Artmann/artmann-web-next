---
title: Curry actions from DDAU Checbox component
blurb: Example of how to curry actions with a checkbox.
imageUrl: https://i.imgur.com/Nu9Dodf.png
publishedAt: 2016-11-03
status: Published
tags: Ember, Javascript
---

```js
// trucks/controller.js

import Ember from 'ember';

export default Ember.Controller.extend({
  trucks: [{name: 'truck 1', inUse: false}, {name: 'truck 2', inUse: true}],

  actions: {
    changeTruck(truck, inUse) {
      Ember.set(truck, 'inUse', inUse);
    }
  }
});
```
```
// ddau-checkbox/component.js

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'input',
  attributeBindings: ['checked', 'type'],
  type: 'checkbox',
  change() {
    if (this.attrs['on-change']) {
      let checked = this.$().is(':checked');
      this.attrs['on-change'](checked);
    }
   }
});
```
```
// trucks/template.hbs
{{#each trucks as |truck|}}
  <table>
    <tbody>
      <tr>
        <td>{{truck.name}}</td>
        <td>
          {{ddau-checkbox checked=truck.inUse on-change=(action 'changeTruck' truck)}}
        </td>
      </tr>
    </tbody>
  </table>
{{/each}}
```
