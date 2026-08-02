import dotenv from "dotenv";
dotenv.config();

export const ResetPasswordTemplate = `

  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset Successful</title>
</head>

<body style="margin:0;padding:0;background:#FAFAFA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAFA;padding:40px 20px;">
<tr>
<td align="center">

<table role="presentation" width="620" cellpadding="0" cellspacing="0" style="max-width:620px;background:#FFFFFF;border-radius:24px;overflow:hidden;border:1px solid #E2E8F0;box-shadow:0 20px 50px rgba(15,23,42,.08);">

<!-- ================= HEADER ================= -->

<tr>
<td align="center" style="padding:48px;background:linear-gradient(135deg,#FF385C,#E02B4C);">

<div style="
width:78px;
height:78px;
background:rgba(255,255,255,.15);
border-radius:20px;
line-height:78px;
font-size:38px;
margin-bottom:20px;">
✅
</div>

<div style="
font-size:32px;
font-weight:700;
color:#FFFFFF;
letter-spacing:.3px;">
CraveCart
</div>

<div style="
margin-top:10px;
font-size:16px;
color:rgba(255,255,255,.9);">
Password Updated Successfully
</div>

</td>
</tr>

<!-- ================= CONTENT ================= -->

<tr>
<td style="padding:50px;">

<h1 style="
margin:0;
font-size:32px;
color:#0F172A;
font-weight:700;">
Your Password Has Been Reset 🎉
</h1>

<p style="
margin:24px 0 0;
font-size:17px;
color:#64748B;
line-height:30px;">

Hello <strong style="color:#FF385C;">{{USERNAME}}</strong>,
</p>

<p style="
margin:18px 0 0;
font-size:16px;
color:#64748B;
line-height:30px;">

Great news! Your <strong style="color:#0F172A;">CraveCart</strong> password has been changed successfully.

Your account is now protected with your new password, and you can securely continue shopping and managing your account.

</p>

<!-- SUCCESS BOX -->

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
margin-top:38px;
background:#ECFDF5;
border:1px solid #10B981;
border-radius:18px;">

<tr>
<td style="padding:28px;text-align:center;">

<div style="font-size:42px;margin-bottom:12px;">
🔐
</div>

<div style="
font-size:22px;
font-weight:700;
color:#10B981;">

Password Updated Successfully

</div>

<div style="
margin-top:12px;
font-size:15px;
line-height:28px;
color:#047857;">

Your new password is now active and your account is secure.

</div>

</td>
</tr>

</table>

<!-- LOGIN BUTTON -->

<table
align="center"
cellpadding="0"
cellspacing="0"
style="margin-top:40px;">

<tr>

<td
align="center"
style="
background:#FF385C;
border-radius:14px;">

<a
href=${process.env.BASE_URL}/login

style="
display:inline-block;
padding:18px 42px;
font-size:17px;
font-weight:600;
color:#FFFFFF;
text-decoration:none;">

Sign In to CraveCart →

</a>

</td>

</tr>

</table>

<!-- SECURITY SECTION -->

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
margin-top:45px;
background:#FFF9E6;
border-left:5px solid #FFB800;
border-radius:14px;">

<tr>
<td style="padding:24px;">

<div style="
font-size:18px;
font-weight:700;
color:#0F172A;
margin-bottom:12px;">

🛡️ Security Reminder

</div>

<div style="
font-size:15px;
line-height:28px;
color:#64748B;">

If you made this change, no further action is required.

If you did <strong>not</strong> reset your password, please contact our support team immediately. Your account security is our highest priority.

</div>

</td>
</tr>

</table>

<!-- TIPS -->

<div style="
margin-top:40px;
padding:28px;
background:#F8FAFC;
border-radius:16px;
border:1px solid #E2E8F0;">

<div style="
font-size:18px;
font-weight:700;
color:#0F172A;
margin-bottom:18px;">

Keep Your Account Safe

</div>

<table width="100%" cellpadding="0" cellspacing="0">

<tr>
<td style="padding-bottom:12px;font-size:15px;color:#64748B;">
✔ Use a strong and unique password.
</td>
</tr>

<tr>
<td style="padding-bottom:12px;font-size:15px;color:#64748B;">
✔ Never share your password with anyone.
</td>
</tr>

<tr>
<td style="padding-bottom:12px;font-size:15px;color:#64748B;">
✔ Sign out from shared or public devices.
</td>
</tr>

<tr>
<td style="font-size:15px;color:#64748B;">
✔ Contact us immediately if you notice suspicious activity.
</td>
</tr>

</table>

</div>

<!-- HELP -->

<div style="
margin-top:40px;
padding-top:28px;
border-top:1px solid #F1F5F9;">

<p style="
margin:0;
font-size:16px;
line-height:30px;
color:#64748B;">

Need assistance?

Our support team is always here to help you.

</p>

</div>

</td>
</tr>

<!-- ================= FOOTER ================= -->

<tr>

<td
align="center"
style="
background:#0F172A;
padding:42px;">

<div style="
font-size:24px;
font-weight:700;
color:#FFFFFF;">

CraveCart

</div>

<p style="
margin:18px 0 0;
font-size:15px;
line-height:28px;
color:#94A3B8;">

Fast. Fresh. Delivered.

</p>

<p style="
margin-top:28px;
font-size:13px;
line-height:24px;
color:#64748B;">

This is an automated security notification from CraveCart.<br>
Please do not reply to this email.

</p>

</td>

</tr>

</table>

<div style="
margin-top:22px;
font-size:13px;
color:#94A3B8;
text-align:center;">

© 2026 CraveCart. All rights reserved.

</div>

</td>
</tr>
</table>

</body>
</html>
`