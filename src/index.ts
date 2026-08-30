import { instead } from "@revenge-mod/patcher";
import { storage } from "@revenge-mod/storage";
import { ReactNative as RN, React } from "@revenge-mod/metro/common";

import Settings from "./components/Settings";
import { emojiPacks, type Pack } from "./stuff/packs";
import { getSrc, parse } from "./stuff/parser";
import CustomTwemoji from "./components/CustomTwemoji";

export const vstorage = storage as { emojipack: Pack };

export function onLoad() {
	if (!emojiPacks[vstorage.emojipack]) {
		vstorage.emojipack = "ios26";
	}
}

export function onUnload() {
	const patches: (() => void)[] = [];

	patches.push(
		instead("Image", RN, (args, orig) => {
			const cloned = args.slice();
			const [x] = cloned;
			if (!x || x.vanilla) return orig(...cloned);

			const { source } = x;

			if (source?.uri?.startsWith("asset:/emoji-")) {
				cloned[0] = {
					...x,
					source: {
						...source,
						uri: getSrc(source.uri.split("-")[1].split(".")[0]),
					},
				};
			}

			return orig(...cloned);
		}),
	);

	patches.push(
		instead("Text", RN, (args, orig) => {
			const cloned = args.slice();
			const [x] = cloned;
			if (!x) return orig(...cloned);

			let children: any[] = [];

			const style = RN.StyleSheet.flatten(x.style) ?? {};
			const twemoji = (src: string) =>
				React.createElement(CustomTwemoji, {
					emoji: src,
					size: style.fontSize,
				});

			if (Array.isArray(x.children)) {
				for (const c of x.children) {
					children.push(
						...(typeof c === "string" ? parse(c, twemoji) : [c]),
					);
				}
			} else {
				children = typeof x.children === "string"
					? parse(x.children, twemoji)
					: [x.children];
			}

			cloned[0] = { ...x, children };

			return orig(...cloned);
		}),
	);

	return () => {
		for (const x of patches) x();
	};
}

export const settings = Settings;
