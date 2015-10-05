var OVERFLOW_BUFFER, _getContent, _getCurrentLinesCount, _getDesiredHeight, _getDesiredLinesCount, _getLastAcceptableWordIndex, _getLineHeight, _getTextAndWordNodes, _initOne, _isDesiredHeight;

OVERFLOW_BUFFER = 1;

module.exports = {
  init: function() {
    return $('.tk8').each(function() {
      return _initOne(this);
    });
  }
};

_initOne = function(el) {
  var $el, content, ref, results, textNode, wordNodes;
  $el = $(el);
  if (_isDesiredHeight($el)) {
    return;
  }
  content = _getContent($el);
  ref = _getTextAndWordNodes($el, content), textNode = ref.textNode, wordNodes = ref.wordNodes;
  $el.empty();
  el.appendChild(textNode);
  el.appendChild(document.createTextNode('...'));
  results = [];
  while (!_isDesiredHeight($el) && wordNodes.length) {
    results.push(el.removeChild(wordNodes.pop()));
  }
  return results;
};

_isDesiredHeight = function($el) {
  return $el.height() <= _getDesiredHeight($el);
};

_getContent = function($el) {
  var text, words;
  text = $el.text().trim();
  words = text.split(' ');
  return {
    text: text,
    words: words
  };
};

_getTextAndWordNodes = function($el, content) {
  var i, lastWordIndex, textNode, word, wordNode, wordNodes, words;
  words = content.words;
  textNode = document.createDocumentFragment();
  lastWordIndex = _getLastAcceptableWordIndex($el, content);
  wordNodes = (function() {
    var j, ref, results;
    results = [];
    for (i = j = 0, ref = lastWordIndex; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      word = content.words[i];
      wordNode = document.createTextNode(word + " ");
      textNode.appendChild(wordNode);
      results.push(wordNode);
    }
    return results;
  })();
  return {
    textNode: textNode,
    wordNodes: wordNodes
  };
};

_getDesiredHeight = function($el) {
  return _getDesiredLinesCount($el) * _getLineHeight($el);
};

_getLineHeight = function($el) {
  return parseInt($el.css('lineHeight').replace('px', ''));
};

_getCurrentLinesCount = function($el) {
  return $el.height() / _getLineHeight($el);
};

_getDesiredLinesCount = function($el) {
  return $el.data('tk8-lines');
};

_getLastAcceptableWordIndex = function($el, content) {
  var charactersPerLine, currentLines, desiredCharacters, desiredContent, desiredLines, desiredWords, text, words;
  text = content.text, words = content.words;
  currentLines = _getCurrentLinesCount($el);
  desiredLines = _getDesiredLinesCount($el);
  charactersPerLine = Math.floor(text.length / currentLines);
  desiredCharacters = desiredLines * charactersPerLine;
  desiredContent = text.substring(0, desiredCharacters);
  desiredWords = desiredContent.match(' ');
  return desiredWords.length + OVERFLOW_BUFFER;
};
