'use strict';
$(document).ready(function () {
	 //search form opean/close
	 $('.search-oppen-close-btn').on('click', function (event) {
			event.preventDefault();
			$('#search-form').toggleClass('visible');
			$(this).toggleClass('active-icon');
	 });

	 //hamburger- menu
	 $('.hamburger-menu').on('click', function () {
			$(this).children('.fa').toggleClass('show');
			$(this).siblings('.quick-menu').toggleClass('visible');
	 });

	 //noUislider 
	 var startSlider = $('#donate-slider').get(0);
	 var setValue = $('#set-value');
	 noUiSlider.create(startSlider, {
			start: 40,
			connect: [true, false],
			tooltips: true,
			range: {
				 'min': [0],
				 'max': [100]
			},
			format: wNumb({
				 decimals: 0,
				 prefix: ('$')
			})
	 });
	 startSlider.noUiSlider.on('update', function (values, handle) {
			$('#slider-val-input').val(values[handle].split('$')[1]); // Passes slider value to form input;
			setValue.html(values[handle]);// Updating slider value set by user  and display it on dragable button
			var setValueArray = values[handle].split('$');
			var digitValue = parseInt(setValueArray[1], 10);
			if (digitValue <= 20) {
				 $('#changing-text').html('You set value between 0 and 20 dolars');
			} else if (digitValue > 20 && digitValue <= 50) {
				 $('#changing-text').html('You set value between 21 and 50 dolars');
			} else if (digitValue > 50 && digitValue <= 80) {
				 $('#changing-text').html('You set value between 51 and 80 dolars');
			} else if (digitValue > 80 && digitValue <= 100) {
				 $('#changing-text').html('You set value between 81 and 100 dolars');
			}
	 });

	 // Set tabindex on slider element and  allow to set value of slider using arrow navigation
	 $('.noUi-handle').attr('tabindex', '0');// set tabindex atrribut in DOM on 0 what ran tabindex on uislider button
	 $('.noUi-handle').on('keyup', function (e) {
			if (e.keyCode === 39) {// determine right arrow on keyboard
				 startSlider.noUiSlider.set(parseInt(startSlider.noUiSlider.get().split('$')[1], 10) + 1);
			}
			if (e.keyCode === 37) {// determine left arrow on keyboard
				 //set is uiSlider value - setting value of slider, 
				 //parseInt changing string to digit,
				 // get is uiSlider value which gets valu of slider,
				 // split is splitting value of slider by $ and create an array
				 // [1] gets value of element of array with index 1
				 // of this value is substract 1
				 startSlider.noUiSlider.set(parseInt(startSlider.noUiSlider.get().split('$')[1], 10) - 1);
			}

	 });


	 //showing payment-method-container after radio input "pay-c" is checked
	 $('input[name=payment-type]').on('change', function () {
			if ($(this).is(':checked') && $(this).val() === "card") {
				 $('.card-details-container').addClass('show');
			} else {
				 $('.card-details-container').removeClass('show');
			}
	 });


	 $('#donate-btn').on('click', function (event) {
			event.preventDefault();
			$('input[type=text]').closest('.input-wrap').removeClass('error-message');

			$('.person-details-container input[type=text]').each(function () {
				 var inputValueLength = $(this).val().trim().length;
				 if (inputValueLength === 0) {
						$(this).closest('.input-wrap').addClass('error-message');
				 }

				 if ($(this).data('validation') === 'name') {
						var inputValue = $(this).val();
						var pattern = /^[a-zA-Z\s]+$/;
						if (!pattern.test(inputValue)) {
							 $(this).closest('.input-wrap').addClass('error-message');
						}
				 }
				 if ($(this).data('validation') === 'email') {
						var inputValue = $(this).val();
						var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
						if (!pattern.test(inputValue)) {
							 $(this).closest('.input-wrap').addClass('error-message');
						}
				 }
				 if ($(this).data('validation') === 'phone') {
						var inputValue = $(this).val();
						var pattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{3}$/;
						if (!pattern.test(inputValue)) {
							 $(this).closest('.input-wrap').addClass('error-message');
						}
				 }
				 if ($(this).data('validation') === 'country') {
						var inputValue = $(this).val();
						var pattern = /^[a-zA-Z\s]+$/;
						if (!pattern.test(inputValue)) {
							 $(this).closest('.input-wrap').addClass('error-message');
						}
				 }
			});

			$('.card-details-container.show input[type=text]').each(function () {
				 var inputValueLength = $(this).val().trim().length;
				 if (inputValueLength === 0) {
						$(this).closest('.input-wrap').addClass('error-message');
				 }

				 if ($(this).data('validation') === 'card-nr') {
						var inputValue = $(this).val();
						var pattern = /^(\d{4}\s){3}\d{4}$/;
						if (!pattern.test(inputValue)) {
							 $(this).closest('.input-wrap').addClass('error-message');
						}
				 }
				 if ($(this).data('validation') === 'card-ex') {
						var inputValue = $(this).val();
						var pattern = /^0[1-9]|1[012]\/{1}\d\d$/;
						if (!pattern.test(inputValue)) {
							 $(this).closest('.input-wrap').addClass('error-message');
						}
				 }
				 if ($(this).data('validation') === 'card-cv') {
						var inputValue = $(this).val();
						var pattern = /^\d{3}$/;
						if (!pattern.test(inputValue)) {
							 $(this).closest('.input-wrap').addClass('error-message');
						}
				 }
				 if ($(this).data('validation') === 'zip-code') {
						var inputValue = $(this).val();
						var pattern = /^\d{4}$/;
						if (!pattern.test(inputValue)) {
							 $(this).closest('.input-wrap').addClass('error-message');
						}
				 }
			});


			var errorsCount = $('.input-wrap.error-message').length;
			if (errorsCount === 0) {
				 $('#donate-form').submit();
			}

	 });
});