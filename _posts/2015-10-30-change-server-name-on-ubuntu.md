---
layout: post
title: Change Server Name on Ubuntu
---

When we install ubuntu on our System, it shows as `userName@serverName`

The default *server/computer* name was set when you were installing Ubuntu. You can easily change it to whatever you want in both Desktop & Server by editing the hosts and hostname files. 

    To do this temporarily until next boot, follow the instructions:

Press `Ctrl +Alt + t` on keyboard to open the terminal. When it opens, run the below command:

`sudo hostname NEW_NAME_HERE`

This will temporarily change the hostname until next reboot. The change won’t be visible immediately in your current terminal. You can start a new terminal to see the new temporary hostname.


    To change the name permanently,
    run the following command to edit the host files:

`sudo gedit /etc/hostname /etc/hosts` 

For Ubuntu server without a GUI, run `sudo vi /etc/hostname` and `sudo vi /etc/hosts` and edit them one by one. In both files, change the name to what you want and save them.

Finally, restart your computer to apply the changes.