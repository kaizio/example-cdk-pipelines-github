import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ExampleCdkPipelinesGithubStack } from "./example-cdk-pipelines-github-stack";


export class MyStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    new ExampleCdkPipelinesGithubStack(this, 'Example');

  }
}

