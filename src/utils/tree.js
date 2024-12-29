import fs from "fs";

export const basePath =
  "/Users/sarvinderjitsingh/Desktop/sarvinder/pm2-process/file-manager-frontend";

// 1) Our root structure
export const tree = {
  base: basePath,
  children: [],
};

export function parseLine(line) {
  // e.g. "Folder added: /Users/.../test-folder/test"
  const [left, right] = line.split(": ");
  const [type, action] = left.split(" ");
  let fullPath = right.trim();

  // Remove base from the full path
  let relativePath = fullPath.replace(basePath, "");
  if (!relativePath.startsWith("/")) {
    relativePath = "/" + relativePath;
  }

  return { type, action, relativePath };
}

// 4) Insert path into the dictionary structure
function insertPath(node, path, itemType) {
  const segments = path.replace(/^\//, "").split("/");
  let current = node;

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const isLast = i === segments.length - 1;

    if (!current.children[segment]) {
      current.children[segment] = {
        // If last, use the type from the log; else assume Folder
        type: isLast ? itemType : "Folder",
        name: segment,
        relativePath: "/" + segments.slice(0, i + 1).join("/"),
        children: {},
      };
    }

    current = current.children[segment];
  }
}

// 5) Convert dictionary-based children into an array
function dictToArray(node) {
  const childArray = Object.keys(node.children).map((childName) => {
    return dictToArray(node.children[childName]);
  });

  const newNode = {
    // only the root node might have base
    ...(node.base ? { base: node.base } : {}),
    type: node.type,
    name: node.name,
    relativePath: node.relativePath,
    children: childArray,
  };

  return newNode;
}

// goes thought the folder and create the
//instruction array to create the tree
export function createTree() {
  const instructions = [];
  const path = `${basePath}/test-folder`;

  function shouldExcludePath(path) {
    return path.includes("file-manager-frontend/.git/");
  }

  function traverseDirectory(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = `${currentPath}/${entry.name}`;

      // Skip if path contains .git after file-manager-frontend
      // if (shouldExcludePath(fullPath)) {
      //   continue;
      // }

      if (entry.isDirectory()) {
        instructions.push(`Folder added: ${fullPath}`);
        traverseDirectory(fullPath);
      } else {
        instructions.push(`File added: ${fullPath}`);
      }
    }
  }

  // Start the traversal from the root path
  traverseDirectory(path);
  return instructions;
}
export function test(lines) {
  //
  for (const line of lines) {
    const { type, action, relativePath } = parseLine(line, basePath);

    // We'll only differentiate "File" vs "Folder".
    // If you also want "removed" items in the tree, you might track that differently.
    // For now, we ignore "added"/"removed" and just use it if needed.
    insertPath(tree, relativePath, type);
  }
  const finalTree = dictToArray(tree);
  // 5) Print the final JSON structure
  return finalTree;
}
