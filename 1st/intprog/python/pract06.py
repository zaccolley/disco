#-------------------------------------------------------------------------------
# Practical Worksheet 6: If Statements and For Loops
# Zac Colley
# 6665219
# Autumn Teaching Block 2012
#-------------------------------------------------------------------------------

from graphics import *
import math
import random
import time

# exercise 1

def fastFoodOrderPrice():
    foodPrice = eval(input("Enter the amount of money for your order:"))
    deliveryCharge = 1.50

    if foodPrice < 10:
        totalPrice = foodPrice
    else:
        totalPrice = foodPrice + deliveryCharge

    print("The total price of your order is Ã‚Â£{0:0.2f}.".format(totalPrice))

# exercise 2

def whatToDoToday():
    todaysTemp = eval(input("Enter today's temperature:"))

    if todaysTemp > 25:
        print("Go for a swim!")
    elif todaysTemp > 10 or todaysTemp < 25:
        print("Go shopping in Gunwharf Quay!")
    else:
        print("Watch a film!")

# exercise 3

def displaySquareRoots(start,end):
    for currentNo in range(start,end  + 1):
        sqrRootCalc = math.sqrt(currentNo)
        print("The square root of {0} is {1:0.3f}".format(currentNo,sqrRootCalc))

# exercise 4

def calculateGrade(mark):
    if mark >= 16 and mark <= 20:
        return 'A'
    elif mark >= 12 and mark <= 15:
        return 'B'
    elif mark >= 8 and mark <= 11:
        return 'C'
    elif mark < 8 and mark >= 0:
        return 'F'
    else:
        return 'X'

# exercise 5

def peasInAPod():
    amountOfPeas = int(input("Enter the amount of peas:"))
    windowWidth = amountOfPeas * 100
    window = GraphWin("Peas in a pod" ,windowWidth, 100)
    for i in range(amountOfPeas):
        centrePoint = Point(50 + (i * 100),50)
        peaCircle = Circle(centrePoint, 50)
        peaCircle.setFill("Green")
        peaCircle.setOutline("Green")
        peaCircle.draw(window)

# exercise 6

def ticketPrice(distance, age):
    standardTicketCost = 3.00
    distanceCost = 0.15 * distance
    totalTicketCost = standardTicketCost + distanceCost
    if age >= 60 or age <= 15:
        totalTicketCost = totalTicketCost * 0.40
    return totalTicketCost

# exercise 7

def numberedSquare(n):
    for row in range(n, 0, -1):
       for col in range(n):
            print("{0:2}".format(row + col), end=" ")
       print()

# For exercises 8 & 12

def drawCircle(win, centre, radius, colour):
    circle = Circle(centre, radius)
    circle.setFill(colour)
    circle.setWidth(1)
    circle.draw(win)

# For exercise 8

def drawColouredEye(win, centre, radius, colour):
    drawCircle(win, centre, radius, "white")
    drawCircle(win, centre, radius / 2, colour)
    drawCircle(win, centre, radius / 4, "black")

def eyePicker():
    win = GraphWin()

    x = eval(input("Enter x-coordinate here:"))
    y = eval(input("Enter y-coordinate here:"))
    centre = Point(x, y)

    radius = eval(input("Enter radius:"))

    colour = str(input("Enter eye-colour here:"))

    if colour == "blue"  or \
       colour == "grey"  or \
       colour == "green" or \
       colour == "brown":
        drawColouredEye(win, centre, radius, colour)
    else:
        print("Not a valid eye colour")
        win.close()

# exercise 9

def trEyeAngle(radius, n):
    radius = round(radius)
    diameter = radius * 2
    windowSize = diameter * n
    window = GraphWin("trEYEangle", windowSize, windowSize)

    columnPositionStart = radius
    columnPositionEnd = windowSize
    count = n
    for column in range(columnPositionStart, columnPositionEnd, diameter):

       count -= 1

       rowPositionStart = windowSize - radius
       rowPositionEnd = count * diameter
       for row in range(rowPositionStart, rowPositionEnd, -diameter):

           centreOfEye = Point(column, row)
           drawColouredEye(window, centreOfEye, radius, "blue")

# exercise 10

def eyesAllAround():
    window = GraphWin("Eyes All Around!", 500, 500)
    eyeColour = ["blue", "grey", "green", "brown"]
    eyeRadius = 30
    colourCount = 0
    for i in range(1, 31):

        if colourCount > 3:
            colourCount = 0

        mousePosition = window.getMouse()
        eyeCentre = Point(mousePosition.getX(), mousePosition.getY())
        drawColouredEye(window, eyeCentre, eyeRadius, eyeColour[colourCount])

        colourCount += 1

# exercise 11

def rockPaperScissors():
    rpsList = ["rock", "paper", "scissors"]
    userChoice = str(input("Enter rock, paper or scissors:")).lower()

    print("x ------------------------------- x")

    if userChoice != rpsList[0] and userChoice != rpsList[1] \
                                and userChoice != rpsList[2]:
        print("   Incorrect input\n   Try again!")
    else:
        randomNumber = random.randint(0, 2)
        computerChoice = rpsList[randomNumber]

        for i in rpsList:
            print("   " + i.title() + "!")
            time.sleep(0.25)

        print("   ", end="")

        for j in "...":
            print(j, end="")
            time.sleep(0.3)

        print("\n   You chose: {0}\n   The computer chose: {1}\n".format(userChoice.title(), computerChoice.title()))

        draw = userChoice == computerChoice

        userWin = userChoice == "rock" and computerChoice =="scissors" \
               or userChoice == "paper" and computerChoice == "rock" \
               or userChoice == "scissors" and computerChoice == "paper"

        if draw:
            print("   It's a draw!")
        elif userWin:
            print("   You win!")
        else:
            print("   Computer wins!")

    print("x ------------------------------- x")

# exercise 12

def distanceBetweenPoints(p1,p2):
    x1 = p1.getX()
    y1 = p1.getY()
    x2 = p2.getX()
    y2 = p2.getY()
    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

def archeryGame():
    sizeOfWindow = 300
    window = GraphWin("Archery Game", sizeOfWindow, sizeOfWindow)

    targetRadiusCentre = Point(window.getWidth() / 2, window.getHeight() / 2)
    targetRadius = sizeOfWindow / 4
    targetColours = ["blue", "red", "yellow"]
    for i in range(3):
        drawCircle(window, targetRadiusCentre, targetRadius / 2 ** i, targetColours[i])

    pointsTotal = 0

    pointsTextPosition = Point(window.getWidth() / 2, window.getHeight() - sizeOfWindow / 10)
    pointsText = Text(pointsTextPosition, "Points: {0:2.0f}".format(pointsTotal))
    pointsText.setStyle("italic")
    pointsText.draw(window)

    atmosTextPosition = Point(window.getWidth() / 2, 40)
    atmosText = Text(atmosTextPosition, "")
    atmosText.setStyle("bold")
    atmosText.draw(window)

    for i in range(5):

        atmosphericAlterationX = random.randint(-24,24)
        atmosphericAlterationY = random.randint(2,24)
        windDirection = ""

        if atmosphericAlterationX > 0:
            windDirection = "Right Wind:"
        elif atmosphericAlterationX < 0:
            windDirection = "Left Wind:"
        else:
            windDirection = "  Wind:"

        atmosText.setText("Wind\n" + windDirection + " {0:2}\nDown Wind: {1:2}".format(abs(atmosphericAlterationX), atmosphericAlterationY))

        userClick = window.getMouse()

        hitPoint = Point(userClick.getX() + atmosphericAlterationX,\
                         userClick.getY() + atmosphericAlterationY)

        hitCircleRadius = sizeOfWindow / 150
        hitCircle = drawCircle(window, hitPoint, hitCircleRadius, "black")
        distanceFromCentre = distanceBetweenPoints(hitPoint, targetRadiusCentre)

        if distanceFromCentre <= targetRadius and distanceFromCentre > targetRadius / 2:
            pointsTotal += 2
        elif distanceFromCentre > targetRadius / 4 and distanceFromCentre <= targetRadius / 2:
            pointsTotal += 5
        elif distanceFromCentre < targetRadius / 4:
            pointsTotal += 10

        pointsText.setText("Points: {0:2.0f}".format(pointsTotal))

def loading():

    for i in range(10, -1, -1):
        for j in "|/-\|/-":
            print("\n\n\n\n\n\n\n\n[ LOADING:", i, j, "  ]")
            time.sleep(0.1)
    print("\n\n\n\n\n\n\n\n[ LOADING: DONE! ]")


