let data = null;

function init() {
    if (data === null) {
        data = JSON.parse(window.localStorage.getItem("qwertleData") || "{}")
    }
}
function save() {
    init()
    window.localStorage.setItem('qwertleData', JSON.stringify(data))
}


function getItem(name) {
    init()
    return data[name]
}

function setItem(name, value) {
    init()
    data[name] = value
    save()
}

export { getItem, setItem}