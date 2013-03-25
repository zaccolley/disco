import java.lang.Math;
/**
 * Fibonacci series code - For n numbers
 * 
 * @author (Zac Colley) 
 * @version (1)
 */
public class FibN
{
   private int[] fib;

    /**
     * Constructor for objects of class Fib100
     */
    public FibN(int n)
    {
        fib = new int[n];
        fib[0] = 0;
        fib[1] = 1;
        for(int i = 2; i < fib.length; i++){
           fib[i] = fib[i-1] + fib[i-2];
        }
    }
    
    public int fibtotal(){
        int total = 0;
        for(int i = 0; i < fib.length; i++){
            total += i;
        }
        return total;
    }

    public int fibaverage(){
        int total = this.fibtotal();
        int average = total / fib.length;
        return average;
    }
}
