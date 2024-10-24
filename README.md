# PROJECT DEMO
You can use yarn or npm.
But I recommend using yarn.
## Step to start the source

### 1. install dependencies
`yarn install`

### 2. run development server
`yarn start`

## Structure

### domain
This is where all logic live.
Just entities and pure logic and are well protected by unit tests.
This layer asks what it needs from interfaces so that it is well protected from outside and we can use mocking to test this layers.

### UI
Where all the user interface lives.
In this layer, we use the logic from domain layer.

### Integration
This layer like a adapter with the outside world.
In this demo I only implement a MockAPIService.
But in real life application, we can also have photo picking libraries, geo-location,....
We can change from fetch to axios, or applying caching solution without impact the inner layers.


## Which can be improve

I still have a lot of things in my mind that I want to apply, but I'm running out of energy...

1. Caching solution using storage
2. Remote Logging
3. Env variables
4. Better alert notification
5. ....
