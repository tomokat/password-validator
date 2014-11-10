'use strict';

Polymer('yo-mine', {
  panels: [{'name':'override'}],

  created: function() {
    this.panels = ['1', '2'];
    //this.panels = [];
  },

  ready: function() {
    this.commonText = 'Common33';
    this.dynamicText = 'Dynamic';

    // able to modify bounded values
    this.panels.push('more');
    this.panels.push(this.panels.length + ' elements in this list');
    //this.panels = [{'name':'override'}];
  }
});