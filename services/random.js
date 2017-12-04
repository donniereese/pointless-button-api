const randNum = (min = 0, max = 99999, width = null) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    //The maximum is inclusive and the minimum is inclusive
    let rand =  Math.floor(Math.random() * (max - min + 1)) + min;
    if (width) {
        str = rand.toString();
        if (str.length > width) rand = parseInt(str.slice((str.length - width)), 10);
        if (str.length < width) rand = parseInt(str.padStart(width, '0'), 10);
    }
    return rand;
};

const randArray = (min = 0, max = 99999, width = null, length = 5, type = 'number') => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const arr = [];
    for (let i = 0; i < length; i++) {
        switch(type) {
            // TODO: add type 'word' to randArray switch
            // TODO: add type 'char' to randArray switch
            // TODO: add type 'word' to randArray switch
            case 'number':
            default: {
                arr.push(randNum(min, max, width));
            }
        }
    }
    return arr;
}

module.exports = {
    number: randNum,
    array: randArray
}
