# Chrome Extension Support

This document explains how to load Chrome extensions with the Playwright MCP server.

## Overview

Chrome extensions can be loaded using a persistent context with specific arguments. The server automatically configures the browser to load extensions when an extension path is provided.

## Configuration Options

### Option 1: Using config.json

Create or update your `config.json` file:

```json
{
  "extensionPath": "C:\\path\\to\\your\\extension",
  "userDataDir": "C:\\Users\\username\\AppData\\Local\\Google\\Chrome\\User Data"
}
```

### Option 2: Command Line

```bash
node cli.js --extension-path "C:\\path\\to\\your\\extension" --port 8931 --browser chrome
```

### Option 3: Combined

```bash
node cli.js --config config.json --extension-path "C:\\path\\to\\another\\extension" --port 8931
```

## How It Works

When you specify an `extensionPath`, the server automatically:

1. **Adds extension arguments**:
   - `--disable-extensions-except=<path>`
   - `--load-extension=<path>`

2. **Forces headless=false**: Extensions don't work in headless mode

3. **Uses persistent context**: Extensions require `launchPersistentContext`

4. **Validates extension path**: Ensures the path exists before starting

## Browser Compatibility

- ✅ **Chrome** (`--browser chrome`)
- ✅ **Chromium** (`--browser chromium`)  
- ✅ **Edge** (`--browser msedge`)
- ❌ **Firefox** (not supported)
- ❌ **WebKit** (not supported)

## Example Usage

1. **Start with extension:**
   ```bash
   node cli.js --config config.json --port 8931 --browser chrome
   ```

2. **Test the configuration:**
   ```bash
   node test-extension.js
   ```

3. **Check server logs:**
   The server will display the full configuration including extension args.

## Configuration Properties

| Property | Type | Description |
|----------|------|-------------|
| `extensionPath` | String | Absolute path to extension directory |
| `userDataDir` | String | Chrome user data directory (optional) |

## Important Notes

1. **Use absolute paths** for extension directories
2. **Extensions require headless=false** (set automatically)
3. **User data directory** is optional but recommended for persistence
4. **Extension validation** happens at startup - invalid paths will cause errors
5. **Persistent context** is used automatically (not isolated mode)

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Extension not loading | Check that path exists and is readable |
| Browser won't start | Verify Chrome is installed and accessible |
| Extension errors | Check extension manifest.json is valid |
| Permission denied | Ensure extension directory has read permissions |

## Example Extension Structure

```
extension-directory/
├── manifest.json
├── popup.html
├── background.js
└── icons/
    └── icon.png
```

## Testing

Run the test script to verify your configuration:

```bash
node test-extension.js
```

This will:
- Validate your config.json
- Check if extension path exists
- Test server startup
- Display configuration details
