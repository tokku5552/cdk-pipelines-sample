import { SecretValue, Stack, StackProps } from "aws-cdk-lib";
import * as pipelines from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { DeployStage } from "./deploy-stage";

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new pipelines.CodePipeline(this, "CodePipeline", {
      synth: new pipelines.CodeBuildStep("Synth", {
        input: pipelines.CodePipelineSource.gitHub(
          "tokku5552/cdk-pipelines-sample",
          "main",
          {
            authentication: SecretValue.secretsManager("github-token"),
          }
        ),
        commands: ["yarn", "yarn build", "npx cdk synth --all"],
      }),
    });

    pipeline.addStage(new DeployStage(this, "DeployStage"));
  }
}
