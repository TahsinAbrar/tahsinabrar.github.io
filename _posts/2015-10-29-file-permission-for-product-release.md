---
layout: post
comments: true
title: File Permission for project release
---

Before launching a project, it's difficult to check each and every files and directories of the project. It'll be easier if there is any command that will automatically set the same permission for all of the files and directories.

To do this, Open your project root directory in the Terminal ( Ctrl+Alt+T ) and run the following command to reset your file permission:

{% highlight bash %}
sudo find . -type f -exec chmod 644 {} \;
{% endhighlight %}

And to reset  the directory permission :
{% highlight bash %}
sudo find . -type d -exec chmod 755 {} \;
{% endhighlight %}

That's it! Now all the directories within the project get 755 permission and all of the files get 644 permission. Now, you can easily deploy your project without any security hole.