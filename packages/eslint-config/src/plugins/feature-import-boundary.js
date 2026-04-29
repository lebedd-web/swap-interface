import path from "path";
import fs from "fs";

const FOLDING_FOLDERS = {
  main: [],
  features: [],
  telegram: [],
};

function hasIndex({ rootPath, importPath }) {
  try {
    const basePath = `${rootPath}/${importPath.replace(
      "@/features/",
      "features/"
    )}/index`;

    const tsPath = `${basePath}.ts`;
    const tsxPath = `${basePath}.tsx`;

    if (fs.existsSync(tsPath) && fs.statSync(tsPath).isFile()) {
      return true;
    }

    if (fs.existsSync(tsxPath) && fs.statSync(tsxPath).isFile()) {
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
}

function findProjectRoot(filePath) {
  let dir = path.dirname(filePath);
  const root = path.parse(dir).root;

  while (dir !== root) {
    if (path.basename(path.dirname(dir)) === "apps") return dir;
    dir = path.dirname(dir);
  }
  return null;
}

function getFeatureName(filePath) {
  const normalized = filePath.replace(/\\/g, "/");
  const match = normalized.match(/\/src\/features\/(common\/[^/]+|[^/]+)\//);
  return match?.[1] ? `features/${match?.[1]}` : null;
}

function getProjectName(filePath) {
  const normalized = filePath.replace(/\\/g, "/");
  const match = normalized.match(/\/apps\/([^/]+)\//);
  return match?.[1] || null;
}

export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "Importing features is only allowed from the root of the features/<feature_name>.",
    },
    messages: {
      invalidImport:
        "Import from '{{importPath}}' violates feature boundaries. Only imports from the feature root are allowed.",
    },
    schema: [],
  },

  create(context) {
    const currentFilePath = path.resolve(context.getFilename());
    const rootPath = findProjectRoot(currentFilePath);

    return {
      ImportDeclaration(node) {
        const setError = () => {
          context.report({
            node,
            messageId: "invalidImport",
            data: {
              importPath,
            },
          });
        };

        const importPath = node.source.value;

        if (!importPath.startsWith("@/features/")) return;

        const projectName = getProjectName(currentFilePath);
        const currentFeatureName = getFeatureName(currentFilePath);

        const isImportFromSameFeature =
          currentFilePath.includes(currentFeatureName);

        if (isImportFromSameFeature) return;

        const relative = importPath.replace("@/features/", "");
        const parts = relative.split("/");

        if (parts.length < 1) return;

        if (FOLDING_FOLDERS[projectName]?.includes(parts[0])) {
          if (parts.length > 3) {
            setError();
            return;
          }
          if (parts.length === 3 && hasIndex({ rootPath, importPath })) {
            setError();
            return;
          }
          return;
        }

        if (parts.length > 2) {
          setError();
          return;
        }

        if (parts.length === 2 && hasIndex({ rootPath, importPath })) {
          setError();
          return;
        }
      },
    };
  },
};
