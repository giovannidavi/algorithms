const getRepeats = letters => letters.split('').reduce((acc, letter, i) => {
  let rep = 1;
  let prev = acc[acc.length - 1];
  if(prev && prev.letter === letter){
    prev = { letter, rep: prev.rep++}
  }else{
    acc.push({ letter, rep })
  }
  return acc
}, []);

const compress = repeats => repeats.map(r => `${r.rep}${r.letter}`).join('')

const solution = (S, K) => {
  let repeats = getRepeats(S)

  for(let i = 0; i < repeats.length - 1; i++){
    const rep = repeats[i];
    const remaining = repeats.slice(i + 1)
    // get relative next index
    let nextIndex = remaining.findIndex(r => r.letter === rep.letter);
    // get abs next index
    nextIndex = nextIndex > -1 ? nextIndex + i + 1 : null;

    let dist = 0;
    let maybeDelete = [];
    while(nextIndex - 1 > i){
      maybeDelete.push(nextIndex - 1);
      dist += repeats[nextIndex - 1].rep;
      nextIndex--
    }

    if(dist && dist <= K){
      maybeDelete.forEach(i => {
        repeats[i].delete = true;
      })
    }
    maybeDelete = [];
  }

  const compressedString = repeats.map(r => {
    return r.delete ? '' : r.letter.repeat(r.rep)
  }).join('');

  const compressed = compress(getRepeats(compressedString));

  return compressed.length
};

console.log(solution('AAAABBBAACCAAABXXAAAAAAPPPPPPPPAAAAA', 3)); // 2
console.log(solution('AAAAAAAAAAAAAAABXXAAAAAAA', 3)); // 2