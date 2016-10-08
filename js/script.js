
var checkBoxName;
var activity;
var cost = 0;
var email;

function jobRole () {
  //Event handler for change to Job Role input
  $('#title').on('change' , function() {
    //get value of job role input
    var $jobRole = $('#title').val();
    //show textarea if "Job Role' option is "Other" otherwise hide
    if ($jobRole === 'other') {
      $('#other-title').show();
    } else {
      $('#other-title').hide();
    }
  });
}

//T-Shirt Info section of the form. For the T-Shirt color menu, only display the options that match the design selected in the "Design" menu.
function tShirtColors () {
  $('#design').on('change' , function () {
    //get input from #design select element  
    var $tShirtDesign = $('#design').val();
    $('#color option').show();
    $('#color option').removeProp('selected');
    //If the user selects "Theme - JS Puns"
    if ($tShirtDesign === 'js puns') {
    //then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
      $('#colors-js-puns').show();
      $('#color option:gt(2)').hide();
    } else if ($tShirtDesign === 'heart js') {
    //If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
      $('#colors-js-puns').show();
      $("option[value*='tomato']").prop('selected', 'selected');
      $('#color option:lt(3)').hide();
    } else {
      $('#colors-js-puns').hide();
    }
  });
}

function tShirtVal (e) {
  var $tShirtChoice = $('#design').val();   // get user input for T-short design
  if ($tShirtChoice === 'Select Theme') {   //check is choice is default (select theme)
    e.preventDefault();   //stop register  button event
    
    //change color of t shirt deisgn text to red and add error message
    $("#design").prev().css('color', 'red');
    $("#design").prev().text('Design: Please choose a design!');
  } 
  
    //when t short option is selected remove red color and error message
  $('#design').on('change' , function () {
    $("#design").prev().removeProp('style');
    $("#design").prev().text('Design:');
  });
}

// disables and greys out conflicting checkboxes
function disableCheckBox (checkBoxName) {
    //disabled checkbox of confliting activity and greys out label text
    $("input[name*='" + checkBoxName + "']").attr('disabled', 'disabled');
    $("input[name*='" + checkBoxName + "']").parent().css('opacity', '0.5');
}
  
function enableCheckBox (checkBoxName) {
    //enables checkbox of confliting activity and un-greys label text
    $("input[name*='" + checkBoxName + "']").removeAttr('disabled', 'disabled');
    $("input[name*='" + checkBoxName + "']").parent().css('opacity', '1');
  }


//Register for Activities section of the form.
function activityRegister (checkBoxFunction) {
      //checks name and calls disableCheckBox function with conflicting activity as argument
      if (activity === 'js-frameworks') {
        checkBoxFunction('express');
      } else if (activity === 'express') {
        checkBoxFunction('js-frameworks');   
      } else if (activity === 'js-libs'){
        checkBoxFunction('node');
      } else if (activity === 'node'){
        checkBoxFunction('js-libs');
      } 
}

function totalElement () {
  //disembodied h3 element
  $total = $('<p></p>');
  //total cost added to disembodies h3 element
  $total.text('Total: $' + cost);
  //append total h3 to .activities fieldset
  $('.activities').append($total);
}

function totalCostChecked () {
    if (activity === 'all') {
      //if 'Main Conference' is checked add $200 to total
      cost = cost + 200;
    } else {
      //if another activity besides 'Main Conference' is checked add $100 to total
      cost = cost + 100;
    }
  //add tallyed cost to total h3 element based on checkbox selected
  $total.text('Total: $' + cost);
}
  
 function totalCostUnchecked () {
    //if 'Main Conference' is unchecked subtract $200 from total
    if (activity === 'all') {
      cost = cost - 200;
    } else {
      //if another activity besides 'Main Conference' is unchecked subtract $100 from total
      cost = cost - 100;
    }
  //add tallyed cost to total h3 element based on checkbox selected
  $total.text('Total: $' + cost)
}  


function activityReg () {
//event handler to capture checkbox
$("input[type*='checkbox']").change(function () {
  
  //gets name of checked input element
  activity = $(this).attr('name');
  
  //checks if checkbox was checked
  if ($(this).is(':checked')) {
    
    //calls function to add activity cost to total
    totalCostChecked();
    
    //calls function to disable conflicting activities
    activityRegister(disableCheckBox);
    $(".activities legend").removeProp('style');
    $(".activities p").remove();
    
  // check is checkbox was unchecked
  } else {
    //calls function to subtract activity cost from total
    totalCostUnchecked();
    //calls function to enable conflicting activities
    activityRegister(enableCheckBox);
  }
});
}

//Payment Info section of the form. Display payment sections based on chosen payment option.
function paymentInitialSetUp () {
  //set default payment to credit card
  $("option[value*='credit card']").prop('selected', 'selected');
  //hide paypal and bitcoin payment information
  $('.credit-card').nextAll().hide();
}

function paymentOptions () {
  //event handler for payment select box
  $('#payment').change(function () {
    var paymentChoice = $(this).val();    //capture user payment choice
    $('#payment').nextAll().hide();
    var paypalDiv = $('.credit-card').next();   //variable to payment choice 
    
    //if paypal is selectd by user show paypal information
    if (paymentChoice === 'paypal') { 
      paypalDiv.show();
      
    //if bitcoin is selected show bitcoin info
    } else if (paymentChoice === 'bitcoin') {
      paypalDiv.next().show();    
      
    //if credit card is selected show credit card info input options
    } else if (paymentChoice === 'credit card') {
      $('#credit-card').show();
    }
  });
}

//check if name field is blank
function nameFieldVal (e) {
  
  //if name field is blank show error message.
  if ($('#name').val().length === 0) {
    e.preventDefault();
    $("label[for*='name']").css('color', 'red');
    $("label[for*='name']").text('Name: Please enter your name!');
  } 
  
  //remove red color and error message if input is added to name
  $('#name').on('input' , function () {
    $("label[for*='name']").removeProp('style');
    $("label[for*='name']").text('Name:');
  });
}

//check if email field is blank
function emailVal (e) {
  
   //if amil field is blank show error message.
  if ($('#mail').val().length === 0) {
    e.preventDefault();
    $("label[for*='mail']").css('color', 'red');
    $("label[for*='mail']").text('Email: Please enter your email!');
    
  //check is email is valid
  } else if (validateEmail(email)) {
    e.preventDefault();
  } 
    
  //remove red color and error message if input is added to name
  $('#mail').on('input' , function () {
    $("label[for*='mail']").removeProp('style');
    $("label[for*='mail']").text('Email:');
  });
}

//email field must be formatted properly (using regular expression)
function validateEmail (email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);          
}

function activityVal (e) {
  //At least one activity must be checked from the list under "Register for Actitivities."
  $(".activities legend").removeProp('style');
  
  //check if an activity is checked
  if (!$('.activities input').is(':checked')) {
    e.preventDefault();
    //show error messages if not checked
    $(".activities legend").css('color', 'red');
    $(".activities legend").after('<p id="activity-error">You must choose one activity!</p>');
    $("#activity-error").css('color', 'red');
  }
}

function paymentSelected (e) {
  //Payment option must be selected.
  if ($("#payment").val() === 'select_method') {
    e.preventDefault();
    $("#payment").val('selected_method').css('color', 'red');
  } else {
    $("#payment").removeProp('style');
  }
}

function creditCardVal (e) {
  if ($("#payment").val() === 'credit card') {
    //make sure credit card number supplied if blank show error
    if ($('#cc-num').val().length === 0) {
      e.preventDefault();
      $("label[for*='cc-num']").css('color', 'red');
    } else {
    $("label[for*='cc-num']").removeProp('style');
    } 
    //zip code field not blank if balnk show error
    if ($('#zip').val().length === 0) {
      e.preventDefault();
      $("label[for*='zip']").css('color', 'red');
    } else {
    $("label[for*='zip']").removeProp('style');
    }
    //CVV value must be 3 digits else show error
    if ($('#cvv').val().length !== 3) {
      e.preventDefault();
      $("label[for*='cvv']").css('color', 'red');
    } else {
    $("label[for*='cvv']").removeProp('style');
    }
    
  //check if payment option selected if not show error
  } else if ($("#payment ").val() === 'select_method') {
    e.preventDefault();
    $("#payment").css('color', 'red');
  }
  $('#payment').on('change' , function () {
    $("#payment").removeProp('style');
  });
}

function creditCardNumVal () {
  var ccNumInput = $('#cc-num').val();
  if (/[^0-9-\s]+/.test($(ccNumInput).val())) {   //checks on numbers spaces or dashes entered
    ccNumInput = ccNumInput.replace(/\D/g, ""); //removes non digits
  }
  if (ccNumInput.length >= 13 && $('#cc-num').length <= 19) {
    var ccNumTotal = 0;
    var ccNum = $('#cc-num').val();
    var lastDigit = parseInt(ccNum.slice(-1));    //Drop the last digit from the number.
    var lastDigitIndex = ccNum.lastIndexOf(lastDigit);
    var removeLastDigit = ccNum.slice(0 , lastDigitIndex);
    var reverseNum = removeLastDigit.split('').reverse();   //Reverse the numbers
    //Multiply the digits in odd positions (1, 3, 5, etc.) by 2 and subtract 9 to all any result higher than 9
    for (var i = 0; i < reverseNum.length; i += 2) {
      var oddDigits = (parseInt(reverseNum[i]))*2;
      if (oddDigits > 9) {
        oddDigits = oddDigits - 9;
      }
      reverseNum.splice(i, 1, oddDigits.toString());
    }
    for (var j = 0; j < reverseNum.length; j ++) {
      ccNumTotal += parseInt(reverseNum[j]); //Add all the numbers together
    }
    //The check digit (the last number of the card) is the amount that you would need to add to get a multiple of 10 (Modulo 10)
   var mod = ccNumTotal % 10;
    
   //show errors if credit card not valid
   if (mod !== lastDigit) {
    $("label[for*='cc-num']").text('Card Number:  Not a valid number.');
    $("label[for*='cc-num']").css('color', 'red');
   } else {
    $("label[for*='cc-num']").text('Card Number:');
    $("label[for*='cc-num']").removeProp('style');
   }
  }
}

function validation () {  
  //event handler for Register button
  $("button").closest('form').submit(function (e) {
  email = $("label[for*='email']").val();
  //call validation functions
  nameFieldVal (e);
  emailVal (e);
  activityVal(e);
  creditCardVal(e);
  creditCardNumVal();
  tShirtVal(e);
});
}                       


$('#name').focus();
$('#other-title').hide();
$('#colors-js-puns').hide();
jobRole();
tShirtColors();
totalElement();
paymentInitialSetUp();
paymentOptions();
activityReg();
validation();

