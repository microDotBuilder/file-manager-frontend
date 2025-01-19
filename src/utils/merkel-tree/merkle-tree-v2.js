/**
 * merkle-tree.js
 *
 * A Merkle-like tree generator that:
 *  - Reads .pm2ignore
 *  - Uses 'ignore' package to filter out ignored paths
 *  - Builds a content hash for files/folders
 *  - (Optionally) includes Base64-encoded file content in the tree
 */
import crypto from "crypto";
import fs from "fs";
import ignore from "ignore";
import path from "path";

/**
 * Configuration: If you want to control whether we embed file content,
 * set this to `true/false`. For large files, be careful about memory usage.
 */
const EMBED_FILE_CONTENT = true;

/**
 * Read .pm2ignore and create an ignore filter.
 *
 * By default, we look in the same directory where this script runs.
 * If needed, you can pass a different path to .pm2ignore.
 */
function loadPm2Ignore(ignoreFilePath = ".pm2ignore") {
  try {
    if (!fs.existsSync(ignoreFilePath)) {
      console.warn(
        `Warning: .pm2ignore file not found at path: ${ignoreFilePath}`
      );
      return ignore();
    }
    const ignoreContent = fs.readFileSync(ignoreFilePath, "utf8");
    return ignore().add(ignoreContent);
  } catch (err) {
    console.error(`Error loading .pm2ignore file: ${err.message}`);
    return ignore();
  }
}

/**
 * Generate a Merkle-like tree for a given folder or file,
 * skipping anything matched by the ignore filter.
 *
 * @param {string} targetPath - absolute path to file/folder to analyze
 * @param {object} ignoreFilter - the instance from 'ignore()'
 * @param {string} baseDir - absolute path to the root directory we consider
 */
function generateMerkleTreeWithContent(targetPath, ignoreFilter, baseDir) {
  const stats = fs.statSync(targetPath);
  const baseName = path.basename(targetPath);

  // We'll create a relative path from baseDir so ignore can match properly
  const relative = path.relative(baseDir, targetPath);

  // Check if the relative path is ignored by .pm2ignore
  // - If it's the root folder itself (relative === ''), we won't ignore it
  if (relative && ignoreFilter.ignores(relative)) {
    // If ignored, return null or undefined to signal "skip"
    return null;
  }

  if (stats.isFile()) {
    // Compute file's content hash
    const contentHash = computeFileHash(targetPath);

    // Optionally embed file content (Base64-encoded)
    let fileContentBase64 = null;
    if (EMBED_FILE_CONTENT) {
      const fileBuffer = fs.readFileSync(targetPath);
      fileContentBase64 = fileBuffer.toString("base64");
    }

    return {
      type: "file",
      name: baseName,
      contentHash,
      size: stats.size,
      lastModified: stats.mtime.toISOString(),
      // If EMBED_FILE_CONTENT is true, store the base64 in 'content'
      content: fileContentBase64,
    };
  }

  if (stats.isDirectory()) {
    // Recurse on children
    const childNames = fs.readdirSync(targetPath);

    const children = [];
    for (const childName of childNames) {
      const childPath = path.join(targetPath, childName);
      const childNode = generateMerkleTreeWithContent(
        childPath,
        ignoreFilter,
        baseDir
      );
      if (childNode) {
        children.push(childNode);
      }
    }

    // Sort children by name to get stable ordering
    children.sort((a, b) => a.name.localeCompare(b.name));

    // Build folder's contentHash from the child name + child contentHash
    const folderHash = computeFolderHash(children);

    return {
      type: "folder",
      name: baseName,
      contentHash: folderHash,
      children,
    };
  }

  // Handle symlinks or other file types if needed. For now, skip or mark as "unknown."
  return {
    type: "unknown",
    name: baseName,
    contentHash: "",
  };
}

/**
 * Compute SHA-256 for the entire file contents.
 */
function computeFileHash(filePath) {
  const hash = crypto.createHash("sha256");
  const fileBuffer = fs.readFileSync(filePath);
  hash.update(fileBuffer);
  return hash.digest("hex");
}

/**
 * Compute folder hash by hashing each child's (name + contentHash).
 * This ensures renaming a file changes the parent's hash even if content is the same.
 */
function computeFolderHash(children) {
  const hash = crypto.createHash("sha256");
  for (const child of children) {
    hash.update(child.name + ":" + child.contentHash);
  }
  return hash.digest("hex");
}

export { loadPm2Ignore, generateMerkleTreeWithContent };
