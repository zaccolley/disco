public class Test
{
    private BankAccount account1;
    private BankAccount account2;

    /**
     * Constructor for objects of class Test
     */
    public Test()
    {
        account1 = new BankAccount("012345678");
        account2 = new Savings("987654321", 10000, 3.05, 30);
    }

   public void compareBalances(){
       BankAccount highestBalance = account1;
        if(account2.isRicherThan(account1)){
            highestBalance = account2;
        }
       System.out.println(highestBalance.getNumber() + " has a higher balance");
    }
}
