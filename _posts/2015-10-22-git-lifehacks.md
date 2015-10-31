---
layout: post
comments: true
title: Working with Git - Git LifeHacks
---

### Git Basic:

* To add all the changes for commit : `git add -A`

* For commit : `git commit -m "Your commit message"`

* For commit with all the changes in a single line :

  `git commit -am "Your commit message"`

  <small>With this, you don't need to write `git add -A`</small>

* To push from the remote : `git push origin branchName`

    > <small>Just for understanding,</small>
    >
    > <small>`origin` is an alias on your system for a particular remote repository. It's not actually a property of that repository.</small>
    >
    > <small>By doing  `git push origin branchname`</small>
    >
    > <small>you're saying to push to the origin repository. There's no requirement to name the remote repository origin: in fact the same repository could have a different alias for another developer.</small>
    >
    > <small>Remotes are simply an alias that store the url of repositories. You can see what url belongs to each remote by using</small>
    >
    > <small>`git remote -v`</small>

* To show the changes that you made after the last commit, run : `git diff`

* To show all the previous commits in terminal, run: `git log`

* To show all the previous commits messages only in terminal , run:

  `git log --oneline`

  <small>Display commit with graph tree: `git log --oneline --graph`</small>

* To show all commits with reference log, run: `git reflog`

* To show only few of the previous commits in terminal, run:

  `git log -<number>` i.e. `git log -2` for last two commits.

* To remove a file from git repo, run : `git rm filename`

* To move/rename a file, run : 

  `git mv current/file/path new/path/of/file`

* To clean the current working directory from the last commit,

  run: `git clean -f`

-------------------------------------------------------

 Advanced Git:
--------------
  <br/>

* #### How to reference a commit to the issue (Using Smart commit) ?
  <br/>
  When commit, just include `#commit IssueNo` with the commit.

  i.e. `git commit -m "You commit message" #comment Issue-No`

  or, `git commit -m "Issue-No: You commit message" #comment Issue-No`

  <br/>

* #### How to push a new, empty branch in remote?

  If your repo is still empty, you might try and create an empty commit, to have something to push:

  `git commit --allow-empty -m "initial commit"`

  Then  `git push -u origin branchName`

  <br/>

* #### How to add a remote branch url?
  <br/>
  To add remote branch:
  `git remote add origin <remote-url>`

  or, to add another remote branch alongside with the `origin`,

  run:  `git remote add app <remote-url>`

    <small><strong>N.B.</strong> Here `app` can be any name.</small>

  To change the remote url:

  `git remote set-url <appname> <new-remote-url>`

  i.e.

  `git remote set-url origin https://github.com/laravel/laravel.git`

<br/>

* #### How to Delete a branch ?
  `git branch -d <branchname>`

  Forcefully delete: `git branch -D <branchname>`

  <br/>

* #### How to create a new branch from the existing code ?
  `git checkout -b <newBranchName>`

  <br/>

* #### How to Delete Last Git Commit ?
  <br/>
  If you have committed junk but not pushed,

  `git reset --soft HEAD~1` will do the work.

  > <small>If you want to get rid of any changes to tracked files in the working tree since the commit before head use `--hard` instead.</small>

  <br/>
  Now if you already pushed and someone pulled which is usually my case, you can't use git reset. You can however do a git revert,

  `git revert HEAD`

  This will create a new commit that reverses everything introduced by the accidental commit.

  > <small>**N.B.** Remember, `git revert` will not remove your last commit. It will just create another new commit by fixing the last commit.</small>

  <br/>
  To delete the git commit from remote branch completely, you've to use `git rebase`

  i.e. `git rebase -i <commit-number>`

  <br/>

* #### How to remove a file from the git stage ?

  If you do `git add filename`, the file will be in stage. So, to remove the file from stage, run:

  `git checkout filename`

* #### Git Stash
  You're in the middle of some changes but something comes up that you need to jump over to, like a so-urgent-right-now bugfix, but don't want to commit or lose your current edits. `git stash` is there for you.

  - Run: `git stash` to make the working repository clean.
    And It will then leave you at the state of the last commit.

  - Run: `git stash pop` or `git stash apply` to bring back the stashed code into the working directory.

  - Run: `git stash list` to show the lists of stash items.