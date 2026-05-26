# Architecture Notes

This project documents a signed document delivery workflow for completed DocuSign PDFs stored in SharePoint. The workflow is written as an n8n automation and uses Microsoft Graph for SharePoint and email operations.

## Workflow overview

1. A weekly schedule starts the delivery run.
2. The workflow reads the signed document folder in SharePoint.
3. Only completed PDF files in the expected folder scope are kept.
4. A dated weekly archive folder is prepared.
5. Signed documents are copied into the archive.
6. Archived files are downloaded and converted into email attachments.
7. The email payload is prepared for Microsoft Graph.
8. Large attachment sets are split into smaller batches.
9. Delivery status is posted to Slack.
10. A cleanup branch later checks archive state before deleting loose files.

## Core design decisions

### Archive before cleanup

The cleanup branch checks that the expected weekly archive exists before deleting loose files. If signed documents exist in the root folder but the weekly archive is missing, the workflow stops and posts an alert. This prevents document loss when the delivery or archive step fails.

### Batch large deliveries

Email delivery can fail when attachments are too large. The workflow calculates attachment batches and sends multiple smaller emails when needed. This keeps delivery reliable without changing the document set.

### Keep DocuSign visible but generalized

The workflow is described as signed document delivery, but the documentation clearly states that the source documents are completed DocuSign PDFs. Specific recipients, business names, folder IDs, tenant IDs, and email templates are not published.

### Slack for operational visibility

Slack status messages confirm delivery, batch count, cleanup completion, or safety alerts. This makes the workflow easier to monitor without opening n8n or SharePoint after every run.

## Private information not included

The public repository does not include:

- original n8n workflow JSON
- active credentials or secrets
- Microsoft tenant IDs or client IDs
- SharePoint drive or folder IDs
- real recipients or mailbox addresses
- company-specific email templates
- Slack channel IDs or user IDs
- signed document content

## Technologies

- n8n
- DocuSign
- SharePoint
- Microsoft Graph
- Slack
- JavaScript
