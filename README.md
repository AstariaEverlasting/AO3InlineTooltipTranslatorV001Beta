# AO3 Inline Tooltip Translator

**Version:** 0.0.1 Beta

**Created by:** Astaria Everlasting

---

## Overview

AO3 Inline Tooltip Translator is a Chrome extension that streamlines the creation of inline translation tooltips while writing on Archive of Our Own (AO3).

Instead of manually writing HTML for every translated word or phrase, the extension provides a sidebar interface directly inside the AO3 Rich Text Editor, allowing translations to be inserted with a few clicks.

This project is currently in early beta.

---

## Current Features

- Toolbar button integrated into the AO3 Rich Text Editor
    
- Sidebar interface for creating tooltips
    
- Automatically imports highlighted text from the editor
    
- Manual editing of selected text before insertion
    
- Translation entry field
    
- One-click insertion of tooltip HTML
    
- Theme-aware styling that follows the site's appearance
    
- Custom sidebar artwork
    

Generated HTML uses the following format:

```html
<a name="toolMarker-formatVersion-randomSuffix"></a>
<span class="tooltip">
    Original Text
    <span class="tooltiptext">
        (Translated Text)
    </span>
</span>
```

---

## Planned Features

The following features are planned for future releases:

- Translation history
    
- Footnote Wrangler
    
- Automatic footnote generation
    
- Workskin generation assistant
    
- Tooltip customization interface
    
- Existing tooltip importer
    
- HTML editor support
    
- Resizable sidebar
    
- Multiple sidebar interfaces
    

---

## Installation

1. Download or clone this repository.
    
2. Open Chrome.
    
3. Navigate to:
    

```
chrome://extensions
```

4. Enable **Developer Mode**.
    
5. Click **Load unpacked**.
    
6. Select the extension folder.
    

The extension will now activate automatically on Archive of Our Own.

---

## Usage

1. Open an AO3 work or chapter in the Rich Text Editor.
    
2. Highlight the text you wish to translate.
    
3. Click the AO3 Inline Tooltip Translator toolbar button.
    
4. Enter the translation.
    
5. Click **Insert**.
    

The extension inserts the tooltip directly into the editor.

---

## Permissions

The extension currently requests:

- **storage**
    

This permission is reserved for future translation history and footnote management features.

No user data is transmitted to external servers.

---

## Compatibility

Current target:

- Google Chrome
    
- Archive of Our Own Rich Text Editor (TinyMCE)
    

HTML mode support is planned for a future release.

---

## Reporting Issues

As this is an early beta, bug reports and feedback are greatly appreciated.

When reporting an issue, please include:

- Chrome version
    
- Extension version
    
- Steps required to reproduce the issue
    
- Any console errors (if available)
    
- Screenshots if applicable
    

---

## Version

Current release:

**0.0.1 Beta**

---

## License

This project is currently released for beta testing.

Copyright © Astaria Everlasting. All rights reserved.