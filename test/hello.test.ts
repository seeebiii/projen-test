import { countResources, expect as expectCDK } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { InlineLambdaConstruct } from '../src';

test('Simple test', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  new InlineLambdaConstruct(stack, 'VerifyExampleEmail');

  expectCDK(stack).to(countResources('AWS::Lambda::Function', 1));
});
