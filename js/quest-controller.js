'use strict';

var gLastRes = null;

jQuery(function () {
  $('.btn-start').click(onStartGuessing);
  $('.btn-yes').click({ ans: 'yes' }, onUserResponse);
  $('.btn-no').click({ ans: 'no' }, onUserResponse);
  $('.btn-add-guess').click(onAddGuess);
  // console.log('Started...');
  createQuestsTree();
})

function onStartGuessing() {
  $('.game-start').hide('1000')
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
      onRestartGame()
    } else {
      alert('I dont know...teach me!');
      $('.quest').hide()
      $('.new-quest').show('1000')
    }
  } else {
    gLastRes = res;
    moveToNextQuest(gLastRes);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  addGuess(newQuest, newGuess, gLastRes)
  $('#newGuess').val('');
  $('#newQuest').val('');
  onRestartGame()
}


function onRestartGame() {
  $('.new-quest').hide();
  $('.quest').hide()
  $('.game-start').show();
  gLastRes = null;
}
