import { React, ReactNative as RN } from "@revenge-mod/metro/common";
import { useStorageState } from "@revenge-mod/storage";

import { vstorage } from "..";
import { emojiPacks, type Pack } from "../stuff/packs";

export default function Settings() {
	useStorageState(vstorage);

	return (
		<RN.ScrollView>
			<RN.View style={{ padding: 16 }}>
				<RN.Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold", marginBottom: 12 }}>
					Emoji Pack
				</RN.Text>
				{(Object.keys(emojiPacks) as Pack[]).map(key => (
					<RN.TouchableOpacity
						key={key}
						onPress={() => { vstorage.emojipack = key; }}
						style={{
							flexDirection: "row",
							alignItems: "center",
							padding: 12,
							marginBottom: 8,
							backgroundColor: vstorage.emojipack === key ? "#5865F2" : "#2B2D31",
							borderRadius: 8,
						}}
					>
						<RN.Text style={{ color: "#fff", fontSize: 15, flex: 1 }}>
							{emojiPacks[key].title}
						</RN.Text>
						{emojiPacks[key].maintainer && (
							<RN.Text style={{ color: "#B5BAC1", fontSize: 13 }}>
								{emojiPacks[key].maintainer}
							</RN.Text>
						)}
					</RN.TouchableOpacity>
				))}
			</RN.View>
		</RN.ScrollView>
	);
}
