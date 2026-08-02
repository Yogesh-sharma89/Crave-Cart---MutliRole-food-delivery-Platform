import dotenv from "dotenv";
dotenv.config();

export const ForgotPasswordMailTemplate = `
  <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reset Your Password</title>
</head>

<body style="margin:0;padding:0;background:#FAFAFA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#FAFAFA;padding:40px 20px;">
<tr>
<td align="center">

<table role="presentation" cellpadding="0" cellspacing="0" width="620" style="max-width:620px;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #E2E8F0;box-shadow:0 20px 50px rgba(15,23,42,.08);">

<!-- HEADER -->
<tr>
<td align="center" style="padding:50px 40px;background:linear-gradient(135deg,#FF385C,#E02B4C);">

<div style="
width:74px;
height:74px;
background:rgba(255,255,255,.15);
border-radius:18px;
line-height:74px;
font-size:34px;
margin-bottom:18px;">
🔐
</div>

<div style="
color:#ffffff;
font-size:32px;
font-weight:700;
letter-spacing:.3px;">
CraveCart
</div>

<div style="
margin-top:12px;
color:rgba(255,255,255,.88);
font-size:16px;
line-height:28px;">
Secure Password Reset
</div>

</td>
</tr>

<!-- BODY -->

<tr>
<td style="padding:48px;">

<h1 style="
margin:0;
font-size:32px;
color:#0F172A;
font-weight:700;">
Forgot your password?
</h1>

<p style="
margin:20px 0 0;
font-size:16px;
line-height:30px;
color:#64748B;">
Hi,
</p>

<p style="
margin:15px 0 35px;
font-size:16px;
line-height:30px;
color:#64748B;">

We received a request to reset your
<strong style="color:#0F172A;">CraveCart</strong>
password.

Click the button below to create a new password and securely access your account again.

</p>

<!-- BUTTON -->

<table role="presentation" cellspacing="0" cellpadding="0" align="center">
<tr>

<td align="center"
style="
border-radius:14px;
background:#FF385C;">

<a href="${process.env.BASE_URL}/reset-password/{{token}}"

style="
display:inline-block;
padding:18px 42px;
font-size:17px;
font-weight:600;
text-decoration:none;
color:#ffffff;
border-radius:14px;">

Reset Password →

</a>

</td>

</tr>
</table>

<p style="
margin-top:35px;
font-size:15px;
line-height:28px;
color:#64748B;">

Or copy and paste this link into your browser:

</p>

<div style="
word-break:break-word;
padding:18px;
background:#F8FAFC;
border-radius:12px;
font-size:14px;
color:#0F172A;
border:1px solid #E2E8F0;">

 ${process.env.BASE_URL}/reset-password/{{token}}

</div>

<!-- INFO BOX -->

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
margin-top:38px;
background:#FFF0F2;
border-left:5px solid #FF385C;
border-radius:14px;">

<tr>

<td style="
padding:22px;">

<div style="
font-size:16px;
font-weight:600;
color:#0F172A;
margin-bottom:10px;">

Important Security Notice

</div>

<div style="
font-size:15px;
line-height:28px;
color:#64748B;">

• This reset link will expire in <strong>15 minutes</strong>.<br><br>

• If you didn't request a password reset, you can safely ignore this email. Your account remains secure.

</div>

</td>

</tr>

</table>

<!-- HELP -->

<div style="
margin-top:45px;
padding-top:30px;
border-top:1px solid #F1F5F9;">

<p style="
margin:0;
font-size:16px;
line-height:30px;
color:#64748B;">

Need help?

Our support team is always here for you.

</p>

</div>

</td>
</tr>

<!-- FOOTER -->

<tr>

<td style="
background:#0F172A;
padding:42px;
text-align:center;">

<div style="
font-size:22px;
font-weight:700;
color:#ffffff;">

CraveCart

</div>

<p style="
margin:18px 0 0;
color:#94A3B8;
font-size:15px;
line-height:28px;">

Fast. Fresh. Delivered.

</p>

<p style="
margin-top:28px;
font-size:13px;
color:#64748B;
line-height:24px;">

This email was sent automatically from CraveCart.<br>

Please do not reply to this email.

</p>

</td>

</tr>

</table>

<div style="
margin-top:20px;
color:#94A3B8;
font-size:13px;
text-align:center;">

© 2026 CraveCart. All rights reserved.

</div>

</td>
</tr>
</table>

</body>
</html>
`