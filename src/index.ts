import { ReactNative as RN } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin";

import Settings from "./components/Settings";
import { emojiPacks, type Pack } from "./stuff/packs";
import patcher from "./stuff/patcher";

export const vstorage = storage as { emojipack: Pack };

export const lang = { unload: () => {} };

export function onLoad() {
	if (!emojiPacks[vstorage.emojipack]) {
		vstorage.emojipack = "ios26";
	}
}

export const onUnload = patcher();
export const settings = Settings;
