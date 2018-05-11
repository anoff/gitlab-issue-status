import test from 'ava'
import {tagToUrl} from './gitlab'

const baseUrl = 'https://blup.com'

test('should append base url', t => {
  const url = tagToUrl('meh#4', baseUrl)
  t.is(url, baseUrl + '/api/v4/projects/meh/issues/4')
})

test('work if base url ends with /', t => {
  const url = tagToUrl('meh#4', baseUrl + '/')
  t.is(url, baseUrl + '/api/v4/projects/meh/issues/4')
})

test('url encode project name', t => {
  const url = tagToUrl('meh/blup#4', baseUrl)
  t.is(url, baseUrl + '/api/v4/projects/meh%2Fblup/issues/4')
})
