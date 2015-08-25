// Customer form validators

// http://twitterbootstrap.org/bootstrap-form-validation
// http://jqueryvalidation.org/

    var validator = $("form").validate({
        rules: {
            debug: true,

            catName: {
                required: true,
                required: true
            },

            imageUrl: {
                minlength: 6,
                required: true
            },

            clickCount: {
                required: true,
                min: 0,
                digits: true
            }

        },
        highlight: function(element) {
            console.log('bad');
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        success: function(element) {
            console.log('good');
            element
                .text('OK!').addClass('valid')
                .closest('.form-group').removeClass('has-error').addClass('has-success');
        },

        submitHandler: function(form) {
            console.log($(form).find('input[name="catName"]').val());
            validator.resetForm();
            form.submit();
        }
    });