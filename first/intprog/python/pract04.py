#------------------------------------------------------------------------------
# Practical Worksheet 4: String and Files
# Zac Colley
# 665219
# Autumn Teaching Block 2012
#-------------------------------------------------------------------------------

import os

os.listdir()
os.chdir("pract04")

# exercise 1

def personalGreeting():
    name = str(input("Please enter your name:"))
    print("Hello " + name + ", nice to see you!")

# exercise 2

def formalName():
    forename = str(input("Please enter your forename:"))
    surname = str(input("Please enter your surname:"))
    intial = forename[0]
    print(intial + ". " + surname)

# exercise 3

def kilos2pounds():
    kilos = eval(input("Enter a weight in kilograms: "))
    pounds = 2.2 * kilos
    print("{0:0.2f} kilos is equal to {1:0.2f} pounds ".format(kilos,pounds))

# exercise 4

def generateEmail():
    forename = str(input("Please enter your forename:"))
    surname = str(input("Please enter your surname:"))
    year = str(input("Please enter the year"))
    address = "@myport.ac.uk"
    email = surname[0:4] + "." + forename[0] + "." + year[-2:] + address
    print(email.lower())

# exercise 5

def gradeTest():
    mark = int(input("Enter the mark"))
    gradestring = "FFFFCCBBAAA"
    print(gradestring[mark])

# exercise 6

from graphics import *

def graphicLetters():
    word = str(input("Enter your word"))
    win = GraphWin()

    for i in word:
        p = win.getMouse()
        letter = Text(p,i)
        letter.setSize(25)
        letter.draw(win)

# exercise 7

def singASong():
    songWord = str(input("Enter the song word:"))
    noOfLines = eval(input("Enter the number of lines:"))
    noOfRepeats = eval(input("Enter the number of repeats on one line:"))

    for i in range(noOfLines):
        print((songWord + " ") * noOfRepeats)


# exercise 8

def exchangeTable():
    for euros in range(21):
        exchangeRate = 1.15
        pounds = euros / exchangeRate
        print("{0:3} | {1:5.2f}".format(euros,pounds))


# exercise 9

def makeAcronym():
    words = str(input("Enter words to make an acronym:"))
    words = words.split()
    for i in words:
        letter = i[0]
        letter = letter.upper()
        print(letter, end="")

# exercise 10

def nameToNumber():
    name = str(input("Enter your name:")).lower()
    total = 0
    for i in range(len(name)):
        letter = name[i]
        number = int(ord(letter)-96)
        total = total + number
    print(total)

# exercise 11

def fileInCaps():
    filename = str(input("Enter the file name here:"))
    file = open(filename, "r")
    content = file.read()
    content = content.upper()
    print(content)
    file.close()

# exercise 12

def rainfallChart():
    file = open("rainfall.txt", "r")
    for line in file:
        item = line.split()
        place = item[0]
        stars = "*" * int(item[1])
        print("{0:15} {1}".format(place,stars))
    file.close()

from graphics import *

def graphicalRainfallChart():
    win = GraphWin("Rainfall Chart",500,500)
    file = open("rainfall.txt", "r")
    i = 0
    for line in file:
        item = line.split()
        p = Point(100,100 + i)
        place = Text(p, item[0])
        place.draw(win)
        r1 = Point(150, 110 + i)
        r2 = Point(150 + int(item[1]), 90 + i)
        bars = Rectangle(r1,r2)
        bars.draw(win)
        i = i + 30
    file.close()

# exercise 13

def rainfallInInches():
    inFile = open("rainfall.txt", "r")
    outFile = open("rainfallInches.txt", "w")

    for line in inFile:
        item = line.split()
        place = item[0]
        rainMm = int(item[1])
        inchesInMm = 25.4
        rainInches = rainMm / inchesInMm
        print("{0} {1:0.2f}".format(place,rainInches), file=outFile)
    inFile.close()
    outFile.close()

    file = open("rainfallInches.txt", "r")
    content = file.read()
    print(content)

    file.close()

# exercise 14

def wc():
    filename = str(input("Enter filename here:"))
    file = open(filename, "r")

    a = 0
    b = 0
    c = 0

    for allLines in file:
        a += 1
        singleLine = allLines.split()

        for word in singleLine:
            b += 1

            for character in word:
                c += 1

    print("Number of characters: " + str(c))
    print("Number of words: " + str(b))
    print("Number of lines: " + str(a))

    file.close()








