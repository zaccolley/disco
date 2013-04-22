from graphics import *

def drawCircle(win, centre, radius, colour):
    circle = Circle(centre, radius)
    circle.setFill(colour)
    circle.setWidth(1)
    circle.draw(win)

def decideColour(position):
    yDistance = position.getY()

    if yDistance < 100:
        return "red"
    elif yDistance < 200:
        return "green"
    else:
        return "white"

def circles():
    window = GraphWin("Circles", 300, 300)

    for i in range(10):
        userClick = window.getMouse()
        userClickPosition = Point(userClick.getX(), userClick.getY())
        colour = decideColour(userClickPosition)
        radius = 15
        drawCircle(window, userClickPosition, radius, colour)

def circles2():
    window = GraphWin("Circles 2", 300, 300)
    radius = 15
    diameter = radius * 2

    for column in range(radius, (diameter * 10) + 1, diameter):
        for row in range(radius, (diameter * 3) + 1, diameter):
            userClick = window.getMouse()
            userClickPosition = Point(userClick.getX(), userClick.getY())
            colour = decideColour(userClickPosition)
            circlePosition = Point(row, column)
            drawCircle(window, circlePosition, radius, colour)

