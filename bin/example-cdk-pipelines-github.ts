#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { ExampleCdkPipelinesGithubStack } from '../lib/example-cdk-pipelines-github-stack';
import { MyGitHubActionRole } from '../lib/my-github-action-role';
import { AwsCredentials, GitHubWorkflow } from 'cdk-pipelines-github';
import { MyStage } from '../lib/pipeline';

const app = new cdk.App();

const pipeline = new GitHubWorkflow(app, 'Pipeline', {
  synth: new ShellStep('Build', {
    commands: [
      'yarn install',
      'yarn build',
      'npx cdk synth',
    ],

  }),
  awsCreds: AwsCredentials.fromOpenIdConnect({
    gitHubActionRoleArn: 'arn:aws:iam::887227680077:role/GitHubActionRole',
  }),
});

pipeline.addStageWithGitHubOptions(new MyStage(app, 'Dev', {
  env: {
    account: '887227680077',
    region: 'us-east-2'
  }

}))

app.synth()

