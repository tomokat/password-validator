(function(document) {
  'use strict';

  document.addEventListener('polymer-ready', function() {
    // Perform some behaviour
    console.log('Polymer is ready to rock!');

    var passwordValidator = document.querySelector('password-validator');
    var submitButton = document.querySelector('paper-button');

    submitButton.addEventListener('click', function() {
      passwordValidator.value = 'Abc!3';

      console.log('password: ' + passwordValidator.value);
      console.log('isValid: ' + passwordValidator.isValidPassword);
      
    });

    var mutationObserver = new MutationObserver(changeCallback);
    Object.observe(passwordValidator, changeCallback);

  });

  function changeCallback(mutations) {
    console.log('change callback called');
    mutations.forEach(function(mutationRecord) {
      
      var isValid = mutationRecord.object.isValidPassword;
      console.log('isValidPassword? ' + isValid);

      if(isValid) {
        submitButton.removeAttribute('disabled');
        submitButton.setAttribute('raised', true);
      } else {
        submitButton.setAttribute('disabled', true);
      }
      
    });
  }

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
