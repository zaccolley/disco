#-------------------------------------------------------------------------------
# tennis.py - a program to illustrate simulation and program design
# Matthew Poole
# Autumn Teaching Block 2012
#-------------------------------------------------------------------------------

def main():
    serveProb, n = getInputs()
    wins = simulateNGames(serveProb, n)
    printSummary(wins, n)

def getInputs():
    serveProb = eval(input("Probability of winning a serve: "))
    n = eval(input("Service games to simulate: "))
    return serveProb, n

def simulateGame(serveProb):
    from random import random
    pointsS, pointsR = 0, 0
    while not gameOver(pointsS, pointsR):
        if random() < serveProb:
            pointsS = pointsS + 1
        else:
            pointsR = pointsR + 1
    return pointsS, pointsR

def gameOver(pointsS, pointsR):
    return (pointsS >= 4 or pointsR >= 4) and abs(pointsS - pointsR) >= 2
           
def simulateNGames(serveProb, n):
    wins = 0
    for game in range(n):
        pointsS, pointsR = simulateGame(serveProb)
        if pointsS > pointsR:
            wins = wins + 1
    return wins

def printSummary(wins, n):
    proportion = wins / n 
    print("Wins:", wins, end="  ")
    print("Proportion: {0:0.2f}".format(proportion))
    
main()
