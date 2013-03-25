#-------------------------------------------------------------------------------
# Practical Worksheet 5: Using functions
# Zac Colley
# 665219
# Autumn Teaching Block 2012
#-------------------------------------------------------------------------------

from graphics import *
import math

# for exercises 1 and 2
def areaOfCircle(radius):
    return math.pi * radius ** 2

# exercise 1

def circumferenceOfCircle(radius):
    return 2 * math.pi * radius

# exercise 2

def circleInfo():
    radius = eval(input("Enter your radius"))
    area = areaOfCircle(radius)
    circumference = circumferenceOfCircle(radius)
    print("The area is {0:0.3f} and the circumference is {1:0.3f}".format(area,circumference))

# for exercise 3
def drawCircle(win, centre, radius, colour):
    circle = Circle(centre, radius)
    circle.setFill(colour)
    circle.setWidth(2)
    circle.draw(win)

def drawBrownEyeInCentre():
    window = GraphWin()
    centreOfWindow = Point(window.getWidth() /2, window.getHeight() / 2)
    drawCircle(window, centreOfWindow, 60, "White")
    drawCircle(window, centreOfWindow, 30, "Brown")
    drawCircle(window, centreOfWindow, 15, "Black")

# exercise 4

def drawBlockOfStars(width,height):
    for i in range(height):
        print("*" * width)

def drawLetterE():
    width = [8,2,5,2,8]
    for i in width:
        drawBlockOfStars(i,2)

# for exercise 5
def drawBrownEye(win, centre, radius):
    drawCircle(win, centre, radius, "White")
    drawCircle(win, centre, radius / 2, "Brown")
    drawCircle(win, centre, radius / 4, "Black")

def drawPairOfBrownEyes():
    window = GraphWin("A pair of brown eyes", 300, 200)
    radius = 60
    centre = Point(window.getWidth() /2, window.getHeight() / 2)
    leftEyeCentre = Point(centre.getX() - radius, centre.getY())
    rightEyeCentre = Point(centre.getX() + radius, centre.getY())
    drawBrownEye(window, leftEyeCentre, radius)
    drawBrownEye(window, rightEyeCentre, radius)

# exercise 6

def distanceBetweenPoints(p1,p2):
    x1 = p1.getX()
    y1 = p1.getY()
    x2 = p2.getX()
    y2 = p2.getY()
    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

# exercise 7

def drawBlocks(spaceWidth1,starWidth1,spaceWidth2,starWidth2,height):
     for i in range(height):
        print(" " * spaceWidth1, end="")
        print("*" * starWidth1, end="")
        print(" " * spaceWidth2, end="")
        print("*" * starWidth2)

def drawLetterA():
    drawBlocks(1,8,0,0,2)
    drawBlocks(0,2,6,2,2)
    drawBlocks(0,10,0,0,2)
    drawBlocks(0,2,6,2,2)
    drawBlocks(0,2,6,2,2)

# exercise 8

def drawFourPairsOfBrownEyes():
    win = GraphWin("Four pairs of brown eyes",300,300)
    for i in range(4):
        leftEyeCentre = win.getMouse()
        circumferencePoint = win.getMouse()
        radius = distanceBetweenPoints(leftEyeCentre, circumferencePoint)
        diameter = radius * 2
        rightEyeCentre = Point(leftEyeCentre.getX() + diameter, leftEyeCentre.getY())
        drawBrownEye(win, leftEyeCentre, radius)
        drawBrownEye(win, rightEyeCentre, radius)

# exercise 9

def displayTextWithSpaces(window, size, position, string):
    length = len(string)
    text = ""
    for i in range(length):
        text = text + string[i] + " "
    displayedText = Text(position,text)
    displayedText.setSize(size)
    displayedText.draw(window)

def constructVisionChart():
    window = GraphWin("Vision Chart", 300, 400)
    centre = Point(window.getWidth() / 2, window.getHeight() / 2)
    count = 0
    sizes = [30,25,20,15,10,5]
    for textSize in sizes:
        count += 1
        textPosition = Point(centre.getX(), (count * 45))
        prompt = "Enter number " + str(count) + " text input:"
        text = str(input(prompt)).upper()
        displayTextWithSpaces(window, textSize, textPosition, text)

# exercise 10

def calcPosition(position,changeInX,changeInY,scale):
    return Point(position.getX() + (changeInX) * scale, position.getY() + (changeInY) * scale)

def drawStickFigure(win, position,scale):

    head = Circle(position, 20 * scale)
    head.draw(win)

    body = Line(calcPosition(position,0,20,scale), calcPosition(position,0,60,scale))
    body.draw(win)

    arms = Line(calcPosition(position,-20,25,scale), calcPosition(position,20,25,scale))
    arms.draw(win)

    leg1 = Line(calcPosition(position,0,60,scale), calcPosition(position,-20,80,scale))
    leg2 = Line(calcPosition(position,0,60,scale), calcPosition(position,20,80,scale))

    leg1.draw(win)
    leg2.draw(win)

def drawStickFigureFamily():
    win = GraphWin("Stick figure")
    count = 45
    for i in [1, 0.8, 0.5, 0.4, 0.3]:
        position = Point(count, 60)
        drawStickFigure(win,position,i)
        count = count + 45 * i

