export const unreactive = (obj: any) => {
    return JSON.parse(JSON.stringify(obj))
}

function setCharAt(str: string, index: number, chr: string) {
    if (index > str.length - 1) return str
    return str.substring(0, index) + chr + str.substring(index + 1)
}

export function findTheKeyListFromAddressMap(theData: any, addressA: string, addressB: string, addressC: string): string[] {
    // theData = {
    //   11000: {
    //     label: "北京市",
    //     value: "110000",
    //     // parent: ""
    //   }
    // }

    let foundA = ''
    for (const itemID in theData) {
        if (theData[itemID]['label'] === addressA) {
            foundA = theData[itemID]['value']
        }
    }

    if (foundA === '') {
        return []
    }

    let foundB = ''
    for (const itemID in theData) {
        if (theData[itemID]['label'] === addressB) {
            if ('parent' in theData[itemID]) {
                if (theData[itemID]['parent'] === foundA) {
                    foundB = theData[itemID]['value']
                }
            }
        }
    }

    // what if '市' also be B? we handle it here
    if (addressA.endsWith('市')) {
        // 110100
        foundA = setCharAt(foundA, 3, '0')
        foundB = setCharAt(foundA, 3, '1')
    }

    if (foundB === '') {
        return [foundA]
    }

    let foundC = ''
    for (const itemID in theData) {
        if (theData[itemID]['label'] === addressC) {
            if ('parent' in theData[itemID]) {
                if (theData[itemID]['parent'] === foundB) {
                    foundC = theData[itemID]['value']
                }
            }
        }
    }

    if (foundC === '') {
        return [foundA, foundB]
    }

    return [foundA, foundB, foundC]
}
