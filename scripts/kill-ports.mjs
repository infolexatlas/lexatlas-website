// scripts/kill-ports.mjs
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

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

async function killPortsUnix(ports) {
  const portList = ports.join(',');
  const command = `lsof -ti :${portList} | xargs kill -9`;
  
  try {
    logStep(`Killing processes on ports ${portList} (Unix)...`);
    const { stdout, stderr } = await execAsync(command);
    
    if (stdout.trim()) {
      const pids = stdout.trim().split('\n').filter(pid => pid);
      logSuccess(`Killed ${pids.length} process(es): ${pids.join(', ')}`);
    } else {
      logStep('No processes found on specified ports');
    }
    
    if (stderr) {
      logWarning(`stderr: ${stderr}`);
    }
    
  } catch (error) {
    if (error.code === 1) {
      // lsof returns 1 when no processes found
      logStep('No processes found on specified ports');
    } else {
      logError(`Failed to kill processes: ${error.message}`);
      throw error;
    }
  }
}

async function killPortsWindows(ports) {
  for (const port of ports) {
    try {
      logStep(`Checking port ${port} (Windows)...`);
      
      // Find processes using the port
      const findCommand = `netstat -ano | findstr :${port}`;
      const { stdout } = await execAsync(findCommand);
      
      if (stdout.trim()) {
        const lines = stdout.trim().split('\n');
        const pids = new Set();
        
        for (const line of lines) {
          const parts = line.trim().split(/\s+/);
          if (parts.length >= 5) {
            const pid = parts[4];
            if (pid && pid !== '0') {
              pids.add(pid);
            }
          }
        }
        
        if (pids.size > 0) {
          for (const pid of pids) {
            try {
              const killCommand = `taskkill /PID ${pid} /F`;
              await execAsync(killCommand);
              logSuccess(`Killed process ${pid} on port ${port}`);
            } catch (killError) {
              logWarning(`Failed to kill process ${pid}: ${killError.message}`);
            }
          }
        } else {
          logStep(`No active processes found on port ${port}`);
        }
      } else {
        logStep(`No processes found on port ${port}`);
      }
      
    } catch (error) {
      if (error.code === 1) {
        logStep(`No processes found on port ${port}`);
      } else {
        logWarning(`Error checking port ${port}: ${error.message}`);
      }
    }
  }
}

async function main() {
  const ports = [3000, 3001, 3002];
  
  log('🔫 --- LexAtlas Port Killer ---', 'bold');
  
  try {
    if (process.platform === 'win32') {
      await killPortsWindows(ports);
    } else {
      await killPortsUnix(ports);
    }
    
    logSuccess('Port killing complete');
    process.exit(0);
    
  } catch (error) {
    logError(`Port killing failed: ${error.message}`);
    process.exit(1);
  }
}

main();
