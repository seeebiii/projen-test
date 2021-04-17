const { NpmAccess } = require('projen');
const { ProjectType } = require('projen');
const { AwsCdkConstructLibrary } = require('projen');
const { DependabotScheduleInterval } = require('projen/lib/github');

const project = new AwsCdkConstructLibrary({
  name: '@seeebiii/projen-test',
  repositoryUrl: 'https://github.com/seeebiii/projen-test',
  author: 'seeebiii',
  authorName: 'Sebastian Hesse',
  authorAddress: 'https://www.sebastianhesse.de',
  jsiiFqn: 'projen.AwsCdkConstructLibrary',

  cdkVersion: '1.97.0',
  cdkAssert: true,
  cdkDependencies: ['@aws-cdk/core', '@aws-cdk/aws-lambda'],

  devDeps: ['esbuild'],

  npmAccess: NpmAccess.PUBLIC,
  projectType: ProjectType.LIB,

  docgen: true,
  eslint: true,
  mergify: true,
  antitamper: true,

  dependabot: true,
  dependabotOptions: {
    autoMerge: true,
    ignoreProjen: true,
    scheduleInterval: DependabotScheduleInterval.WEEKLY,
  },

  gitignore: ['.idea'],
  defaultReleaseBranch: 'main',
  releaseBranches: ['main'],
  releaseToNpm: true,
  releaseWorkflow: true,

  publishToMaven: {
    mavenGroupId: 'de.sebastianhesse.examples',
    mavenArtifactId: 'projen-test',
    javaPackage: 'de.sebastianhesse.examples.projen.test',
  },
  publishToNuget: {
    dotNetNamespace: 'SebastianHesse.Examples',
    packageId: 'Projen.Test',
  },
  publishToPypi: {
    distName: 'projen-test',
    module: 'projen_test',
  },
});

// example to show how you can use your own esbuild task to bundle your Lambda function without using constructs like NodejsFunction
project.compileTask.exec('esbuild src/lambda-bundled/index.js --bundle --platform=node --target=node12 --external:aws-sdk --outfile=lib/lambda-bundled/index.js');

project.synth();
