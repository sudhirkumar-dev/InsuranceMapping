// object immutability in javascript using destructuring in lower levels 

// const data = {
//   user: {
//     isLoggedIn: true,
//     username: 'sudhir',
//     avatar: 'puppy',
//     favourites: ['python', 'javascript', 'typescript']
//   },
//   topResults: {
//     amount: 3,
//     scores: [120, 100, 99]
//   }
// }

// change the isLoggedIn propoerty 

// const d = {
//   ...data,
//   ['user']: {
//     ...data['user'],
//     isLoggedIn: false,
//   }
// }
// console.log(d)

//change isLoggedIn and avatar

// const e = {
//   ...data,
//   ['user']: {
//     ...data['user'],
//     isLoggedIn: false,
//     avatar: 'kitty'
//   }
// }
// console.log(e)

// change username and topResults

// const b = {
//   ...data,
//   ['user']: {
//     ...data['user'],
//     username: 'sudhir webdev'
//   },

//   ['topResults']: {
//     ...data['topResults'],
//     amount: 4
//   }
// }


console.log(b)

//extend the scores array and add new value at the end

// const f = data['topResults']['scores'];
// const addScore = {
//   ...data,
//   ['topResults']: {
//     ...data['topResults'],
//     scores: [...f, 77]
//   }
// }

// console.log(addScore)


//delete scores and remove python from favorites

// let favs = [...data['user']['favourites']]
// let idx = favs.findIndex(el => el === 'python')
// favs.splice(idx, 1)
// const newData = {
//   ...data,
//   ['user']: {
//     ...data['user'],
//     favourites: favs
//   },
//   ['topResults']: {
//     ...data['topResults'],
//     scores: []
//   }
// }
// console.log(newData)

// add info object 

// const addInfo = {
//   ...data,
//   ['info']: {
//     text: 'hello world',
//     role: 'full stack developer'
//   }
// }

// console.log(addInfo)

// // delete topResults

// const delTopRes = {
//   ...data
// }
// delete delTopRes['topResults']

// console.log(delTopRes)


// object immutability in javascript using destructuring in lower levels using dot notation

const data = {
  user: {
    isLoggedIn: true,
    username: 'sudhir',
    avatar: 'puppy',
    favourites: ['python', 'javascript', 'typescript']
  },
  topResults: {
    amount: 3,
    scores: [120, 100, 99]
  }
};

// Changing the isLoggedIn property
const d = {
  user: {
    isLoggedIn: false,
    ...data.user
  },
  topResults: { ...data.topResults }
};
console.log(d);

// Changing isLoggedIn and avatar
const e = {
  user: {
    isLoggedIn: false,
    avatar: 'kitty',
    ...data.user
  },
  topResults: { ...data.topResults }
};
console.log(e);

// Changing username and amount
const b = {
  user: {
    username: 'sudhir webdev',
    ...data.user
  },
  topResults: {
    amount: 4,
    ...data.topResults
  }
};
console.log(b);

// Extending the scores array
const addScore = {
  ...data,
  topResults: {
    ...data.topResults,
    scores: [...data.topResults.scores, 77]
  }
};
console.log(addScore);

// Deleting scores and removing 'python' from favourites
let favs = [...data.user.favourites];
let idx = favs.findIndex(el => el === 'python');
favs.splice(idx, 1);

const newData = {
  user: {
    ...data.user,
    favourites: favs
  },
  topResults: {
    scores: [],
    ...data.topResults
  }
};
console.log(newData);

// Adding an info object
const addInfo = {
  ...data,
  info: {
    text: 'hello world',
    role: 'full stack developer'
  }
};
console.log(addInfo);

// Deleting topResults
const delTopRes = { ...data };
delete delTopRes.topResults;
console.log(delTopRes);

