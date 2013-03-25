#-------------------------------------------------------------------------------
# Practical Worksheet 8: Exercise 3
# Zac Colley
# 665219
# Autumn Teaching Block 2012
#-------------------------------------------------------------------------------

from random import *
from pract05 import *
from graphics import *

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
        stepsAwayForward, stepsAwaySideways = takeAWalk(numSteps)
        stepsAway = Point(stepsAwaySideways, stepsAwayForward)
        origin = Point(0,0)
        totalSteps += distanceBetweenPoints(stepsAway, origin)
    return totalSteps / numWalks

def printExpectedDistance(averageSteps):
    print("The expected number of steps away from the start points is", averageSteps)

def takeAWalk(numSteps):
    stepsForwardOfStart = 0
    stepsSidewaysOfStart = 0
    for step in range(numSteps):
        if random() < 0.25:
            stepsForwardOfStart -= 1
        elif random() < 0.5:
            stepsForwardOfStart += 1
        elif random() < 0.75:
            stepsSidewaysOfStart += 1
        else:
            stepsSidewaysOfStart -= 1
    return stepsForwardOfStart, stepsSidewaysOfStart

main()