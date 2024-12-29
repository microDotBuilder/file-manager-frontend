# TODO

- [x] create folder in local directory
- [x] keep track of any folder or file created
- [x] keep track in local json file of all the files and folders created
- [x] keep track in local json file of all the files and folders deleted
- [x] keep track in local json file of all the files and folders modified
- [x] keep track in local json file of all the files and folders moved
- [x] keep track in local json file of all the files and folders renamed

- [x] every minute keep creating the local memory tree
- [x] update the json metadata file every 5 minutes
- [x] for dev phase, create a file called output.txt and write the instructions ,tree created into that file on every iteration.

-[ ] Polling idea fails because of too many file changed.

## TODO issues to fix/improve

- [ ] rather than polling with watcher , can we implement a better way where we
      run the function after every minute and the it recursively creates a new instruction and then updates the json metadata file
- [ ] fix the issue with when we are deleting the file or the whole folder and trying to git clone it again the github run something else
