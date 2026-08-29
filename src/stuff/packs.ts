export interface EmojiPack {
	title: string;
	format: (src: string) => string;
	joiner?: string;
	maintainer?: string;
	source?: string;
	excludeVariation?: boolean;
}

export const emojiPacks = {
	default: {
		title: "Default (Discord)",
		format: (src: string) => `asset:/emoji-${src}.png`,
		joiner: "-",
	},
	ios26: {
		title: "iOS 26 (iPhone)",
		format: (src: string) =>
			`https://raw.githubusercontent.com/qassimtawfiq/My-custom-theme-/ios26_plugin/emoji_u${src}.png`,
		joiner: "_",
		maintainer: "Apple",
	},
	apple: {
		title: "Apple (iOS 17.4)",
		format: (src: string) =>
			`https://raw.githubusercontent.com/zhdsmy/apple-emoji/ios-17.4/png/160/emoji_u${src}.png`,
		joiner: "_",
		maintainer: "zhdsmy",
	},
	twemoji: {
		title: "Twemoji",
		format: (src: string) =>
			`https://raw.githubusercontent.com/jdecked/twemoji/main/assets/72x72/${src}.png`,
		joiner: "-",
		maintainer: "jdecked",
		excludeVariation: true,
	},
} satisfies Record<string, EmojiPack>;

export type Pack = keyof typeof emojiPacks;
