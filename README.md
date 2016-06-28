# CPQ.js

Used to access the [SteelBrick CPQ](http://www.steelbrick.com) - [Public API](https://community.steelbrick.com/t5/Release-Notes/Public-API-Overview/ta-p/4418/message-revision/4418%3A11) from JavaScript apps served outside of Salesforce.  Use this library in a Node.js app or the browser. Requires the SteelBrick Spring 16' v2 release (25.2) or later.


## Access
Built in authorization management via an OAuth2 refresh token maintains consistent access to the API. Retrieve this credential from your SteelBrick ORG and your API access will automatically be refreshed as needed. 

To retrieve your credential go to SteelBrick CPQ > Settings Editor (/apex/EditSettings) and click on the Additional Settings tab.  Find the OAuth Refresh Token field and click to reveal the credential.
  
If the OAuth Refresh Token field is not available then you need to first authorize to establish the credential. Close the browser program you are using (e.g. Chrome, Firefox, Safari) and reopen it.  Initiate the OAuth web authentication flow [here](https://brick-rest.steelbrick.com/oauth/auth).  Login to the org you want to connect to and then click Allow.  You will now be able to access your credential via the above instructions.

## Usage

### Node.js

Initialize from the cpq-js node module:
```
var oauth2 = {url: '<url>', refreshToken: '<refreshToken>'};
var cpqjs = require('cpq-js')(oauth2);
```


### Browser

Clone the repo and install its node modules:
```
$ git clone https://github.com/sseixas/CPQ-JS.git
$ cd CPQ-JS
$ npm install
```

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

## API

### quote

##### read(quoteId)

```
var quoteId = 'a0Ri000000LBDXo';
var promise = cpqjs.quote.read(quoteId);
promise.then(function(quote) {
    console.log(quote); // {record: Object, nextKey: 3, netTotal: 0, lineItems: Array[2]…}
}); 
```

##### save(quote)

```
var promise = cpqjs.quote.save(quote); // quote from cpqjs.quote.read
promise.then(function(savedQuote) {
    console.log(savedQuote); // {record: Object, nextKey: 3, netTotal: 0, lineItems: Array[2]…}
}); 
```

##### calculate(quote)

```
var promise = cpqjs.quote.calculate(quote); // quote from cpqjs.quote.read
promise.then(function(calculatedQuote) {
    console.log(calculatedQuote); // {record: Object, nextKey: 3, netTotal: 0, lineItems: Array[2]…}
}); 
```

##### addProducts(quote, groupKey, products, ignoreCalculate)

```
var groupKey = 1; // the index of the quote group you want to add the products to
var products = []; // the array of product objects to add to the quote (from cpqjs.product.read)
var ignoreCalculate = true; // if true does not perform a quote calculation after adding the products

var promise = cpqjs.quote.addProducts(quote, groupKey, products, ignoreCalculate);
promise.then(function(quoteWithAddedProducts) {
    console.log(quoteWithAddedProducts); // {record: Object, nextKey: 4, netTotal: 0, lineItems: Array[3]…}
}); 
```


### product

##### read(productId)

```
var productId = '01ti0000008GifE';
var pricebookId = '01si00000040lsx';
var currencyCode = 'USD';

var promise = cpqjs.product.read(productId, pricebookId, currencyCode);
promise.then(function(product) {
    console.log(product); // {record: Object, featureCategories: Array[0], currencySymbol: "$"}
}); 
```

##### search(searchFilters, format, quote, recordsPerPage, pageNumber)

```
var searchFilters = []; // array of JSON serialized SBQQ__SearchFilter__c SObjects
var format = 'products'; // if format equals products then returns array of products; else pricebook entries
var recordPerPage = 20; // maximum number of returned items for any given search call; else  all results
var pageNumber = 1; // if recordPerPage is set then returns window of records

var queryPromise = cpqjs.query(
    "SELECT SBQQ__TargetObject__c, SBQQ__TargetField__c, SBQQ__Operator__c, SBQQ__FilterValue__c " + 
    "FROM SBQQ__SearchFilter__c WHERE Id = 'a0di0000003rCen'"
);

queryPromise.then(function(queryResponse) {
    searchFilters = queryResponse.records;
    var promise = cpqjs.product.search(searchFilters, format, quote, recordsPerPage, pageNumber);
    promise.then(function(searchedProducts) {
        console.log(searchedProducts); // [Object, Object]
        console.log(searchedProducts[0]); // {record: Object, featureCategories: Array[0], currencySymbol: "$"}
    }); 
});
```

##### suggest(quoteProcess, format, quote, recordsPerPage, pageNumber)

```
var quoteProcess = // JSON serialized SBQQ__QuoteProcess__c SObject
var format = 'products'; // if format equals products then returns array of products; else pricebook entries
var recordPerPage = 20; // maximum number of returned items for any given search call; else  all results
var pageNumber = 1; // if recordPerPage is set then returns window of records

var queryPromise = cpqjs.query(
    "SELECT Id, SBQQ__ProductAutoSelected__c, SBQQ__GuidedOnly__c, " +
        "(SELECT SBQQ__QuoteProcess__c, Id, Name, SBQQ__Label__c, SBQQ__Active__c, SBQQ__DisplayOrder__c," + 
        " SBQQ__InputField__c, SBQQ__Operator__c, SBQQ__ProductField__c, SBQQ__IntegerInput__c" + 
        " FROM SBQQ__Inputs__r) " +
    "FROM SBQQ__QuoteProcess__c WHERE Id = 'a0Oi000000PGpWl'"
);

queryPromise.then(function(queryResponse) {
    quoteProcess = queryResponse.records[0];
    var promise = cpqjs.product.suggest(quoteProcess, format, quote, recordsPerPage, pageNumber);
    promise.then(function(suggestedProducts) {
        console.log(suggestedProducts); // [Object, Object]
        console.log(suggestedProducts[0]); // {record: Object, featureCategories: Array[0], currencySymbol: "$"}
    }); 
});
```


### contract

##### amend(contractId)

```
var contractId = '003i000003L1i6C';
var promise = cpqjs.contract.amend(contractId);
promise.then(function(amendedQuote) {
    console.log(amendedQuote); // {record: Object, nextKey: 2, netTotal: 0, lineItems: Array[1]…}
}); 
```

##### renew(masterContractId, renewedContracts)

```
var quotes = [];
var masterContractId = '800i0000000CMiAAAW';
var renewedContracts = []; // array of JSON serialized Contract SObjects

var queryPromise = cpqjs.query(
    "SELECT Id, AccountId, StartDate, ContractTerm, SBQQ__Opportunity__c, " + 
    "SBQQ__PreserveBundleStructureUponRenewals__c " + 
    "FROM Contract WHERE Id = '800i0000000Cd4OAAS'"
);

queryPromise.then(function(queryResponse) {
    renewedContracts = queryResponse.records;
    var promise = cpqjs.contract.renew(masterContractId, renewedContracts);
    promise.then(function(renewalQuotes) {
        console.log(renewalQuotes); // [Object]
        console.log(renewalQuotes[0]); // {record: Object, nextKey: 2, netTotal: 0, lineItems: Array[1]…}
    });
}); 
```