# API Documentation

For the purposes of this assessment a mock API has been provided. The data is sourced from the `db.json` file in the root of this project.

**Note**: Do NOT modify the `db.json` file directly.

## Endpoints

While the project is running the API is available at [http://localhost:3000](http://localhost:3000/users). Two endpoints are provided:

### 1. Users

Returns basic information about a user - User ID, email address and username.

```
GET /users
```

Example response:

```json
[
    {
        "id": 1,
        "email": "lhehir0@youtu.be",
        "username": "lhehir0"
    },
    {
        "id": 2,
        "email": "gwolstenholme1@eepurl.com",
        "username": "gwolstenholme1"
    },
    ...
]
```

Individual users can be fetched using a path parameter containing user ID:

`GET /users/5`

### 2. Profiles

Returns additional user information - First name, last name, avatar and job title.

Performing a GET with no parameters returns all profiles.

Not all fields may be present.

`GET /profiles`

```json
    {
        "userId": 1,
        "first_name": "Lew",
        "last_name": "Hehir",
        "avatar": null,
        "job_title": null
    },
    {
        "userId": 2,
        "first_name": "Gilberta",
        "last_name": "Wolstenholme",
        "avatar": null,
        "job_title": null
    }
    ...
```

Individual profiles can be fetched by user ID:

```
GET /profiles?userId=2
```

## Additional information

Both endpoints accept the following additional parameters:

### Paginate

By providing the `_page` query parameter, paginated results will be returned:

```
GET /profiles?_page=2
```

The default number of items returned is `10`. This can be changed using the `_limit` query parameter:

```
GET /profiles?_page=2&_limit=20
```

When using paginated data the `X-Total-Count` header returns the total item count, for example:

```
X-Total-Count: 40
```

### Sort

Add `_sort` and `_order` (ascending order by default) for sorted results:

```
GET /users?_sort=email

GET /users?_sort=email&_order=desc
```

### Further information

The mock API uses the [json-server](https://github.com/typicode/json-server) package under the hood - more functionality such as text search is available. Please see the full documentation if you would like to use any of these features.