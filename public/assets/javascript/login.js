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
        console.log(this.action);
        console.log(this.username.value);
        console.log(this.password.value);
        $.post(this.action, $('#signinForm').serialize(),
            function (response, status) {
                console.log('response: ', response);
                if (response == 'Error') {
                    $('#loginErrorMessage').html('Incorrect username or password.<br> Please try again!').show();
                }
                if (response == 'Login Successful') {
                    window.location.replace('/dashboard');
                }
            });
    });
});