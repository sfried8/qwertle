function saveToStats(numGuesses, win, store) {
    let stats = store.state.stats
    if (!stats) {
        stats = {
            currentStreak: 0,
            gamesPlayed: 0,
            gamesWon: 0,
            guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, fail: 0 },
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
    store.commit('set_stats', stats)
}
function endStreak(store) {
    let stats = store.state.stats
    if (!stats) {
        stats = {
            currentStreak: 0,
            gamesPlayed: 0,
            gamesWon: 0,
            guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, fail: 0 },
            maxStreak: 0,
            winPercentage: 0
        }
    }
    stats.currentStreak = 0
    store.commit('set_stats', stats)
}
export { saveToStats, endStreak }