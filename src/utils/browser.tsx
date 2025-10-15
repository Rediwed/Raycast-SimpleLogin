/**
 * CREDIT: The AppleScript snippets were taken from the whois extension
 */
// Replace macOS-specific AppleScript functionality with Windows-compatible browser integration
import { exec } from "child_process";
import { runAppleScript } from "@raycast/utils";

const CHROMIUM_BROWSERS_REGEX = /Chrome|Opera|Brave|Edge|Vivaldi/i;
const WEBKIT_BROWSERS_REGEX = /Safari|Orion/i;

export default async (): Promise<string | undefined> => {
  if (process.platform === "darwin") {
    // macOS-specific code
    const browser = await getFrontmostAppMacOS();
    let url: string | undefined;

    if (browser.match(WEBKIT_BROWSERS_REGEX)) {
      url = await getWebKitURL(browser);
    } else if (browser.match(CHROMIUM_BROWSERS_REGEX)) {
      url = await getChromiumURLMacOS(browser);
    } else if (browser.match(/Arc/i)) {
      url = await getArcURL();
    }

    if (!url) {
      return;
    }

    try {
      return new URL(url).hostname;
    } catch (error) {
      console.error("Failed to get hostname", error);
      return;
    }
  } else if (process.platform === "win32") {
    // Windows-specific code
    const browser = await getActiveBrowserWindows();
    let url: string | undefined;

    if (browser.match(CHROMIUM_BROWSERS_REGEX)) {
      url = await getChromiumURLWindows();
    }

    if (!url) {
      return;
    }

    try {
      return new URL(url).hostname;
    } catch (error) {
      console.error("Failed to get hostname", error);
      return;
    }
  }
};

const getFrontmostAppMacOS = () => {
  return runAppleScript(`
    tell application "System Events"
      set frontmostApp to name of first application process whose frontmost is true
      return frontmostApp
    end tell
  `);
};

const getWebKitURL = (browser: string) => {
  return runAppleScript(`
    tell application "${browser}" to get URL of front document
  `);
};

const getChromiumURLMacOS = (browser = "Google Chrome") => {
  return runAppleScript(`
    tell application "${browser}"
      set currentTab to active tab of front window
      set currentURL to URL of currentTab
      return currentURL
    end tell
  `);
};

const getArcURL = () => {
  return runAppleScript(`
    tell application "Arc"
      tell front window
        get the URL of active tab
      end tell
    end tell
  `);
};

const getActiveBrowserWindows = async (): Promise<string> => {
  return new Promise((resolve) => {
    exec("tasklist", (error, stdout) => {
      if (error) {
        console.error("Error fetching active browser", error);
        resolve("");
      }
      const browsers = stdout.match(CHROMIUM_BROWSERS_REGEX);
      resolve(browsers ? browsers[0] : "");
    });
  });
};

const getChromiumURLWindows = async (): Promise<string> => {
  return new Promise((resolve) => {
    exec("wmic process where name='chrome.exe' get commandline", (error, stdout) => {
      if (error) {
        console.error("Error fetching Chromium URL", error);
        resolve("");
      }
      const match = stdout.match(/--url=(\S+)/);
      resolve(match ? match[1] : "");
    });
  });
};
