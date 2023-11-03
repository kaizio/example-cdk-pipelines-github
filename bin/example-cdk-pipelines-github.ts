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
    gitHubActionRoleArn: 'arn:aws:iam::135389062494:role/GitHubActionRole',
  }),
});

pipeline.addStage(new MyStage(app, 'Dev1', {
  env: {
    account: '135389062494',
    region: 'us-east-2'
  }

}))

app.synth()

