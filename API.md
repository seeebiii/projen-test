# API Reference

**Classes**

Name|Description
----|-----------
[ConstructWithProperties](#seeebiii-projen-test-constructwithproperties)|A simple CDK construct illustrating the differences in declaring construct properties with interfaces.
[LambdaConstruct](#seeebiii-projen-test-lambdaconstruct)|A simple CDK construct to create a Lambda function with static inline code that prints the event and calls the callback function.


**Structs**

Name|Description
----|-----------
[ConstructProperties](#seeebiii-projen-test-constructproperties)|This interface is translated into a _struct_ containing data.


**Interfaces**

Name|Description
----|-----------
[IConstructProperties](#seeebiii-projen-test-iconstructproperties)|This is a _behavioural interface_ identified by `I` in its name.



## class ConstructWithProperties  <a id="seeebiii-projen-test-constructwithproperties"></a>

A simple CDK construct illustrating the differences in declaring construct properties with interfaces.

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new ConstructWithProperties(parent: Construct, name: string, props: ConstructProperties, props2: IConstructProperties)
```

* **parent** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **name** (<code>string</code>)  *No description*
* **props** (<code>[ConstructProperties](#seeebiii-projen-test-constructproperties)</code>)  *No description*
* **props2** (<code>[IConstructProperties](#seeebiii-projen-test-iconstructproperties)</code>)  *No description*




## class LambdaConstruct  <a id="seeebiii-projen-test-lambdaconstruct"></a>

A simple CDK construct to create a Lambda function with static inline code that prints the event and calls the callback function.

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new LambdaConstruct(parent: Construct, name: string)
```

* **parent** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **name** (<code>string</code>)  *No description*




## struct ConstructProperties  <a id="seeebiii-projen-test-constructproperties"></a>


This interface is translated into a _struct_ containing data.

E.g. if translated to Java, an interface `ConstructProperties` is created containing a builder subclass to create an instance of the interface.



Name | Type | Description 
-----|------|-------------
**myProp** | <code>string</code> | <span></span>



## interface IConstructProperties  <a id="seeebiii-projen-test-iconstructproperties"></a>


This is a _behavioural interface_ identified by `I` in its name.

It will be translated to a "regular" interface which needs to be implemented.
You can also use methods here, e.g. `doSth(): void;`.

### Properties


Name | Type | Description 
-----|------|-------------
**otherProp** | <code>string</code> | <span></span>



