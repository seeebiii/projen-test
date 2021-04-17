import { countResources, expect as expectCDK } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { LambdaConstruct } from '../src';

test('Simple test', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  new LambdaConstruct(stack, 'LambdaConstruct');

  expectCDK(stack).to(countResources('AWS::Lambda::Function', 5));
});
