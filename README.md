# riot - pwa

--------
- `webpack`
- `riot`
- A Riot based progressive app


####################
### Intro		####
####################


### Dev Environment
- Check that `dist` directory is removed from `src/www`
- Do a `npm i` or `yarn`
- Do a `npm start` or `yarn start`
- Go to (`http://localhost:8080/`)[http://localhost:8080/]

### Stage Environment(firebase)
- Run `yarn build`
- Run `cd src/www`
- Run `firebase serve` to look at firebase version on local 
- Run `firebase deploy` (install `firebase-tools` from `npmjs.com`)

### How it performs
- ![Demo](/demo.gif)
- ![Staging URL](https://riot-pwa.firebaseapp.com/)
- ![Lighthouse score](https://i.gyazo.com/d80141afdfffe83d5b415595153bee5f.png)

####################
starter is based on https://github.com/BosNaufal/vue-simple-pwa

### TODOs
- [X] serviceworker to cache data, so that cached data is used on subsequent visits
- [X] cordova wrap the app (same codebase) and make the app run
- [X] Counter example to show state-management
- [X] Push notifications usage
- [X] AppShell sample usage
- [X] Firebase deployment
- [ ] Fetch data from a 3rd party API in one of the components
- [ ] Demonstrate inter-component communication in simplest fashion
- [ ] change of colour as network is lost
- [ ] cache API data as part of HTML itself
- [ ] Test PWA features working in Cordova App
- [ ] Cleanup the multiple `package.json` files
- [ ] Upgrade to latest `babel`, `webpack` and `riotjs` versions
