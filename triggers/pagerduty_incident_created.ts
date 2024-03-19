import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerTypes } from "deno-slack-api/mod.ts";
import PagerdutyWorkflow from "../workflows/pagerduty_incident_created_workflow.ts";


/**
 * A webhook trigger with nested shcema_ref and inputs for pagerduty incident created
 */
const trigger: Trigger<typeof PagerdutyWorkflow.definition> = {
  type: TriggerTypes.Webhook,
  name: "Get info of incident created in pagerduty",
  description: "Notify when an incident has been created in pagerduty",
  workflow: "#/workflows/pagerduty_incident_created_workflow",
  webhook: {
    schema_ref: "#/types/pagerduty_incident_created",
  },
  inputs: {
    incident_id: {
      value: "{{data.id}}",
    },
    incident_title: {
      value: "{{data.title}}",
    },
    incident_url: {
      value: "{{data.html_url}}",
    },
    service_id: {
      value: "{{data.service.id}}",
    },
    service_summary: {
      value: "{{data.service.summary}}",
    },
    escalation_policy: {
      value: "{{data.escalation_policy.id}}"
    },
    urgency: {
      value: "{{data.urgency}}"
    }, 
    channel: {
      value: "{{data.channel}}",
    },
  },
};

export default trigger;
