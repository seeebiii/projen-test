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

  npmAccess: NpmAccess.PUBLIC,
  projectType: ProjectType.LIB,

  docgen: true,
  eslint: true,
  mergify: true,
  antitamper: true,

  dependabot: true,
  dependabotOptions: {
    autoMerge: false,
    ignoreProjen: false,
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

project.synth();
