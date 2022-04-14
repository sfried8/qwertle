import {getItem, setItem} from './SaveDataManager'

function saveToStats(numGuesses, win) {
    let stats = getItem('stats')
    if (!stats) {
        stats = {
currentStreak: 0,
gamesPlayed: 0,
gamesWon: 0,
guesses: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, fail: 0},
maxStreak: 0,
winPercentage: 0
        }
    }
    if (win) {
        stats.guesses[numGuesses] += 1
        stats.gamesWon += 1
        stats.currentStreak += 1
    } else {
        stats.guesses['fail'] += 1
        stats.currentStreak = 0
    }
    stats.gamesPlayed += 1
    stats.maxStreak = Math.max(stats.currentStreak, stats.maxStreak)
    stats.winPercentage = Math.round(100 * (stats.gamesWon / stats.gamesPlayed))
    setItem('stats',stats)
}
function endStreak() {
        let stats = getItem('stats')
    if (!stats) {
        stats = {
currentStreak: 0,
gamesPlayed: 0,
gamesWon: 0,
guesses: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, fail: 0},
maxStreak: 0,
winPercentage: 0
        }
    }
    stats.currentStreak = 0
    setItem('stats',stats)
}
export {saveToStats, endStreak}