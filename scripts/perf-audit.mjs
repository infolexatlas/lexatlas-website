#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'http://localhost:3000';
const PAGES = [
  { path: '/', name: 'Home' },
  { path: '/pricing', name: 'Pricing' },
  { path: '/kits/fra-usa', name: 'Kit Page' }
];

const REPORTS_DIR = './.reports/lh';

// Ensure reports directory exists
if (!existsSync(REPORTS_DIR)) {
  mkdirSync(REPORTS_DIR, { recursive: true });
}

// Check if dev server is running
function isServerRunning() {
  try {
    execSync(`curl -s -o /dev/null -w "%{http_code}" ${BASE_URL}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Start dev server if not running
function startDevServer() {
  if (!isServerRunning()) {
    console.log('🚀 Starting dev server...');
    execSync('npm run dev', { stdio: 'ignore', detached: true });
    
    // Wait for server to start
    let attempts = 0;
    while (!isServerRunning() && attempts < 30) {
      console.log(`⏳ Waiting for server... (${attempts + 1}/30)`);
      execSync('sleep 2', { stdio: 'ignore' });
      attempts++;
    }
    
    if (!isServerRunning()) {
      throw new Error('Failed to start dev server');
    }
    console.log('✅ Dev server ready');
  } else {
    console.log('✅ Dev server already running');
  }
}

// Run Lighthouse audit
function runLighthouse(page) {
  const url = `${BASE_URL}${page.path}`;
  const outputPath = join(REPORTS_DIR, `${page.name.toLowerCase().replace(/\s+/g, '-')}`);
  
  console.log(`\n🔍 Auditing ${page.name} (${url})...`);
  
  try {
    execSync(`npx lighthouse ${url} \
      --output=html,json \
      --output-path=${outputPath} \
      --chrome-flags="--headless --no-sandbox --disable-gpu" \
      --only-categories=performance \
      --preset=desktop \
      --throttling.cpuSlowdownMultiplier=1 \
      --throttling.rttMs=40 \
      --throttling.throughputKbps=10240`, 
      { stdio: 'pipe' }
    );
    
    return { success: true, outputPath };
  } catch (error) {
    console.error(`❌ Failed to audit ${page.name}:`, error.message);
    return { success: false, error: error.message };
  }
}

// Parse Lighthouse results
function parseResults(outputPath) {
  try {
    const jsonPath = `${outputPath}.report.json`;
    const jsonData = JSON.parse(execSync(`cat ${jsonPath}`, { encoding: 'utf8' }));
    
    const metrics = jsonData.audits;
    const categories = jsonData.categories;
    
    return {
      performance: Math.round(categories.performance.score * 100),
      lcp: metrics['largest-contentful-paint']?.numericValue || 0,
      cls: metrics['cumulative-layout-shift']?.numericValue || 0,
      fid: metrics['max-potential-fid']?.numericValue || 0,
      tbt: metrics['total-blocking-time']?.numericValue || 0,
      fcp: metrics['first-contentful-paint']?.numericValue || 0,
      si: metrics['speed-index']?.numericValue || 0,
      tti: metrics['interactive']?.numericValue || 0,
      bundleSize: metrics['total-byte-weight']?.numericValue || 0
    };
  } catch (error) {
    console.error('Failed to parse results:', error.message);
    return null;
  }
}

// Format metrics for display
function formatMetric(value, unit = 'ms') {
  if (unit === 'ms') {
    return value < 1000 ? `${Math.round(value)}ms` : `${(value / 1000).toFixed(1)}s`;
  }
  if (unit === 'KB') {
    return value < 1024 ? `${Math.round(value)}KB` : `${(value / 1024).toFixed(1)}MB`;
  }
  return value;
}

// Main execution
async function main() {
  console.log('🎯 LexAtlas Performance Audit');
  console.log('================================');
  
  try {
    startDevServer();
    
    const results = [];
    
    for (const page of PAGES) {
      const auditResult = runLighthouse(page);
      if (auditResult.success) {
        const metrics = parseResults(auditResult.outputPath);
        if (metrics) {
          results.push({ page: page.name, ...metrics });
        }
      }
    }
    
    // Print summary
    console.log('\n📊 Performance Summary');
    console.log('======================');
    
    results.forEach(result => {
      console.log(`\n${result.page}:`);
      console.log(`  Performance Score: ${result.performance}/100`);
      console.log(`  LCP: ${formatMetric(result.lcp)}`);
      console.log(`  CLS: ${result.cls.toFixed(3)}`);
      console.log(`  FCP: ${formatMetric(result.fcp)}`);
      console.log(`  TTI: ${formatMetric(result.tti)}`);
      console.log(`  Bundle Size: ${formatMetric(result.bundleSize, 'KB')}`);
    });
    
    // Overall assessment
    console.log('\n🎯 Assessment:');
    const avgPerformance = Math.round(results.reduce((sum, r) => sum + r.performance, 0) / results.length);
    const maxLCP = Math.max(...results.map(r => r.lcp));
    const maxCLS = Math.max(...results.map(r => r.cls));
    
    if (avgPerformance >= 90) {
      console.log('✅ Excellent performance!');
    } else if (avgPerformance >= 70) {
      console.log('⚠️  Good performance, room for improvement');
    } else {
      console.log('❌ Performance needs attention');
    }
    
    if (maxLCP > 2500) {
      console.log('⚠️  LCP is above recommended threshold (2.5s)');
    }
    
    if (maxCLS > 0.1) {
      console.log('⚠️  CLS is above recommended threshold (0.1)');
    }
    
    console.log(`\n📁 Reports saved to: ${REPORTS_DIR}`);
    
  } catch (error) {
    console.error('❌ Audit failed:', error.message);
    process.exit(1);
  }
}

main();
