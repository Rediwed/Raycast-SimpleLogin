/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** SimpleLogin API Token - Set your SimpleLogin API Token */
  "api_token": string,
  /** SimpleLogin API - Set your SimpleLogin app url */
  "app_url": string,
  /** Mode - Choose between UUID and word mode */
  "mode": "word" | "uuid"
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `create_alias` command */
  export type CreateAlias = ExtensionPreferences & {}
  /** Preferences accessible in the `create_random_alias` command */
  export type CreateRandomAlias = ExtensionPreferences & {
  /** Prefill Alias Description - Prefill the alias description based on the hostname of the currently active tab in your browser. */
  "prefill_alias_note": boolean
}
  /** Preferences accessible in the `list_alias` command */
  export type ListAlias = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `create_alias` command */
  export type CreateAlias = {}
  /** Arguments passed to the `create_random_alias` command */
  export type CreateRandomAlias = {}
  /** Arguments passed to the `list_alias` command */
  export type ListAlias = {}
}

