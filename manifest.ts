import { Manifest, DefineType, Schema } from "deno-slack-sdk/mod.ts";
import SampleWorkflow from "./workflows/aish_webhook_workflow.ts";
import PagerdutyWorkflow from "./workflows/pagerduty_incident_created_workflow.ts";
import SampleObjectDatastore from "./datastores/sample_datastore.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */

export const ServiceSchema = DefineType({
  name: "service",
  type: Schema.types.object,
  properties: {
    id: {
      name: "service_id",
      type: Schema.types.string,
    },
    summary: {
      name: "service_summary",
      type: Schema.types.string,
    }
  }, 
  required: [],
});


export const EscalationPolicySchema = DefineType({
  name: "escalation_policy",
  type: Schema.types.object,
  properties: {
    id: {
      name: "escalation_policy_id",
      type: Schema.types.string,
    },
    summary: {
      name: "escalation_policy_summary",
      type: Schema.types.string,
    }
  },
  required: [],
});

const WebhookSchema = DefineType({
  name: "pagerduty_incident_created",
  description: "Used for payloads to the webhook when a pagerduty incident is created",
  type: Schema.types.object,
  properties: {
    channel: {
      name: "channel_id",
      type: Schema.slack.types.channel_id,
    },
    title: {
      name: "incident_title",
      type: Schema.types.string,
    },
    html_url: {
      name: "incident_url",
      type: Schema.types.string,
    },
    service: {
      type: ServiceSchema
    },
    escalation_policy: {
      type: EscalationPolicySchema
    }, 
    urgency: {
      name: "urgency",
      type: Schema.types.string,
    },   
  },
});

export default Manifest({
  name: "aish-webhook-test",
  description: "A template for building Slack apps with Deno",
  icon: "assets/default_new_app_icon.png",
  workflows: [SampleWorkflow, PagerdutyWorkflow],
  outgoingDomains: ["hooks.dev1148.slack.com", "hooks.dev.slack.com",],
  datastores: [SampleObjectDatastore],
  types: [WebhookSchema, EscalationPolicySchema, ServiceSchema],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "datastore:read",
    "datastore:write",
  ],
});
