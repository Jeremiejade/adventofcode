const fs = require('fs');
const _ = require("lodash");

fs.readFile('./input', 'utf8',(err, data) => {
  const fData = data.toString().trim().split(',');
  const boxes = fData.reduce((boxes, code) => {
    const label = code.match(/\w+/)[0]
    const boxNumber = computeCode(label)
    if (code.indexOf('=') !== -1){
      const lens = parseInt(code.match(/\d+/)[0])
      return addLensInBox(boxes, boxNumber, label, lens)
    }
    return removeLensInBox(boxes, boxNumber, label)
  },new Array(256));
  const result = boxes.reduce((acc, box, index)=> {
    return acc + box.reduce((acc, [,lens], j) => {
      return acc + ((index + 1) * (j + 1) * lens)
    },0)
  },0)

  console.log(result)
});

function computeCode(code) {
  let result = 0;
  for (let i = 0; i < code.length; i++) {
    result = (result + code.charCodeAt(i)) * 17 % 256
  }
  return result
}

function removeLensInBox(boxes, boxNumber, label) {
  if(boxes[boxNumber]) {
    boxes[boxNumber] = boxes[boxNumber].filter(([l]) => l !== label)
  }
  return boxes
}

function addLensInBox(boxes, boxNumber, label, lens) {
  if(!boxes[boxNumber]){
    boxes[boxNumber] = [[label, lens]]
    return boxes
  }
  const sameLabelBoxIndex = findLabelBox(label, boxes[boxNumber]);
  if (sameLabelBoxIndex !== null) {
    boxes[boxNumber][sameLabelBoxIndex][1] = lens;
    return boxes
  }
  boxes[boxNumber].push([label, lens])
  return boxes
}

function findLabelBox(label, labels) {
  let index = null;

  labels.find((l, i) => {
    if (l[0] === label) {
      index = i
      return true;
    }
    return false;
  });
  return index;
}