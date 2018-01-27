$(document).ready(function () {
    $("#signinForm").submit(function (e) {
        e.preventDefault();
        console.log(this.action);
        console.log(this.username.value);
        console.log(this.password.value);
        $.post(this.action, $('#signinForm').serialize(),
            function (response, status) {
                console.log('response: ', response);
                if (response == 'Error') {
                    $('#loginErrorMessage').html('Incorrect username or password. Please try again!').show();
                }
                if (response == 'Login Successful') {
                    window.location.replace('/dashboard');
                }
            });
    });
});