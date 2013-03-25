#-------------------------------------------------------------------------------
# Practical Worksheet 1: Getting started with Python
# Zac Colley
# 665219
# Autumn Teaching Block 2012
# ------------------------------------------------------------------------------

def sayHello():
    print("Hello world")

# exercise 7 - change count

def count():
    for i in range(10):
        print(i+1)

def kilos2pounds():
    kilos = eval(input("Enter a weight in kilograms: "))
    pounds = 2.2 * kilos
    print("The weight in pounds is", pounds)

# exercise  1 - displays name

def sayName():
    yourName = input("Enter your name here:")
    print(yourName)

# exercise  2 - to display Hello World on seperate lines

def sayHello2():
    hello = ["Hello","World"]
    for i in hello:
        print(i)

# exercise  3 - converts euros to pounds

def euros2pounds():
    euros = eval(input("Enter the amount of euros you wish to convert to pounds:"))
    exchangeRate = 1.15
    curPounds = euros / exchangeRate
    print(euros , "Euros is" , curPounds , "pounds!")

# exercise  4 - adds two numbers

def addUp():
    firstNo = eval(input("Enter first number here:"))
    secNo = eval(input("Enter second number here:"))
    totalNo = firstNo + secNo
    print(totalNo)

# exercise  5 - adds coins to a total

def changeCounter():
    onePence = eval(input("Enter the number of one pences you have:"))
    twoPence = eval(input("Enter the number of two pences you have:"))
    fivePence = eval(input("Enter the number of five pences you have:"))
    totalPence = onePence + (twoPence * 2) + (fivePence * 5)
    print("Total pence is" , totalPence , "p.")

# exercise  6 - hello world loop

def tenHellos():
    for i in range(10):
        print("hello, world!")

# exercise  8 - outputs two column table of kilo2pounds

def weightsTable():
    print("| Kilograms | Pounds |")
    for i in range(10):
        print("|" , (i*10) , "|" ,  (2.2 * i * 10) , "|")

# exercise  9 - future value of investment amount annual interest rate of 5.5%

def futureValue():
    intAmount = eval(input("Enter your intial amount:"))
    noOfYears = eval(input("Enter the number of years:"))
    totalAmount = intAmount
    for i in range(noOfYears):
        totalAmount = totalAmount * 1.055 # interest rate is 5.5%
    print(totalAmount)




