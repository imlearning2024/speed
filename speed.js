const typeThis = document.querySelector(".typeThis")
const speedMeter = document.querySelector(".speedMeter")
const timeMeter = document.querySelector(".timeMeter")
const correctness = document.querySelector(".feedback")
const realTimeSpeedMeter = document.querySelector(".realTimeSpeedMeter")
let typedText = ''
let highlighted =''
let wpm=0
let correctCharCount = 0
const keySound = new Audio("sound.mp3")
const end = new Audio("end.mp3")

let whatToType = "Group some make these over, under how well may write 6989 4 most after! 3369 we can course back. Become 36 mean. Where increase about; here end work when against it both each seem life real"
typeThis.textContent = whatToType
let timer
let timeElapsed=0
typeThis.addEventListener("focus",()=>{
    timer = setInterval(()=>{
       
        timeMeter.textContent = timeElapsed 
        timeElapsed++
    },1000)
})
typeThis.addEventListener("blur",()=>{
    clearInterval(timer)
    timeElapsed = 0
    wpm=0
    typedText = ""
    highlighted=""
    typeThis.textContent = whatToType
    correctCharCount = 0

    //wpm avg
    
})
typeThis.addEventListener("keydown",(event)=>{
    keySound.currentTime = 0; 
    keySound.play();
    if(typedText.length ===whatToType.length){
        clearInterval(timer)
        end.play()
        return
    }
    if(event.key.length===1){
        if(event.key ===  whatToType[typedText.length])
        typedText += event.key
    }
    else if(event.key ==="Backspace"){
        typedText = typedText.slice(0,-1)
    }
    
    //for highlighting text
    highlighted = ""
    correctCharCount = 0
    for(let i=0 ; i<typedText.length ; i++){
        if(typedText[i]===whatToType[i]){
            correctCharCount++
            highlighted += `<span style="color:yellow; font-size:30px; font-weight:bold;">${typedText[i]}</span>`
        }
        else{
            highlighted += `<span style="color:grey; font-size:30px; font-weight:bold;">${typedText[i]}</span>`
        }
        
        
    }
    //feedback
    if(typedText[typedText.length-1]===whatToType[typedText.length-1]){
        console.log("correct")
        correctness.textContent = `Feedback : correct`
    }
    else{
        console.log("Incorrect")
        correctness.textContent = `Feedback : Incorrect`
    }


    highlighted += whatToType.slice(typedText.length)
    typeThis.innerHTML = highlighted
    console.log(`${highlighted}`)
    wpm = Math.round(typedText.trim().length/5)/(timeElapsed/60)
    realTimeSpeedMeter.textContent = wpm
    // console.log(typedText.trim().length)
    console.log("correct char: + "+  correctCharCount)
    
    speedMeter.textContent = wpm

})
    
