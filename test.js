import test from 'ava'
import {extractPlaceholders, getReplacer, replace} from './index.js'

test('getReplacer returns a function', t => {
  const result = getReplacer(/.*/, () => true)
  t.is(typeof result, 'function')
})

test('replace() replaces...', t => {
  const str = 'I want a {what}!'
  const placeholders = { what: 'cheeseburger' }
  const result = replace(str, placeholders)

  t.is(result, 'I want a cheeseburger!')
})

test('replace() replaces many times if needed...', t => {
  const str = 'I want a {what} and another {what}!'
  const placeholders = { what: 'cheeseburger' }
  const result = replace(str, placeholders)

  t.is(result, 'I want a cheeseburger and another cheeseburger!')
})

test('replace() recognize words between curly braces...', t => {
  const str = 'I like curly {good} but not [other] :placeholders...'
  const placeholders = { good: 'braces', other: 'nope', placeholders: 'no way' }
  const result = replace(str, placeholders)

  t.is(result, 'I like curly braces but not [other] :placeholders...')
})

test('replace() replaces and fallbacks...', t => {
  const str = 'I want a {what} and a {drink}!'
  const placeholders = { what: 'cheeseburger' }
  const fallbackPlaceholders = { what: 'big mac', drink: 'coke' }
  const result = replace(str, placeholders, fallbackPlaceholders)

  t.is(result, 'I want a cheeseburger and a coke!')
})

test('replaces() returns empty string if provided with empty string...', t => {
  const result = replace('', { one: 'one' })

  t.is(result, '')
})

test('replace() does not replace if no placeholder is provided...', t => {
  const str = 'I want a {what}!'
  const placeholders = {}
  const result = replace(str, placeholders)

  t.is(result, 'I want a {what}!')
})

test('replace() does not replace if wrong placeholders are provided...', t => {
  const str = 'I want a {what}!'
  const placeholders = { which: 'cheeseburger', 'hamburger': 'cheeseburger' }
  const result = replace(str, placeholders)

  t.is(result, 'I want a {what}!')
})

test('replace() does nothing magic..', t => {
  const str = 'I want a {{what}}!'
  const placeholders = { what: 'cheeseburger' }
  const result = replace(str, placeholders)

  t.is(result, 'I want a {cheeseburger}!')
})

test('replace() does not support nested placeholders..', t => {
  const str = 'I want a {lalala {what} yop}!'
  const placeholders = { what: 'cheeseburger', 'lalala {what} yop': 'alors là' }
  const result = replace(str, placeholders)

  t.is(result, 'I want a {lalala cheeseburger yop}!')
})

test('But another replacer could, by ignoring the nested placeholder...', t => {
  const replaceReloaded = getReplacer(/{(.+)}/gmi)
  const str = 'I want a {lalala {what} yop}!'
  const placeholders = { what: 'cheeseburger', 'lalala {what} yop': 'big mac' }
  const result = replaceReloaded(str, placeholders)

  t.is(result, 'I want a big mac!')
})

test('extractPlaceholders() extracts placeholders surrounded by curly braces', t => {
  const str = 'I want a {what} and a {drink}!'
  const result = extractPlaceholders(str)

  t.deepEqual(result, ['what', 'drink'])
})
