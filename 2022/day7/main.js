const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input', { encoding: 'utf8' });
const lines = input.trim().split('\n');
lines.shift()


const tree = {
  data: 0,
}
let position = tree;
lines.forEach(line => {
  position = createTree(position, line)
});


function treeSanityse(tree) {
  tree.parent = null;
  for (const treeKey in tree) {
    if (!(treeKey === 'parent' || treeKey === 'data' || treeKey === 'files')) treeSanityse(tree[treeKey])
  }
}

treeSanityse(tree)
// fs.writeFileSync('./tree.json', JSON.stringify(tree),{encoding:'utf8'});
// console.log(tree)


function createTree(directory, line) {
  if (line[0] === '$') {
    const command = line.slice(2, 4);
    if (command === 'cd') {
      const dir = line.slice(5, line.length);
      if (dir === '..') {
        return directory.parent;
      }
      return directory[dir];
    } else {
      return directory;
    }
  }

  if (line[0] === 'd') {
    const dir = line.slice(4, line.length);
    directory[dir] = {
      parent: directory,
      data: 0,
    }
    return directory;
  }
  const [, size] = line.match(/(\d*)/)
  directory.data += parseInt(size)
  // directory.files.push(line)
  return directory;
}

const folderList = {}
const test = []

function findFolderSize(folder, folderRefKey) {
  if (!folderList[folderRefKey]) {
    folderList[folderRefKey] = folder.data
  }
  for (const folderKey in folder) {
    if (!(folderKey === 'parent' || folderKey === 'data')) {
      folderList[folderRefKey] += folder[folderKey].data;
      findFolderSize(folder[folderKey], folderRefKey)
    }
  }
}

const testsInpput = {
  data: 0,
  a: {
    data:1,
    aa: {
      data: 2,
      aaa: {
        data: 3,
        aaaa: {
          data: 4
        }
      }
    }
  },
  b: {
    data:1,
    bb: {
      data: 2,
      bbb: {
        data: 3,
        bbbb: {
          data: 4,
          a: {
            data:5
          }
        },

      }
    }
  },

}
let modifier = 0
function deepInside(tree) {
  for (const key in tree) {
    if (!(key === 'parent' || key === 'data')) {
      if(test.includes(key+modifier)){
        modifier++
      }
      test.push(key+modifier)
      findFolderSize(tree[key], key+modifier)

    }
    if(tree[key]) {
      deepInside(tree[key])
    }
  }
}
// findFolderSize(tree, '_')
deepInside(tree)
// console.log(test,  test.length, _.uniq(test).length)

// fs.writeFileSync('./flist.json', JSON.stringify(folderList),{encoding:'utf8'});

const freeSpaceNeeded = 8008081;
let response = [];
let total = 186968025;
const limitSize = 100000;
for (const folderListKey in folderList) {
  if (folderList[folderListKey] >= freeSpaceNeeded) response.push({ name: folderListKey, size: folderList[folderListKey] })
}
console.log(response.sort((a, b)=> a.size-b.size))

