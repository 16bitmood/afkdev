# afkdev
**WIP** Remote Desktop Environment.

# Linux Instructions:
* copy `.env.d.example` to `.env.d`
* If using https, generate key.pem and cert.pem files using the instructions in `.env.d/tls.txt`
* Set user configuration in users.json.
    * Generate `hashedPassword` with `echo -n password | sha256sum`
* `npm run dev` will start dev server on `http://localhost:3000`