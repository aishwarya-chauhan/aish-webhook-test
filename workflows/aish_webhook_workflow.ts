import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

/**
 * A workflow is a set of steps that are executed in order.
 * Each step in a workflow is a function.
 * https://api.slack.com/automation/workflows
 *
 * 
 * https://api.slack.com/automation/forms#add-interactivity
 */
const SampleWorkflow = DefineWorkflow({
  callback_id: "aish_webhook_workflow",
  title: "Webhook workflow",
  description: "A sample Webhook workflow",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
      },
      message_string: {
        type: Schema.types.string,
      },
      first_name: {
        type: Schema.types.string,
      }
    },
    required: ["channel", "message_string", "first_name"],
  },
});


/**
 * SendMessage is a Slack function. These are
 * Slack-native actions, like creating a channel or sending
 * a message and can be used alongside custom functions in a workflow.
 * https://api.slack.com/automation/functions
 */
SampleWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: SampleWorkflow.inputs.channel,
  message: `${SampleWorkflow.inputs.first_name} omg ${SampleWorkflow.inputs.message_string}`,
});
export default SampleWorkflow;