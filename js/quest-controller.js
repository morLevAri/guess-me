'use strict';

var gLastRes = null;

jQuery(function () {
  $('.btn-start').click(onStartGuessing);
  $('.btn-yes').click({ ans: 'yes' }, onUserResponse);
  $('.btn-no').click({ ans: 'no' }, onUserResponse);
  $('.btn-add-guess').click(onAddGuess);
  console.log('Started...');
  createQuestsTree();
})

function onStartGuessing() {
  $('.game-start').hide('slow')
  renderQuest();
  $('.quest').show()
}

function renderQuest() {
  var currQuest = getCurrQuest();
  $('.quest h2').text(currQuest.txt)
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!');
    } else {
      alert('I dont know...teach me!');
      $('.quest').hide()
      $('.new-quest').show('slow')
    }
  } else {
    gLastRes = res;
    moveToNextQuest();
    renderQuest();
  }
}

function onAddGuess(ev) {
  var res = ev.data.ans;
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  gLastRes = res;
  addGuess(newQuest, newGuess, gLastRes)
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  gLastRes = null;
}
