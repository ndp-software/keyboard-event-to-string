# KeyboardEvent to String

## Basic behavior
* an event with the "KeyA" key produces "KeyA"
* an event with the command and "KeyA" key produces "Cmd + KeyA"
* an event with the control and "KeyA" key produces "Ctrl + KeyA"
* an event with the shift and "KeyA" key produces "Shift + KeyA"
* an event with the "ArrowLeft" key produces "ArrowLeft"
* an event with the "Key$" key produces "Key$"
* an event with the "Comma" key produces "Comma"
* an event with the "Digit4" key produces "Digit4"
* an event with the "Numpad1" key produces "Numpad1"
* an event with the "End" key produces "End"
* an event with the "PageUp" key produces "PageUp"

## Multiple modifiers
* an event with command and shift and "Key7" key produces "Cmd + Shift + Key7"
* an event with control and shift and "KeyC" key produces "Ctrl + Shift + KeyC"

## Overriding modifier key names
* Configure:
   |Key     |String |
   |--------|-------|
   |cmd     |  ⌘    |
   |ctrl    |  ⌃    |
   |alt     |  ⌥    |
   |shift   |  ⇧    |
   |joinWith|       |

* an event with command and shift and "Key7" key produces "⌘⇧Key7"
* Restore configs to defaults

## Overriding `hideKey` to `alpha`

* Configure:
  |Key     |String |
  |--------|-------|
  |hideKey | alpha |
* an event with the "KeyA" key produces "A"
* an event with the "Key7" key produces "Key7"
* an event with the "PageDown" key produces "PageDown"
* an event with the "KeyPageDown" key produces "KeyPageDown"
* an event with control and shift and "KeyC" key produces "Ctrl + Shift + C"
* Restore configs to defaults

## Overriding `hideKey` to `alphanumeric`

* Configure:
  |Key     |String        |
  |--------|--------------|
  |hideKey | alphanumeric |
* an event with the "KeyA" key produces "A"
* an event with the "Key7" key produces "7"
* an event with the "PageDown" key produces "PageDown"
* an event with the "KeyPageDown" key produces "KeyPageDown"
* an event with control and shift and "KeyC" key produces "Ctrl + Shift + C"
* Restore configs to defaults

## Overriding `hideKey` to `always`

* Configure:
  |Key     |String  |
  |--------|--------|
  |hideKey | always |
* an event with the "KeyA" key produces "A"
* an event with the "Key7" key produces "7"
* an event with the "PageDown" key produces "PageDown"
* an event with the "KeyPageDown" key produces "PageDown"
* an event with control and shift and "KeyC" key produces "Ctrl + Shift + C"
* Restore configs to defaults
