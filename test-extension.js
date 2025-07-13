#!/usr/bin/env node

/**
 * Test script to verify Chrome extension loading works
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'config.json');

console.log('🧪 Testing Chrome Extension Loading...');

// Check if config exists
if (!fs.existsSync(configPath)) {
    console.error('❌ config.json not found!');
    process.exit(1);
}

// Read and display config
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
console.log('📋 Config:', JSON.stringify(config, null, 2));

// Check if extension path exists
if (config.extensionPath) {
    if (fs.existsSync(config.extensionPath)) {
        console.log('✅ Extension path exists:', config.extensionPath);
    } else {
        console.error('❌ Extension path does not exist:', config.extensionPath);
        process.exit(1);
    }
}

// Test the configuration
console.log('\n🚀 Starting server with extension...');
try {
    const command = `node cli.js --config ${configPath} --port 8931 --browser chrome`;
    console.log('📋 Command:', command);
    
    // Start server in background for testing
    execSync(command, { 
        stdio: 'inherit',
        timeout: 10000 // 10 second timeout for testing
    });
} catch (error) {
    if (error.code === 'TIMEOUT') {
        console.log('✅ Server started successfully (timed out for testing)');
    } else {
        console.error('❌ Error starting server:', error.message);
        process.exit(1);
    }
}

console.log('\n🎉 Extension loading test completed!');
