/**
 * Helper utility for loading WASM files with proper path resolution
 * Use this when initializing libraries that require WASM files
 */
export function configureWasmLoader(moduleName: string) {
  return {
    locateFile: (path: string, scriptDirectory: string) => {
      // Check if it's a WASM file
      if (path.endsWith('.wasm')) {
        // Serve from /public/wasm directory with versioned cache busting
        return `/wasm/${moduleName}/${path}?v=1`;
      }
      // Default path resolution
      return scriptDirectory + path;
    }
  };
}