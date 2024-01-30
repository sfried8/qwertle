const CHANGES = [
    {
        version: "1.2.1",
        features: [],
        bugfixes: ["Fixed freeze when blocking trackers"]
    },
    {
        version: "1.2.0",
        features: ["Practice mode! Switch between Practice and Daily mode in the menu by tapping ☰"],
        bugfixes: []
    },

]
function getChangesSince(lastSeenVersion) {
    const ret = { features: [], bugfixes: [] }
    for (const version of CHANGES) {
        if (isNewerVersion(version.version, lastSeenVersion, true)) {
            ret.features.push(...version.features)
            ret.bugfixes.push(...version.bugfixes)
        }
    }
    return ret
}
function isNewerVersion(current, previous, checkBuild) {
    const [curMaj, curMin, curBld] = current.split('.').map(v => (+v))
    const [prevMaj, prevMin, prevBld] = previous.split('.').map(v => (+v))
    if ((curMaj || 0) > (prevMaj || 0)) {
        return true
    }
    if ((curMaj || 0) < (prevMaj || 0)) {
        return false
    }
    if ((curMin || 0) > (prevMin || 0)) {
        return true
    }
    if ((curMin || 0) < (prevMin || 0)) {
        return false
    }
    if (!checkBuild) {
        return false
    }
    return (curBld || 0) > (prevBld || 0)
}
export { CHANGES, isNewerVersion, getChangesSince }