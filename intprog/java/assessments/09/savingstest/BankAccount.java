
/**
 * class BankAccount is a superclass to represent bank accounts. 
 * All accounts have an account number and a balance (how much
 * money is in the account).
 * 
 * @author Robert Topp 
 * @version 6/3/2012
 */
public class BankAccount
{
    private String number;
    private int balance;

    /**
     * Constructor with single parameter
     */
    public BankAccount(String accno)
    {
        number = accno;
        balance = 0;
    }

    /**
     * Constructor with two parameters
     */
    public BankAccount(String accno, int balance)
    {
        number = accno;
        this.balance = balance;
    }
    
    /**
     *  Accessor method for account number
     */
    public String getNumber()
    {
        return number;
    }
    
    /**
     * Accessor method for year balance
     */
    public int getBalance()
    {
             return balance;
    }
    
    /**
     * Compare the balance in this account with another.
     * Return true if this account has more money in than that
     * supplied by parameter
     */
    public boolean isRicherThan(BankAccount b)
    {
        return balance > b.getBalance();
    }
}
    
    
    