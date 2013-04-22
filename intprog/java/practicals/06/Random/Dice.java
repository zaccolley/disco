public class Dice
{
    private Die die1;
    private Die die2;
    
    public Dice()
    {
       die1 = new Die();
       die2 = new Die();
    }
    
    public void rollDice()
    {
       die1.throwDie();
       die2.throwDie();
    }
    
    public int getTotal(){
        rollDice();
        return die1.lastThrow() + die2.throwDie();
    }
    
    public boolean isDoubleDie(){
        if(die1.lastThrow() == die2.lastThrow()){
            return true;
        }else{
            return false;
        }
    }
}
