import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginManifest, PluginSettingTab, Setting } from 'obsidian';
import { DEFAULT_SETTINGS, CharacterSheetSettings, CharacterSheetSettingTab } from './Settings';
import { CsMDRC } from './CsMDRC';

// Remember to rename these classes and interfaces!



export default class CharacterSheetPlugin extends Plugin {
	settings: CharacterSheetSettings;
	statusBarActiveFile: HTMLSpanElement;

	constructor(app: App, manifest: PluginManifest){
		super(app, manifest);
	}

	async onload() {
		// Loads the settings in the settings tab
		await this.loadSettings();

		// Adds a statusBarItem that shows the active file
		this.statusBarActiveFile = this.addStatusBarItem().createEl("span");
		this.trackCurrentFile();

		//
		this.registerMarkdownCodeBlockProcessor('CharacterSheet', (source, el, ctx) => {
			ctx.addChild(new CsMDRC(el, this, source, ctx));
		});

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('pdf-file', 'Sample Plugin', (evt: MouseEvent) => {
			new Notice('Not implimented yet');
		});

		// Perform additional things with the ribbon
		ribbonIconEl.addClass('character-sheet-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new CharacterSheetSettingTab(this.app, this));


		// change listener
		this.app.workspace.on("active-leaf-change", async()=> {
			this.trackCurrentFile()
		});

		this.app.workspace.on('editor-change', editor => {
			const content = editor.getDoc().getValue();
		})
		
	}

	private async trackCurrentFile(){
		const file = this.app.workspace.getActiveFile()
			if (file){
				const fileName = file.name
				const content = this.app.vault.read(file)
				this.updateCurrentFile(fileName)
			} else {
				this.statusBarActiveFile.textContent = "No File";
			}
	}

	private updateCurrentFile(fileName?: string){
		this.statusBarActiveFile.textContent = fileName ? fileName : "No Name";
	}

	onunload() {
		
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}


