JavaScript keyboard events to strings

This library converts the event object of a JavaScript keydown event
into a humanly readable format.
The idea is to use this for UI components that let the user choose keyboard shortcuts.

In other words: This library provides the inverse functionality to common keyboard shortcut binding libraries like [keymaster](https://github.com/madrobby/keymaster) or [Mousetrap](https://craig.is/killing/mice).

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
import { setOptions } from 'keyboard-event-to-string'
setOptions({
	cmd: "⌘",
	ctrl: "⌃",
	alt: "⌥",
	shift: "⇧",
	joinWith: ""
})
```

The default settings are compatible with the format that common keyboard shortcut libraries, like [keymaster](https://github.com/madrobby/keymaster) or [Mousetrap](https://craig.is/killing/mice), accept.

To restore to the defaults, use `setOptions({})`.

### Detailed information

```js
import { details } from 'keyboard-event-to-string'
```

`details` can be used to get more details. This can be useful for
validating keyboard shortcuts, e.g. for requiring a modifier and a normal key.
It returns an object with this information:

- `hasModifier`: True iff atleast one of cmd, ctrl, alt or shift was pressed
- `hasKey`: True iff a key other than a modifier is pressed
- `map`: An object containing information which modifier is active and what
  other key is pressed



## Release Notes
- In Sept 2021, I renamed this from `key-` to `keyboard-` so that I could publish (my own) NPM package.
- I (Andrew Peterson) converted this library to Typescript in 2021 to suit a web project. Feel free to offer contributions.
- It now uses the `code` of the `KeyboardEvent`. This is _different_. This will not be backward
  compatible.

## Disclaimer

### V1
- This library is meant to parse only `keydown` events. `keypress` / `keyup` events have small differences, e..g. `keydown` is needed to capture `Command` on a Mac. So `keydown` is advisible for this anyways.
- I wrote this library for an Electron side project, so I only needed it to run in the Chrome runtime. It probably won't work well in old browsers
- ~~JavaScript keyCodes don't work well with special international characters. E.g. the German umlaut `ö` has the same keyCode as `;`, on a German keyboard. This library doesn't try to fix that and I don't think there's a good fix for all those special cases. Other keyboard shortcut libraries (Mousetrap/keymaster e.g.) have the same problem, so it shouldn't be a big problem since this library is meant to be used as a helper for those libraries~~ This library now uses KeyboardEvent.code, per current recommendations. The names of some of the keys may not be exactly what is desired, but they are "standard".

## Development

Code of conduct, and all that stuff.

This project depends on `yarn`. You'll need to do that before you can run `yarn install`. 

This uses [Gauge](https://docs.gauge.org/overview.html) for tests. You can write tests in 
markdown, and avoid all the ugly nesting and async/await of most JS testing frameworks.
This should be installed automatically with your `yarn install`. 
There's a bit of tweaking to get typescript/gauge to work,
which is sitting there raw, in `package.json`. Don't look at it please. 😉 To run tests, `yarn test`.

To release, adjust the version number in `package.json` and `npm publish`.

## Credits

- used a [Log Rocket blog post](https://blog.logrocket.com/publishing-node-modules-typescript-es-modules/) to create the typescript package.
