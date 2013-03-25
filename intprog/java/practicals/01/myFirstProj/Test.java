import java.util.Scanner;

public class Test
{
    public void useAccount()
    {
        Account account_1;
        account_1 = new Account();
        account_1.initialise(("Fred"));
        account_1.print();
        account_1.deposit(200);
        account_1.print();
        account_1.withdraw(125);
        account_1.print();
        
        Account account_2;
        account_2 = new Account();
        account_2.initialise(("Jane"));
        account_2.print();
        account_2.deposit(100);
        account_2.print();
        account_2.withdraw(50);
        account_2.print();
        Scanner reader = new Scanner(System.in);
        System.out.println("press return to finish");
        String temp = reader.nextLine();
        System.out.println("Program Finished");
    }// end method
}// end class