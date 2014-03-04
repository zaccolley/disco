#-------------------------------------------------------------------------------
# Practical Worksheet 2: Working with Numeric Types
# Zac Colley
# 665219
# Autumn Teaching Block 2012
# ------------------------------------------------------------------------------

import math

# exercise 1

def circumOfCircle():
    radius = eval(input("Enter radius of circle:"))
    circum = 2 * math.pi * radius
    print(circum)

# exercise 2

def areaOfCircle():
    radius = eval(input("Enter radius of circle:"))
    area = math.pi * (radius ** 2)
    print(area)

# exercise 3

def costOfPizza():
    diam = eval(input("Enter diameter of pizza in cm:"))
    area = math.pi * ((diam / 2) ** 2)
    cost = 1.5 * area
    print(cost)

# exercise 4

def slopeOfLine():
    x1 = eval(input("Enter your value for x1:"))
    y1 = eval(input("Enter your value for y1:"))
    x2 = eval(input("Enter your value for x2:"))
    y2 = eval(input("Enter your value for y2:"))
    slope = (y2 - y1) / (x2 - x1)
    print(slope)

# exercise 5

def distanceBetweenPoints():
    x1 = eval(input("Enter your value for x1:"))
    y1 = eval(input("Enter your value for y1:"))
    x2 = eval(input("Enter your value for x2:"))
    y2 = eval(input("Enter your value for y2:"))
    a = (x2 - x1) ** 2
    b = (y2 - y1) ** 2
    dist = math.sqrt(a + b)
    print(dist)

# exercise 6

def travelStatistics():
    # distance = speed * time
    speed = eval(input("Enter your average speed in km:"))
    time = eval(input("Enter the duration of your car journey in hours:"))
    dist = speed * time
    fuelamount = dist * 5 # assuming a fuel efficiency of 5km/litre
    print("You will use" , fuelamount , "litres of fuel travelling" , dist , "kilometres.")

# exercise 7

def sumOfNumbers():
    n = eval(input("Enter n positive integers to add together:"))
    total = 0
    for i in range(n):
        total = total + (i + 1)
    print(total)

# exercise 8

def averageOfNumbers():
    n = eval(input("Enter n positive integers to average:"))
    total = 0
    for i in range(n):
        inputstr = "Enter number " + str(i + 1) + " here:"
        no = eval(input(inputstr))
        total = total + no
    average = total / n
    print(average)

# exercise 9

def selectCoins():
    currentcoinage = eval(input("Enter your amount of money in pence format:"))
    coinList = [200,100,50,20,10,5,2,1]
    for i in coinList:
        amountofcoins = currentcoinage // i
        print(str(amountofcoins) + " x " + str(i) + "p" )
        currentcoinage = currentcoinage - (amountofcoins * i)









