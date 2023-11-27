<h1 align="center">Risena Backend</h1>
Simple backend implementation using nodejs.
Don't forget to prepare some tools to run this backend:

![Screenshot 1](images/code.png)

# Install NodeJS
for Windows systems 
- Please go to the official website page https://nodejs.org/en/download/current

for Linux systems
- Ubuntu / Debian
  ```sudo apt-get install nodejs```
- Arch
  ```sudo pacman -Sy nodejs```

# Install module
Install the module using npm. Don't forget to install NPM on your system
- node-postgres -> https://www.npmjs.com/package/pg
  ```
  npm install pg
  ```
- multer (middleware for handling multipart/form-data) -> https://www.npmjs.com/package/multer
  ```
  npm install multer
  ```
- uuid -> https://www.npmjs.com/package/uuid
  ```
  npm install uuid
  ```
- slugify -> https://www.npmjs.com/package/slugify
  ```
  npm install slugify
  ```

- Download postman for interactive with server backend visit site: https://www.postman.com/downloads/
Download and install postgresql
- for windows
  install pgadmin4 -> https://www.pgadmin.org/download/pgadmin-4-windows/
- for linux
  - Install Postgresql
    - Ubuntu / Debian
      https://www.postgresql.org/download/linux/ubuntu/
    
    - Arch
      ```
      sudo pacman -S postgresql
      ```
      Start the PostgreSQL server by using systemctl command.
      ```
      sudo systemctl start postgresql
      ```
      ```
      sudo systemctl status postgresql
      ```
  - Install PgAdmin4
    - Ubuntu / Debian -> https://www.pgadmin.org/download/pgadmin-4-apt/
        ```
        #
        # Setup the repository

        # Install the public key for the repository (if not done previously):
        curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg

        # Create the repository configuration file:
        sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list && apt update'

        #
        # Install pgAdmin
        #

        # Install for both desktop and web modes:
        sudo apt install pgadmin4

        # Install for desktop mode only:
        sudo apt install pgadmin4-desktop

        # Install for web mode only: 
        sudo apt install pgadmin4-web 

        # Configure the webserver, if you installed pgadmin4-web:
        sudo /usr/pgadmin4/bin/setup-web.sh
        ```
    - Arch Linux
      For Arch Linux, we use a web application from Python, installation via pip -> https://pypi.org/project/pgadmin4/
        ```
        pip install pgadmin4
        ```
      Note: You must be root or admin to install pgadmin4 with pip and run it as root ```sudo pgadmin4```
