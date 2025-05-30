---
title: JWT Bearer Flow in Salesforce
authors: [deep]
tags: [Salesforce, jwt, oauth, api, integration]
---

## Introduction

Integrating external applications with Salesforce often requires secure, seamless authentication. The JWT Bearer Flow is a robust OAuth 2.0 mechanism that enables server-to-server integration without direct user interaction. In this comprehensive guide, you'll learn how to set up JWT authentication for Salesforce, generate the necessary keys and certificates, configure a Connected App, and test the flow using Postman. Instructions are provided for both Windows and macOS environments.

## <!-- truncate -->

## Prerequisites

Before you begin, ensure you have:

- A Salesforce account with permissions to create Connected Apps.
- [Postman](https://www.postman.com/downloads/) installed.
- [OpenSSL](https://www.openssl.org/) installed for generating keys and certificates.

:::tip
On **Windows**, you may need to set the `OPENSSL_CONF` environment variable to point to your OpenSSL configuration file.  
On **macOS**, OpenSSL is typically pre-installed, but you can update it via [Homebrew](https://brew.sh/) if needed.
:::

---

## Step 1: Generate a Private Key and X.509 Certificate

### 1.1 Install OpenSSL

- **Windows:** Download and install OpenSSL from the [official site](https://slproweb.com/products/Win32OpenSSL.html).
- **macOS:** Install via Homebrew:

  ```bash
  brew install openssl
  ```

### 1.2 Generate an RSA Private Key

- **Windows:**

  ```cmd
  set OPENSSL_CONF=C:\Program Files\OpenSSL-Win64\bin\openssl.cfg
  openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
  ```

- **macOS:**

  ```bash
  openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
  ```

### 1.3 Create an Unencrypted Key File

```bash
openssl rsa -passin pass:x -in server.pass.key -out server.key
```

### 1.4 Generate a Certificate Signing Request (CSR)

```bash
openssl req -new -key server.key -out server.csr
```

You will be prompted for organization details. Fill them as appropriate.

### 1.5 Generate the Self-Signed Certificate

```bash
openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
```

:::info
The `server.key` (private key) and `server.crt` (certificate) files are required for the next steps. Keep your private key secure.
:::

---

## Step 2: Create a JWT Connected App in Salesforce

### 2.1 Navigate to Setup

1. Log in to Salesforce.
2. Click the gear icon and select **Setup**.

### 2.2 Create a New Connected App

1. In the Quick Find box, search for **App Manager** and open it.
2. Click **New Connected App**.
3. Fill in the required fields:
   - **Connected App Name:** (e.g., JWT Integration)
   - **API Name:** (auto-filled)
   - **Contact Email:** (your email)
4. Under **API (Enable OAuth Settings)**:
   - Check **Enable OAuth Settings**.
   - Set **Callback URL** to `http://localhost:1717/OauthRedirect`.
   - Check **Use Digital Signatures** and upload your `server.crt` file.
   - Select OAuth Scopes:
     - `api`
     - `refresh_token, offline_access`
5. Click **Save**.

:::info
After saving, Salesforce may take a few minutes to propagate your Connected App settings.
:::

### 2.3 Note Client ID and Secret

- After saving, copy the **Consumer Key** (Client ID) and **Consumer Secret** from the app detail page.

---

## Step 3: Approve the Connected App

1. In **Setup**, search for **Manage Connected Apps**.
2. Click on your Connected App.
3. Click **Edit Policies**.
4. Under **OAuth Policies**, set **Permitted Users** to **Admin approved users are pre-authorized**.
5. Save your changes.

:::warning
If this step is skipped, authentication requests may fail with insufficient permissions.
:::

---

## Step 4: Create a JWT Token

### 4.1 Structure the JWT

A JWT consists of three parts: Header, Payload, and Signature.

- **Header:**

  ```json
  {
  	"alg": "RS256"
  }
  ```

- **Payload:**

  ```json
  {
      "iss": "Your_Client_ID",
      "sub": "user@example.com", // Salesforce username
      "aud": "https://login.salesforce.com",
      "exp": <Current Unix Timestamp + 120>
  }
  ```

  - `iss`: Consumer Key from Salesforce.
  - `sub`: Salesforce username to impersonate.
  - `aud`: Use `https://login.salesforce.com` for production, or `https://test.salesforce.com` for sandbox.
  - `exp`: Expiration time (in seconds since epoch).

:::tip
You can use [jwt.io](https://jwt.io/) to construct and sign your JWT. Use your `server.key` as the private key.
:::

---

## Step 5: Obtain an Access Token Using Postman

### 5.1 Configure the Request

1. Open Postman and create a new **POST** request.
2. Set the URL to:

   ```
   https://login.salesforce.com/services/oauth2/token
   ```

### 5.2 Set Up the Body

- Select **x-www-form-urlencoded**.
- Add the following key-value pairs:

  | Key        | Value                                       |
  | ---------- | ------------------------------------------- |
  | grant_type | urn:ietf:params:oauth:grant-type:jwt-bearer |
  | assertion  | (Paste your generated JWT token here)       |

### 5.3 Send the Request

- Click **Send**.
- If successful, you'll receive a JSON response containing an `access_token`.

:::warning
If you receive an error, double-check your JWT structure, signature, and ensure the Connected App is properly configured and approved.
:::

---

## Step 6: Use the Access Token

With the access token, you can now make authenticated API requests to Salesforce.

### 6.1 Example: Fetch Accounts

1. Create a new **GET** request in Postman.
2. Set the URL to:

   ```
   https://yourInstance.salesforce.com/services/data/vXX.X/sobjects/Account/
   ```

   Replace `yourInstance` and `vXX.X` with your Salesforce instance and API version.

3. In the **Headers** tab, add:

   ```
   Authorization: Bearer <your_access_token>
   ```

4. Click **Send** to execute the request.

---

## Conclusion

You have now set up secure, server-to-server integration with Salesforce using the JWT Bearer Flow. This approach is ideal for backend services and automated integrations, providing robust security without requiring user interaction. If you encounter issues, review each step carefully and consult Salesforce documentation for troubleshooting.

:::info
For production deployments, always safeguard your private keys and restrict access to your Connected App.
:::
