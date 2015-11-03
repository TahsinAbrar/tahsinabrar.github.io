---
layout: post
comments: true
title: Set Proper permission for upload folder
---

### What are the proper permissions for an upload folder with PHP/Apache?

  The proper permission for an upload folder is `775`.

  But sometimes only giving `chmod 775 -R folders/path` and change ownership of the folder doesn't work when we're trying to upload a file to that `folders/path`. For this, we've to bind the apache `www-data` group with our user.

Before telling how to bind the apache `www-data` group with our existing user, we can review the basic understanding of how to add new user/existing user to a group. If you've the basic understanding, <a href="#www-data"><mark>click here</mark></a> to skip it.

  * Change ownership of a folder: To change the ownership of the folder,

    `chown userName:groupName -R folder/path`.

  * How to Add a new user to a group:

    `sudo adduser user group`

  > <small>Remember this will add a new user to a group.</small>

  * Removing a user from a group:

    `sudo deluser user group`



  The `useradd` command will try to add a new user. To modify an existing user, like adding that user to a new group, use the `usermod` command.

  Try this:

  `sudo usermod -a -G groupName userName`

  The user will need to logout and log back in to see their new group added.

<div id="www-data"></div>
<br/>
  Now, after changing folder permission and changing ownership of the folder, if you can't upload files with the browser, change the folder ownership with apache `www-data` group :

  `sudo chown userName:groupName -R folder/path`

  For me, it is: `sudo chown abrar:www-data -R upload/folder/path`

  > <small>Because my userName is abrar.</small>