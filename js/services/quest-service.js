var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const STORAGE_KEY = 'quest'

function createQuestsTree() {
    gQuestsTree = loadFromStorage(STORAGE_KEY)

    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi?');
        gQuestsTree.no = createQuest('Rita?');
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
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    var newQuest = createQuest(newQuestTxt);
    newQuest.yes = createQuest(newGuessTxt);
    newQuest.no = gCurrQuest;
    gPrevQuest[lastRes] = newQuest;

    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    console.log(gQuestsTree);
    _saveQuestStorage()

}

function getCurrQuest() {
    return gCurrQuest
}

function _saveQuestStorage() {
    saveToStorage(STORAGE_KEY, gQuestsTree)
}



