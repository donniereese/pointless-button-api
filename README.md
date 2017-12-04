# pointless-button-api
A Pointless API for the PointlessButton service.

## Quickstart

### Autheniticate with API
To make requests to the API you must first make an authentication request and obtain an authentication token.  That token is required in every request that is not to an endpoint ending wiht `/public`.

#### Authenticate with User & Pass
```
axios({
    method: 'post',
    url: '{server}/api/authenticate/login',
    data: {
        email: 'email@host.com',
        password: 'xxxxxxxx'
    }
});
```

#### Authenticate with API Key & Secret
```
axios({
    method: 'post',
    url: '{server}/api/authenticate/key',
    data: {
        key: '9349ifi939jfhj02',
        secret: 'fj0290f2j0ef0280hfoifn20j92fj02fj2'
    }
});
```

#### Authentication Response
Each authentication will return json with the status of the requestion and the token if the `status: true`.
```
{
    status: true,
    token: '198hcdwbnogrj.2r30j92dj0wef.j2r32'
}
```
This token has a lifespan of an hour and is passed in the header of each request as `token`.


### Create a new button
To create a new button to interact with you have to make a post request.  Each request will return a status boolean of true or false and a error message on failure or return the button on success.
#### New Button Request:
```
axios({
    headers: {'token': '198hcdwbnogrj.2r30j92dj0wef.j2r32'},
    method: 'post',
    url: '{server}/api/buttons/create',
    data: {
        "name": "Button Name",
        "description": "Really, this is just a button.",
        "tags": ["funny", "random"],
        "public": true
    }
});
```

#### Response
**Success**
```
{
    "status": true,
    "button": {
        "__v": 0,
        "owner": "409f3j903409290",
        "_id": "2902j09g3r894h59h84gjo35g",
        "updatedTimestamp": "2017-12-04T14:38:33.877Z",
        "createdTimestamp": "2017-12-04T14:38:33.877Z",
        "valueStore": [],
        "events": [
            {
                "uri": "none",
                "ammount": 1,
                "value": "presses",
                "type": "addto",
                "name": "pressed"
            }
        ],
        "defaultEvent": "0",
        "disabled": false,
        "publicToFriends": false,
        "public": true,
        "tags": [
            "funny",
            "poop"
        ],
        "type": "button",
        "desription": "",
        "name": "pull my button"
    }
}
```

**Failure**
```
{
    "status": false,
    "error": "Error message."
}
```

### Interact with button
To interact with a button, the simplest way is to call the button by it's buttonId.  Doing so will trigger the default action that the creator set.  Calling a button interaction has a `/public` endpoint, but does not return the status of your interaction.
```
axios({
    headers: {'token': '198hcdwbnogrj.2r30j92dj0wef.j2r32'},
    method: 'post',
    url: '{server}/api/buttons/{buttonId}'
});
```
#### Response
**Success**
```
{
    "status": true,
    "message": "button clicked!"
}
```

**Failure**
```
{
    "status": false,
    "error": "error message"
}
```

#### Public
Public requests don't require tokens and will ignore them if passed in the header.
```
axios({
    method: 'post',
    url: '{server}/api/buttons/{buttonId}/public'
});
```
Calling a Public endpoint will only return server errors.
