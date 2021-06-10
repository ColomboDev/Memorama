import shuffle from "lodash.shuffle";
import { emojis } from "./emojis";

export function createMemo() {
  const emojisBlock = emojis();
  let blocks = [];
  while (blocks.length < 20) {
    let index = Math.floor(Math.random() * emojisBlock.length);
    let block = {
      emoji: emojisBlock.splice(index, 1)[0],
      flipped: false,
    };
    blocks.push(block);
    blocks.push({ ...block });
  }

  blocks = blocks.map((block, index) => {
    return { ...block, index };
  });
  return shuffle(blocks);
}
