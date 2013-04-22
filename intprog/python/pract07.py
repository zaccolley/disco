#-------------------------------------------------------------------------------
# Practical Worksheet 7: Booleans and While Loops
# Zac Colley
# 665219
# Autumn Teaching Block 2012
#-------------------------------------------------------------------------------

from graphics import *
from time import *
from pract05 import *
from pract06 import *
import random

# exercise 1

def getName():
    name = ""
    while name.isalpha() == False:
        name = str(input("Enter your name:"))
    return name

# exercise 2
def trafficLights():
    win = GraphWin()

    red = Circle(Point(100, 50), 20)
    red.draw(win)

    amber = Circle(Point(100, 100), 20)
    amber.draw(win)

    green = Circle(Point(100, 150), 20)
    green.draw(win)

    while True:
        red.setFill("red")
        amber.setFill("black")
        green.setFill("black")
        sleep(2)
        amber.setFill("orange")
        sleep(2)
        red.setFill("black")
        amber.setFill("black")
        green.setFill("green")
        sleep(2)
        amber.setFill("orange")
        green.setFill("black")

# exercise 3

def calculateCoursework():
    grade = -1
    while grade < 0 or grade > 20:
        grade = int(input("Enter the grade:"))
    courseworkGrade = calculateGrade(grade)
    print("The pupil achieved a grade of {0}.".format(courseworkGrade))

# exercise 4

def orderPrice():
    moreItems = "y"
    totalPrice = 0
    while moreItems[0].lower() == "y":
        price = eval(input("Enter the price of the item:"))
        quantity = eval(input("Enter the quantity of item:"))
        moreItems = str(input("Is there any more items? (y/n)")).lower()
        totalPrice += price * quantity
    print("Total price is £{0:0.2f}.".format(totalPrice))

# exercise 5

def clickableEye():
    win = GraphWin("Clickable Eye", 300, 300)
    centre = Point(win.getWidth() /2, win.getHeight() / 2)
    radius = 100
    drawBrownEye(win, centre, radius)
    textPosition = Point(centre.getX(), win.getHeight() - 20)
    text = Text(textPosition, "Click a part of the eye!")
    text.draw(win)
    while True:
        clickPosition = win.getMouse()
        eyeDistance = distanceBetweenPoints(centre, clickPosition)
        if eyeDistance > radius /2 and eyeDistance <= radius:
            text.setText("Sclera.")
        elif eyeDistance > radius / 4 and eyeDistance <= radius / 2:
            text.setText("Iris.")
        elif eyeDistance < radius / 4:
            text.setText("Pupil.")
        else:
            win.close()

# exercise 6
def fahrenheit2Celsius(fahrenheit):
    return (fahrenheit - 32) * 5 / 9

def celsius2Fahrenheit(celsius):
    return 9 / 5 * celsius + 32

def temperatureConverter():
    while True:
        convertionType = eval(input("Enter:\n'1' for Fahrenheit to Celsius\n'0' for Celsius to Fahrenheit \nPress return to stop converting."))
        enteredNumber = eval(input("Enter the amount to convert."))

        if convertionType:
            print(fahrenheit2Celsius(enteredNumber))
        elif not convertionType:
            print(celsius2Fahrenheit(enteredNumber))
        else:
            break

# exercise 7

def guessTheNumber():
    randNo = random.randint(1, 100)
    count = 0
    userNo = randNo - 1
    while userNo != randNo and count < 7:
        userNo = eval(input("Enter your guess:"))
        if userNo > randNo:
            print("Too high...")
        else:
            print("Too low...")
        count += 1

    if count < 7:
        print("You win! - the number was", randNo)
    else:
        print("You lose! - the number was", randNo)


# exercise 8

def tableTennisScorer():
    win = GraphWin("Tennis Scorer", 100, 120)

    middleX = win.getWidth() / 2

    middleLineP1 = Point(middleX, 0)
    middleLineP2 = Point(middleX, win.getHeight())
    middleLine = Line(middleLineP1, middleLineP2)
    middleLine.draw(win)

    leftPlayerTextPosition = Point(20, 45)
    leftPlayerPoints = 0
    leftPlayerText = Text(leftPlayerTextPosition, leftPlayerPoints)
    leftPlayerText.draw(win)

    rightPlayerTextPosition = Point(80, 45)
    rightPlayerPoints = 0
    rightPlayerText = Text(rightPlayerTextPosition, rightPlayerPoints)
    rightPlayerText.draw(win)

    winCondition = False
    while not winCondition:
        userClick = win.getMouse()
        if userClick.getX() >= halfwayX:
            rightPlayerPoints += 1
        else:
            leftPlayerPoints += 1
        leftPlayerText.setText(leftPlayerPoints)
        rightPlayerText.setText(rightPlayerPoints)

        winCondition = (leftPlayerPoints >= 11 and (leftPlayerPoints - rightPlayerPoints >= 2)) \
                or (rightPlayerPoints >= 11 and (rightPlayerPoints - leftPlayerPoints >= 2))

    if rightPlayerPoints > leftPlayerPoints:
        winTextPosition = Point(80, 80)
    else:
        winTextPosition = Point(20, 80)
    winText = Text(winTextPosition, "wins")
    winText.draw(win)

# exercise 9

def rangePosition(borderSize, eyeRadius, axis):
    eyeDiameter = eyeRadius * 2
    rangeStart = borderSize + eyeRadius
    rangeEnd = borderSize + (eyeDiameter * axis)
    return range(rangeStart, rangeEnd, (eyeRadius * 2))

def clickableBoxOfEyes(rows, columns):
    borderSize = 50
    eyeRadius = 50
    eyeDiameter = eyeRadius * 2

    windowWidth = (eyeDiameter * columns) + (borderSize *
    2)
    windowHeight = (eyeDiameter * rows) + (borderSize * 2)
    window = GraphWin("Box O' Eyes", windowWidth, windowHeight)

    boxRectP1 = Point(borderSize, borderSize)
    boxRectP2 = Point(windowWidth - borderSize, windowHeight - borderSize)
    boxRect = Rectangle(boxRectP1, boxRectP2)
    boxRect.draw(window)

    eyeYCenters = rangePosition(borderSize, eyeRadius, rows)
    eyeXCenters = rangePosition(borderSize, eyeRadius, columns)

    for eyeY in eyeYCenters:
        for eyeX in eyeXCenters:
           eyeCenter = Point(eyeX, eyeY)
           drawColouredEye(window, eyeCenter, eyeRadius, "Light Blue")

    messagePosition = Point(window.getWidth() / 2, window.getHeight() - (borderSize / 2))
    message = Text(messagePosition, "Click!")
    message.draw(window)

    while True:
        messageText = "Between eyes"

        userClick = window.getMouse()

        if userClick.getX() < boxRectP1.getX() or userClick.getY() > boxRectP2.getY() or \
           userClick.getX() > boxRectP2.getX() or userClick.getY() < boxRectP1.getY():
            window.close()
            break


        for eyeY in eyeYCenters:
            for eyeX in eyeXCenters:
                eyeCenter = Point(eyeX, eyeY)
                clickInAnEye = distanceBetweenPoints(eyeCenter, userClick) <= eyeRadius
                if clickInAnEye:
                    row = eyeY / 100
                    col = eyeX / 100
                    messageText = "Eye at row {0:2.0f}, column {1:2.0f}.".format(row, col)

        message.setText(messageText)


# exercise 10

def findTheCircle():
    windowSizeX, windowSizeY = 350, 250
    window = GraphWin("Find the circle!", windowSizeX, windowSizeY)
    win = True
    totalPoints = 0
    winCount = 0

    messagePoint = Point(windowSizeX / 2, windowSizeY - 50)
    message = Text(messagePoint, "")
    message.draw(window)

    while win:
        circleRadius = 30 - (30 * (winCount / 100))
        message.setText("The circle is now radius {0}! Click and find it!".format(circleRadius))
        circleRandomX = random.randint(circleRadius, windowSizeX - circleRadius)
        circleRandomY = random.randint(circleRadius, windowSizeY - circleRadius)
        circlePoint = Point(circleRandomX, circleRandomY)
        circle = Circle(circlePoint, circleRadius)

        count = 10
        distance = 0

        while count >= 0:
            userClick = window.getMouse()
            winCondition = distanceBetweenPoints(userClick, circlePoint) <= circleRadius
            if winCondition:
                message.setText("You found the circle! {0} points!".format(count))
                totalPoints += count
                winCount += 10
                circle.draw(window)
                window.getMouse()
                break
            elif distanceBetweenPoints(userClick, circlePoint) < distance:
                message.setText("Getting closer! You missed. Click again.")
            else:
                if count != 10:
                    message.setText("Getting further away! You missed. Click again.")
                else:
                    message.setText("You missed. Click again.")
            count -= 1
            distance = distanceBetweenPoints(userClick, circlePoint)

        if count < 0:
            message.setText("You didn't find the circle!.")
            circle.draw(window)
            win = False
        else:
            win = True

        circle.undraw()

    message.setText("You scored {0} points! Well done. Click to close.".format(totalPoints))

    window.getMouse()
    window.close()





