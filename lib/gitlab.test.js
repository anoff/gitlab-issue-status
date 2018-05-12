import test from 'ava'
import {tagToUrl, UrlToTag} from './gitlab'

const baseUrl = 'https://blup.com/api/v4'

test('should append base url', t => {
  const url = tagToUrl('meh#4', baseUrl)
  t.is(url, baseUrl + '/projects/meh/issues/4')
})

test('work if base url ends with /', t => {
  const url = tagToUrl('meh#4', baseUrl + '/')
  t.is(url, baseUrl + '/projects/meh/issues/4')
})

test('url encode project name', t => {
  const url = tagToUrl('meh/blup#4', baseUrl)
  t.is(url, baseUrl + '/projects/meh%2Fblup/issues/4')
})

test('UrlToTag parses correctly', t => {
  let tag
  tag = UrlToTag('http://blup.com/api/v4/project/issues/4')
  t.is(tag, 'project#4')
  tag = UrlToTag('http://blup.com/project/issues/4')
  t.is(tag, 'project#4')
  tag = UrlToTag('http://blup.com/group1/group2/project/issues/453')
  t.is(tag, 'group1/group2/project#453')
  tag = UrlToTag('http://blup.com/api/v4/group%2Fproject/issues/5')
  t.is(tag, 'group/project#5')
})
