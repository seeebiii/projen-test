import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { Construct, Duration } from '@aws-cdk/core';

/**
 * A simple CDK construct to create a Lambda function with static inline code that prints the event and calls the callback function.
 */
export class InlineLambdaConstruct extends Construct {
  constructor(parent: Construct, name: string) {
    super(parent, name);

    new Function(this, 'SampleFunction', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromInline('exports.handler = function (e, ctx, cb) { console.log("Hello: ", e); cb(); };'),
      handler: 'index.handler',
      timeout: Duration.seconds(10),
    });
  }
}
