'use strict';

Polymer('password-validator', {

  publish: {
    isValidPassword: false,
    value: ''
  },
  
  ready: function() {
    this.value = '';
    this.isValidPassword = false;
    this.showValidity = true;

    if(!this.specialChars) {
      this.specialChars = '!@#$%^&*';
    }
    
    this.constructRules();

    console.log('password-validator is ready');
  },

  constructRules: function() {
    console.log('construct rules get called');
    this.rules = [];

    // check for minimum length
    this.constructMinimumLengthRule();

    // check for minimum lowercase
    this.constructMinimumLowercaseRule();

    // check for minimum uppercase
    this.constructMinmumUppercaseRule();

    // check for minimum number
    this.constructMinimumNumberRule();

    // check for minimum special character
    this.constructMinimumSpecialCharRule();
  },

  constructMinimumLengthRule: function() {
    if(this.minLength) {
      this.rules.push({
        validate: this.validateMinimumLength,
        text: 'minimum ' + this.minLength + ' characters'
      });
    }
  },

  validateMinimumLength: function(text) {
    return text.length >= this.minLength;
  },

  constructMinimumLowercaseRule: function() {
    if(this.minLowercase) {
      this.rules.push({
        validate: this.validateMinimumLowercase,
        text: 'minimum ' + this.minLowercase + ' lowercase'
      });
    }
  },

  validateMinimumLowercase: function(text) {
    return text.replace(/[^a-z]/g, "").length >= this.minLowercase;
  },

  constructMinmumUppercaseRule: function() {
    if(this.minUppercase) {
      this.rules.push({
        validate: this.validateMinimumUppercase,
        text: 'minimum ' + this.minUppercase + ' uppercase'
      });
    }
  },

  validateMinimumUppercase: function(text) {
    return text.replace(/[^A-Z]/g, "").length >= this.minUppercase;
  },

  constructMinimumNumberRule: function() {
    if(this.minNumber) {
      this.rules.push({
        validate: this.validateMinimumNumber,
        text: 'minimum ' + this.minNumber + ' number'
      }); 
    }
  },

  validateMinimumNumber: function(text) {
    return text.replace(/[^0-9]/g, "").length >= this.minNumber;
  },

  constructMinimumSpecialCharRule: function() {
    if(this.minSpecialChar) {
      this.rules.push({
        validate: this.validateSpecialChar,
        text: 'minimum ' + this.minSpecialChar + ' special characters' +
          this.getSpecialCharsForDisplay()
      }); 
    }
  },

  getSpecialCharsForDisplay: function() {
    return ' (' + this.specialChars + ')';
  },

  validateSpecialChar: function(text) {
    var matcher = new RegExp('[^' + this.specialChars + ']', 'g');
    return text.replace(matcher, "").length >= this.minSpecialChar;
  },

  valueChanged: function(oldValue, newValue) {
    console.log('value is ' + newValue);
    var self = this;

    var isValid = true;
    Array.prototype.forEach.call(this.rules, function(rule) {
      if(typeof rule.validate === 'function') {
        rule.validate = rule.validate.bind(self);
        rule.flag = rule.validate(newValue);

        if(isValid && !rule.flag) {
          isValid = false;
        }
      }
    });
    this.isValidPassword = isValid;
  }
});