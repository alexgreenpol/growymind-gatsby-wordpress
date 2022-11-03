import React from "react"
import useDarkMode from "use-dark-mode"
import "./DarkModeToggler.scss"

const DarkModeToggler = () => {
  const darkMode = useDarkMode(false)

  if (typeof window === "undefined") return null

  return (
    <div className="darkmode">
      <button
        className={`darkmode__btn darkmode__btn--moon ${
          !darkMode.value ? "active" : "hidden"
        }`}
        type="button"
        onClick={darkMode.enable}
      >
        ☀
      </button>
      <button
        className={`darkmode__btn darkmode__btn--sun ${
          darkMode.value ? "active" : "hidden"
        }`}
        type="button"
        onClick={darkMode.disable}
      >
        ☾
      </button>
    </div>
  )
}

export default DarkModeToggler
