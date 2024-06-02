

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
    /* console.log(`${years}-${months}-${days}`) */
    updateDOM(years, months, days)
}


// Checks if there are problems with user input
const areTheyTrue = (args) => {
    // Condition if value is empty, non-integer, or lower than 1
    if (args.value === '' || !/^\d+$/.test(args.value)) {
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
        // Updates the result DOM with "--" 
        updateDOM(NaN, NaN, NaN)
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


const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]


// Changes target input to numbers between 1 and max day of the month if input is outside of possible days
inputMonth.addEventListener('input', event => {
    const inputValue = event.target.value.trim()
    // Allow to empty string when backspace
    if (inputValue === '') {

    } else {
        //  If input is greater than 12 or lesser than 1, change input value to 1 or 12
        const value = Number(inputValue)
        if (value > 12) {
            event.target.value = '12'
        } else if (value <= 0) {
            event.target.value = '1'
        }
    }


    const selectedMonth = Number(event.target.value)


    // If the input day is beyond what the max days of the month, change it to the max day
    // Otherwise continue
    if (inputDay.value > daysInMonth[selectedMonth - 1]) {
        inputDay.value = daysInMonth[selectedMonth - 1]
    }


})

inputDay.addEventListener('input', event => {
    const inputValue = event.target.value.trim()
    if (inputValue === '') {

    }
    else {
        const value = Number(inputValue)
        if (value > 31) {
            event.target.value = '31'
        }
        else if (value <= 0) {
            event.target.value = '1'
        }
    }
    // If there is input already in month, and if day value is greater than the max day of the month
    // Change the day input to the maximum day of the month
    // Otherwise continue
    if (inputMonth.value) {
        const maxDay = daysInMonth[inputMonth.value - 1]

        // Default to empty string
        if (event.target.value <= 0) {
            event.target.value = ''
        }

        if (event.target.value > maxDay) {
            event.target.value = maxDay
        }
    }
})

inputYear.addEventListener('blur', event => {
    const inputValue = event.target.value.trim()
    if (inputValue === '') {

    }
    else {
        const value = Number(inputValue)
        // If input is higher than 2024, enter current date
        if (value > 2024) {
            event.target.value = '2024'
            const toDate = new Date()
            inputMonth.value = toDate.getMonth() + 1
            inputDay.value = toDate.getDate()
        }
        else if (value < 100) {
            event.target.value = '100'
        }
    }


    // If leap year, update daysInMonth array index[1] which is Feb with new value represented as max days
    const isLeapYear = (inputYear.value % 4 === 0 && inputYear.value % 100 !== 0) || (inputYear.value % 400 === 0)
    if (isLeapYear) {
        daysInMonth[1] = 29
        const event = new Event('input')
        inputDay.dispatchEvent(event)
    }
    else {
        daysInMonth[1] = 28
        const event = new Event('input')
        inputDay.dispatchEvent(event)
    }
})

