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
        
        if(1 >= 1){            
            quantity = q; 
        }else{ System.out.println("Need more than 0 pipes"); }
        
        calcCost();
       
        time = t;
    }
    
    public double gradeCost(int grade){
        double gradeCost = 0.0;
        
        switch(grade){        
            case 1: gradeCost = 0.25; break;
            case 2: gradeCost = 0.29; break;
            case 3: gradeCost = 0.32; break;
            case 4: gradeCost = 0.37; break;
            case 5: gradeCost = 0.41; break;
        }
        
        return gradeCost;
    }
    
    public double extraCost(Pipe pipe, double cost){
        double percent = 1.0;
        
        if(pipe.getColours() > 0){            
            if(pipe.getColours() == 1){ percent += 0.13; }
            if(pipe.getColours() == 2){ percent += 0.16; }        
        }        
        if(pipe.getChemRes()){ percent += 0.10; }
        if(pipe.getInsul()){ percent += 0.12; }
        if(pipe.getReinforce()){ percent += 0.13; } 
        
        return cost * percent;
    }

    
    public void calcCost(){
        double volume = pipe.getLengthIn() * pipe.getXAreaIn();
        System.out.println(volume);
        double calcCost = volume * gradeCost(pipe.getGrade());
        calcCost = extraCost(pipe, calcCost);
        
        setCost((double) Math.round(calcCost * 100) / 100);
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
        
        String output = "(" + getPrettyCost() + " each) | " + getPrettyQuantity() + " " + pipe;
        return output;
    }
    
}
