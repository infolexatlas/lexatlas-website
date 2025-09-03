// scripts/dev-hard-reset.mjs
import fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

async function runDevReset() {
  logStep('Running dev reset...');
  const { execSync } = await import('child_process');
  execSync('node scripts/dev-reset.mjs', { stdio: 'inherit' });
}

async function removeNodeModules() {
  const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
  const startTime = Date.now();
  
  try {
    logStep('Checking if node_modules exists...');
    await fs.access(nodeModulesPath);
    
    logStep('Removing node_modules...');
    
    // 30s timeout for node_modules removal
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout: node_modules deletion took >30s')), 30000);
    });
    
    const deletePromise = fs.rm(nodeModulesPath, { recursive: true, force: true });
    await Promise.race([deletePromise, timeoutPromise]);
    
    const elapsed = Date.now() - startTime;
    logSuccess(`Removed node_modules (${elapsed}ms)`);
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      logStep('node_modules does not exist, skipping');
    } else if (error.message.includes('Timeout')) {
      logWarning('node_modules deletion timed out after 30s');
      throw error;
    } else {
      logWarning(`Failed to remove node_modules: ${error.message}`);
      throw error;
    }
  }
}

async function reinstallDependencies() {
  try {
    logStep('Checking for package-lock.json...');
    const lockPath = path.join(__dirname, '..', 'package-lock.json');
    
    try {
      await fs.access(lockPath);
      logStep('Found package-lock.json, using npm ci...');
      const { stdout, stderr } = await execAsync('npm ci');
      if (stdout) logStep(stdout);
      if (stderr) logWarning(stderr);
      logSuccess('Dependencies installed with npm ci');
    } catch (error) {
      if (error.code === 'ENOENT') {
        logStep('No package-lock.json found, using npm install...');
        const { stdout, stderr } = await execAsync('npm install');
        if (stdout) logStep(stdout);
        if (stderr) logWarning(stderr);
        logSuccess('Dependencies installed with npm install');
      } else {
        throw error;
      }
    }
    
  } catch (error) {
    logError(`Failed to reinstall dependencies: ${error.message}`);
    throw error;
  }
}

async function runKillPorts() {
  try {
    logStep('Running port killer...');
    const { execSync } = await import('child_process');
    execSync('node scripts/kill-ports.mjs', { stdio: 'inherit' });
  } catch (error) {
    logWarning(`Port killer failed: ${error.message}`);
  }
}

async function main() {
  const startTime = Date.now();
  
  log('💥 --- LexAtlas Hard Reset ---', 'bold');
  
  // 2 minute watchdog timer
  const watchdog = setTimeout(() => {
    logError('🛑 Hard reset timed out after 2 minutes. Aborting...');
    process.exit(1);
  }, 120000);
  
  try {
    // Step 1: Run dev reset
    await runDevReset();
    
    // Step 2: Remove node_modules
    await removeNodeModules();
    
    // Step 3: Reinstall dependencies
    await reinstallDependencies();
    
    // Step 4: Kill ports
    await runKillPorts();
    
    clearTimeout(watchdog);
    const totalElapsed = Date.now() - startTime;
    logSuccess(`Hard reset complete in ${totalElapsed}ms`);
    process.exit(0);
    
  } catch (error) {
    clearTimeout(watchdog);
    logError(`Hard reset failed: ${error.message}`);
    process.exit(1);
  }
}

main();
