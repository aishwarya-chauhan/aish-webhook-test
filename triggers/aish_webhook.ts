import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerTypes } from "deno-slack-api/mod.ts";
import SampleWorkflow from "../workflows/aish_webhook_workflow.ts";

const trigger: Trigger<typeof SampleWorkflow.definition> = {
  type: TriggerTypes.Webhook,
  name: "Sends input string to my channel",
  description: "runs the aish webhook workflow",
  workflow: "#/workflows/aish_webhook_workflow",
  inputs: {
    channel: {
      value: "{{data.channel}}",
    },
    message_string: {
      value: "{{data.message_string}}",
    },
    first_name: {
      value: "{{data.user.first_name}}"
    }
  },
  webhook: {},
};

export default trigger;
