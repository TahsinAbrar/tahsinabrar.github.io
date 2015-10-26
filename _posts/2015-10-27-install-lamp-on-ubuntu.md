---
layout: post
title: Install LAMP Stack on Ubuntu
---

The acronym of `LAMP` stands for Linux, Apache, MySQL, and PHP. It's straight forward to install LAMP on Ubuntu.

To install apache:

```
sudo apt-get update
sudo apt-get install apache2
```

To install MySQL:

```
sudo apt-get install mysql-server libapache2-mod-auth-mysql php5-mysql
```

During the installation, MySQL will ask you to set a root password. If you miss the chance to set the password while the program is installing, it is very easy to set the password later from within the MySQL shell.

Once you have installed MySQL, we should activate it with this command:

`` sudo mysql_install_db ``

Finish up by running the MySQL set up script:

`` sudo /usr/bin/mysql_secure_installation ``

The prompt will ask you for your current root password. Then the prompt will ask you if you want to change the root password. Go ahead and choose N and move on to the next steps.

It’s easiest just to say Yes to all the options. At the end, MySQL will reload and implement the new changes.



Now, to install `PHP`:

`` sudo apt-get install php5 libapache2-mod-php5 php5-mcrypt ``

Then restart Apache.

`` sudo service apache2 restart ``

Install `PHPMyAdmin`

``` sudo apt-get install phpmyadmin apache2-utils ```

Restart Apache.

``` sudo service apache2 restart ```



Install `PHP` and `curl`

`` sudo apt-get -y install php5-cli curl ``

Install mcrypt and php5-mcrypt

`` sudo apt-get -y install mcrypt php5-mcrypt ``

Enable php5-mcrypt

`` sudo php5enmod mcrypt ``

Install SQLite

`` sudo apt-get install php5-sqlite ``

Enable htaccess in Apache

First enable rewrite using this command:

`` sudo a2enmod rewrite ``

Then restart apache2:

`` sudo service apache2 restart ``

Then go into the sites-available folder:

`` cd /etc/apache2/sites-available ``

Edit the file named default.conf and change AllowOverride none to AllowOverride All. Or, if the Directory part is missing, then put this after DocumentRoot line :

```
<Directory "/var/www/html">
AllowOverride All
</Directory>
```

This will make `.htaccess` work in your server VPS.

This worked on an Ubuntu 14.04.3.