

const updateDOM = (years, months, days) => {
    const resultYear = document.getElementById('resultYear')
    const resultMonth = document.getElementById('resultMonth')
    const resultDay = document.getElementById('resultDay')

    if (isNaN(years)|| isNaN(months)|| isNaN(days)) {
        if(isNaN(years)){
            //If error feedback already exists
            
            const inputYear = document.querySelector('.input-year')
            inputYear.classList.add('error-state')
            const errorSpan = document.createElement('span')
            errorSpan.classList.add('error-feedback')
            errorSpan.textContent = "This field is required"
            inputYear.appendChild(errorSpan)
        }
        resultYear.textContent = '--'
        resultMonth.textContent = '--'
        resultDay.textContent = '--'
        
    }
    else{
        
        resultYear.textContent = years
        resultMonth.textContent = months
        resultDay.textContent = days
    }
}


//Calculation
const calculateAge = (formatBirthDate) => {
    const birthdate = new Date(formatBirthDate)
    const today = new Date()
    console.log(today.getTime())
    console.log(birthdate.getTime())
    const differenceInMS = Math.floor(today.getTime() - birthdate.getTime())
    const gapOfDays = (differenceInMS / (1000 * 60 * 60 * 24))

    const years = Math.floor(gapOfDays / 365.25)
    const remainder = gapOfDays % 365.25
    const months = Math.floor(remainder / 30.44)
    const days = Math.floor(remainder % 30.44)
    console.log(`${years}-${months}-${days}`)
    updateDOM(years, months, days)
}


//Input DOMs
const inputDay = document.getElementById('inputDay')
const inputMonth = document.getElementById('inputMonth')
const inputYear = document.getElementById('inputYear')

//Button
const submitButton = document.querySelector('.submit-button')
submitButton.addEventListener('click', () => {


    const formatBirthDate = inputYear.value + '-' + inputMonth.value + '-' + inputDay.value
    calculateAge(formatBirthDate)
})