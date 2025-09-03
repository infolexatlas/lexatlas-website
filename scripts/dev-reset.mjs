// scripts/dev-reset.mjs
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIRS = [
  '.next',
  '.turbo', 
  'node_modules/.cache',
  'public/.next',
  'playwright/.cache',
  'coverage'
];

// ANSI color codes
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(message) {
  log(`🔧 ${message}`, 'blue');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

async function rmrf(dirPath, timeoutMs = 10000) {
  const fullPath = path.join(__dirname, '..', dirPath);
  const startTime = Date.now();
  
  try {
    logStep(`Checking if ${dirPath} exists...`);
    await fs.access(fullPath);
    
    logStep(`Removing ${dirPath}...`);
    
    // Create a promise that rejects after timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`Timeout: ${dirPath} deletion took >${timeoutMs}ms`)), timeoutMs);
    });
    
    // Create the actual deletion promise
    const deletePromise = fs.rm(fullPath, { recursive: true, force: true });
    
    // Race between deletion and timeout
    await Promise.race([deletePromise, timeoutPromise]);
    
    const elapsed = Date.now() - startTime;
    logSuccess(`Removed ${dirPath} (${elapsed}ms)`);
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      logStep(`${dirPath} does not exist, skipping`);
    } else if (error.message.includes('Timeout')) {
      logWarning(`${dirPath} deletion timed out after ${timeoutMs}ms`);
      throw error;
    } else {
      logWarning(`Failed to remove ${dirPath}: ${error.message}`);
    }
  }
}

async function main() {
  const startTime = Date.now();
  
  log('🚀 --- LexAtlas Dev Reset ---', 'bold');
  
  // 45s watchdog timer
  const watchdog = setTimeout(() => {
    logError('🛑 Reset timed out after 45 seconds. Aborting...');
    process.exit(1);
  }, 45000);
  
  try {
    for (const dir of DIRS) {
      await rmrf(dir);
    }
    
    clearTimeout(watchdog);
    const totalElapsed = Date.now() - startTime;
    logSuccess(`Reset complete in ${totalElapsed}ms`);
    process.exit(0);
    
  } catch (error) {
    clearTimeout(watchdog);
    logError(`Reset failed: ${error.message}`);
    process.exit(1);
  }
}

main();
