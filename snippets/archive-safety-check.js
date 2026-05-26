function buildWeeklyArchiveName(date = new Date()) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `Week_${day}_${month}_${year}`;
}

function splitArchiveItems(items, options = {}) {
  const now = options.now || new Date();
  const retentionDays = options.retentionDays || 30;
  const expectedArchiveName = options.expectedArchiveName || buildWeeklyArchiveName(now);
  const cutoffTime = now.getTime() - retentionDays * 24 * 60 * 60 * 1000;

  const looseFiles = [];
  const foldersToDelete = [];
  const foldersToKeep = [];

  for (const item of items) {
    if (item.type === "file" && item.parentScope === "signed-document-root") {
      looseFiles.push(item);
      continue;
    }

    if (item.type === "folder" && item.name.startsWith("Week_")) {
      const folderDate = parseArchiveDate(item.name);

      if (folderDate && folderDate.getTime() < cutoffTime) {
        foldersToDelete.push(item);
      } else {
        foldersToKeep.push(item);
      }
    }
  }

  const currentArchiveExists = items.some(
    (item) => item.type === "folder" && item.name === expectedArchiveName
  );

  if (!currentArchiveExists && looseFiles.length > 0) {
    return {
      canCleanup: false,
      alert: true,
      reason: "Expected weekly archive is missing while loose signed files still exist.",
      expectedArchiveName,
      looseFileCount: looseFiles.length,
    };
  }

  return {
    canCleanup: true,
    alert: false,
    looseFilesToDelete: looseFiles,
    foldersToDelete,
    foldersToKeep,
  };
}

function parseArchiveDate(name) {
  const match = name.match(/^Week_(\d{2})_(\d{2})_(\d{4})$/);
  if (!match) return null;

  const day = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const year = Number(match[3]);
  return new Date(year, monthIndex, day);
}

module.exports = {
  buildWeeklyArchiveName,
  splitArchiveItems,
};
