# Demo Application - React and Loopback integration

# Assumptions
- Board would have maximum 4 task lists
- Currently, editing task would provide option to edit the name only.
- Accessibility testing is not done
- Device testing is also not done though DnD library used is device agnostic.
- Board is an independent reusable component
- Project in itself used Board as a component.

# Features
- File layout 
    |- Client
    |   |- build                        -> UI build
    |   |- config                       -> Test & Webpack configuration
    |   |- mocks                        -> Mock file for testing
    |   |- src                          -> Client source folder
    |   |   |- board                    -> Main component
    |   |   |   |- actions              -> Separate action files for all types of actions.
    |   |   |   |- assets               -> Board level assets
    |   |   |   |- components           -> Board, Tasklist, Task, Common components
    |   |   |   |- reducers             -> Reducers are broken down to multiple files
    |   |   |   |- actions_types.js     -> Types of actions
    |   |   |   |- constants.js         -> Some component level constants
    |   |   |   |- selectors.js         -> Selectors to parse through the memoized model
    |   |   |- css                      -> Only reset CSS applied as Global Style
    |   |   |- index.html               ->
    |   |- tests                        -> Currently only board level test
    |- common                           -> Models config files
    |- Server                           -> Loopback server with server side configs and main files

# Practices
- Components are divided into `Container` componets and `UI` components.
- Components are self contained.
- Models are all normalized to make them performant since the nested nature can bring the complexity.
- Memoized selectors to store the redux state.
- Sliced reducers to ease the finding of repective model manipulation.
- Actions are also sliced in the respective files.
- Common components are kept in `common` folder.
- User friendliness is taken care. You can use the dialogs and inputs with keyboard.
- Central handling to show loader when asynchronous request is being made.
- Natural and beautiful DnD provided by React Beautiful DnD library.
- Styled Component is used to create all CSS based components.
- StrongLoop's Loopback is used as nodejs based `Server`. Its a rapid development server which is extensible and comprehensive, all feature packed.
- ESLint is configured to check syntactical errors
- Git Commit hook is also checked for sanctity and format. Linting will be executed for the staged commits.
- Cypress is configured to run automated E2E tests.
- React Testing Library and Jest are configured to perform unit testing.
- Webpack dev server with watch and hot reload is configured.
- Swagger UI gives awesome API Explorer.

# TO DOs
- Reorder with in the same list is not supported by API
- Deleting Task lists
- For now, Server and Client share the same repository. The project should be ideally divided into separate Git repos.

# 3rd Party Libraries
- [React Beautiful DnD Library](https://github.com/atlassian/react-beautiful-dnd)
- [React Redux](https://react-redux.js.org/)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- [Normalizr](https://github.com/paularmstrong/normalizr)
- [React Awesome Modal](https://github.com/shibe97/react-awesome-modal)
- [Axios](https://github.com/axios/axios)
- [Styled Components](https://styled-components.com/docs)
- [React Testing Library](https://github.com/testing-library/react-testing-library)
- [Jest] (https://jestjs.io/en/)
- [Cypress](https://www.cypress.io/)
- [Webpack](https://webpack.js.org/)
- [Loopback](https://loopback.io/)
- [Concurrently](https://github.com/kimmobrunfeldt/concurrently)
and some more...


# Instructions to build code
- Download this repo
- Run the following command in root folder
js```
    npm install
```
- Ideally it should install both server and then client dependencies
- Then run the loopback server and webpack-dev-server in development environment:
js```
    npm run start-dev
```
- The application should open automatically in your browser. But you can still open it:
js```
    http://localhost:8080/
```
- For API explorer, browse:
js```
    http://localhost:3000/explorer
```
- For production build:
js```
    npm run build
```
It should build the bundle in `build` folder.
- For tests, run the following command:
js```
    npm run test
```
- For E2E tests
js```
    npm run cypress:open
```