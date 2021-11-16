// Based on
// https://github.com/florian/key-event-to-string/blob/master/index.js

type Options = {
  cmd: string
  ctrl: string
  alt: string
  shift: string
  joinWith: string
  hideKey: HideKeyType
}

type HideKeyType = 'never' | 'always' | 'alpha' | 'alphanumeric'

type UserOptions = Partial<Options>

type Modifiers = {
  alt: boolean
  cmd: boolean
  ctrl: boolean
  shift: boolean
}
type KeyMap = {
  character: string | null
  modifiers: Modifiers
}

const defaultOptions: Options = {
  alt:      'Alt',
  cmd:      'Cmd',
  ctrl:     'Ctrl',
  shift:    'Shift',
  joinWith: ' + ',
  hideKey:  'never'
}

let gOptions: Options = defaultOptions

const hideKeyRegExp = () => ({
  'alphanumeric': /^Key([A-Z01-9])$/,
  'alpha':        /^Key([A-Z])$/,
  'always':       /^Key(.*)$/,
  'never':        /^(.*)$/
})[gOptions.hideKey]

function buildKeyMap(e: KeyboardEvent): KeyMap{
  const isOnlyModifier = [16, 17, 18, 91, 93, 224].indexOf(e.keyCode) !== -1
  const character = isOnlyModifier ? null : e.code.replace(hideKeyRegExp(), '$1')

  return {
    character: character,
    modifiers: {
      cmd:   e.metaKey,
      ctrl:  e.ctrlKey,
      alt:   e.altKey,
      shift: e.shiftKey
    }
  }
}

function buildKeyArray(e: KeyboardEvent){

  const map = buildKeyMap(e)

  const entries = Object.entries(map.modifiers) as Array<[keyof Modifiers, boolean]>
  const result =
    entries
      .reduce((memo, [k, v]) => {
        if (v) memo.push(gOptions[k])
        return memo
      }, [] as string[])

  if (map.character) result.push(map.character)

  return result
}

export function details(e: KeyboardEvent): { hasKey: boolean, hasModifier: boolean, map: KeyMap }{

  const map = buildKeyMap(e)

  const hasModifier = Object.values(map.modifiers).reduce((m, v) => m || v)

  return {
    hasKey:      map.character != null,
    hasModifier: hasModifier,
    map:         map
  }
}

export function setOptions(userOptions: UserOptions): UserOptions{
  return gOptions = { ...defaultOptions, ...userOptions }
}

export const toString = (e: KeyboardEvent): string => buildKeyArray(e).join(gOptions.joinWith)
