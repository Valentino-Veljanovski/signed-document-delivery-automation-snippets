# Signed Document Delivery Automation Snippets

A public reference repository for selected architecture notes and sanitized JavaScript helper patterns from a private signed document delivery automation.

The private workflow handles completed DocuSign PDF documents stored in SharePoint. It prepares a weekly archive, builds delivery emails with PDF attachments, splits large deliveries into smaller email batches, posts Slack status messages, and runs a cleanup branch with safety checks.

The repository is intentionally limited to documentation and rewritten snippets. It does not contain original n8n workflow exports, active credentials, tenant identifiers, SharePoint drive IDs, Slack workspace IDs, real recipients, company-specific email templates, or private document data.

## What this repo documents

- Collecting completed DocuSign PDFs from a SharePoint folder.
- Creating a dated weekly archive before delivery.
- Preparing Microsoft Graph email payloads with PDF attachments.
- Splitting large attachment sets into smaller email batches.
- Posting delivery and cleanup status to Slack.
- Stopping cleanup when the expected archive folder is missing.

## Why publish this?

This repository exists as a portfolio case study and technical reference for document delivery automation. It shows how I structure a workflow that moves signed documents from completion to delivery while keeping an audit-friendly archive and basic operational safeguards.

The full portfolio case study is available at:
https://www.valentinoveljanovski.de/projects/signed-document-delivery-automation

## Public files

- `docs/architecture.md`: sanitized architecture notes and design decisions.
- `snippets/attachment-batching-helper.js`: helper pattern for splitting email attachments into batches.
- `snippets/archive-safety-check.js`: helper pattern for checking archive state before cleanup.
- `snippets/README.md`: short notes about the public snippets.

## About

Built by Valentino Veljanovski as a sanitized reference from a private automation project. The public material is generalized so the workflow can be reviewed without exposing private infrastructure or business data.
