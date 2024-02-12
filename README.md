# Note Taker Starter Code - uriHW11ExpressNotes
uri bootcamp HW 11 OOP Express Note Taker with Routes and Heroku Deployment - MJS Due 2.8.24
Michael Sheliga - This repo is for the University of Richmond (URI) coding bootcamp.   

## Link to Repo, Screenshot(s) and/or Video(s)
Link to GitHub Repo: https://github.com/msheliga1/uriHW10OOPLogoGenerator    
<!---  Link to deployed github.io site. https://msheliga1.github.io/uriHW9NodeReadmeGen --->  
Link to logo.svg: https://github.com/msheliga1/uriHW10OOPLogoGenerator/blob/main/examples/logo.svg    
Bonus Link to html file (viewable in firefox) with SVG Logo!! : https://github.com/msheliga1/uriHW10OOPLogoGenerator/blob/main/examples/logo.html     
Link to Video on Google Drive: https://drive.google.com/file/d/1nLvEaC9at3JhJc0knj-ZJ8N_nNKHrIT9/view?usp=sharing  
Link to Video on GitHub [Link](./examples/hw10LogoGenSheliga.webm)   Note that this video may be too large to play in GitHub, so you will need to download and play from your computer. WindowsMediaPlayer worked for me.   

[Link to Acceptance Criteria ](#acceptance-criteria)   

## Project Goals     
Use node, inquirer and Object Oriented Inherited classes  to create an SVG log usingn answers to inquirer prompts.  

========================================================   
## Technical Project Details    
========================================================    
## Github:   
    Create Repo (github, repositories => New)   
        - Dont Make this a shared repo.  
    Copy directories and sample files from prior project (or create from scratch).  
        -- No starter code. No need for copying one file at a time via command line.  
        -- Alternate: Go to Demo (root) folder, download zip, moving to local repo, unzip - likely fastest method.     
        -- It seems that one may (a) clone the starter repo to your local machine (inside hw#) (b) change its name, (c) create a gitHub repo preferably with the same name (d) add a second remote with "git add remote <new_name> <path to new gitHub repo>  (e) edit, add and commit a sample file (f) push to the new gitHub repo (git push new_name main). 
    OR ... create HTML, Node, Develop, CSS and javascript, etc. from scratch, and copy sample files ... worked well.
        Branches (Optional for single programmer projects)  
        - Could do work in branches. (new branch inside gitHub)    
        - All branch names will begin with the initials of the main person working on the branch.  
        - Must update local repo after adding a branch  
        - Switch to branch: From cmd line git switch <branchname>   
        - Once changes committed, git push origin <branchname>  
            - for pushing to remote test branch: git push origin local_branch:remote_branch  
        - Issue a pull request in gitHub.  
        - Click "Pull Requests" in top menu bar (3rd from left).  
        - Click "review Required" in small font below pull request name.  
        - You may approve your own request.  
    Clone to local machine (Copy https, then git clone paste).    
    Create a nice long READ.md file!!  (Modify prior projects.)   
    NPM: Do "npm init --y" BEFORE "npm install" to avoide ENOENT err.
        Do "npm install inquirer@8.2.4" (with old version) to avoid require error.
        Jest: Seem to need to hand edit package.json so "test" is "jest".  Also NPM install jest --save-dev. npm run test.
    Commit and push files back to gitHub/branch. (For multi-programming: Issue pull request, approve, merge).  
    Deploy code (Settings...CodeAndAnimation->Pages on left, GitHub Pages->Branch->main, save)  
        - Deployed code name always msheliga1/github.io/RepoName !!  
    Make Sure it Works   
    Insert Video and/or Screenshot X2 of deployment into readme file. 
  
## Tools and Technologies Used   
    Github - Branches not needed, but could use.  
        - GitIgnore to keep NPM libraries out of gitHub repo.  
    NPM - Node Package Manager  - npm init --y before npm install
        fs - fileSystem    
        inquirer - Used for prompts (text, list, checkboxes, editor, etc.)   
    Jest - unit testing  
    Heroku - used to deploy the repo (and hopefully avoid the video)
    Agile - Try to assign a little work at a time.   

## Acceptance Criteria   
-----------------------   
Write and save notes
- open the Note Taker => get a landing page with a link to a notes page
click on the link to the notes page, presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
- enter a new note title and the note’s text
THEN a "Save Note" button and a "Clear Form" button appear in the navigation at the top of the page
click on the Save button THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes and the buttons in the navigation disappear
WHEN I click on an existing note in the list in the left-hand column
    THEN that note appears in the right-hand column and a "New Note" button appears in the navigation
WHEN I click on the "New Note" button in the navigation at the top of the page
    THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column and the button disappears
