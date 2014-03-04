import java.util.Random;
import java.util.ArrayList;

public class BiasedDie extends Die
{
    public BiasedDie()
    {
         randNo = new Random();
         dieThrows = new ArrayList<Integer>();
    }
    
  public int throwDie(){
    dieFace = randNo.nextInt(7) + 1;
    if(dieFace == 7){ dieFace = 6; }
    dieThrows.add(dieFace);
    return dieFace;  
  }
  
}
