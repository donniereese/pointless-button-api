## switchs
__{server}/api/switchs__

## GET switches
__{server}/api/switches__
`{requireAuth}`

Returns a list of switches available to user or keyed user

`controller.getSwitches()`


### GET all switches list
__{server}/api/switches/all__
`{requireAdmin}`

Returns a list of ALL switches

`controller.getAllSwitches(()`


### GET switchs list
__{server}/api/switchs/public__

Returns a list of all public switchs

`controller.getPublicSwitches()`


### GET switch by switchId
__{server}/api/switchs/:switchId__

`controller.getSwitchById()`


### GET switchs list by userId
__{server}/api/switchs/filterByUserId/:userId__

`controller.getSwitchByUserId()`


### GET switchs list by userId
__{server}/api/switchs/filterByUserId/:userId__




### GET switchs list by userId
__{server}/api/switchs/filterByUserId/:userId__




### POST new switch object
__{server}/api/switchs/create__ `{{requireAuth}}`

Requires a new switch object


### POST event on switch
__{server}/api/switchs/:switchId/interact__

Requires an event object


### DELETE switch
__{server}/api/switchs/:switchId/remove__ `{{requireAdminOrResourceOwner}}`


---

## Buttons
__{server}/api/buttons__

### GET all buttons
__{server}/api/buttons__

### GET all public buttons
__{server}/api/buttons/public__

### GET button list by user id
__{server}/api/buttons/byUserId/:userId__

### GET button list by user name
__{server}/api/buttons/byUser/:username__

### GET button info by id
__{server}/api/buttons/:buttonId__

---
