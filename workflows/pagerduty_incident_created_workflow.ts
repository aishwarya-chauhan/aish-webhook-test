import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

/**
 * A pagerduty workflow which get's triggered via a webhook..
 */
const PagerdutyWorkflow = DefineWorkflow({
  callback_id: "pagerduty_incident_created_workflow",
  title: "Webhook Pagerduty incident created workflow",
  description: "Pagerduty incident created workflow triggered when an inc is created",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
      },
      incident_id: {
        type: Schema.types.string,
      },
      incident_title: {
        type: Schema.types.string,
      },
      incident_url: {
        type: Schema.types.string,
      },
      service_id: {
        type: Schema.types.string,
      },
      service_summary: {
        type: Schema.types.string,
      },
      escalation_policy: {
        type: Schema.types.string,
      },  
      urgency: {
        type: Schema.types.string,
      },   
    },
    required: ["channel", "incident_id"],
  },
});


/**
 * SendMessage is a Slack function. These are
 * Slack-native actions, like creating a channel or sending
 * a message and can be used alongside custom functions in a workflow.
 * https://api.slack.com/automation/functions
 *  
 * 
 */
PagerdutyWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: PagerdutyWorkflow.inputs.channel,
  message: `:wave: An incident has been created. Details are: 
  \n *Incident Id:* ${PagerdutyWorkflow.inputs.incident_id}
  \n *Incident title:*  ${PagerdutyWorkflow.inputs.incident_title} 
  \n *Incident Url:* ${PagerdutyWorkflow.inputs.incident_url}
  \n *Escalation policy:* ${PagerdutyWorkflow.inputs.escalation_policy}
  \n *Service:* ${PagerdutyWorkflow.inputs.service_id}
  `,
});
export default PagerdutyWorkflow;