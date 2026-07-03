/*
AO3 Inline Tooltip Translator

Created by Astaria Everlasting

version 0.0.1-Beta
*/

// =====================================
// Configuration Variables
// Stores IDs, classes, and asset paths
// =====================================

const IDS = {

	sidebar: "ao3-tooltip-sidebar",

	toolbarButton: "ao3-tooltip-button",

	headerImage: "ao3-tooltip-header-image",

	selectedText: "ao3-selected-text",

	translationInput: "ao3-translation-input",

	insertButton: "ao3-insert-button",

	selectionButton: "ao3-get-selection-button",

	closeButton: "ao3-close-button",

	version: "ao3-tooltip-version",

	inputClass: "ao3-tooltip-input"

};

const ASSETS = {

	header: chrome.runtime.getURL("assets/header-art.svg"),

	editorIcon: chrome.runtime.getURL("assets/editor-icon.svg")

};

// =====================================
// Plugin Settings
// Stores changeable plugin information
// =====================================

const SETTINGS = {

	version: "0.0.1",

	openClass: "ao3-tooltip-open",

	headerLink: "https://archiveofourown.org/works/50133886/chapters/230298131",

	attributionLink: "https://archiveofourown.org/users/AstariaEverlasting/",

	attributionText: "A plugin by Astaria Everlasting",

	linkTarget: "_blank",

	editorFrame: ".tox-edit-area iframe",

	ao3Container: "#outer",
	
	toolMarker:	"aeao3tt",

	formatVersion:	"v001",
	
	/* WORK IN PROGRESS - TO ADD LATER*/
	
	/* 
	SETTINGS.workID:,
	
	SETTINGS.chapterID:
	*/
};

// =====================================
// UI References
// Stores active sidebar elements
// =====================================

const UI = {

	sidebar: null,

	selectedText: null,

	translationInput: null
};

// =====================================
// Translation Storage
// Stores translations from all translation sessions
// =====================================

const STORAGE = {

	key:
	"ao3-tooltip-translations"

};

// =====================================
// Plugin Initialization
// Loads the plugin
// =====================================

console.log(
	"AO3 Inline Tooltip Translator V1 loaded"
);

watchForToolbar();

// =====================================
// Toolbar Functions
// Creates and manages the AO3 rich text editor button
// =====================================
function addTooltipButton() {

	let toolbars =
		document.querySelectorAll(
			".tox-toolbar__group"
		);

	if (toolbars.length === 0) {
		return false;
	}

	let toolbar =
		toolbars[toolbars.length - 1];

	if (!toolbar) {
		console.log(
			"TinyMCE toolbar not found"
		);
		return false;
	}

	if (
		document.getElementById(
			IDS.toolbarButton
		)
	) {
		return true;
	}

	let button =
		document.createElement(
			"button"
		);

	button.id =
		IDS.toolbarButton;

	button.type =
		"button";

	button.className =
		"tox-tbtn";

	button.title =
		"Insert Tooltip";

	let icon =
		document.createElement(
			"span"
		);

	icon.className =
		"tox-icon tox-tbtn__icon-wrap ao3-tooltip-icon";

	icon.style.backgroundImage =
		`url('${ASSETS.editorIcon}')`;

	button.appendChild(icon);

	button.addEventListener(
		"click",

		function() {
			let text =
				getSelectedText();

			let sidebar =
				document.getElementById(
					IDS.sidebar
				);

			if (sidebar) {
				if (text) {
					UI.selectedText.value =
						text;
					return;
				}

				sidebar.remove();
				UI.sidebar = null;
				UI.selectedText = null;
				UI.translationInput = null;
				UI.insertButton = null;
				document.body.classList.remove(
					SETTINGS.openClass
				);
				return;

			}

			openSidebar(text);

		});

	toolbar.appendChild(button);

	console.log(
		"Tooltip button added"
	);

	return true;

}

function watchForToolbar() {

	addTooltipButton();

	let observer =
		new MutationObserver(
			function() {
				addTooltipButton();
			}
		);

	observer.observe(
		document.body, {
			childList: true,
			subtree: true
		}
	);
}

// =====================================
// Add Resize Handle Function
// Creates a drawer manage sidebar width
// =====================================
function addResizeHandle(sidebar) {

	let handle =
		document.createElement("div");

	handle.id =
		"ao3-tooltip-resize";

	sidebar.appendChild(handle);

	let dragging = false;

	handle.addEventListener(
		"mousedown",
		function(){
			dragging = true;
		}
	);

	document.addEventListener(
		"mouseup",
		function(){
			dragging = false;
		}
	);

	document.addEventListener(
		"mousemove",
		function(e){

			if (!dragging) return;

			let newWidth =
				window.innerWidth - e.clientX;

			sidebar.style.width =
				newWidth + "px";

			document.body.style.setProperty(
				"--sidebar-width",
				newWidth + "px"
			);

		}
	);

}

// =====================================
// Add Drawer Tab Function
// Creates the tab for managing the drawer
// =====================================

function addDrawerTab() {

	let tab =
		document.createElement("button");

	tab.id =
		"ao3-tooltip-tab";

	tab.textContent =
		"‹";

	tab.addEventListener(
		"click",
		function(){

			let sidebar =
				document.getElementById(
					IDS.sidebar
				);

			if(sidebar){
				sidebar.remove();
			}
			else{
				openSidebar("");
			}

		}
	);

	document.body.appendChild(tab);

}

// =====================================
// Sidebar Functions
// Creates, opens, and closes the sidebar UI
// =====================================
function createSidebar() {

	let sidebar =
		document.createElement("div");

	sidebar.id =
		IDS.sidebar;

	UI.sidebar =
		sidebar;

	return sidebar;

}

function openSidebar(selectedText) {

	let sidebar = createSidebar();
	
	addResizeHandle(sidebar);

	addHeader(sidebar);

	addTranslateFromInput(sidebar, selectedText);

	addGetSelectionButton(sidebar);

	addTranslateToInput(sidebar);

	addInsertTooltipButton(sidebar);

	addCloseButton(sidebar);
	
	addVersionNumber(sidebar);

	document.body.appendChild(
		sidebar
	);

	document.body.classList.add(
		SETTINGS.openClass
	);
}

// =====================================
// Header Function
// Creates and adds the header banner and pluginAuthor link
// =====================================
function addHeader(sidebar) {

	let headerLink =
		document.createElement(
			"a"
		);

	headerLink.href =
		SETTINGS.headerLink;

	headerLink.target =
		SETTINGS.linkTarget;

	let headerImage =
		document.createElement(
			"img"
		);

	headerImage.src =
		ASSETS.header;

	headerImage.id =
		IDS.headerImage;

	headerLink.appendChild(
		headerImage
	);

	let pluginAuthor =
		document.createElement(
			"h2"
		);

	let attributionLink =
		document.createElement(
			"a"
		);

	attributionLink.textContent =
		SETTINGS.attributionText;

	attributionLink.href =
		SETTINGS.attributionLink;

	attributionLink.target =
		SETTINGS.linkTarget;

	pluginAuthor.appendChild(
		attributionLink
	);

	sidebar.appendChild(
		headerLink
	);

	sidebar.appendChild(
		pluginAuthor
	);

}

// =====================================
// Add Translation Function
// Creates the text input area for choosing text to be translated
// =====================================
function addTranslateFromInput(sidebar, selectedText) {

	let label =
		document.createElement(
			"div"
		);

	label.textContent =
		"Text to translate:";

	UI.selectedText =
		document.createElement(
			"textarea"
		);

	UI.selectedText.id =
		IDS.selectedText;

	UI.selectedText.className =
		IDS.inputClass;

	UI.selectedText.value =
		selectedText || "";

	UI.selectedText.rows =
		5;

	UI.selectedText.placeholder =
		"Highlight text to be translated from your draft then click 'Get Selection'";

	sidebar.appendChild(
		label
	);

	sidebar.appendChild(
		UI.selectedText
	);
}

// =====================================
// Get Selection Function
// Extracts selected text from rich text editor
// =====================================
function addGetSelectionButton(sidebar) {

	let button =
		document.createElement(
			"button"
		);

	button.id =
		IDS.selectionButton;

	button.className =
		"ao3-sidebar-action";

	button.textContent =
		"Get Selection";

	button.addEventListener(
		"click",

		function() {

			let newText =
				getSelectedText();

			if (newText) {
				UI.selectedText.value =
					newText;
			}

		}
	);

	sidebar.appendChild(
		button
	);

}

// =====================================
// Add Translate Function
// Creates the text input area for adding translations of selected text
// =====================================
function addTranslateToInput(sidebar) {

	let label =
		document.createElement(
			"div"
		);

	label.textContent =
		"Translation:";

	UI.translationInput =
		document.createElement(
			"textarea"
		);

	UI.translationInput.id =
		IDS.translationInput;

	UI.translationInput.className =
		IDS.inputClass;

	UI.translationInput.rows =
		5;

	UI.translationInput.placeholder =
		"Enter translation";

	sidebar.appendChild(
		label
	);

	sidebar.appendChild(
		UI.translationInput
	);

}

// =====================================
// Add Insert Function
// Replaces selected text with duplicated selected text and translation of selected text via HTML tooltip
// =====================================
function addInsertTooltipButton(sidebar) {

	let button =
		document.createElement(
			"button"
		);

	button.id =
		IDS.insertButton;

	button.className =
		"ao3-sidebar-action";

	button.textContent =
		"Insert";

	UI.insertButton =
		button;

	button.addEventListener(
		"click",
		insertTooltip
	);

	sidebar.appendChild(
		button
	);

}

// =====================================
// Add Close Button Function
// Creates close button to close plugin sidebar
// =====================================
function addCloseButton(sidebar) {

	let closeButton =
		document.createElement(
			"button"
		);

	closeButton.id =
		IDS.closeButton;

	closeButton.className =
		"action";

	closeButton.textContent =
		"✖";

	closeButton.addEventListener(
		"click",

		function() {

			UI.sidebar.remove();

			UI.sidebar = null;

			UI.selectedText = null;

			UI.translationInput = null;

			UI.insertButton = null;


			document.body.classList.remove(
				SETTINGS.openClass
			);

		}
	);
	
	sidebar.appendChild(
		closeButton
	);
	
}

// =====================================
// Add Version Number Function
// Creates version display
// =====================================
function addVersionNumber(sidebar) {

	let version =
		document.createElement(
			"div"
		);

	version.textContent =
		"v" + SETTINGS.version;

	version.id =
		IDS.version;

	sidebar.appendChild(
		version
	);

}

// =====================================
// Get Text Function
// Gets currently selected text from the AO3 Rich Text Editor
// =====================================
function getSelectedText() {

	let editor =
		document.querySelector(
			SETTINGS.editorFrame
		);

	if (!editor) {
		alert(
			"Editor not found"
		);
		return;
	}

	let editorDocument =
		editor.contentDocument;

	let selection =
		editorDocument
		.getSelection()
		.toString()
		.trim();

	return selection;

}

// =====================================
// Insert Tooltip Function
// Inserts the tooltip HTML into the AO3 rich text editor
// =====================================
function insertTooltip() {

	let text =
		UI.selectedText.value.trim();

	let translation =
		UI.translationInput.value.trim();

	if (!text || !translation) {
		alert(
			"Please enter both the text and translation."
		);
		return;
	}

	let randomSuffix =
	generateRandomSuffix();


	let tooltipID =
		`${SETTINGS.toolMarker}-${SETTINGS.formatVersion}-x${randomSuffix}`;


	let tooltipHTML =
		`<a name="${tooltipID}"></a><span class="tooltip">${text}<span class="tooltiptext"> (${translation}) </span></span>&nbsp;`;

	let editor =
		document.querySelector(
			SETTINGS.editorFrame
		);

	if (!editor) {
		alert(
			"Editor not found."
		);
		return;
	}

	let editorDocument =
		editor.contentDocument;

	let selection =
		editorDocument.getSelection();

	let range;

	if (selection.rangeCount > 0) {
		range =
			selection.getRangeAt(0);
		if (!selection.isCollapsed) {
			range.deleteContents();
		}
	} else {
		range =
			editorDocument.createRange();
		range.selectNodeContents(
			editorDocument.body
		);
		range.collapse(false);
	}

	let fragment =
		range.createContextualFragment(
			tooltipHTML
		);

	range.insertNode(
		fragment
	);
	
	saveTranslation({

	id:
		tooltipID,

	randomSuffix:
		randomSuffix,

	workId:
		getWorkID(),

	chapterId:
		getChapterID(),

	sourceText:
		text,

	translation:
		translation

	});

	selection.removeAllRanges();
}

// =====================================
// Get Work ID Function
// Extracts the Ao3 Work ID number for footnote wrangling
// WORK IN PROGRESS
// =====================================
function getWorkID(){

	let match =
		window.location.pathname.match(
			/works\/(\d+)/
		);

	return match
		? match[1]
		: null;

}

// =====================================
// Get Chapter ID Function
// Extracts the Ao3 Chapter ID number for footnote wrangling
// WORK IN PROGRESS
// =====================================
function getChapterID(){

	let match =
		window.location.pathname.match(
			/chapters\/(\d+)/
		);

	return match
		? match[1]
		: null;

}

// =====================================
// Generate Random Suffix Function
// Generates a unique suffix identifier per translation
// =====================================
function generateRandomSuffix() {

	let characters =
		"abcdefghijklmnopqrstuvwxyz0123456789";

	let result ="";

	for (let i = 0; i < 6; i++){
		
		let index = Math.floor( Math.random() * characters.length );

		result += characters[index];

	}

	return result;

}

// =====================================
// Save Translation Function
// Handles saving and retrieving translations
// WORK IN PROGRESS
// =====================================
function saveTranslation(data) {

	let translations =
		JSON.parse(
			localStorage.getItem(
				STORAGE.key
			)
		) || {};

	translations[data.id] =
		data;

	localStorage.setItem(
		STORAGE.key,
		JSON.stringify(
			translations
		)
	);
}

// =====================================
// Scan Existing Tooltip Function
// Searches for existing tooltips to harmonize formatting for footnote wrangling
// WORK IN PROGRESS
// =====================================
function scanExistingTooltips(){
	let oldTooltips =
		document.querySelectorAll(
			"span.tooltip:not([id])"
		);
}