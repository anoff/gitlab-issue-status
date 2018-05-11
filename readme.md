# gitlab-issue-status

> get embeddable status badges for gitlab issues 🦊 🏷

<!-- TOC depthFrom:2 depthTo:4 -->

- [Usage](#usage)
  - [API](#api)
    - [canvas.loadIcons(iconArray)](#canvasloadiconsiconarray)
    - [canvas.createImage(issue, icons)](#canvascreateimageissue-icons)
    - [gitlab.tagToUrl(issueTag, baseUrl)](#gitlabtagtourlissuetag-baseurl)
    - [gitlab.UrlToTag](#gitlaburltotag)
    - [gitlab.getIssueStatus](#gitlabgetissuestatus)
    - [server.startServer](#serverstartserver)
  - [Server](#server)
  - [Include in markdown](#include-in-markdown)
  - [Cache policy](#cache-policy)
- [License](#license)

<!-- /TOC -->

## Usage

The small server coming with the package can be configured via ENV variables. Otherwise the exposed API can be used to create custom workflows.

> Since `node-canvas` and underlying modules currently have [issues](https://github.com/Automattic/node-canvas/issues/760) with emojis they are loaded as png images into the canvas image.

### API

#### canvas.loadIcons(iconArray)

Load an array of icons for later use in the image creation. Will return a `Promise` resolving to `Object` for use in `canvas.createImage`.

##### iconArray

Type: `Array`

An array of `{key: 'string', path: './icon.png'}` objects specifying an icon name/key and its path to load.

#### canvas.createImage(issue, icons)

##### issue

Type: `Object`

Representation of a GitLab issue including the keys `id`, `title`, `tag`, `labels`, `state`. Best to use `gitlab.getIssue()`

##### icons

Type: `Object`

An object listing different `canvas.image` elements using a specific key. Best to be created using the `canvas.loadIcons()` method.

#### gitlab.tagToUrl(issueTag, baseUrl)

Create a full URL given a GitLab issue tag `project#12` and a baseUrl (e.g. `gitlab.com/api/v4`)

##### issueTag

Type: `string`

A short link for an issue e.g. `group/project#12`

##### baseUrl

Type: `string`

Full API baseUrl of the GitLab server e.g. `https://gitlab.com/api/v4`

#### gitlab.UrlToTag(issueUrl)

Convert a full issue URL to a short tag like `project#12`

##### issueUrl

Type: `string`

Full issue URl e.g. `https://gitlab.com/api/v4/projects/myproject/issues/12`

#### gitlab.getIssueStatus(issueUrl, apiToken)

Fetch status

#### server.startServer

### Server

The package comes with a default node server bundled that can be started using

```javascript
const gitlabIssues = require('gitlab-issue-status')
gitlabIssues.app() // start the server
```

### Include in markdown

Having the server deployed with a `GITLAB_ACCESS_KEY` and `GITLAB_API_URL` defined issue badges can be used in markdown with

```md
[![asdf](http://localhost:8080\?issue\=/group/project/issues/5)](http://gitlab-url.com/group/project/issues/5)
```


### Cache policy

By default the images have a cache age of `30 seconds` which should keep load off the server but still offer near _realtime_ updates of issue states.

## License

Licensed under [MIT](LICENSE) by [Andreas Offenhaeuser](https://anoff.io)
