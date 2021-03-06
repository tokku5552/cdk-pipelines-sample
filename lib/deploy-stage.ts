import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ApplicationStack } from "./application-stack";

export class DeployStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    new ApplicationStack(this, "ApplicationStack");
  }
}
