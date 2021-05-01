# afkdev
**WIP** Remote Desktop Environment.

## Screenshots
![Screenshot 1](/assets/01.jpg)
![Screenshot 4](/assets/04.jpg)
![Screenshot 3](/assets/03.jpg)
![Screenshot 2](/assets/02.jpg)

## Linux Instructions:
* copy `.env.d.example` to `.env.d`
* If using https, generate key.pem and cert.pem files using the instructions in `.env.d/tls.txt`
* Set user configuration in users.json.
    * Generate `hashedPassword` with `echo -n password | sha256sum`
* `npm run dev` will start dev server on `http://localhost:3000`