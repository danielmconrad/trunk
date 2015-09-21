window.tk8 = tk8 = (function(element) {

  var OVERFLOW_BUFFER = 1;

  var _initOne = function(el){
    var $el, content, lastWordIndex, ellipsis, nodes;

    $el = $(el);

    if(_isDesiredHeight($el)) return;

    content = _getContent($el);
    lastWordIndex = _getLastAcceptableWordIndex($el, content);

    wordNodes = [];
    text = document.createDocumentFragment();
    ellipsis = document.createTextNode('...');
    
    for(var i = 0; i < lastWordIndex; i++) {
      var wordNode = document.createTextNode(content.words[i] + ' ');
      text.appendChild(wordNode);
      wordNodes.push(wordNode);
    }

    $el.empty()
    el.appendChild(text);
    el.appendChild(ellipsis);

    while (!_isDesiredHeight($el)) {
      lastWordNode = wordNodes.pop();
      el.removeChild(lastWordNode);
    }

  };

  var _getContent = function($el) {
    var text, words;

    text = $el.text().trim();
    words = text.split(' ');

    return {
      text: text,
      words: words
    };
  };

  var _isDesiredHeight = function($el) {
    var currentHeight = $el.height();
    var desiredHeight = _getDesiredHeight($el);

    return currentHeight <= desiredHeight;
  };

  var _getDesiredHeight = function($el) {
    var lines, lineHeight;
    lines = _getDesiredLines($el);
    lineHeight = _getLineHeight($el);
    return lines * lineHeight;
  };

  var _getLineHeight = function($el) {
    return parseInt($el.css('lineHeight').replace('px', ''));
  };

  var _getCurrentLines = function($el) {
    return $el.height() / _getLineHeight($el);
  };

  var _getDesiredLines = function($el) {
    return $el.data('tk8-lines');
  };

  var _getLastAcceptableWordIndex = function($el, content) {
    var currentLines, desiredLines, desiredHeight, height, words, text;

    words = content.words;
    text = content.text;

    lineHeight = _getLineHeight($el);
    currentLines = _getCurrentLines($el);
    desiredLines = _getDesiredLines($el);
    desiredHeight = _getDesiredHeight($el) + 'px';

    var charactersPerLine = Math.floor(text.length / currentLines);
    var desiredCharacters = desiredLines * charactersPerLine;

    desiredContent = text.substring(0, desiredCharacters);
    desiredWords = desiredContent.match(/ /g).length;

    return desiredWords + OVERFLOW_BUFFER;
  };

  return {
    init: function() {
      $('.tk8').each(function() {
        _initOne(this)
      });
    }
  }; 

})();