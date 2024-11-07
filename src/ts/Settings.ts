import { App, PluginSettingTab, Setting } from "obsidian";
import CharacterSheetPlugin from "./main";
import countButton from "./settings-svelte-files/settings.svelte";
import { mount, unmount } from "svelte";

export interface CharacterSheetSettings {
	mySetting: string;
}

export const DEFAULT_SETTINGS: CharacterSheetSettings = {
	mySetting: 'default'
}

export class CharacterSheetSettingTab extends PluginSettingTab {
	plugin: CharacterSheetPlugin;
    compInstance: any;

	constructor(app: App, plugin: CharacterSheetPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}
 
	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Character Sheet Setting')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
        
        this.compInstance = mount(countButton, {target:containerEl});
	}

    hide(): void {
        super.hide();
        
        unmount(this.compInstance);
        
    }


}