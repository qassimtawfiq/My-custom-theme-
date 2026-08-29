import { React, ReactNative as RN } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { Forms } from "@vendetta/ui/components";

import { vstorage } from "..";
import { emojiPacks, type Pack } from "../stuff/packs";

const { FormSection, FormRadio } = Forms;

export default function Settings() {
	useProxy(vstorage);

	return (
		<RN.ScrollView>
			<FormSection title="Emoji Pack">
				{(Object.keys(emojiPacks) as Pack[]).map(key => (
					<FormRadio
						key={key}
						label={emojiPacks[key].title}
						subLabel={emojiPacks[key].maintainer ?? ""}
						selected={vstorage.emojipack === key}
						onPress={() => { vstorage.emojipack = key; }}
					/>
				))}
			</FormSection>
		</RN.ScrollView>
	);
}
