import java.util.Random;
import java.util.ArrayList;
/**
 * Write a description of class Die here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class Die
{
  protected Random randNo;
  protected int dieFace;
  protected ArrayList<Integer> dieThrows;
  
  public Die()
  {
    randNo = new Random();
    dieThrows = new ArrayList<Integer>();
  }
  
  public int throwDie(){
    dieFace = randNo.nextInt(6) + 1;
    dieThrows.add(dieFace);
    return dieFace;  
  }
  
  public void printDieThrows(){
    for(int i = 0; i < 100; i++)
    {
        System.out.println(this.throwDie());
    }
  }
  
  public int lastThrow(){
    if(dieThrows.isEmpty()){
        return 0;
    }else{
        return dieThrows.get(dieThrows.size() - 1);
    }    
  }
}
