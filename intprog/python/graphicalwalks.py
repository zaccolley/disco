#-------------------------------------------------------------------------------
# Practical Worksheet 8: Exercise 4
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

def getInputs():
    numWalks= eval(input("How many random walks to take? "))
    numSteps = eval(input("How many steps for each walk? "))
    return numWalks, numSteps

def takeWalks(numWalks, numSteps):
    window = GraphWin("Walks", 200, 200)
    origin = Point(window.getWidth() / 2, window.getHeight() / 2)
    for walk in range(numWalks):
        stepsAwayForward, stepsAwaySideways = takeAWalk(numSteps)
        lengthOfAStep = 5
        stepsAway = Point(stepsAwaySideways * lengthOfAStep, stepsAwayForward * lengthOfAStep)
        stepsLine = Line(stepsAway, origin)
        stepsLine.draw(window)

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