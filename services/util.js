const cloneMap = (...maps) => {
  let map = null;

  if (maps.length <= 0) return map;

  if (maps.length === 1) {
    const entries = maps[0].entries();
    map = new Map(entries);

  } else {
    let pairs = [];

    for(map in maps) {
      pairs = Array.concat(pairs, map.entries());
    }
    map = new Map(pairs);

  }

  return map;
}


class EarError extends Error {
  constructor(message, extendedType) {
    super(message);

    this.name = "EarError";
  }
}

class EartofaceError extends Error {
  constructor(message, extendedType) {
    super(message);

    this.name = "EartofaceError";
  }
}


module.exports = {
  cloneMap,
  EarError,
  EartofaceError,
}
