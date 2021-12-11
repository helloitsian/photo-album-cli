# Photo Album CLI

## Setup Steps
1. Clone repo
2. `cd` into repo
3. `npm install` or `npm install --include=dev` if you want to run tests.
4. `npm install -g .` to install the cli
5. Alternatively, you can run commands by using `node ./bind/index.js ALBUM_ID` without installing the package.
6. Run `getphotos album ALBUM_ID(1, 2, 3, e.t.c)` or `node ./bin/index.js album ALBUM_ID(1, 2, 3, e.t.c)`

Example command:
```
# returns photos from album with id of 1
getphotos album 1
```
