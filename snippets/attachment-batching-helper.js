const MAX_BATCH_SIZE_MB = 3.5;

function createAttachmentBatches(files, maxBatchSizeMb = MAX_BATCH_SIZE_MB) {
  const batches = [];
  let currentBatch = [];
  let currentSizeMb = 0;

  for (const file of files) {
    const sizeMb = Number(file.sizeMb || 0);

    if (currentBatch.length && currentSizeMb + sizeMb > maxBatchSizeMb) {
      batches.push(currentBatch);
      currentBatch = [];
      currentSizeMb = 0;
    }

    currentBatch.push({
      name: file.safeName,
      contentType: file.contentType || "application/pdf",
      contentBytes: file.base64Content,
    });
    currentSizeMb += sizeMb;
  }

  if (currentBatch.length) {
    batches.push(currentBatch);
  }

  return batches.map((attachments, index) => ({
    batchNumber: index + 1,
    totalBatches: batches.length,
    attachmentCount: attachments.length,
    attachments,
  }));
}

function buildGraphEmailPayload(batch, options) {
  return {
    message: {
      subject: `${options.subjectPrefix} ${batch.batchNumber}/${batch.totalBatches}`,
      body: {
        contentType: "HTML",
        content: options.bodyHtml,
      },
      toRecipients: options.toRecipients.map((address) => ({
        emailAddress: { address },
      })),
      attachments: batch.attachments.map((file) => ({
        "@odata.type": "#microsoft.graph.fileAttachment",
        name: file.name,
        contentType: file.contentType,
        contentBytes: file.contentBytes,
      })),
    },
    saveToSentItems: true,
  };
}

module.exports = {
  createAttachmentBatches,
  buildGraphEmailPayload,
};
