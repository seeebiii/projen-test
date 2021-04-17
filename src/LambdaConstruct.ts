import * as path from 'path';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { Construct, Duration } from '@aws-cdk/core';

/**
 * A CDK construct to create Lambda functions.
 */
export class LambdaConstruct extends Construct {
  constructor(parent: Construct, name: string) {
    super(parent, name);

    // most simple function with static inline code that prints the event and calls the callback function
    new Function(this, 'InlineFunction', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromInline('exports.handler = function (e, ctx, cb) { console.log("Event: ", e); cb(); };'),
      handler: 'index.handler',
      timeout: Duration.seconds(10),
    });

    // a function which is written in regular Node.js outside of the src folder
    new Function(this, 'JsFunction1', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(path.join(__dirname, '../lambda-js')),
      handler: 'index.handler',
    });

    // a function which is written in TypeScript inside the src/lambda folder
    new Function(this, 'JsFunction2', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(path.join(__dirname, 'lambda')),
      handler: 'index.handler',
    });

    // a function which is written in Python outside of the src folder
    new Function(this, 'PythonFunction', {
      runtime: Runtime.PYTHON_3_8,
      code: Code.fromAsset(path.join(__dirname, '../lambda-python')),
      handler: 'index.handler',
    });

    // a function which is ignored by TypeScript but still included by running a custom compile task;
    // the compile task is using 'esbuild' to bundle & minify the function, i.e. include all depedencies into one target file
    new Function(this, 'BundledDepsFunction', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(path.join(__dirname, 'lambda-bundled')),
      handler: 'index.handler',
    });
  }
}
