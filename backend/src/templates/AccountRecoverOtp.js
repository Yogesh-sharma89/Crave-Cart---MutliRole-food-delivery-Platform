const AccountRecoveryOtpTemplate = (
  name = "there",
  otp,
  expiryMinutes = 10,
) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Account Recovery</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f7f6f3;
    font-family: Arial, Helvetica, sans-serif;
    color: #1f1f1f;
  "
>

  <!-- Email Wrapper -->
  <table
    role="presentation"
    width="100%"
    cellspacing="0"
    cellpadding="0"
    border="0"
    style="
      width: 100%;
      background-color: #f7f6f3;
      padding: 40px 16px;
    "
  >
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="
            max-width: 600px;
            width: 100%;
            background-color: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
          "
        >

          <!-- Header -->
          <tr>
            <td
              align="center"
              style="
                padding: 40px 30px 30px;
                background: linear-gradient(
                  135deg,
                  #c18a49,
                  #9b672e
                );
              "
            >

              <!-- Lock Icon -->
              <div
                style="
                  width: 64px;
                  height: 64px;
                  line-height: 64px;
                  border-radius: 16px;
                  background-color: rgba(255,255,255,0.18);
                  text-align: center;
                  font-size: 30px;
                  margin-bottom: 18px;
                "
              >
                🔐
              </div>

              <h1
                style="
                  margin: 0;
                  color: #ffffff;
                  font-size: 28px;
                  font-weight: 700;
                  letter-spacing: -0.5px;
                "
              >
                Account Recovery
              </h1>

              <p
                style="
                  margin: 12px 0 0;
                  color: rgba(255,255,255,0.85);
                  font-size: 15px;
                  line-height: 24px;
                "
              >
                Secure verification for your account
              </p>

            </td>
          </tr>


          <!-- Content -->
          <tr>
            <td
              style="
                padding: 40px 32px;
              "
            >

              <h2
                style="
                  margin: 0 0 16px;
                  font-size: 22px;
                  font-weight: 700;
                  color: #1f1f1f;
                "
              >
                Hi ${name}, 👋
              </h2>


              <p
                style="
                  margin: 0;
                  font-size: 16px;
                  line-height: 26px;
                  color: #5f5f5f;
                "
              >
                We received a request to recover your account.
                Use the verification code below to continue.
              </p>


              <!-- OTP Section -->
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  margin: 30px 0;
                "
              >
                <tr>
                  <td
                    align="center"
                    style="
                      background-color: #faf7f2;
                      border: 1px solid #eadfce;
                      border-radius: 16px;
                      padding: 24px;
                    "
                  >

                    <p
                      style="
                        margin: 0 0 12px;
                        font-size: 13px;
                        font-weight: 600;
                        color: #8a6a47;
                        text-transform: uppercase;
                        letter-spacing: 1.5px;
                      "
                    >
                      Your Verification Code
                    </p>


                    <div
                      style="
                        font-size: 38px;
                        font-weight: 700;
                        letter-spacing: 10px;
                        color: #a87335;
                        font-family: monospace;
                      "
                    >
                      ${otp}
                    </div>

                  </td>
                </tr>
              </table>


              <!-- Expiry Notice -->
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
              >
                <tr>
                  <td
                    style="
                      background-color: #fff8e8;
                      border-left: 4px solid #c18a49;
                      border-radius: 8px;
                      padding: 14px 16px;
                    "
                  >

                    <p
                      style="
                        margin: 0;
                        font-size: 14px;
                        line-height: 22px;
                        color: #6d573b;
                      "
                    >
                      ⏳ This verification code will expire in
                      <strong>${expiryMinutes} minutes</strong>.
                    </p>

                  </td>
                </tr>
              </table>


              <p
                style="
                  margin: 28px 0 0;
                  font-size: 14px;
                  line-height: 24px;
                  color: #777777;
                "
              >
                If you didn't request account recovery, you can
                safely ignore this email. Your account remains secure.
              </p>

            </td>
          </tr>


          <!-- Security Section -->
          <tr>
            <td
              style="
                padding: 24px 32px;
                background-color: #fafafa;
                border-top: 1px solid #eeeeee;
              "
            >

              <p
                style="
                  margin: 0;
                  font-size: 13px;
                  line-height: 22px;
                  color: #777777;
                "
              >
                🔒 <strong>Security reminder:</strong>
                Never share this verification code with anyone.
                Our team will never ask you for your OTP.
              </p>

            </td>
          </tr>


          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="
                padding: 28px 20px;
                background-color: #f3f1ed;
              "
            >

              <p
                style="
                  margin: 0;
                  font-size: 13px;
                  color: #888888;
                "
              >
                © ${new Date().getFullYear()} Your Company.
                All rights reserved.
              </p>


              <p
                style="
                  margin: 8px 0 0;
                  font-size: 12px;
                  color: #aaaaaa;
                "
              >
                This is an automated security email.
                Please do not reply.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

export default AccountRecoveryOtpTemplate;