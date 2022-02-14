/**
 * Remade This To be fully 
 * comptible with ES Modules.
 */

import fs  from "fs";
import path from "path";
import util from "util";
import stripAnsi from "strip-ansi";
import style from "ansi-styles";
import fuzzy from "fuzzy";

import Choices from "inquirer/lib/objects/choices.js";
import AutocompletePrompt  from "inquirer-autocomplete-prompt";


const readdir = util.promisify(fs.readdir);

function getPaths(
  rootPath,
  pattern,
  excludePath,
  excludeFilter,
  itemType,
  defaultItem,
  depthLimit,
) {
  const fuzzOptions = {
    pre: style.green.open,
    post: style.green.close,
  };

  async function listNodes(nodePath, level) {
    try {
      if (excludePath(nodePath)) {
        return [];
      }
      const nodes = await readdir(nodePath);
      const currentNode = (itemType !== 'file' ? [nodePath] : []);
      if (
        nodes.length > 0
        && (depthLimit === undefined || level >= 0)
      ) {
        const nodesWithPath = nodes.map(
          nodeName => listNodes(
            path.join(nodePath, nodeName),
            depthLimit ? level - 1 : undefined,
          ),
        );
        const subNodes = await Promise.all(nodesWithPath);
        return subNodes.reduce((acc, val) => acc.concat(val), currentNode);
      }
      return currentNode;
    } catch (err) {
      if (err.code === 'ENOTDIR') {
        return itemType !== 'directory' ? [nodePath] : [];
      }
      return [];
    }
  }

  const nodes = listNodes(rootPath, depthLimit);
  const filterPromise = nodes.then(
    (nodeList) => {
      const preFilteredNodes =
        !excludeFilter
        ? nodeList
        : nodeList.filter(node => !excludeFilter(node));

      const filteredNodes = fuzzy
        .filter(pattern || '', preFilteredNodes, fuzzOptions)
        .map(e => e.string);
      if (!pattern && defaultItem) {
        filteredNodes.unshift(defaultItem);
      }
      return filteredNodes;
    },
  );
  return filterPromise;
}

export default class InquirerFuzzyPath extends AutocompletePrompt {
  currentChoices = super.currentChoices;
  constructor(question, rl, answers) {
    const {
      depthLimit,
      itemType = 'any',
      rootPath = '.',
      excludePath = () => false,
      excludeFilter = false
    } = question;
    const questionBase = Object.assign(
      {},
      question,
      {
        source: (_, pattern) => getPaths(
          rootPath,
          pattern,
          excludePath,
          excludeFilter,
          itemType,
          question.default,
          depthLimit,
        ),
      },
    );
    super(questionBase, rl, answers);
  }

  search(searchTerm) {
    return super.search(searchTerm).then(() => {
      this.currentChoices.getChoice = (choiceIndex) => {
        const choice = Choices.prototype.getChoice.call(this.currentChoices, choiceIndex);
        return {
          value: stripAnsi(choice.value),
          name: stripAnsi(choice.name),
          short: stripAnsi(choice.name),
        };
      };
    });
  }

  onSubmit(line) {
    super.onSubmit(stripAnsi(line));
  }
}


