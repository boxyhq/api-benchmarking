import { default as jackson } from "@boxyhq/saml-jackson";

const jacksonOptions = {
  externalUrl: "https://my-cool-app.com",
  samlAudience: "https://saml.boxyhq.com",
  samlPath: "/sso/oauth/saml",
  oidcPath: "/sso/oauth/oidc",
  db: {
    engine: "sql",
    type: "postgres",
    // Remember to update db.url
    url: "postgres://postgres:postgres@localhost:5432/postgres",
  },
  clientSecretVerifier: "TOP-SECRET",
  openid: {
    jwtSigningKeys: { private: "PRIVATE_KEY", public: "PUBLIC_KEY" },
    jwsAlg: "RS256",
  },
  boxyhqLicenseKey: "dummy-license",
  noAnalytics: true,
};

async function insert1Mrecords() {
  const { connectionAPIController, close } = await jackson(jacksonOptions);

  //  TOTAL_RECORDS = 1000000;
  const PRODUCT_COUNT = 10;
  const RECORDS_PER_PRODUCT = 100000;
  const PRODUCT_ARRAY = [];
  // generate 10 different products
  for (let i = 1; i <= PRODUCT_COUNT; i++) {
    PRODUCT_ARRAY.push(`product_${i}`);
  }

  for (let i = 1; i <= PRODUCT_COUNT; i++) {
    const PRODUCT = PRODUCT_ARRAY[i - 1];
    console.log(`inserting records for`, PRODUCT);
    for (let j = 1; j <= RECORDS_PER_PRODUCT; j++) {
      const connection = {
        defaultRedirectUrl: "http://localhost:3366/login/saml",
        redirectUrl: ["http://localhost:3366"],
        tenant: "boxyhq.com",
        product: PRODUCT,
        name: "",
        description: "",
        forceAuthn: false,
        rawMetadata: `<md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" entityID="https://saml.example.com/entityid-${i}-${j}" validUntil="2034-01-11T06:02:17.966Z">
          <md:IDPSSODescriptor WantAuthnRequestsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
            <md:KeyDescriptor use="signing">
              <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                <ds:X509Data>
                  <ds:X509Certificate>MIIC4jCCAcoCCQC33wnybT5QZDANBgkqhkiG9w0BAQsFADAyMQswCQYDVQQGEwJV
        SzEPMA0GA1UECgwGQm94eUhRMRIwEAYDVQQDDAlNb2NrIFNBTUwwIBcNMjIwMjI4
        MjE0NjM4WhgPMzAyMTA3MDEyMTQ2MzhaMDIxCzAJBgNVBAYTAlVLMQ8wDQYDVQQK
        DAZCb3h5SFExEjAQBgNVBAMMCU1vY2sgU0FNTDCCASIwDQYJKoZIhvcNAQEBBQAD
        ggEPADCCAQoCggEBALGfYettMsct1T6tVUwTudNJH5Pnb9GGnkXi9Zw/e6x45DD0
        RuRONbFlJ2T4RjAE/uG+AjXxXQ8o2SZfb9+GgmCHuTJFNgHoZ1nFVXCmb/Hg8Hpd
        4vOAGXndixaReOiq3EH5XvpMjMkJ3+8+9VYMzMZOjkgQtAqO36eAFFfNKX7dTj3V
        pwLkvz6/KFCq8OAwY+AUi4eZm5J57D31GzjHwfjH9WTeX0MyndmnNB1qV75qQR3b
        2/W5sGHRv+9AarggJkF+ptUkXoLtVA51wcfYm6hILptpde5FQC8RWY1YrswBWAEZ
        NfyrR4JeSweElNHg4NVOs4TwGjOPwWGqzTfgTlECAwEAATANBgkqhkiG9w0BAQsF
        AAOCAQEAAYRlYflSXAWoZpFfwNiCQVE5d9zZ0DPzNdWhAybXcTyMf0z5mDf6FWBW
        5Gyoi9u3EMEDnzLcJNkwJAAc39Apa4I2/tml+Jy29dk8bTyX6m93ngmCgdLh5Za4
        khuU3AM3L63g7VexCuO7kwkjh/+LqdcIXsVGO6XDfu2QOs1Xpe9zIzLpwm/RNYeX
        UjbSj5ce/jekpAw7qyVVL4xOyh8AtUW1ek3wIw1MJvEgEPt0d16oshWJpoS1OT8L
        r/22SvYEo3EmSGdTVGgk3x3s+A0qWAqTcyjr7Q4s/GKYRFfomGwz0TZ4Iw1ZN99M
        m0eo2USlSRTVl7QHRTuiuSThHpLKQQ==
        </ds:X509Certificate>
                </ds:X509Data>
              </ds:KeyInfo>
            </md:KeyDescriptor>
            <md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</md:NameIDFormat>
            <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://mocksaml.com/api/saml/sso"/>
            <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://mocksaml.com/api/saml/sso"/>
          </md:IDPSSODescriptor>
        </md:EntityDescriptor>`,
      };
      await connectionAPIController.createSAMLConnection(connection);
    }
  }
  await close();
}

module.exports = { insert1Mrecords };
