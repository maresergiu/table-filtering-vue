# User Profile Table

### Overview

I aim of this task is to create a user profile table with pagination and sorting capabilities using the [Vue.js](https://vuejs.org) JavaScript framework. The full list of requirements are shown below.

The data required to populate the table is served by a mock API when the project is running - see [the API documentation](./API_DOCS.md) for further details.

### Requirements

The table must display the following data in columns of the same name:

- User ID
- First Name
- Last Name
- Avatar
- Job Title
- Email
- Username

Additionally the table:

- Must be paginated.
- Must show a maximum of 8 users per page.
- Should be sortable based on the "First Name", "Last Name" and "Username" columns, in ascending and descending order.
  Search for users by full name using a text input.

### Future features

Adding a button that allows deleting a user with a confirmation dialogue.

### Project setup

To start this project you will need `node` installed locally. Version `v16.13.2` was used to create the project - it is recommended that you use the same version.

With node installed, navigate to the root of the project and install the dependencies:

```
npm install
```

The dev server can now be started:

```
npm run serve
```

The web application can be accessed via:

http://localhost:8080/

The API is available via:

http://localhost:3000/users (see [the API documentation](./API_DOCS.md) for further details)

### Tests

The [Vue Test Utils](https://vue-test-utils.vuejs.org/guides/) framework has been included and an example test has been provided. This can be ran with the following command:

```
npm test
```

### Linting

You can lint the project as shown below.

```
npm run pretty
```
