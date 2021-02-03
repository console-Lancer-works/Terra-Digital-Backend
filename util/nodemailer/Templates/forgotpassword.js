module.exports = (MailBody) => {
  return `
    <!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
        <style>
            body,
            html {
                margin: 0;
                padding: 0;
                background-color: #fafafa;
            }
    
            .container p {
                margin: 0;
            }
    
            .container {
                padding: 0 10px;
                padding-bottom: 100px;
                background-color: #fafafa;
            }
    
            .wrapper {
                padding-top: 50px;
                max-width: 700px;
                margin: 0 auto;
            }
    
            .wrapper .logo {
                text-align: center;
            }
    
            .wrapper .logo img {
                height: 50px;
            }
    
            .wrapper .content-wrapper {
                margin-top: 10px;
                border-radius: 10px;
                padding: 30px 25px;
                border: 1px solid #cecece;
                background-color: #fff;
            }
    
            .wrapper .content-wrapper .greetings h2 {
                padding-bottom: 15px;
                font-size: 16px;
                color: #333333;
                font-family: 'Roboto', 'Bold';
            }
    
            .wrapper .content-wrapper .greetings p {
                font-size: 14px;
                color: #333333;
                font-family: 'Roboto', 'Regular';
            }
    
            .wrapper .content-wrapper .note {
                font-size: 14px;
                color: #333333;
                font-family: 'Roboto', 'Regular';
            }
    
            .wrapper a.reset-password {
                text-decoration: underline;
            }
    
            .wrapper a {
                cursor: pointer;
                color: #00bfd0;
                font-family: 'Roboto', 'Regular';
                text-decoration: none;
                font-size: 14px;
            }
    
            .wrapper a:hover {
                color: #00bfd0;
            }
    
            .wrapper .content-wrapper .cta {
                padding: 45px 0 25px 0;
                text-align: center;
            }
    
            .wrapper .content-wrapper .cta a {
                color: #fff;
                background-color: #00bfd0;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 3px;
            }
    
            .wrapper .content-wrapper .cta a:hover {
                color: #fff;
            }
    
            .wrapper .content-wrapper .signature {
                padding-top: 35px;
            }
    
            .wrapper .content-wrapper .signature p {
                font-size: 14px;
                padding-bottom: 5px;
                color: #333333;
                font-family: 'Roboto', 'Regular';
            }
    
            .wrapper .email-type {
                padding-top: 5px;
                color: #888888;
                font-size: 14px;
                font-family: 'Roboto', 'Regular';
                float: right;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="wrapper">
                <div class="logo">
                    <img src="{{asset('public/images/logos/'.$logo.'.png')}}">
                </div>
                <div class="content-wrapper">
                    <div class="greetings">
                        <h2>Hello ${MailBody.display_name},</h2>
                    </div>
                    <div class="cta">
                        <a href=${MailBody.verifyLink}>RESET PASSWORD</a>
                    </div>
                    <p class="note">If you are unable to click the above "RESET PASSWORD" button, please copy this URL in your browser : <a href="{{$link}}">${MailBody.verifyLink}</a></p>
                    <div class="signature">
                    <p>Best Regards,</p>
                    <p>${MailBody.domain_name} Team</p>
                    <a href="${MailBody.domain_name}">www.${MailBody.domain_url}</a>
                </div>
                </div>
                <div class="email-type">
                    <p>This is an automated message, please do not reply.</p>
                </div>
            </div>
        </div>
    </body>
    
    </html>
    `;
};
//////////////////////////////////forgotpassword.js  template/////////////////
