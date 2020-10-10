
console.log("client side javascript file is loaded");

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    if (!location) {
        return messageOne.textContent = "Please provide the location"
    }

    messageOne.textContent = 'loading'

    fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.forecast
                messageTwo.textContent = data.location
            }
        })
    })

})