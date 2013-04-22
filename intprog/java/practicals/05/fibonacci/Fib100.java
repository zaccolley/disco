import java.lang.Math;
/**
 * Fibonacci series code
 * 
 * @author (Zac Colley) 
 * @version (1)
 */
public class Fib100
{
   private int[] fib;

    /**
     * Constructor for objects of class Fib100
     */
    public Fib100()
    {
        fib = new int[99];
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
