---
layout: post
comments: true
title: Create Virtual Host on Ubuntu
---

Suppose, You want to create a virtual host for your laravel project like `project.dev`. To create a virtual host for a project, you need to follow the steps below:

For Ubuntu LAMP, Open `/ete/apache2/sites-available/00-default.conf` and add this:

Or,  create a new file i.e. `/etc/apache2/sites-available/project.dev.conf` and insert the snippet:

```
<VirtualHost *:80>
    ServerAdmin admin@admin.com
    DocumentRoot /var/www/html/project/public
    ServerName  project.dev

    <Directory /var/www/html/project/public>
          Options Indexes FollowSymLinks
         AllowOverride All
          Require all granted
    </Directory>
</VirtualHost>
```

Then open `/etc/hosts` file, and add this line under localhost line:

> `127.0.0.1     project.dev`

If you create a new file in `/etc/apache2/sites-available` directory, then you need to enable the `conf` file by:

> `sudo a2ensite project.dev.conf`

By the way, if you didn't enable `htaccess` in apache yet, then:
> `sudo a2enmod rewrite`
