var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const STORAGE_KEY = 'quest'

function createQuestsTree() {
    gQuestsTree = loadFromStorage(STORAGE_KEY)

    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
        _saveQuestStorage()
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = res;
    gCurrQuest = getCurrQuest();
    console.log(gCurrQuest);
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    console.log(newQuestTxt);
    console.log(newGuessTxt);
    console.log(lastRes);
    createQuestsTree()
    // TODO: Create and Connect the 2 Quests to the quetsions tree
}

function getCurrQuest() {
    return gCurrQuest
}

function _saveQuestStorage() {
    saveToStorage(STORAGE_KEY, gQuestsTree)
}



