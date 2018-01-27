$(document).ready(function () {
    $(".pointsBtn").click(function () {
        var x = parseInt(this.innerHTML);
        var y = parseInt($("#student-points" + this.id).html());
        var z = x + y;
        if (z >= 0) {
            $("#student-points" + this.id).html(z);
        }
    });
    $(".hallPassBtn").click(function () {
        var m = parseInt(this.innerHTML);
        var n = parseInt($("#hallPass" + this.id).html());
        var p = m + n;
        if (p >= 0) {
            $('#hallPass' + this.id).html(p);
            var l = parseInt($("#student-points" + this.id).html());
            if (m > 0) {
                var addPoints = l + 100;
                $("#student-points" + this.id).html(addPoints);
            }
            if (m < 0 && n >= 0) {
                var subPoints = l - 100;
                $("#student-points" + this.id).html(subPoints);
            }
        }
        else {
            return;
        }
    });
    $(".hwPassBtn").click(function () {
        var q = parseInt(this.innerHTML);
        var r = parseInt($("#hwPass" + this.id).html());
        var s = q + r;
        if (s >= 0) {
            $('#hwPass' + this.id).html(s);
            var l = parseInt($("#student-points" + this.id).html());
            if (q > 0) {
                var addPoints = l + 100;
                $("#student-points" + this.id).html(addPoints);
            }
            if (q < 0 && r >= 0) {
                var subPoints = l - 100;
                $("#student-points" + this.id).html(subPoints);
            }
        }
        else {
            return;
        }
    });
    $(".updateValueForm").submit(function (e) {
        e.preventDefault();
        $.post(this.action,
            {
                name: "Donald Duck"
            },
            function (response, status) {
                console.log("response: ", response);
                console.log("Status: ", status);
            });
    });
});