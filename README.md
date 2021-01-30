# projen-test

This is a test project to test the workflow of creating a CDK construct library using [projen](https://github.com/projen/projen).
You can follow the steps I've executed below.

The CDK construct `InlineLambdaConstruct` only creates a very simple Lambda function that prints out the event it's receiving.
Did you know there are multiple [ways to bundle an AWS Lambda function in a CDK construct](https://www.sebastianhesse.de/2021/01/16/5-ways-to-bundle-a-lambda-function-within-an-aws-cdk-construct/) ?

## Questions?

Do you have questions?
Feel free to reach out via [Twitter](https://twitter.com/seeebiii) or visit my website - I'm a [Freelance Software Engineer](https://www.sebastianhesse.de) focusing on Serverless Cloud Projects.

## Steps For Creating a New CDK Construct Using projen

In case you want to test `projen` as well, here are the steps I've performed.

### Setup Project

1. Initialize a new project:

   ```shell
   mkdir projen-test
   cd projen-test
   npx projen new awscdk-construct
   ```

2. Now create a new Git repository using `git init` and connect an existing Git project using `git remote add origin  <REMOTE_URL>`.
   (Create your Git repository in GitHub first before you call `git remote add ...`)

   - Note: if your local branch is `master` but your remote branch is `main`, then use `git branch -M main` to rename the local branch.

3. Create alias for my command-line: `alias pj='npx projen'`

4. Adjust the `projen` options in `.projenrc.js` a bit. For example:
    - adjust metadata like `name`, `author`, `authorName`, `authorAddress`, `repositoryUrl`
    - add `cdkAssert: true` for being able to test my CDK construct
    - add `cdkDependencies: ['@aws-cdk/core', '@aws-cdk/aws-lambda']` to let projen add these CDK dependencies for me
    - add `docgen: true` so it automatically generates API documentation 🙌
    - add `eslint: true` to make sure I use common coding standards
    - add `dependabot: true` and `dependabotOptions: {...}` to enable [Dependabot](https://dependabot.com/) because I hate managing dependency updates manually
    - add `gitignore: ['.idea']` because I love using IntelliJ ♥️ but I don't want to commit its settings
    - add `mergify: false` because I haven't used it so far
    - add automatic releases using [GitHub Actions](https://github.com/features/actions)
      - `releaseBranches: ['main']`
      - `releaseEveryCommit: true`
      - `releaseToNpm: true` -> Yes, I want to release a new version to NPM every time :)
      - `releaseWorkflow: true`
   - add `projectType: ProjectType.LIB` since this one is a library
   - use `packageManager: NodePackageManager.NPM` if you want to use NPM instead of Yarn - might be important in case you are migrating an existing CDK Construct to projen.

   Don't forget to add necessary imports when applying the `projen` settings, e.g. for `ProjectType`.

5. Run `pj` again on your command-line.
   This will update all project files like [package.json](package.json) and similar based on what you have configured in [.projenrc.js](.projenrc.js).

### Write CDK Construct

1. Write a simple CDK construct in [src/index.ts](src/index.ts).

2. Write a simple test for this construct in [test/index.test.ts](test/index.test.ts).

3. Run `yarn run build`.
This command will execute the tests using [Jest](https://jestjs.io/) and also generate [API.md](API.md) 😍

### Connect To GitHub

If you have followed all previous steps, you'll probably have noticed that there are a few files in [.github/workflows](.github/workflows) folder.
They take care of running GitHub Actions to build and release/publish the library to NPM and other repositories.

1. Add all files to Git and commit your changes.

```shell
# Maybe adjust this to really add all files from every folder, or use IntelliJ or some Git GUI to do this
git add .
git commit -M "Initial commit"
```

### Publish to NPM

1. Create an [access token](https://docs.npmjs.com/about-access-tokens) for NPM.
   Use type 'Automation' for the token type.
   The token will be used in a GitHub Action to release your package.

2. Add the access token as a [repository secret](https://docs.github.com/en/actions/reference/encrypted-secrets) to your GitHub repository.
   Use `NPM_TOKEN` as name and insert the access token from the previous step.
   This is 

3. Push `git push -u origin main`.
   If you have configured `releaseBranches: ['main']` in [.projenrc.js](.projenrc.js) as discussed above, then a new Action run is triggered that builds your CDK construct and publishes it to NPM.

### Publish to Maven Repository

TODO

### Publish to PyPi

TODO
