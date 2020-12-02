
const randomInteger = () => {
  let min = 1, max = 16
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

let I1 = randomInteger(), I2 = randomInteger(), I3 = randomInteger(), I4 = randomInteger()
const I = {
  blocks: [
    [
      [0, I1 + ' t l r', 0, 0],
      [0, I2 + ' l r', 0, 0],
      [0, I3 + ' l r', 0, 0],
      [0, I4 + ' b l r', 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [I4 + ' l t b', I3 + ' t b', I2 + ' t b', I1 + ' t b r'],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, I4 + ' t l r', 0],
      [0, 0, I3 + ' l r', 0],
      [0, 0, I2 + ' l r', 0],
      [0, 0, I1 + ' b l r', 0]
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [I1 + ' l t b', I2 + ' t b', I3 + ' t b', I4 + ' t b r'],
      [0, 0, 0, 0]
    ]
  ],
  className: 'piece-i'
};

let J1 = randomInteger(), J2 = randomInteger(), J3 = randomInteger(), J4 = randomInteger()
const J = {
  blocks: [
    [
      [0, J1 + ' t l r', 0, 0],
      [0, J2 + ' l r', 0, 0],
      [J3 + ' l t b', J4 + ' b r', 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [J4 + ' t l r', 0, 0, 0],
      [J3 + ' l b', J2 + ' t b', J1 + ' t b r', 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, J3 + ' t l', J4 + ' t b r', 0],
      [0, J2 + ' l r', 0, 0],
      [0, J1 + ' l r b', 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [J1 + ' b l t', J2 + ' t b', J3 + ' t r', 0],
      [0, 0, J4 + ' l r b', 0],
      [0, 0, 0, 0]
    ]
  ],
  className: 'piece-j'
};

let L1 = randomInteger(), L2 = randomInteger(), L3 = randomInteger(), L4 = randomInteger()
const L = {
  blocks: [
    [
      [0, L1 + ' t l r', 0, 0],
      [0, L2 + ' l r', 0, 0],
      [0, L3 + ' l b', L4 + ' t b r', 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [L3 + ' t l', L2 + ' t b', L1 + ' t b r', 0],
      [L4 + ' l b r', 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [L4 + ' t l b', L3 + ' t r', 0, 0],
      [0, L2 + ' l r', 0, 0],
      [0, L1 + ' l b r', 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, L4 + ' t l r', 0],
      [L1 + ' t b l', L2 + ' t b', L3 + ' b r', 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ],
  className: 'piece-l'
};

let O1 = randomInteger(), O2 = randomInteger(), O3 = randomInteger(), O4 = randomInteger()
const O = {
  blocks: [
    [
      [O1 + ' t l', O2 + ' t r', 0, 0],
      [O4 + ' b l', O3 + ' r b', 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [O4 + ' t l', O1 + ' t r', 0, 0],
      [O3 + ' b l', O2 + ' r b', 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [O3 + ' t l', O4 + ' t r', 0, 0],
      [O2 + ' b l', O1 + ' r b', 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [O2 + ' t l', O3 + ' t r', 0, 0],
      [O1 + ' b l', O4 + ' r b', 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ],
  className: 'piece-o'
};

let S1 = randomInteger(), S2 = randomInteger(), S3 = randomInteger(), S4 = randomInteger()
const S = {
  blocks: [
    [
      [0, 0, 0, 0],
      [0, S3 + ' t l', S4 + ' t b r', 0],
      [S1 + ' b l t', S2 + ' b r', 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [S1 + ' t l r', 0, 0, 0],
      [S2 + ' b l', S3 + ' t r', 0, 0],
      [0, S4 + ' b r l', 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, S2 + ' t l', S1 + ' b r t', 0],
      [S4 + ' b l t', S3 + ' b r', 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, S4 + ' t l r', 0, 0],
      [0, S3 + ' b l', S2 + ' t r', 0],
      [0, 0, S1 + ' b r l', 0],
      [0, 0, 0, 0]
    ]
  ],
  className: 'piece-s'
};

let T1 = randomInteger(), T2 = randomInteger(), T3 = randomInteger(), T4 = randomInteger()
const T = {
  blocks: [
    [
      [0, 0, 0, 0],
      [T1 + ' t b l', T2 + ' t', T3 + ' t b r', 0],
      [0, T4 + ' b r l', 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, T1 + ' t l r', 0, 0],
      [T4 + ' t b l', T2 + ' r', 0, 0],
      [0, T3 + ' b r l', 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, T4 + ' t l r', 0, 0],
      [T3 + ' t b l', T2 + ' b', T1 + ' t b r', 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, T3 + ' t l r', 0, 0],
      [0, T2 + ' l', T4 + ' t b r', 0],
      [0, T1 + ' b r l', 0, 0],
      [0, 0, 0, 0]
    ]
  ],
  className: 'piece-t'
};

let Z1 = randomInteger(), Z2 = randomInteger(), Z3 = randomInteger(), Z4 = randomInteger()
const Z = {
  blocks: [
    [
      [0, 0, 0, 0],
      [Z1 + ' t b l', Z2 + ' t r', 0, 0],
      [0, Z3 + ' b l', Z4 + ' t b r', 0],
      [0, 0, 0, 0]
    ],
    [
      [0, Z1 + ' t l r', 0, 0],
      [Z3 + ' t l', Z2 + ' b r', 0, 0],
      [Z4 + ' b r l', 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [Z4 + ' t b l', Z3 + ' t r', 0, 0],
      [0, Z2 + ' b l', Z1 + ' t b r', 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, Z4 + ' t l r', 0],
      [0, Z2 + ' t l', Z3 + ' b r', 0],
      [0, Z1 + ' b r l', 0, 0],
      [0, 0, 0, 0]
    ]
  ],
  className: 'piece-z'
};

export default {
  I,
  J,
  L,
  O,
  S,
  T,
  Z
};
