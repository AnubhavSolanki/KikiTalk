osascript -e 'tell application "iTerm2"
    set newWindow to (create window with default profile)
    tell current session of newWindow
        write text "cd Desktop/Personal\\ Repositories/Major-Project/frontend && npm start"
        end tell
    tell current session of current window to set newSplit to split vertically with same profile
    tell newSplit
        write text "cd Desktop/Personal\\ Repositories/Major-Project/backend && npm start"
    end tell
end tell'
