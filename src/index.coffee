OVERFLOW_BUFFER = 1

module.exports = 
  init: ->
    $('.tk8').each ->
      _initOne this

_initOne = (el) ->
  $el = $(el)

  return if _isDesiredHeight $el

  content = _getContent $el

  {textNode, wordNodes} = _getTextAndWordNodes($el, content)  

  $el.empty()

  el.appendChild textNode
  el.appendChild document.createTextNode('...')

  while not _isDesiredHeight($el) and wordNodes.length
    el.removeChild wordNodes.pop()

_isDesiredHeight = ($el) ->
  $el.height() <= _getDesiredHeight($el)

_getContent = ($el) ->
  text = $el.text().trim()
  words = text.split ' '

  {text, words}

_getTextAndWordNodes = ($el, content) ->
  {words} = content
  textNode = document.createDocumentFragment()

  lastWordIndex = _getLastAcceptableWordIndex $el, content

  wordNodes = for i in [0..lastWordIndex]
    word = content.words[i]
    wordNode = document.createTextNode "#{word} "
    textNode.appendChild wordNode
    wordNode

  {textNode, wordNodes}

_getDesiredHeight = ($el) ->
  _getDesiredLinesCount($el) * _getLineHeight($el)

_getLineHeight = ($el) ->
  parseInt $el.css('lineHeight').replace('px', '')

_getCurrentLinesCount = ($el) ->
  $el.height() / _getLineHeight($el)

_getDesiredLinesCount = ($el) ->
  $el.data('tk8-lines')

_getLastAcceptableWordIndex = ($el, content) ->
  {text, words} = content

  currentLines = _getCurrentLinesCount($el);
  desiredLines = _getDesiredLinesCount($el);

  charactersPerLine = Math.floor(text.length / currentLines)
  desiredCharacters = desiredLines * charactersPerLine

  desiredContent = text.substring 0, desiredCharacters
  desiredWords = desiredContent.match ' '

  desiredWords.length + OVERFLOW_BUFFER
