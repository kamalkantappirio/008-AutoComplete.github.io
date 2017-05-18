(function ($) {
  $.fn.validateForm = function (options) {

    var option = {
      requiredFieldMessage: options.requiredFieldMessage ? options.requiredFieldMessage : 'Error: Please enter value.',
      invalidEmailMessage: options.invalidEmailMessage ? options.invalidEmailMessage : 'Error: Please enter valid email address.',
      invalidPasswordMessage: options.invalidPasswordMessage ? options.invalidPasswordMessage : 'Error: Password should be greater than 5 characters.',
      invalidConfirmPasswordMessage: options.invalidConfirmPasswordMessage ? options.invalidConfirmPasswordMessage : 'Error: Password and confirm password not match.',
      confirmPasswordField: options.confirmPasswordField ? options.confirmPasswordField : 'inputConfirmPassword',
    }

    //Check validation on form submit
    $('form').submit(function (e) {
      $('form').find('input[type=text], input[type=email], input[type=password]').each(function () {
        if ($(this).attr('required')) {
          validateField(this);
        }
      });
      e.preventDefault();
    });

    //Get input and add validation
    $(this).find('input[type=text], input[type=email], input[type=password]').each(function () {
      if ($(this).attr('required')) {

        $(this).change(function () {
          validateField(this);
        });

        $(this).blur(function () {
          validateField(this);
        });
      }
    });

    //Method check the validation
    function validateField(fieldObj) {
      if ($(fieldObj).val() === '') {
        if (!$(fieldObj).parent().find('.errorMessage').length) {
          $(fieldObj).parent().append('<p id="errorMessage" class="errorMessage" style="color:red;font-size: 15px; padding-left: 5px "> ' + option.requiredFieldMessage + '</p>');
          $(fieldObj).css('border-color', 'red');
        }
      } else if ($(fieldObj).attr('type') == 'email' && !isValidEmailAddress($(fieldObj).val())) {
        $(fieldObj).parent().find('.errorMessage').remove();
        $(fieldObj).parent().append('<p id="errorMessage" class="errorMessage" style="color:red;font-size: 15px; padding-left: 5px "> ' + option.invalidEmailMessage + '</p>');
        $(fieldObj).css('border-color', 'red');

      } else if ($(fieldObj).attr('type') == 'password' && !isValidPassword($(fieldObj).val())) {
        $(fieldObj).parent().find('.errorMessage').remove();
        $(fieldObj).parent().append('<p id="errorMessage" class="errorMessage" style="color:red;font-size: 15px; padding-left: 5px "> ' + option.invalidPasswordMessage + '</p>');
        $(fieldObj).css('border-color', 'red');
      }
      else {
        $(fieldObj).parent().find('.errorMessage').remove();
        $(fieldObj).css('border-color', '#cccccc');
      }
    }

  };

  function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
  };

  function isValidPassword(password) {
    if (password.length < 6) {
      return false;
    } else
      return true;
  };

})(jQuery);