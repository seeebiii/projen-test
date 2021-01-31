# Create and Publish CDK Constructs Using projen and jsii

This project tests and describes the workflow of creating an [AWS CDK](https://aws.amazon.com/cdk/) construct using [projen](https://github.com/projen/projen) + [jsii](https://github.com/aws/jsii) and publishing it to various repositories like npm, Maven Central, PyPi and NuGet.

In order to verify the process is working as expected, this project contains an [`InlineLambdaConstruct`](src/index.ts).
It only creates a very simple Lambda function using inline code that prints out the event it's receiving.
Btw. did you know there are multiple [ways to bundle an AWS Lambda function in a CDK construct](https://www.sebastianhesse.de/2021/01/16/5-ways-to-bundle-a-lambda-function-within-an-aws-cdk-construct/)?

**Note:** If you are reading this on npm, NuGet, or PyPi as part of the package description, then please head over to https://github.com/seeebiii/projen-test.
Otherwise the links might not work properly.

## Questions?

Do you have further questions?
Feel free to reach out via [Twitter](https://twitter.com/seeebiii) or visit my website - I'm a [Freelance Software Engineer](https://www.sebastianhesse.de) focusing on serverless cloud projects.

There's also a [CDK developer Slack workspace](https://cdk.dev/) that you can join to ask questions.

## Table of Contents

- [About projen](#about-projen)
- [About jsii](#about-jsii)
- [Requirements](#requirements)
- [Setup Project](#setup-project)
   - [Write CDK Construct](#write-cdk-construct)
   - [Connect to GitHub](#connect-to-github)
   - [Publish to Different Repositories](#publishing-to-different-repositories)
- [Verify Your CDK Construct](#verify-your-cdk-construct)
- [Next Steps](#next-steps)
- [Additional Help](#additional-help)

## About projen

[projen](https://github.com/projen/projen) is a tool to write your project configuration using code instead of managing it yourself.
It was initially created to help you writing CDK constructs but can also be used to create any other project stub like a React app.

The important thing to note is that you only define the project configuration in the [.projenrc.js](.projenrc.js) file and it will generate everything for you, like `package.json` or other files.
**Remember:** do not manually change the generated files, otherwise changes will be lost after you run `projen` again.

Besides that, it is recommended to create an alias in your command line to avoid typing `npx projen` over and over again.
For example: `alias pj='npx projen'`

Further links:

- [A Beginner's Guide to Create AWS CDK Construct Library with projen](https://dev.to/aws-builders/a-beginner-s-guide-to-create-aws-cdk-construct-library-with-projen-5eh4)
- [Converting a CDK construct to using projen](https://www.matthewbonig.com/2020/10/04/converting-to-projen/)

## About jsii

[jsii](https://github.com/aws/jsii) is the technology behind the AWS CDK that allows you to write CDK constructs in TypeScript/JavaScript and compile them to other languages like Java or Python.
There's an [AWS blog post](https://aws.amazon.com/blogs/opensource/generate-python-java-dotnet-software-libraries-from-typescript-source/) about how it works.

There are a few jsii related projects that support us in the steps below, e.g. for releasing our artifacts.

## Requirements

- ~30-60min of your time (maybe more if you run into errors or need to read through a few documents)
- Node.js/npm installed on your machine
- AWS CDK installed on your machine
- GitHub Account (free account is enough)

### Optional

- AWS Account (for verification)
- Java + Maven (for local packaging & verification)
- Python (for local packaging & verification)

## Steps For Creating a New CDK Construct Using projen

In case you want to test `projen` as well, here are the steps I've performed.

### Setup Project

1. Initialize a new project using `projen`:

   ```shell
   mkdir projen-test
   cd projen-test
   npx projen new awscdk-construct
   ```

2. Now create a new Git repository using `git init` and connect an existing Git project using `git remote add origin <REMOTE_URL>`.
   (Create your Git repository in GitHub first before you call `git remote add ...`)

   - Note: if your local branch is `master` but your remote branch is `main`, then use `git branch -M main` to rename the local branch.

3. Create an alias for your command-line if you haven't done already: `alias pj='npx projen'`

4. Adjust the `projen` options in `.projenrc.js` a bit. For example:
   - adjust metadata like `name`, `author`, `authorName`, `authorAddress`, `repositoryUrl`.
     By default `name` is also used as the `name` in the generated `package.json`.
     However, you can define a custom one by using `packageName`.
   - add `projectType: ProjectType.LIB` since we'll create a library
   - add `cdkAssert: true` for being able to test my CDK construct
   - add `cdkDependencies: ['@aws-cdk/core', '@aws-cdk/aws-lambda']` to let `projen` add these CDK dependencies for me
   - optional: add `mergify: false` if you don't want to use it at the moment
   - optional: explicitly add `docgen: true` so it automatically generates API documentation 🙌
   - optional: explicitly add `eslint: true` to make sure you use common coding standards
   - optional: add `dependabot: true` and `dependabotOptions: {...}` to enable [Dependabot](https://dependabot.com/) if you hate manually managing dependency updates
   - optional: add `gitignore: ['.idea']` if you love using IntelliJ ♥️ but don't want to commit its settings
   - optional: use `packageManager: NodePackageManager.NPM` if you want to use npm instead of Yarn - might be important in case you are migrating an existing CDK Construct to `projen`.

   Don't forget to add necessary imports in the config file when applying the `projen` settings, e.g. for using `ProjectType` or `NodePackageManager`.

5. Set a version number in [version.json](version.json), e.g. `0.0.1`.

6. Run `pj` again on your command-line.
   This will update all project files like [package.json](package.json) based on what you have configured in [.projenrc.js](.projenrc.js).
   Remember to not manually update these files as `projen` will override your changes otherwise.

**💡 Hint:** I can recommend to play around with the options a little bit and run `pj` after each change.
Then observe what happens and how the project files differ.
If you commit the changes to Git each time after running `pj`, you can easily compare the Git diff 😊

### Write CDK Construct

1. Write a simple CDK construct in [src/index.ts](src/index.ts).
   There are already great tutorials (like [cdkworkshop.com](https://cdkworkshop.com/) available on how to write constructs.
   Here's a small code snippet for a simple Lambda function using inline code:

   ```typescript
   new Function(this, 'SampleFunction', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromInline('exports.handler = function (e, ctx, cb) { console.log("Event: ", e); cb(); };'),
      handler: 'index.handler',
      timeout: Duration.seconds(10),
    });
   ```

   Have a look at [index.ts](src/index.ts) for all the details.
   Instead of using a Lambda function, you can also use whatever you like.

2. Write a simple test for this construct in [test/index.test.ts](test/index.test.ts).
   Here's also a small code snippet which ensures that our Lambda function is created in the stack:

   ```typescript
   test('Simple test', () => {
     const app = new cdk.App();
     const stack = new cdk.Stack(app, 'TestStack');
   
     new InlineLambdaConstruct(stack, 'SimpleInlineLambdaConstruct');
   
     expectCDK(stack).to(countResources('AWS::Lambda::Function', 1));
   });
   ```

   The test is creating a stack and verifies that the stack contains exactly one resource of type `AWS::Lambda::Function`.
   Have a look at [index.test.js](test/index.test.ts) for further details.

3. Run `yarn run build`.
   This command will compile the code, execute the tests using [Jest](https://jestjs.io/) and also generate [API.md](API.md) 😍

### Connect to GitHub

Add all files to Git, commit and push your changes.

```shell
# Maybe adjust this to really add all files from every folder, or use IntelliJ or some Git GUI to do this
git add .
git commit -M "Initial commit"
git push -u origin main
```

### Publishing to Different Repositories

If you want to release your package to one or multiple repositories like npm or Maven Central, you'll have to enable this in [.projenrc.js](.projenrc.js).
After changing the configuration as described below and calling `pj` (or `npx projen` if you're not using the alias), you'll notice that there are a few files in [.github/workflows](.github/workflows) folder.
They take care of running [GitHub Actions](https://github.com/features/actions) to build and release/publish the library to npm and other repositories.
The action steps are using [jsii-superchain](https://github.com/aws/jsii/tree/main/superchain) as the Docker image to run a step.

The release process is also using the npm module [jsii-release](https://github.com/aws/jsii-release) to help releasing the artifacts.
The project's README is explaining all the different parameters that you need to set for publishing to the different repositories that are supported.
Currently, npm (Node.js), Maven (Java), NuGet (C#) and PyPi (Python) are supported.

#### Publish to npm

I'm assuming you already have an [npm](https://www.npmjs.com/) account.
If not, register first.

1. Update [.projenrc.js](.projenrc.js) and enable npm releases:
   - `releaseBranches: ['main']`
   - `releaseToNpm: true` -> Yes, I want to publish a new version to npm every time :)
   - `releaseWorkflow: true`
   - Optional: `releaseEveryCommit: true` -> will run the release GitHub Action on each push to the defined `releaseBranches`

2. Run `pj` to update your project files.
   You'll notice [release.yml](.github/workflows/release.yml) contains a few steps to build and release your artifact.
   The `release_npm` step requires an `NPM_TOKEN` so that the GitHub Action can publish your package for you.

3. Create an [access token](https://docs.npmjs.com/about-access-tokens) for npm.
   Use type 'Automation' for the token type.
   The token will be used in a GitHub Action to release your package.

4. Add the access token as a [repository secret](https://docs.github.com/en/actions/reference/encrypted-secrets) to your GitHub repository.
   Use `NPM_TOKEN` as name and insert the access token from the previous step.
   This is 

5. Commit and push your changes.
   If you have configured `releaseBranches: ['main']` in [.projenrc.js](.projenrc.js) as discussed above, then a new Action run is triggered that builds your CDK construct and publishes it to npm.

After the last step, you'll notice that the first GitHub Action should be running.

Have a look at the published package: [@seeebiii/projen-test](https://www.npmjs.com/package/@seeebiii/projen-test)

#### Publish to Maven Repository

Since we want to make our CDK construct public, I'm describing the steps to publish it to [Maven Central](https://oss.sonatype.org/), the main Maven repository (like npm fo Node.js packages).
However, this process requires a few more steps compared to npm.

**Maven Requirements**

In order to publish to Maven Central, you need an account and also "authenticate" yourself using GPG.
This ensures that others can verify the correctness of your artifacts and no one else distributes them to introduce vulnerable code.

1. Create an account for Maven Central and register your own namespace like `org.example` if you are the owner of the domain `example.org`.
   This is described in [this OSSRH Guide](https://central.sonatype.org/pages/ossrh-guide.html#initial-setup).
   If you don't have your own domain, you can also use `com.github.<your-github-user>` instead.
   The Jira system has a bot installed that helps you verifying your domain or your GitHub user, so just register and create an issue as described.
   The bot will tell you what to do next 😊

2. Upload a PGP key to a well-known key registry, so other people can verify that the artifacts are from you.
   This is explained well in the [jsii-release README](https://github.com/aws/jsii-release#maven) in the subsection **How to create a GPG key?**.

3. Please save the passphrase of your PGP key somewhere safe, e.g. a password manager.
   You'll need it in a step below!

**Setup Maven Release Action**

1. Update [.projenrc.js](.projenrc.js) and enable Java releases to Maven Central:

   ```javascript
   publishToMaven: {
     mavenGroupId: '<your_package_group_id',
     mavenArtifactId: '<your_package_target_id>',
     javaPackage: '<your_java_package>',
   }
   ```

   You can specify anything you want as long as the namespace you've registered with Maven Central is a prefix of `mavenGroupId`.
   For example, I have registered `de.sebastianhesse` since I also own the domain [www.sebastianhesse.de](https://www.sebastianhesse.de).
   Therefore, I can use `de.sebastianhesse.examples` as the `mavenGroupId`.

2. Run `pj` to update your project files.
   You'll notice changes in the [release.yml](.github/workflows/release.yml) and a new step `release_maven`.
   As you can see, it uses a few secrets like `MAVEN_GPG_PRIVATE_KEY`, `MAVEN_GPG_PRIVATE_KEY_PASSPHRASE`, `MAVEN_USERNAME`, `MAVEN_PASSWORD`, and `MAVEN_STAGING_PROFILE_ID`.
   These are the same as described in the [jsii-release README](https://github.com/aws/jsii-release#maven).
   If you need help figuring out the `MAVEN_STAGING_PROFILE_ID`, then please see below in the [Additional Help](#additional-help) section.

3. Add all the required secrets as [repository secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) to your GitHub repository.

4. Commit and push your changes.

Like with the npm release process above, as soon as you push your changes a GitHub Action is triggered and performs the release.
You'll notice that the release process for Maven takes a lot more time than the one for npm.
Also take care that it might take some time to find your artifact in Maven Central (usually within a few minutes but it can take longer).

Have a look at the published package: [projen-test](https://oss.sonatype.org/#nexus-search;quick~de.sebastianhesse)

#### Publish to PyPi

In order to publish to [PyPi](https://pypi.org/), you need an account there.

1. Update [.projenrc.js](.projenrc.js) configuration:

   ```javascript
   publishToPypi: {
     distName: '<distribution-name>',
     module: '<module_name>',
   },
   ```

2. Run `pj` to update your project files.
   Again, [release.yml](.github/workflows/release.yml) has been updated and a `release_pypi` step has been added.
   The step requires two secrets: `TWINE_USERNAME` and `TWINE_PASSWORD`.

3. Use your PyPi `username` for `TWINE_USERNAME` and `password` for `TWINE_PASSWORD`.
   Add the secrets as [repository secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) to your GitHub repository.

Have a look at the published package: [projen-test](https://pypi.org/project/projen-test/)

### Publish to NuGet

1. Update [.projenrc.js](.projenrc.js) configuration:

   ```javascript
   publishToNuget: {
     dotNetNamespace: 'Organization.Namespace',
     packageId: 'Package.Name',
   },
   ```

2. Run `pj` to update your project files.
   Again, [release.yml](.github/workflows/release.yml) has been updated and a `release_nuget` step has been added.
   The step requires the secret `NUGET_API_KEY`.

3. Generate an [API Key](https://www.nuget.org/account/apikeys) for your account and use it for `NUGET_API_KEY`.
   Add the secret as a [repository secret](https://docs.github.com/en/actions/reference/encrypted-secrets) to your GitHub repository.

Have a look at published package: [Projen.Test](https://www.nuget.org/packages/Projen.Test/)

## Verify Your CDK Construct

Congratulations 🙌
You have successfully published your first CDK construct using `projen` to multiple repositories.
(At least you hope so at the moment 😀)

Let's verify that our construct is working as expected in different languages.
Since my main programming languages are Java and Node.js/JavaScript, I'll only present those two here.
If I have time, I'll add the others as well - or if you want to contribute something? 😉

**Note**: when deploying a CDK app, you need to provide the AWS Account ID and Region.
You can do this either using environment variables in the CLI or by explicitly providing `environment` details in the file/class where the CDK app is defined.
See [this page](https://docs.aws.amazon.com/cdk/latest/guide/environments.html) for further help.

### Verify in Node.js

1. Initialize a new CDK app in TypeScript:

   ```shell
   mkdir cdk-npm-test
   cd cdk-npm-test
   cdk init app --language=typescript
   ```

   This will initialize a new CDK app project.
   You can also use `--language=javascript` which initializes the project using JavaScript instead of TypeScript.
   In `bin/cdk-npm-test.ts` you'll find the CDK app definition and in `lib/cdk-npm-test-stack.ts` you can find the stack definition.

2. Add your new CDK construct as a dev dependency: `npm i -D <your-package-name>`

   **Take care** that the versions for all AWS CDK dependencies in `package.json` (e.g. for `aws-cdk` or `@aws-cdk/core`) are matching the version that you have specified in [.projenrc.js](.projenrc.js) under `cdkVersion`.
   Otherwise you'll see some funny compilation errors.
   If you need to update the dependencies, you can use `npm i -S <dependency>@latest` (for dependencies) or `npm i -D <dependency>@latest` (for dev dependencies).

3. Add your new CDK construct in `bin/cdk-npm-test-stack.ts` like: `new InlineLambdaConstruct(this, 'NpmSample');`

4. Build your code: `npm run build`

5. Now you can deploy your app using `cdk deploy`.
   Wait for the stack to be created and test that everything looks like expected.

### Verify in Java

1. Initialize new CDK app in Java:

   ```shell
   mkdir cdk-java-test
   cd cdk-java-test
   cdk init app --language=java
   ```

   This will initialize a new CDK app project.
   In `src/main/java/com/myorg` you'll see the files `CdkJavaTestApp` and `CdkJavaTestStack` that contain CDK samples.

2. Add the CDK construct you've just published to the project's `pom.xml`:

   ```xml
   <dependency>
       <groupId>org.example</groupId>
       <artifactId>projen-test</artifactId>
       <version>0.0.1</version>
   </dependency>
   ```

   Replace the Maven coordinates based on your settings that you've configured with `publishToMaven` in [.projenrc.js](.projenrc.js) and the correct version.

3. Then go to `CdkJavaTestStack` and make use of your CDK construct.
   In my case, I have added the following line in the constructor: `new InlineLambdaConstruct(this, "JavaSample");`

4. Package your code (including running the tests): `mvn package`

5. Now you can deploy your app using `cdk deploy`.
   Wait for the stack to be created and test that everything looks like expected.

### Verify in Python

TODO

Note: If you are eager to go through this tutorial and explore the steps for Python, feel free to contribute to this README :)

### Verify in C#

TODO

Note: If you are eager to go through this tutorial and explore the steps for NuGet / C#, feel free to contribute to this README :)

## Next Steps

You are amazing! 🚀
If you went until this point, you have successfully published your first multi-language CDK construct!

Check out more resources:

- [cdkworkshop.com](https://cdkworkshop.com/)
- [CDK Constructs](https://github.com/awslabs/aws-solutions-constructs)
- [awesome-cdk](https://github.com/kolomied/awesome-cdk)
- [cdkpatterns.com](https://cdkpatterns.com/)
- [More CDK Constructs 1](https://github.com/cloudcomponents/cdk-constructs)
- [More CDK Constructs 2](https://github.com/taimos/cdk-constructs)

## Additional Help

Below are a few topics that I've discovered along the way and would like to explain further.

### Find The `MAVEN_STAGING_PROFILE_ID`

In order to figure out the `MAVEN_STAGING_PROFILE_ID`, follow these steps:
- Login to [oss.sonatype.org](https://oss.sonatype.org/) using your Maven Central credentials.
- On the left, click on `Staging Profiles`
- In the main window, make sure you select the tab `Staging Profiles` and select the entry matching your namespace `org.example`
- You'll notice the URL has changed to `https://oss.sonatype.org/#stagingProfiles;12abc3456789`
- Use the id after the `;` semicolon as the `MAVEN_STAGING_PROFILE_ID`
