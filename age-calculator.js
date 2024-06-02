

// Create a span and adjust styling for parent node
const createErrorFeedback = (node, correct) => {
    const imNodeNow = node.parentNode
    // If it is an error, adjust styling
    if (!imNodeNow.classList.contains('error-state') && correct === false) {
        imNodeNow.classList.add('error-state')
        const errorSpan = document.createElement('span')
        errorSpan.classList.add('error-feedback')
        errorSpan.textContent = "This field is required"
        imNodeNow.appendChild(errorSpan)
    }
    // If it is an error feedback and is now in correct state(Not empty, integer value)
    // Remove error feedback
    else if (imNodeNow.classList.contains('error-state') && correct === true) {
        imNodeNow.classList.remove('error-state')
        const errorSpan = imNodeNow.querySelector('.error-feedback')
        errorSpan.remove()
    }
    // Already correct states are ignored
    // States that are still wrong are ignored
    return
}


const updateDOM = (years, months, days) => {
    const resultYear = document.getElementById('resultYear')
    const resultMonth = document.getElementById('resultMonth')
    const resultDay = document.getElementById('resultDay')

    //Change condition to cater empty and NaN
    if (isNaN(years) || isNaN(months) || isNaN(days)) {
        resultYear.textContent = '--'
        resultMonth.textContent = '--'
        resultDay.textContent = '--'

    }
    else {
        resultYear.textContent = years
        resultMonth.textContent = months
        resultDay.textContent = days
    }
}


//Calculation
const calculateAge = (formatBirthDate) => {
    const birthdate = new Date(formatBirthDate)
    const today = new Date()
    const differenceInMS = Math.floor(today.getTime() - birthdate.getTime())
    const gapOfDays = (differenceInMS / (1000 * 60 * 60 * 24))

    const years = Math.floor(gapOfDays / 365.25)
    const remainder = gapOfDays % 365.25
    const months = Math.floor(remainder / 30.44)
    const days = Math.floor(remainder % 30.44)
    console.log(`${years}-${months}-${days}`)
    updateDOM(years, months, days)
}


// Checks if there are problems with user input
const areTheyTrue = (args) => {
    // Condition if value is empty, non-integer, or lower than 1
    if (args.value === '' || !/^\d+$/.test(args.value) || args.value <= 0) {
        return false
    }
    else {
        return true
    }
}

//Input DOMs
const inputDay = document.getElementById('inputDay')
const inputMonth = document.getElementById('inputMonth')
const inputYear = document.getElementById('inputYear')

//Button
const submitButton = document.querySelector('.submit-button')
submitButton.addEventListener('click', () => {

    let isAllTrue = []
    let inputArray = [inputDay, inputMonth, inputYear]

    inputArray.forEach(input => {
        isAllTrue.push(areTheyTrue(input))
    })


    console.log(isAllTrue)
    // If all input is correct
    if (isAllTrue.every(state => { return state === true })) {
        const formatBirthDate = inputYear.value + '-' + inputMonth.value + '-' + inputDay.value
        calculateAge(formatBirthDate)

        // Remove all wronged states
        for (let index = 0; index < isAllTrue.length; index++) {
            if (isAllTrue[index] === true) {
                createErrorFeedback(inputArray[index], isAllTrue[index])
            }
        }
    }
    else {
        // If they are false, create a feedback error
        // If they are true, remove any feedback error
        for (let index = 0; index < isAllTrue.length; index++) {
            if (isAllTrue[index] === false) {
                createErrorFeedback(inputArray[index], isAllTrue[index])
            }
            else if (isAllTrue[index] === true) {
                createErrorFeedback(inputArray[index], isAllTrue[index])
            }
        }
    }

})