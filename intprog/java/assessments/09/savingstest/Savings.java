public class Savings extends BankAccount
{
    private double interestRate;
    private int daysNotice;

    public Savings(String accno, float interestRate, int daysNotice)
    {
        super(accno);
        this.interestRate = interestRate;
        this.daysNotice = daysNotice;
    }
    
    public Savings(String accno, int balance, double interestRate, int daysNotice)
    {
        super(accno, balance);
        this.interestRate = interestRate;
        this.daysNotice = daysNotice;
    }

    public double getInterestRate(){
        return this.interestRate;
    }
    
    public int getDaysNotice(){
        return this.daysNotice;
    }
}
