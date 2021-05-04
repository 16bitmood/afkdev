# afkdev
**WIP** Remote Desktop Environment.

## Screenshots
![Login](/assets/01.png)
![Main](/assets/02.png)

## Linux Instructions:
* copy `.env.d.example` to `.env.d`
* If using https, generate key.pem and cert.pem files using the instructions in `.env.d/tls.txt`
* Set user configuration in users.json.
    * Generate `hashedPassword` with `echo -n password | sha256sum`
* `npm run install && npm run dev` will start dev server on `http://localhost:3000`

## Acknowledgements:
* Inspiration + linter, autoformatter configs from [x](https://github.com/DustinBrett/x/).