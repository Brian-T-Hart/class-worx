$(document).ready(function () {
    $("#loginLink").click(function () {
        $("#registerDiv").hide();
        $("#loginDiv").show();
    });

    $("#registerLink").click(function () {
        $("#loginDiv").hide();
        $("#registerDiv").show();
    });

    $("#signinForm").submit(function (e) {
        e.preventDefault();

        $.post(this.action, $('#signinForm').serialize(),
            function (response, status) {
                if (response === 'Error') {
                    $('#loginErrorMessage').html('Incorrect username or password.<br> Please try again!').show();
                }

                if (response === 'Login Successful') {
                    window.location.replace('/dashboard');
                }
            }
        );
    });

    $("#registerForm").submit(function (e) {
        e.preventDefault();

        if (this.password.value === this.password2.value) {    
            $.post(this.action, $('#registerForm').serialize(),
                function (response, status) {
                    if (response === 'Error') {
                        $('#registerErrorMessage').html('A user with that email already exists.').show();
                    }

                    if (response === 'Registration successful') {
                        window.location.replace('/account/login');
                    }
                }
            );
        }

        else {
            $('#registerErrorMessage').html('The passwords do not match.').show();
        }
    });
});