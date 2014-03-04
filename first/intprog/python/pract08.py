#-------------------------------------------------------------------------------
# Practical Worksheet 8: Design and Simulation
# Zac Colley
# 665219
# Autumn Teaching Block 2012
#-------------------------------------------------------------------------------

from random import *

def main():
    numWalks, numSteps = getInputs()
    averageSteps = takeWalks(numWalks, numSteps)
    printExpectedDistance(averageSteps)

def getInputs():
    numWalks= eval(input("How many random walks to take? "))
    numSteps = eval(input("How many steps for each walk? "))
    return numWalks, numSteps

def takeWalks(numWalks, numSteps):
    totalSteps = 0
    for walk in range(numWalks):
        stepsAway = takeAWalk(numSteps)
        totalSteps += stepsAway
    return totalSteps / numWalks

def printExpectedDistance(averageSteps):
    print("The expected number of steps away from the start points is", averageSteps)

def takeAWalk(numSteps):
    stepsForwardOfStart = 0
    for step in range(numSteps):
        if random() < 0.5:
            stepsForwardOfStart -= 1
        else:
            stepsForwardOfStart += 1
    return abs(stepsForwardOfStart)



