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

// Remove the example from this file - it should be in a separate component file
// The example below shows how to use it but should not be part of the utility file
/*
'use client';

import { useEffect, useState } from 'react';
import { configureWasmLoader } from '@/utils/wasmLoader';

interface SqlModule {
  Database: new (buffer?: Uint8Array) => any;
}

export default function SomeComponentUsingWasm() {
  const [wasmModule, setWasmModule] = useState<SqlModule | null>(null);
  
  useEffect(() => {
    // Dynamic import to avoid SSR issues with WASM
    const loadWasm = async () => {
      try {
        // If using a library like sql.js, mapbox-gl, etc.
        const initSqlJs = await import('sql.js');
        const SQL = await initSqlJs.default({
          // Use our helper to properly locate WASM files
          ...configureWasmLoader('sql-js')
        });
        
        setWasmModule(SQL);
      } catch (err) {
        console.error('Failed to load WASM module:', err);
      }
    };
    
    loadWasm();
  }, []);

  return (
    <div>
      {wasmModule ? 'WASM module loaded successfully' : 'Loading WASM module...'}
    </div>
  );
}
*/