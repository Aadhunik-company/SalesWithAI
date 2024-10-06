import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo"
import { useState } from "react"
import { XMarkIcon, SparklesIcon } from "@heroicons/react/24/solid"
import cssText from "data-text:./style.css"
 
export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  console.log(cssText);
  
  style.textContent = cssText
  return style
}
export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/in/*"]
}

const LinkedInProfileExtension = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [profileData, setProfileData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  /**
   * Fetches the profile data from the background script
   * 
   * @returns {Promise} Resolves with the profile data
   */
  const fetchProfileData = async () => {
    const pageHtml = document.documentElement.outerHTML
  
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        { type: "ANALYZE_PROFILE", html: pageHtml },
        (response) => {
          setProfileData(response)
          resolve(response)
        }
      )
    })
  }

  const togglePanel = async () => {
    if (!isOpen && !profileData) {
      await fetchProfileData()
    }
    setIsOpen(!isOpen)
  }
  console.log(
    "You may find that having is not so pleasing a thing as wanting. This is not logical, but it is often true."
  )
  return (
        <div className="fixed right-4 top-1/2 z-50 font-sans">
          <button
            onClick={togglePanel}
            className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
          >
            <span className="mr-1">P</span>
            <SparklesIcon className="w-4 h-4" />
          </button>
          {isOpen && (
            <div className="fixed right-4 top-20 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">Pitch</h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 max-h-[calc(100vh-120px)] overflow-y-auto">
                {isLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : error ? (
                  <div className="text-red-500">{error}</div>
                ) : profileData ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">{profileData.name}</h3>
                      <p className="text-sm text-gray-600">{profileData.headline}</p>
                      <p className="text-sm text-gray-500">{profileData.location}</p>
                    </div>
                    {profileData.about && (
                      <div>
                        <h4 className="font-semibold text-gray-700">About</h4>
                        <p className="text-sm text-gray-600">{profileData.about}</p>
                      </div>
                    )}
                    {profileData.experience && profileData.experience.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-700">Experience</h4>
                        <ul className="space-y-2">
                          {profileData.experience.map((exp, index) => (
                            <li key={index} className="text-sm">
                              <p className="font-medium text-gray-700">{exp.title}</p>
                              <p className="text-gray-600">{exp.company}</p>
                              <p className="text-gray-500">{exp.duration}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {profileData.pitchSuggestion && (
                      <div>
                        <h4 className="font-semibold text-gray-700">Pitch Suggestion</h4>
                        <p className="text-sm text-gray-600">{profileData.pitchSuggestion}</p>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
  )
}

export default LinkedInProfileExtension