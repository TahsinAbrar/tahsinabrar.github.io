---
layout: post
comments: true
title: Create Laravel Project in an existing directory on Ubuntu
---

Installing Laravel with laravel global command is too easy.<br/>
We just need to do `laravel new projectName`. That's it!

But what will happen if we create a new folder first and then try laravel global command to get the laravel files within that directory?

It is not possible in a single command, because `laravel new` need a `name` parameter and it'll create a new folder within the directory. To install laravel within the existing current directory, we need to install laravel first into a new folder and then move all the files from that directory to new directory.

That means we need more than one command to do it. That's why I write a script that will create new laravel project within an existing directory. Thus, you can do all the process only by running the script. <br/>

Here is a script that will install laravel in your existing directory:

<script src="https://gist.github.com/TahsinAbrar/fc67c3ef50da63e43da9.js"></script>

<br/>
Now, If you want to create an alias for running this shell script file, you can do that by editing `~/.bashrc` or `~/.bash_profile` or `~/.aliases` file.

Add this line for creating an aliases: (If the `laravel.sh` file exists in the `~` directory. )

`alias laranew="~/laravel.sh"`

Then just run `laranew` to anywhere you want to install laravel.