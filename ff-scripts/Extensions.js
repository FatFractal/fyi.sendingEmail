var ff = require("ffef/FatFractal");

var debug_mode = true;

exports.testSendEmail = function() {
    var data = ff.getExtensionRequestData().httpContent;
    print("testSendEmail received " + JSON.stringify(data));
    var r = ff.response();
    r.mimeType = "application/json";
    if (data.html === undefined) data.html = null;
    try {
        var emailData = {
            host:data.host,
            port:data.port,
            auth:data.auth,
            authPort:data.authPort,
            username:data.username,
            password:data.password,
            from:data.from,
            to:data.to,
            bcc:data.bcc,
            subject:data.subject,
            text:data.text,
            html:data.html
        };
        emailData = JSON.parse(JSON.stringify(emailData));
        r.result = emailData;
        print("sendEmail sending " + JSON.stringify(emailData));
        ff.sendEmail(emailData);
        r.statusMessage = "Succeeded";
        r.responseCode = "200";
    } catch (error) {
        var errorText = error;
        try  {errorText = JSON.stringify(error);} catch (ignore) {}
        print("sendEmail caught error " + errorText);
        r.statusMessage = "Failed: " + errorText;
        r.responseCode = "500";
    }
}
