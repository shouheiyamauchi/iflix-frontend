# iflix frontend

### Dependencies
  - Backend to be running (https://github.com/shouheiyamauchi/iflix-backend)
  - Node v8.5.0
  - MongoDb v3.6.0
  - Yarn 1.3.2

### Steps for running frontend APP (must be running backend - see URL above)
  - run backend (see below for steps)
  - git clone git@github.com:shouheiyamauchi/iflix-frontend.git
  - yarn install
  - yarn run dev
  - open http://localhost:3000
  - login as admin (admin::password) to add, edit and delete content

Dummy usernames already created: admin, iflix_user, shouhei, john (all with the password 'password')

### Steps for running backend (dependency for front end)
  - git clone git@github.com:shouheiyamauchi/iflix-backend.git
  - yarn install (or npm install)
  - sudo mongod
  - yarn run localDev (or npm run dev)
  - yarn run localTest

'yarn' command can be replaced with 'npm'

### Steps for running tests
  - brew install watchman
  - yarn run test -> type 'a' to run all tests

### Efficiency Considerations
  - Only call API when necessary (e.g. when displaying a rating call API only when the user clicks on the rating modal)
  - Store data loaded once to avoid multiple calls (ratings, content list)
  - All of this must be considered in conjunction with user experience

### Future Improvements
  - Refactoring of code and some more componentisation
  - Improve the code for rating display so it's not hardcoded
  - Folder structure - separate by types of components (e.g. modals should be in it's own folder)
  - More rigorous testing (didn't make too many due to time constraints)
  - Optimize code for internationalization
  - Better error handling (some places are only console.logging errors due to time constraints)
