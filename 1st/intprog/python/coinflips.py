#-------------------------------------------------------------------------------
# Practical Worksheet 8: Exercise 1
# Zac Colley
# 665219
# Autumn Teaching Block 2012
#-------------------------------------------------------------------------------

from random import*

def main():
    input = getInputs()
    heads, tails = simulateFlips(input)
    displayResults(heads, tails)

def getInputs():
    amountOfFlips = "hello"
    while amountOfFlips.isalpha() or int(amountOfFlips) < 0:
        amountOfFlips = str(input("Enter the amount of flips: "))
    return int(amountOfFlips)

def simulateFlips(input):
    heads, tails = 0, 0
    for i in range(input):
        if random() < 0.5:
            heads += 1
        else:
            tails += 1
    return heads, tails

def displayResults(heads, tails):
    print("Heads {0}, Tails {1}.".format(heads, tails))

main()