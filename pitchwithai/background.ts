export {}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "ANALYZE_PROFILE") {
    console.log(message.html)
    // In a real scenario, you'd make an API call here
    // For now, we'll simulate an API response
    const dummyResponse = {
      name: "John Doe",
      currentPosition: "Software Engineer at Tech Corp",
      location: "San Francisco Bay Area",
      skills: ["JavaScript", "React", "Node.js", "Python"]
    }
    const analyzedData = {
        ...message.data,
        pitchSuggestion: "Based on the profile, consider highlighting the candidate's extensive experience in software development and leadership roles in tech companies."
      }

    setTimeout(() => {
      sendResponse(dummyResponse)
    }, 1000) // Simulate API delay

    return true // Indicates that the response is sent asynchronously
  }
})