#-------------------------------------------------------------------------------
# Python Coursework: A Patchwork Sampler
# Zac Colley
# 665219
# Autumn Teaching Block 2012
#-------------------------------------------------------------------------------

from graphics import *

# Shape drawing

def drawRectangle(window, point1, point2, colour):
    rectangle = Rectangle(point1, point2)
    rectangle.setFill(colour)
    rectangle.setOutline(colour)
    rectangle.draw(window)

def drawCircle(window, center, radius, colour):
    circle = Circle(center, radius)
    circle.setFill(colour)
    circle.setOutline(colour)
    circle.draw(window)

# Patch drawing

def drawPatch1():
    window = GraphWin("", 100, 100)
    originPoint = Point(0,0)
    edgePoint = Point(100,100)
    drawRectangle(window, originPoint, edgePoint, "red")

    for i in range(10):
        edgePoint = Point((i * 10), 100 - (i * 10))
        drawRectangle(window, originPoint, edgePoint, "white")

def drawPatch2():
    window = GraphWin("", 100, 100)
    originPoint = Point(0,0)
    edgePoint = Point(100,100)

    count = 1
    for i in range(0, 100, 20):
        for j in range(0, 100, 20):
            originPoint = Point(i, j)
            edgePoint = Point(i + 20, j + 20)
            if count:
                drawRectangle(window, originPoint, edgePoint, "red")
                count -= 1
            else:
                drawRectangle(window, originPoint, edgePoint, "white")
                count += 1

    for i in range(5, 96, 10):
        count = 0
        for j in range(5, 96, 10):
            originPoint = Point(i, j)

            if count <= 1:
                drawCircle(window, originPoint, 5, "white")
                count += 1
            elif count == 2:
                drawCircle(window, originPoint, 5, "red")
                count += 1
            else:
                drawCircle(window, originPoint, 5, "red")
                count -= 3




