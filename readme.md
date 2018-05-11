# gitlab-issue-status

> get embeddable status badges for gitlab issues 🦊 🏷

## Usage

![asdf](http://localhost:8080\?issue\=/rcs/generic/hwp-docs/issues/5)

![asdf](http://localhost:8080\?issue\=/rcs/generic/hwp-docs/issues/8)

![asdf](http://localhost:8080\?issue\=/rcs/generic/hwp-docs/issues/9)

![asdf](http://localhost:8080\?issue\=/rcs/generic/hwp-docs/issues/92335456)


Since `node-canvas` and underlying modules currently have [issues](https://github.com/Automattic/node-canvas/issues/760) with emojis they are loaded as png images into the canvas image.

### Cache policy

By default the images have a cache age of `30 seconds` which should keep load off the server but still offer near _realtime_ updates of issue states.

## License

Licensed under [MIT](LICENSE) by [Andreas Offenhaeuser](https://anoff.io)
