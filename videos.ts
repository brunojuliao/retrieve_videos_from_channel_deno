/**
 * Output: HTML Data
 */
const textResponse = await fetch("https://www.youtube.com/@leadster_/videos")
const fullContent = await textResponse.text()

const startExpression = 'var ytInitialData = '
const startIndex = fullContent.indexOf(startExpression)
const endIndex = fullContent.indexOf(';', startIndex)

const jsonText = fullContent.substring(startIndex + startExpression.length, endIndex)

const obj = JSON.parse(jsonText)

const contents = obj['contents']['twoColumnBrowseResultsRenderer']['tabs'][1]['tabRenderer']['content']['richGridRenderer']['contents']

// deno-lint-ignore no-explicit-any
const arr: Array<any> = []

for(const content of contents) {
  if (!content['richItemRenderer'])
    continue
  
  const item = content['richItemRenderer']['content']['videoRenderer']

  const id = item['videoId']
  const thumb = item['thumbnail']['thumbnails'].pop()['url']
  const title = item['title']['runs'].shift()['text']
  const description = item['descriptionSnippet']['runs'].shift()['text']

  arr.push({id, thumb, title, description})
}

Deno.writeTextFile('videos.json', JSON.stringify(arr, null, 4))
//console.log(arr)
console.log('Foi!')