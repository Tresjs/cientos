import { useLogger } from '@tresjs/core'

/**
 * Expand an animation definition string into an array of numbers.
 * @param definitionStr - A comma-separated string of frame numbers with optional parentheses-surrounded durations.
 * @example - expand("0,2") === [0,2]
 * @example - expand("2(10)") === [2,2,2,2,2,2,2,2,2,2]
 * @example - expand("1-4") === [1,2,3,4]
 * @example - expand("10-5(2)") === [10,10,9,9,8,8,7,7,6,6,5,5]
 * @example - expand("1-4(3),10(2)") === [1,1,1,2,2,2,3,3,3,4,4,4,10,10]
 */

export function expand(definitionStr: string): number[] {
  const parsed = parse(definitionStr)
  const expanded: number[] = []
  for (const info of parsed) {
    if (info.duration <= 0) {
    }
    else if (info.endFrame < 0 || info.startFrame === info.endFrame) {
      for (let _ = 0; _ < info.duration; _++) {
        expanded.push(info.startFrame)
      }
      continue
    }
    else {
      const sign = Math.sign(info.endFrame - info.startFrame)
      for (
        let frame = info.startFrame;
        frame !== info.endFrame + sign;
        frame += sign
      ) {
        for (let _ = 0; _ < info.duration; _++) {
          expanded.push(frame)
        }
      }
    }
  }
  return expanded
}

interface AnimationDefinition {
  startFrame: number
  endFrame: number
  duration: number
}

/**
 * Parse an animation defintion string into an array of AnimationDefinition.
 * @param definitionStr - A comma-separated string of frame numbers with optional parentheses-surrounded durations.
 * @example - parse("0,2") === [{startFrame:0, endFrame:0, delay:1}, {startFrame:2, endFrame:2, delay:1}]
 * @example - parse("2(10)") === [{startFrame:2, endFrame:2, delay:10}]
 * @example - parse("1-4") === [{startFrame:1, endFrame:4, delay:1}]
 * @example - parse("10-5(2)") === [{startFrame:10, endFrame:5, delay:2}]
 * @example - parse("1-4(3),10(2)") === [{startFrame:1, endFrame:4, delay:3}, {startFrame:10, endFrame:10, delay:2}]
 */

export function parse(definitionStr: string): AnimationDefinition[] {
  let transition: Transition = 'START_FRAME_IN'
  const parsed: AnimationDefinition[] = []
  for (const token of tokenize(definitionStr)) {
    if (transition === 'START_FRAME_IN') {
      if (token.name === 'NUMBER') {
        parsed.push({
          startFrame: token.value,
          endFrame: token.value,
          duration: 1,
        })
        transition = 'START_FRAME_OUT'
      }
      else {
        warnDefinitionSyntaxError(
          'number',
          token.name,
          definitionStr,
          token.startI,
        )
      }
    }
    else if (transition === 'START_FRAME_OUT') {
      if (token.name === 'COMMA') {
        transition = 'START_FRAME_IN'
      }
      else if (token.name === 'HYPHEN') {
        transition = 'END_FRAME_IN'
      }
      else if (token.name === 'OPEN_PAREN') {
        transition = 'DURATION_IN'
      }
      else {
        warnDefinitionSyntaxError(
          '",", "-", "("',
          token.name,
          definitionStr,
          token.startI,
        )
      }
    }
    else if (transition === 'END_FRAME_IN') {
      if (token.name === 'NUMBER') {
        parsed[parsed.length - 1].endFrame = token.value
        transition = 'END_FRAME_OUT'
      }
      else {
        warnDefinitionSyntaxError(
          'number',
          token.name,
          definitionStr,
          token.startI,
        )
      }
    }
    else if (transition === 'END_FRAME_OUT') {
      if (token.name === 'COMMA') {
        transition = 'START_FRAME_IN'
      }
      else if (token.name === 'OPEN_PAREN') {
        transition = 'DURATION_IN'
      }
      else {
        warnDefinitionSyntaxError(
          '\',\' or \'(\'',
          token.name,
          definitionStr,
          token.startI,
        )
      }
    }
    else if (transition === 'DURATION_IN') {
      if (token.name === 'NUMBER') {
        parsed[parsed.length - 1].duration = token.value
        transition = 'DURATION_OUT'
      }
      else {
        warnDefinitionSyntaxError(
          'number',
          token.name,
          definitionStr,
          token.startI,
        )
      }
    }
    else if (transition === 'DURATION_OUT') {
      if (token.name === 'CLOSE_PAREN') {
        transition = 'NEXT_OR_DONE'
      }
      else {
        warnDefinitionSyntaxError('"("', token.name, definitionStr, token.startI)
      }
    }
    else if (transition === 'NEXT_OR_DONE') {
      if (token.name === 'COMMA') {
        transition = 'START_FRAME_IN'
      }
      else {
        warnDefinitionSyntaxError('","', token.name, definitionStr, token.startI)
      }
    }
  }

  return parsed
}

type Transition =
  | 'START_FRAME_IN'
  | 'START_FRAME_OUT'
  | 'END_FRAME_IN'
  | 'END_FRAME_OUT'
  | 'DURATION_IN'
  | 'DURATION_OUT'
  | 'NEXT_OR_DONE'

type TokenName = 'COMMA' | 'HYPHEN' | 'OPEN_PAREN' | 'CLOSE_PAREN' | 'NUMBER'
interface Token {
  name: TokenName
  value: number
  startI: number
}

function tokenize(definition: string): Token[] {
  const tokenized: Token[] = []
  let ii = 0
  while (ii < definition.length) {
    const c = definition[ii]
    if ('0123456789'.indexOf(c) > -1) {
      if (
        tokenized.length
        && tokenized[tokenized.length - 1].name === 'NUMBER'
      ) {
        tokenized[tokenized.length - 1].value *= 10
        tokenized[tokenized.length - 1].value += parseInt(c)
      }
      else {
        tokenized.push({ name: 'NUMBER', value: parseInt(c), startI: ii })
      }
    }
    else if (c === ' ') {
    }
    else if (c === ',') {
      tokenized.push({ name: 'COMMA', value: -1, startI: ii })
    }
    else if (c === '(') {
      tokenized.push({ name: 'OPEN_PAREN', value: -1, startI: ii })
    }
    else if (c === ')') {
      tokenized.push({ name: 'CLOSE_PAREN', value: -1, startI: ii })
    }
    else if (c === '-') {
      tokenized.push({ name: 'HYPHEN', value: -1, startI: ii })
    }
    else {
      warnDefinitionBadCharacter('0123456789,-()', c, definition, ii)
    }
    ii++
  }

  return tokenized
}

function warnDefinitionBadCharacter(
  expected: string,
  found: string,
  definition: string,
  index: number,
) {
  useLogger().logError(
    'Cientos AnimationDefinitionParser: ' 
    + `Unexpected character while processing animation definition: expected ${expected}, got ${found}.
${definition}
${Array(index + 1).join(' ')}^`,
  )
}

function warnDefinitionSyntaxError(
  expected: string,
  found: string,
  definition: string,
  index: number,
) {
  useLogger().logError(
    'Cientos AnimationDefinitionParser: '
    + `Syntax error while processing animation definition: expected ${expected}, got ${found}.
${definition}
${Array(index + 1).join(' ')}^`,
  )
}
