import path from "path";

function toPosix(p) {
  return p.replace(/\\/g, "/");
}

function findProjectRoot(filePath) {
  // project dir is the directory whose parent is 'apps'
  let dir = path.dirname(filePath);
  const root = path.parse(dir).root;
  while (dir !== root) {
    if (path.basename(path.dirname(dir)) === "apps") return dir;
    dir = path.dirname(dir);
  }
  return null;
}

function getModuleInfo(absPath) {
  const posix = toPosix(absPath);
  const match = posix.match(
    /(?:^|\/)features\/([^/]+)\/modules\/([^/]+)(?:\/(.*)|$)/
  );
  if (!match) return null;
  return { feature: match[1], module: match[2], tail: match[3] ?? "" };
}

function resolveImportAbs(currentFilePath, importPath) {
  // only local/aliased paths considered
  const isLocal = importPath.startsWith(".") || importPath.startsWith("@/");
  if (!isLocal) return null;

  if (importPath.startsWith("@/")) {
    const base = findProjectRoot(currentFilePath);
    if (!base) return null;
    return path.join(base, importPath.slice(2));
  }
  // relative
  return path.resolve(path.dirname(currentFilePath), importPath);
}

export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "Importing modules is only allowed from the root of the /modules/<module_name>.",
    },
    messages: {
      invalidModuleImport:
        "Import from '{{importPath}}' violates module boundaries. Only imports from the module root are allowed.",
    },
    schema: [],
  },

  create(context) {
    const currentFilePath = path.resolve(context.getFilename());

    // Step 1: if importer file is not inside features, ignore all checks for this file
    const currentInFeatures = toPosix(currentFilePath).includes("/features/");
    if (!currentInFeatures) return {};

    const currentInfo = getModuleInfo(currentFilePath);

    function check(node, importPath) {
      const abs = resolveImportAbs(currentFilePath, importPath);
      if (!abs) return;

      const targetInfo = getModuleInfo(abs);
      if (!targetInfo) return; // only care about imports targeting modules

      // Step 3: if importer is inside the same module, skip
      if (
        currentInfo &&
        currentInfo.feature === targetInfo.feature &&
        currentInfo.module === targetInfo.module
      ) {
        return;
      }

      // Step 2: importer is in features, but outside target module ->
      // allow only imports through the module root (no subfolders)
      const tail = targetInfo.tail;
      if (tail === "" || !tail.includes("/")) return;

      context.report({
        node,
        messageId: "invalidModuleImport",
        data: { importPath },
      });
    }

    return {
      ImportDeclaration(node) {
        check(node, node.source.value);
      },
      ExportNamedDeclaration(node) {
        if (!node.source) return;
        check(node, node.source.value);
      },
      ExportAllDeclaration(node) {
        if (!node.source) return;
        check(node, node.source.value);
      },
    };
  },
};
