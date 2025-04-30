function decrypt() {
    const name = document.getElementById('name').value.toLowerCase();
    const encryption = document.getElementById('enc').value;

    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const vowelMap = {};

    for (let i = 0; i < 5; i++){
        vowelMap[vowels[i]] = encryption[i]
    }

    let result = '';

    for (let i = 0; i < name.length; i++) {
        const char = name[i];
        if (vowelMap[char]) {
            result += vowelMap[char];
        } else {
            result += char
        }
    }
    document.getElementById('dec').value = result;
    console.log(result);
}
// function decrypt() {
//     const secretKey = ['a', 'e', 'i', 'o', 'u'];
//     const vowelMap = {
//       'a': '4',
//       'e': '3',
//       'i': '1',
//       'o': '0',
//       'u': '9'
//     };
//     const encryptionInput = document.getElementById('enc').value.toLowerCase();
//     let decryptedText = '';

//     for (let i = 0; i < encryptionInput.length; i++) {
//       const char = encryptionInput[i];
//       if (secretKey.includes(char)) {
//         decryptedText += vowelMap[char]; // Replace vowel with corresponding number
//       } else {
//         decryptedText += char; // Keep non-vowel characters as they are
//       }
//     }

//     document.getElementById('dec').value = decryptedText;
//     console.log('clicked');
//   }

// function decrypt() {
//     const vowelMap = {
//         'a': '1',
//         'b': '2',
//         'c': '3',
//         'd': '4',
//         'e': '5',
//         'f': '6',
//         'g': '7',
//         'h': '8',
//         'i': '9',
//         'j': '10',
//         'k': '11',
//         'l': '12',
//         'm': '13',
//         'n': '14',
//         'o': '15',
//         'p': '16',
//         'q': '17',
//         'r': '18',
//         's': '19',
//         't': '20',
//         'u': '21',
//         'v': '22',
//         'w': '23',
//         'x': '24',
//         'y': '25',
//         'z': '26'
//     };
//     const numberMap = {
//         '1': 'a',
//         '2': 'b',
//         '3': 'c',
//         '4': 'd',
//         '5': 'e',
//         '6': 'f',
//         '7': 'g',
//         '8': 'h',
//         '9': 'i',
//         '10': 'j',
//         '11': 'k',
//         '12': 'l',
//         '13': 'm',
//         '14': 'n',
//         '15': 'o',
//         '16': 'p',
//         '17': 'q',
//         '18': 'r',
//         '19': 's',
//         '20': 't',
//         '21': 'u',
//         '22': 'v',
//         '23': 'w',
//         '24': 'x',
//         '25': 'y',
//         '26': 'z'
//     };


//     const encryptionInput = document.getElementById('enc').value.toLowerCase();
//     let decryptedText = '';

//     for (let i = 0; i < encryptionInput.length; i++) {
//         const char = encryptionInput[i];
//         if (encryptionInput === "12345"){
//             decryptedText = "i love programming";
//         }else if (numberMap.hasOwnProperty(char)) {
//             decryptedText += numberMap[char];
//         } else if (vowelMap.hasOwnProperty(char)) {
//             decryptedText += vowelMap[char]; 
//         }else {
//             decryptedText += char; 
//         }
//     }

//     document.getElementById('dec').value = decryptedText;
//     console.log('clicked');
// }
