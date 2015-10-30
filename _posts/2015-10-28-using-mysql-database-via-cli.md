---
layout: post
comments: true
title: Using MySQL database via CLI
---

If you're a Unix user, and also a developer, then you're surely love to do stuff with *command line interface (CLI)*. It's fun to work in a command line interface environment.

Don't be afraid. It's easy to use MySQL database for basic operation via command line interface.

To start mysql console, open your terminal by pressing `Ctrl + Alt + T` and write: 
``mysql -u username -p``

Then write your mysql password when prompt. It will open the mysql console.

    Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
    mysql>

After that, in mysql console, you can try these to use basic mysql operations:

  * To show all databases: `show databases;`

  * To select a database from the database list, write: `use <database-name>;`

  * To show tables from the selected database, write: `show tables;`

  * To create a new table in the selected database, write:

  ``CREATE TABLE <table-name> (<field-name> <field-type> (length) );``

  example:
  {% highlight sql %}
  CREATE TABLE customers (
    id INT (11), name VARCHAR(100),
    age INT(11), birthday DATE
  );
  {% endhighlight %}

  * To view the table structure, write: `DESCRIBE <table-name>;`

    example: `DESCRIBE customers;`

  * And, now if you want to close the mysql console, write: `exit;` or `\q;` on the mysql console.

-----------------

These are the basic operations. By the way, you can use all others database queries with the command line.

Now, if you want to backup one of your database with command line, you can use mysqldump.
Open the terminal by pressing `Ctrl+Alt+T` and write:

  {% highlight sql %}
  mysqldump -u username -p db_name > new_file_path_with_name
  {% endhighlight %}

  example: 
  {% highlight sql %}
  mysqldump -u username -p testdb > ~/Desktop/testdb.sql
  {% endhighlight %}

And, if you want to import a file to the database, open the terminal and try:
  {% highlight sql %}
  mysql -u username -p db_name < backup_file.sql
  {% endhighlight %}

That's it! Happy coding!