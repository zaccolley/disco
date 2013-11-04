package pipesrus;

import java.util.*;
import java.text.*;

/**
 *
 * @author Zac Colley
 */
public class Order{
    
    private Pipe pipe = new Pipe();
    
    private int quantity = 0;
    private double cost = 0.0;
    
    private Date dateTime = new Date();
    private String time = getPrettyDateTime();
    
    public Order(){
    }
    
    public Order(Pipe p, int q, String t){
        pipe = p;
        quantity = q;
        time = t;
    }
    
    // getters
    
    public Pipe getPipe(){
        return pipe;
    }
    
    public int getQuantity(){
        return quantity;
    }
    
    public double getCost(){
        return cost;
    }
    
    public Date getDateTime(){
        return dateTime;
    }
    
    // pretty getters
    
    public String getPrettyCost(){
        return "£" + getCost();
    }
    
    public String getPrettyQuantity(){
        return getQuantity() + "x";
    }
    
    public String getPrettyDateTime(){    
        // http://stackoverflow.com/questions/6516320/datetime-datatype-in-java
        DateFormat dateFormat = new SimpleDateFormat("HH:mm");
        Date dateTime = new Date();
        return dateFormat.format(dateTime);
    }
    
    // setters
    
    public void setPipe(Pipe p){
        pipe = p;
    }
    
    public void setCost(Double c){
        cost = c;
    }
    
    public void setQuantity(int q){
        quantity = q;
    }
    
    public void setDateTime(Date dT){
        dateTime = dT;
    }
    
    @Override
    public String toString(){
        
        String open = "";
        String close = "";
        
        if(pipe.getChemRes() || pipe.getInsul() || pipe.getReinforce()){
            open = " ( - ";
            close = ") ";
        }
        
        String output = "(" + getPrettyDateTime() + ") "+ getPrettyCost() + " - "
                      + getPrettyQuantity() + ": "
                      + pipe.getPrettyLength() + " by " + pipe.getPrettyDia()
                      + open + pipe.getPrettyChemRes()  + pipe.getPrettyInsul()
                      + pipe.getPrettyReinforce() + close + " | "
                      + pipe.getPrettyColours() + " | "  + pipe.getPrettyGrade();
        return output;
    }
    
}
