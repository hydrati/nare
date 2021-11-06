# Nare
> `Xdi8 Aho` Translator

## Features
- Supported 15 kinds of `Xdi8 Languages`
- Supported `Browser` & `Node.js`
- Supported `TypeScript`

## Example
```typescript
import { Hans } from 'nare'

const xdi8 = Hans.translateFrom('你')
console.log(xdi8) // output: Vnu8

const hans = Hans.translateTo(xdi8)
console.log(hans) // output: 你
```