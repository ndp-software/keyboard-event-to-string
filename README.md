# JavaScript keyboard events to strings

This library converts the event object of a JavaScript keydown event
into a humanly readable format.
The idea is to use this for UI components that let the user choose keyboard shortcuts.

In other words: This library provides the inverse functionality to common keyboard shortcut binding libraries like [keymaster](https://github.com/madrobby/keymaster) or [Mousetrap](https://craig.is/killing/mice).

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Installation

```
$ npm install --save keyboard-event-to-string
```

## Usage

```js
import {
  toString as event2String,
  setOptions
} from 'keyboard-event-to-string'

document.body.onkeydown = (e) => {
	var keys = event2string(e)
	console.log(keys) // e.g. "Ctrl + A"
}
```

### Options

`options` is optional and can be an object with the following properties:

| key | value | default value |
|:--|:--|:--|
| `cmd` |  What string to display for the Cmd/Meta modifier | `"Cmd"` |
| `ctrl` |  What string to display for the Ctrl modifier | `"Ctrl"` |
| `alt` |  What string to display for the Alt/Option modifier | `"Alt"` |
| `shift` |  What string to display for the Shift modifier | `"Shift"` |
| `joinWith` | The string that's displayed between all keys | `" + "`

For example this could be used to get the Mac style keyboard shortcut strings:

```js
{
	cmd: "⌘",
	ctrl: "⌃",
	alt: "⌥",
	shift: "⇧",
	joinWith: ""
}
```

The default settings are compatible with the format that common keyboard shortcut libraries, like [keymaster](https://github.com/madrobby/keymaster) or [Mousetrap](https://craig.is/killing/mice), accept.

### Detailed information

`require('key-event-to-string').details(e)` can be used to get more details. This can be useful for
validating keyboard shortcuts, e.g. for requiring a modifier and a normal key.
It returns an object with this information:

- `hasModifier`: True iff atleast one of cmd, ctrl, alt or shift was pressed
- `hasKey`: True iff a key other than a modifier is pressed
- `map`: An object containing information which modifier is active and what
  other key is pressed


## Disclaimer

- This library is meant to parse only `keydown` events. `keypress` / `keyup` events have small differences, e..g. `keydown` is needed to capture `Command` on a Mac. So `keydown` is advisible for this anyways.
- I wrote this library for an Electron side project, so I only needed it to run in the Chrome runtime. It probably won't work well in old browsers
- ~~JavaScript keyCodes don't work well with special international characters. E.g. the German umlaut `ö` has the same keyCode as `;`, on a German keyboard. This library doesn't try to fix that and I don't think there's a good fix for all those special cases. Other keyboard shortcut libraries (Mousetrap/keymaster e.g.) have the same problem, so it shouldn't be a big problem since this library is meant to be used as a helper for those libraries~~ This library now uses KeyboardEvent.code, per current recommendations. The names of some of the keys may not be exactly what is desired, but they are "standard".
- Andrew Peterson converted this library to Typescript in 2021 to suit a web project. Feel free to offer contributions.
- In 2021, this was subtly renamed from `key-` to `keyboard-` so that it would be easier to publish the NPM package.
