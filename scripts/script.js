let sounds = []

function onSound(index) {
  // console.log('tocar o som', sounds[index].path)
  const pathSound = sounds[index].path

  const sound = new Audio(pathSound)

  sound.play()
}

fetch('../sounds.json')
  .then(response => response.json())
  .then(data => {
    sounds = data

    const elementSounds = document.querySelector('.sounds')

    sounds.map((sound, index) => {
      const li = document.createElement('li')
      const button = document.createElement('button')
      const span = document.createElement('span')
      const label = document.createElement('label')

      span.innerHTML = sound.hotkey
      label.innerHTML = sound.label

      button.appendChild(span)
      button.appendChild(label)

      button.setAttribute('onclick', `onSound(${index})`)
      li.appendChild(button)
      elementSounds.appendChild(li)
    })
  })

document.addEventListener('keydown', ({ key }) => {
  const soundIndex = sounds.findIndex(sound => sound.hotkey === key)

  if (soundIndex === -1) {
    return
  }

  onSound(soundIndex)
})
