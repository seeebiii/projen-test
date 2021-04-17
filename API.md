# API Reference

**Classes**

Name|Description
----|-----------
[ConstructWithProperties](#seeebiii-projen-test-constructwithproperties)|A simple CDK construct illustrating the differences in declaring construct properties with interfaces.
[LambdaConstruct](#seeebiii-projen-test-lambdaconstruct)|A CDK construct to create Lambda functions.


**Structs**

Name|Description
----|-----------
[StructProperties](#seeebiii-projen-test-structproperties)|This interface is translated into a _struct_ containing data.


**Interfaces**

Name|Description
----|-----------
[IBehaviorProperties](#seeebiii-projen-test-ibehaviorproperties)|This is a _behavioral interface_ identified by `I` in its name.



## class ConstructWithProperties  <a id="seeebiii-projen-test-constructwithproperties"></a>

A simple CDK construct illustrating the differences in declaring construct properties with interfaces.

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new ConstructWithProperties(parent: Construct, name: string, props: StructProperties, props2: IBehaviorProperties)
```

* **parent** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **name** (<code>string</code>)  *No description*
* **props** (<code>[StructProperties](#seeebiii-projen-test-structproperties)</code>)  *No description*
* **props2** (<code>[IBehaviorProperties](#seeebiii-projen-test-ibehaviorproperties)</code>)  *No description*




## class LambdaConstruct  <a id="seeebiii-projen-test-lambdaconstruct"></a>

A CDK construct to create Lambda functions.

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new LambdaConstruct(parent: Construct, name: string)
```

* **parent** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **name** (<code>string</code>)  *No description*




## interface IBehaviorProperties  <a id="seeebiii-projen-test-ibehaviorproperties"></a>


This is a _behavioral interface_ identified by `I` in its name.

It will be translated to a "regular" interface which needs to be implemented.
You can also use methods here, e.g. `doSth(): void;`.

### Properties


Name | Type | Description 
-----|------|-------------
**otherProp** | <code>string</code> | <span></span>



## struct StructProperties  <a id="seeebiii-projen-test-structproperties"></a>


This interface is translated into a _struct_ containing data.

E.g. if translated to Java, an interface `StructProperties` is created containing a builder subclass to create an instance of the interface.



Name | Type | Description 
-----|------|-------------
**myProp** | <code>string</code> | <span></span>



