export function scanPlayersArray(pattern, playerArray) {
  let count = 0;
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < playerArray.length; j++) {
      if (pattern[i].includes(playerArray[j])) {
        count++;
      }
    }
    if (count === 3) {
      return true;
    } else {
      count = 0;
    }
  }
}
