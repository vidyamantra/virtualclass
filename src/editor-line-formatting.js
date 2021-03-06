// This file is part of Vidyamantra - http:www.vidyamantra.com/
/**
 * By this file we are creating the Editor
 * It depends on parameters what kind of editor(Rich Text or Code editor would be created)
 *
 * @Copyright 2015  Vidyamantra Edusystems. Pvt.Ltd.
 * @author  Suman Bogati <http://www.vidyamantra.com>
 *
 *
 */
(function (window) {
  /**
   * Immutable object to represent line formatting.  Formatting can be modified by chaining method calls.
   *
   * @constructor
   * @type {Function}
   */
  const LineFormatting = (function () {
    const ATTR = window.AttributeConstants;

    function LineFormatting(attributes) {
      // Allow calling without new.
      if (!(this instanceof LineFormatting)) {
        return new LineFormatting(attributes);
      }

      this.attributes = attributes || {};
      this.attributes[ATTR.LINE_SENTINEL] = true;
    }

    LineFormatting.LIST_TYPE = {
      NONE: false,
      ORDERED: 'o',
      UNORDERED: 'u',
      TODO: 't',
      TODOCHECKED: 'tc',
    };

    LineFormatting.prototype.cloneWithNewAttribute_ = function (attribute, value) {
      const attributes = {};

      // Copy existing.
      for (const attr in this.attributes) {
        attributes[attr] = this.attributes[attr];
      }

      // Add new one.
      if (value === false) {
        delete attributes[attribute];
      } else {
        attributes[attribute] = value;
      }

      return new LineFormatting(attributes);
    };

    LineFormatting.prototype.indent = function (indent) {
      return this.cloneWithNewAttribute_(ATTR.LINE_INDENT, indent);
    };

    LineFormatting.prototype.align = function (align) {
      return this.cloneWithNewAttribute_(ATTR.LINE_ALIGN, align);
    };

    LineFormatting.prototype.listItem = function (val) {
      vceditor.utils.assert(val === false || val === 'u' || val === 'o' || val === 't' || val === 'tc');
      return this.cloneWithNewAttribute_(ATTR.LIST_TYPE, val);
    };

    LineFormatting.prototype.getIndent = function () {
      return this.attributes[ATTR.LINE_INDENT] || 0;
    };

    LineFormatting.prototype.getAlign = function () {
      return this.attributes[ATTR.LINE_ALIGN] || 0;
    };

    LineFormatting.prototype.getListItem = function () {
      return this.attributes[ATTR.LIST_TYPE] || false;
    };
    return LineFormatting;
  }());

  window.LineFormatting = LineFormatting;
}(window));
