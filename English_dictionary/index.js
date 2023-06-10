const input = document.getElementById('input')
const infoText = document.getElementById('info-text')
const meaningContainer = document.getElementById('meaning-container')
const title = document.getElementById('title')
const meaning = document.getElementById('meaning')
const audio = document.getElementById('audio')

input.addEventListener('keyup', (e) => {
  if(e.target.value && e.key === 'Enter'){
    fetchAPI(e.target.value)
  }
})

async function fetchAPI (word) {
  try {
    infoText.style.display = 'block'
    meaningContainer.style.display = 'none'
    infoText.innerText = `Searching the meaning of "${word}"`
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    const result = await fetch(url).then((res) => res.json())


    if (result.title) {
      meaningContainer.style.display = 'block'
      title.innerText = word
      meaning.innerText = "No Definitions Found"
      audio.style.display = 'none'
    }else {
      infoText.style.display = 'none'
      title.innerText = `${result[0].word}`
      meaning.innerText = `${result[0].meanings[0].definitions[0].definition}`
      audio.src = `${result[0].phonetics[0].audio || result[0].phonetics[1].audio}`
      meaningContainer.style.display = 'block'
    }
    
  } catch (error) {
    infoText.innerText = 'An error happened, try again later'
  }
}