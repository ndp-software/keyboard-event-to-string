import {
  toString,
  setOptions
} from '../../src/keyboard-event-to-string'

import { Step, Table, BeforeSuite, AfterSuite } from "gauge-ts";

function assertEqual(a: string, expected: string){
  if (a !== expected) throw new Error(`Expected ${expected}, but got ${a}`)
}

export default class Steps {

  @Step("an event with the <KeyA> key produces <KeyA>")
  public async implementation36c8676a354f9952c06f(key: string, expected: string){
    const event = {
      code: key
    } as KeyboardEvent

    const s = toString(event)

    assertEqual(s, expected)
  }

  @Step("an event with the command and <KeyA> key produces <Cmd + KeyA>")
  public async implementation964be4569189(key: string, expected: string){
    const event = {
      code:    key,
      metaKey: true
    } as KeyboardEvent

    const s = toString(event)

    assertEqual(s, expected)
  }

  @Step("an event with the shift and <KeyA> key produces <Cmd + KeyA>")
  public async implementation964(key: string, expected: string){
    const event = {
      code:     key,
      shiftKey: true
    } as KeyboardEvent

    const s = toString(event)

    assertEqual(s, expected)
  }

  @Step("an event with the control and <KeyA> key produces <Cmd + KeyA>")
  public async implementation964be45691(key: string, expected: string){
    const event = {
      code:    key,
      ctrlKey: true
    } as KeyboardEvent

    const s = toString(event)

    assertEqual(s, expected)
  }

  @Step("an event with command and shift and <arg1> key produces <arg2>")
  public async implementation021d57c602c01962b5a6(key: string, expected: string){
    const event = {
      code:     key,
      shiftKey: true,
      metaKey:  true
    } as KeyboardEvent

    const s = toString(event)

    assertEqual(s, expected)
  }

  @Step("an event with control and shift and <arg1> key produces <arg2>")
  public async implementation021d57c602c01962b5a(key: string, expected: string){
    const event = {
      code:     key,
      shiftKey: true,
      ctrlKey:  true
    } as KeyboardEvent

    const s = toString(event)

    assertEqual(s, expected)
  }

  @Step("Configure: <Table>")
  public async implementation021d57c602c01962b(table: Table){
    const options =
      table.getTableRows().reduce((memo, row) => {
        let key = row.getCell("Key")
        let str = row.getCell("String")
        memo[key] = str
        return memo
      }, {} as {[k: string]: string})
    setOptions(options)
  }

  @Step("Restore configs to defaults")
  public async implementation021d57c602c01962(){
    setOptions({})
  }

}
