# CPQ.js

Used to access [Steelbrick CPQ](http://www.steelbrick.com) API from JavaScript apps served outside of Salesforce.  Use this library in the browser or in a Node.js app.  When used in the browser, this library works around the same origin policy which restricts browser communication to any Salesforce hosted API from an outer domain.  

Requires the Steelbrick Spring 16' release or later.


## Access
Built in authorization management via an OAuth2 refresh token maintains consistent access to the API. Retrieve this credential from your Steelbrick ORG and your API access will automatically be refreshed as needed. 

Instructions on how to retrieve this credential are coming soon.

## Usage

Clone the repo and install its node modules:
```
$ git clone https://github.com/sseixas/CPQ-JS.git
$ cd CPQ-JS
$ npm install
```

### Browser



Build the cpq.js file:
```
$ gulp build
$ cd build
$ ls
cpq.js		cpq.js.map
```

Import the generated script:
```
<script src="cpq.js"></script>
```

Initialize from window:

```
<script>
    var oauth2 = {url: '<url>', refreshToken: '<refreshToken>'};
    var cpqjs = window.cpqjs(oauth2);    
</script>
```
Copy the cpq.js.map sourcemap file in the same directory as cpq.js if you want to debug in the browser.

### Node.js

Initialize from the cpq-js node module:
```
var oauth2 = {url: '<url>', refreshToken: '<refreshToken>'};
var cpqjs = require('cpq-js')(oauth2);
```

## API

### Sample

#### read(uid, version)

```
var promise = cpqjs.sample.read('uid', '25.0');
promise.then(function(res) {
    console.log(res); // {id : 'uid', version: '25.0'}
}); 
```

#### load(uid, context, version)

```
var promise = cpqjs.sample.load('uid', {}, '25.0');
promise.then(function(res) {
    console.log(response); // {id : 'uid', context: '{}', version: '25.0'}
}); 
```

#### save(model, version)

```
var promise = cpqjs.sample.save({}, '25.0');
promise.then(function(res) {
    console.log(response); // {model: '{}', version: '25.0'}
}); 
```

### Quote

coming soon

### Product

coming soon

### Configuration

coming soon