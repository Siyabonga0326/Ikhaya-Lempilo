$(document).ready(function() {

    (function($) {
        "use strict";

        // Custom validation method to check the answer
        jQuery.validator.addMethod('answercheck', function(value, element) {
            return this.optional(element) || /^\bcat\b$/.test(value)
        }, "type the correct answer -_-");

        // Validate contactForm
        $(function() {
            $('#contactForm').validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2
                    },
                    subject: {
                        required: true,
                        minlength: 4
                    },
                    number: {
                        required: true,
                        minlength: 5
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    message: {
                        required: true,
                        minlength: 20
                    }
                },
                messages: {
                    name: {
                        required: "Please enter your name",
                        minlength: "Your name must consist of at least 2 characters"
                    },
                    subject: {
                        required: "Please enter a subject",
                        minlength: "Your subject must consist of at least 4 characters"
                    },
                    number: {
                        required: "Please enter your phone number",
                        minlength: "Your phone number must consist of at least 5 digits"
                    },
                    email: {
                        required: "Please enter a valid email address",
                        email: "Please enter a valid email address"
                    },
                    message: {
                        required: "Please enter a message",
                        minlength: "Your message must be at least 20 characters long"
                    }
                },
                submitHandler: function(form) {
                    // Modify the message field to be "Message Sent"
                    $('#contactForm #message').val("Message Sent");

                    // Submit the form data
                    $(form).ajaxSubmit({
                        type: "POST",
                        data: $(form).serialize(),
                        url: "contact_process.php", // Ensure this is your processing script
                        success: function() {
                            $('#contactForm :input').attr('disabled', 'disabled');
                            $('#contactForm').fadeTo("slow", 1, function() {
                                $(this).find(':input').attr('disabled', 'disabled');
                                $(this).find('label').css('cursor', 'default');

                                // Show the success alert
                                $('.alert-success').fadeIn().text('Your message has been successfully sent!');
                                
                                // Optionally, hide the form and show the success modal
                                $('.modal').modal('hide');
                                $('#success').modal('show');
                            });
                        },
                        error: function() {
                            $('#contactForm').fadeTo("slow", 1, function() {
                                $('#error').fadeIn();
                                $('.modal').modal('hide');
                                $('#error').modal('show');
                            });
                        }
                    });
                }
            });
        });

    })(jQuery);
});
