---
layout: post
comments: true
title: Setting up Ubuntu for Web Development
---


* Update apt cache : ``sudo apt-get update``

* Upgrade apt cache : ``sudo apt-get upgrade``

* **Install Guake Terminal :**

  If you love to work in terminal, then you'll must love Guake terminal. By pressing <code>F12</code>, you can easily turn on/off the terminal.

  To install guake terminal, run: ``sudo apt-get -y install guake``

  - **Add Guake to StartUp Applications**

    After installing Guake terminal, it'll not start automatically on boot. To start Guake terminal when the machine boot:

    `Goto System -> Preferences -> Startup Applications`

    or  `Dash (Window button) -> Type: Startup Applications`

    The Startup Application Preferences window opens. Then, click in **Add**, give a Name for the Application in the Name field (`"Guake"` it's enough), and then type `guake` in the command field and click **Add**.

    ![On Startup load Guake Terminal](https://googledrive.com/host/0B1rwm2Ee_JqOR05TWHVkYkJwTW8)

    Then close the Startup Application Preferences window and restat the machine, now Guake should start automatically on login.

    Or, if you want to do it with command prompt, then:

    ``sudo cp /usr/share/applications/guake.desktop /etc/xdg/autostart/``


* **Install dotfiles**

  If you want to personalize your system, then you can use any of the dotfiles available in github. I'm a fan of [mathiasbynens/dotfiles](https://github.com/mathiasbynens/dotfiles).

  To use it (in a single command):

  {% highlight bash %}
    git clone https://github.com/mathiasbynens/dotfiles.git && cd dotfiles && source bootstrap.sh
  {% endhighlight %}

* **Install Remarkable (Markdown Editor)**

  To directly download the Remarkable Editor, go to their [official website](https://remarkableapp.github.io/).

  Or, if you want to download it with terminal, then open the terminal:

  ``wget https://remarkableapp.github.io/files/remarkable_1.62_all.deb``

  Then install the .deb file on your system.

* Install Unity Tweak Tool

  ``sudo apt-get -y install unity-tweak-tool``

* Install Unrar

  ``sudo apt-get -y install unrar``

* Install Vim Editor

  ``sudo apt-get -y install vim``

* Install Git

  ``sudo apt-get -y install git``

* **Setup SSH key :**

  Open the terminal and write:  ``ssh-keygen``

  Press `Enter` for options. If you want to add a passphrase for the key, then insert the passphrase, otherwise skip it by pressing `Enter`.

  To copy the public SSH key to the clipboard, run:

  ``xclip -sel clip < ~/.ssh/id_rsa.pub``

  If you want to check if any SSH key exists, then on terminal:

    ``ls -al ~/.ssh``

  > It will lists the files in your .ssh directory, if they exist.


* **Install LAMP Stack :**
  Check this [tutorial](http://tahsinabrar.github.io/2015/10/27/install-lamp-on-ubuntu/).

* **Install Bower**

  ``npm install -g bower``

  > Bower requires [nodejs](https://nodejs.org/) and git pre-installed on the system.

* **Install Composer Globally :**

  Run these commands to globally install `composer` on your system:

  `curl -sS https://getcomposer.org/installer | php`

  `mv composer.phar /usr/local/bin/composer`

  > Note: If the above fails due to permissions, run the mv line again with `sudo`.

  To check if composer successfully installed on your system,

  run : `composer` in terminal and you'll see a list of helpful commands.